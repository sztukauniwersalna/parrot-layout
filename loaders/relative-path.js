
const Module = require('module');
const path = require('path');

const modules = path.resolve('./node_modules');
const sources = path.resolve('./src');

function loader(content) {
  const module = new Module(this.resource, this);
  module.paths = Module._nodeModulePaths(this.context);
  module.filename = this.resource;
  module._compile(`const __webpack_public_path__ = ''; ${content}`, this.resource);

  const emitted = module.exports;
  if (emitted.match(/^data:/)) {
    return `module.exports = '${emitted}';\n`;
  }

  if (this.resource.startsWith(sources)) {
    const source = path.relative(sources, this.resource);
    const relative = path.relative(path.dirname(source), emitted);
    return `module.exports = '${relative}';\n`;
  }
  if (this.resource.startsWith(modules)) {
    return `module.exports = 'parrot-layout/${emitted}';\n`;
  }

  throw new Error(`could not relativize path: ${this.resource}`);
}

module.exports = loader;
exports.default = loader;

