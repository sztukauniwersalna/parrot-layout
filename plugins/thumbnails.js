const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const loaderUtils = require('loader-utils');

const PropTypes = require('prop-types');
const { createElement, Component } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');

const evaluate = require('eval');
const sharp = require('sharp');
const { JSDOM } = require('jsdom');

const request = require('request');

const DEFAULT_OUTPUT_FILENAME = '[hash].thumbs.js';

function ThumbnailsPlugin(options = {}) {
  this.options = {
    output: options.output || DEFAULT_OUTPUT_FILENAME,
  };
}

ThumbnailsPlugin.prototype.apply = function(compiler) {
  const that = this;

  compiler.apply(new SingleEntryPlugin(
    this.context,
    'paramorph/data',
    that.options.output,
  ));

  compiler.plugin('compilation', function(compilation) {
    var mainFile = compilation.outputOptions.filename || 'bundle.js';
    compilation
      .mainTemplate
      .plugin('asset-path', function (name, data) {
        if (name !== mainFile) {
          return name;
        }
        return (data.chunk && data.chunk.name === that.options.output) ? that.options.output : name;
      });
  });

  compiler.plugin('emit', function(compilation, callback) {
    if (compilation.errors.length !== 0) {
      return callback();
    }

    const source = compilation.assets[that.options.output].source();

    evaluateWebsite(source)
      .catch(err => {
        compilation.errors.push(err);
        throw err;
      })
      .then(extractImageUrlsFromAllPages)
      .then(fetchImagesAndCreateThumbnails)
      .then(thumbnails => {
        const source = `window.thumbs = ${JSON.stringify(thumbnails)}`;
        const digest = loaderUtils.getHashDigest(source);
        const fileName = that.options.output.replace('[hash]', digest);
        const buffer = Buffer.from(source, 'utf8');

        compilation.assets[fileName] = {
          source: () => buffer,
          size: () => buffer.length,
        };
        callback();
      })
      .catch(callback)
  });
};

module.exports = ThumbnailsPlugin;
module.exports.ThumbnailsPlugin = ThumbnailsPlugin;
module.exports.default = ThumbnailsPlugin;

function evaluateWebsite(source) {
  return new Promise((resolve, reject) => {
    const exports = evaluate(source, 'paramorph/data', createGlobals(), true);
    resolve(exports.default);
  });
}

function extractImageUrlsFromAllPages(website) {
  return Object.keys(website.pages)
    .map(key => website.pages[key])
    .filter(page => page.output && page.url !== '/' && !page.pages)
    .map(page => extractImageUrls(website, page))
    .reduce((result, urls) => result.concat(urls), [])
    .filter((url, index, self) => self.indexOf(url) === index)
  ;
}

function extractImageUrls(website, page) {
  const elem = createElement(page.body, { website, page, respectLimit: false });
  const router = createElement(StaticRouter, { location: page.url, context: {} }, elem);
  const context = createElement(FakeStyleContext, {}, router);
  const markup = renderToStaticMarkup(context);

  const regex = /<img[^>]* src="([a-z]*:\/\/[^"]*)"[^>]*>/g;
  const urls = []

  let match;

  while (match = regex.exec(markup)) {
    const url = match[1];
    urls.push(url);
  }

  return urls;
}

function fetchImagesAndCreateThumbnails(urls) {
  const downloader = new Downloader(10);
  const thumbnails = {};

  const promises = urls.map(
    url => downloader.download(url)
      .then(data => {
        const thumb = {};
        const pipeline = sharp(data);

        return Promise.all([
          pipeline.clone()
            .metadata()
            .then(meta => thumb.ratio = meta.width / meta.height),
          pipeline.clone()
            .resize(16, undefined, { kernel: sharp.kernel.lanczos3 })
            .png({ force: true })
            .toBuffer()
            .then(data => thumb.data = data.toString('base64'))
        ])
        .then(() => thumbnails[url] = thumb)
        ;
      })
  );

  return Promise.all(promises)
    .then(() => thumbnails);
}

class Downloader {
  constructor(poolSize) {
    this.poolSize = poolSize;
    this.downloading = 0;
    this.queue = [];
    this.error = false;
  }
  download(url) {
    return new Promise((resolve, reject) => this._queue({ url, resolve, reject }));
  }
  _queue(query) {
    if (this.error) {
      return;
    }
    if (this.downloading === this.poolSize) {
      this.queue.push(query);
      return;
    }

    this.downloading += 1;
    this._download(query);
  }
  _download(query) {
    request.head(query.url, (err, res, body) => {
      if (err) {
        return query.reject(err);
      }
      const mimeType = res.headers['content-type'];
      const length = res.headers['content-length'];
      const sizeKb = length
        ? `${Math.ceil(length / 1024)}kB`
        : 'Unknown Size';

      console.info(`Fetching ${mimeType} ${sizeKb}`);
      console.info(query.url);

      const buffers = [];

      const onData = (data) => {
        if (this.error) {
          return;
        }
        buffers.push(data);
      }
      const onError = (err) => {
        this.error = true;
        query.reject(err);
      };
      const onEnd = () => {
        query.resolve(Buffer.concat(buffers));

        if (this.queue.length !== 0) {
          const query = this.queue.shift();
          setImmediate(() => this._download(query));
        } else {
          this.downloading -= 1;
        }
      };

      request(query.url)
        .on('error', onError)
        .on('response', stream => stream
          .on('data', onData)
          .on('error', onError)
          .on('end', onEnd)
        )
      ;
    });
  }
}

class FakeStyleContext extends Component {
  getChildContext() {
    return {
      insertCss: () => () => undefined,
    };
  }
  render() {
    return this.props.children;
  }
}

FakeStyleContext.childContextTypes = {
  insertCss: PropTypes.func.required,
};

function createGlobals() {
  const window = new JSDOM().window;
  window.thumbs = {};
  const { document } = window;
  const self = window;
  const location = window.location = { href: '', path: '' };
  return { self, window, document, location };
}

