const path = require('path');
const loaderUtils = require('loader-utils');
const Module = require('module');

function loader(content) {
  if (!this.emitFile) throw new Error('File Loader\n\nemitFile is required from module system');

  const options = loaderUtils.getOptions(this) || {};
  const context = options.context || './src';

  const url = loaderUtils.interpolateName(this, options.name || '[path][name].js', {
    context,
    content,
    regExp: options.regExp
  });

  let outputPath = '';

  if (options.outputPath) {
    // support functions as outputPath to generate them dynamically
    outputPath = typeof options.outputPath === 'function' ? options.outputPath(url) : options.outputPath;
  }

  const filePath = this.resourcePath;

  if (options.outputPath) {
    // support functions as outputPath to generate them dynamically
    outputPath = typeof options.outputPath === 'function' ? options.outputPath(url) : options.outputPath + url;

    url = outputPath;
  } else {
    outputPath = url;
  }

  if (options.transform) {
    const module = new Module(this.resource, this);
    module.paths = Module._nodeModulePaths(this.context);
    module.filename = this.resource;

    const origRequire = module.require;
    module.require = (request) => {
      if (request.match(/\.(scss|jpg|png|svg|eot|woff2?|ttf)$/)) {
        return request;
      }
      return origRequire.apply(module, [request]);
    };

    module._compile(content, this.resource);

    const transformed = options.transform(module.exports);
    this.emitFile(outputPath, `module.exports = ${JSON.stringify(transformed, null, '  ')};`);
  } else {
    this.emitFile(outputPath, content);
  }
  return content;
}

module.exports = loader;
exports.default = loader;

