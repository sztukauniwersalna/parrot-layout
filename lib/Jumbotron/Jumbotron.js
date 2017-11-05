"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var withStyles_1 = require("isomorphic-style-loader/lib/withStyles");
var s = require('./Jumbotron.css');
function Jumbotron(_a) {
    var children = _a.children, src = _a.src, _b = _a.fullscreen, fullscreen = _b === void 0 ? false : _b, _c = _a.align, align = _c === void 0 ? 'center' : _c;
    return (React.createElement("div", { className: s.container + " " + (fullscreen ? s.fullscreen : '') + " " + s[align] },
        React.createElement("div", { className: s.jumbo + " contrast compact non-responsive strong" },
            React.createElement("div", { className: s.text + " " + (align === 'center' ? 'centered' : '') }, children),
            src ? renderImage(src) : null)));
}
exports.Jumbotron = Jumbotron;
var renderImage = function (src) { return (React.createElement("div", { className: s.image, style: { backgroundImage: "url('" + src + "')" } })); };
exports.default = withStyles_1.default(s)(Jumbotron);
//# sourceMappingURL=Jumbotron.js.map