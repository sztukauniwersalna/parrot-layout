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

const ENTRY_NAME = 'Thumbnails.entry';
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
    ENTRY_NAME
  ));

  compiler.plugin('compilation', function(compilation) {
    var mainFile = compilation.outputOptions.filename || 'bundle.js';
    compilation
      .mainTemplate
      .plugin('asset-path', function (name, data) {
        if (name !== mainFile) {
          return name;
        }
        return (data.chunk && data.chunk.name === ENTRY_NAME) ? ENTRY_NAME : name;
      });
  });

  compiler.plugin('emit', function(compilation, callback) {
    const source = compilation.assets[ENTRY_NAME].source();

    const window = new JSDOM().window;
    const { document } = window;
    const self = window;

    const exports = evaluate(source, 'paramorph/data', { self, window, document }, true);
    const website = exports.default;

    const urls = Object.keys(website.pages)
      .map(key => website.pages[key])
      .map(page => {
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
      })
      .reduce((result, urls) => result.concat(urls), [])
      .filter((url, index, self) => self.indexOf(url) === index)
    ;

    console.info(`Images found in content: ${urls.length}.`);
    console.info('Generating thumbnails...');

    const promise = new Promise((resolve, reject) => {
      const thumbnails = {};

      function getThumbnail(url, cb) {
        const thumb = {};

        const pipeline = sharp();
        const promise = Promise.all([
          pipeline.clone()
            .metadata()
            .then(meta => thumb.ratio = meta.width / meta.height),
          pipeline.clone()
            .resize(16, undefined, { kernel: sharp.kernel.lanczos3 })
            .png({ force: true })
            .toBuffer()
            .then(data => thumb.data = data.toString('base64'))
        ]);

        request.head(url, function(err, res, body) {
          if (err) {
            return reject(err);
          }
          const mimeType = res.headers['content-type'];
          const length = res.headers['content-length'];
          const sizeKb = length
            ? `${Math.ceil(length / 1024)}kB`
            : 'Unknown Size';

          console.info(`Fetching ${mimeType} ${sizeKb}`);
          console.info(url);

          request(url)
            .on('error', reject)
            .pipe(pipeline)
            ;
          promise
            .then(() => {
              thumbnails[url] = thumb;
              cb();
            })
          .catch(reject)
            ;
        });
      }

      function getNextThumbnail() {
        const url = urls.shift();
        const onReady = urls.length !== 0 ? getNextThumbnail : () => resolve(thumbnails);
        getThumbnail(url, onReady);
      }

      getNextThumbnail();
    });

    promise
      .then(thumbnails => {
        const source = `window.thumbs = ${JSON.stringify(thumbnails, null, '  ')}`;
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
    ;
  });
};

module.exports = ThumbnailsPlugin;
module.exports.ThumbnailsPlugin = ThumbnailsPlugin;
module.exports.default = ThumbnailsPlugin;

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

