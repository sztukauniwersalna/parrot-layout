const path = require('path');
const loaderUtils = require('loader-utils');

function loader(content) {
  if (!this.emitFile) throw new Error('File Loader\n\nemitFile is required from module system');

  var options = loaderUtils.getOptions(this) || {};
  var context = options.context || this.options.context;

  var url = loaderUtils.interpolateName(this, options.name, {
    context,
    content,
    regExp: options.regExp
  });

  var outputPath = '';

  if (options.outputPath) {
    // support functions as outputPath to generate them dynamically
    outputPath = typeof options.outputPath === 'function' ? options.outputPath(url) : options.outputPath;
  }

  var filePath = this.resourcePath;

  if (options.outputPath) {
    // support functions as outputPath to generate them dynamically
    outputPath = typeof options.outputPath === 'function' ? options.outputPath(url) : options.outputPath + url;

    url = outputPath;
  } else {
    outputPath = url;
  }

  this.emitFile(outputPath, content);
  return content;
}

module.exports = loader;
exports.default = loader;

