
function loader(content) {
  return content +'\n'
    +'if (typeof(s) !== \'undefined\') {\n'
    +'  const withStyles = require(\'isomorphic-style-loader/lib/withStyles\').default;\n'
    +'  exports.default = withStyles(s)(exports.default);\n'
    +'}\n'
    +'\n';
}

module.exports = loader;
exports.default = loader;

