
const Module = require('module');
const path = require('path');

function loader(content) {
  const module = new Module(this.resource, this);
  module.paths = Module._nodeModulePaths(this.context);
  module.filename = this.resource;
  module._compile(`const __webpack_public_path__ = ''; ${content}`, this.resource);

  const emitted = module.exports;
  if (emitted.match(/^data:/)) {
    return `module.exports = '${emitted}';\n`;
  }

  const source = path.relative(path.resolve('./src'), this.resource);
  const relative = path.relative(path.dirname(source), emitted);
  return `module.exports = '${relative}';\n`;
}

module.exports = loader;
exports.default = loader;

