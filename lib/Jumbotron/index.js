"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var s = require('./style');
function Jumbotron(_a) {
    var children = _a.children,
        _b = _a.fullscreen,
        fullscreen = _b === void 0 ? false : _b,
        _c = _a.align,
        align = _c === void 0 ? 'center' : _c;
    return React.createElement("div", { className: s.container + " " + (fullscreen ? s.fullscreen : '') + " " + s[align] }, React.createElement("div", { className: s.jumbo + " contrast compact non-responsive strong" }, React.createElement("div", { className: s.text + " " + (align === 'center' ? 'centered' : '') }, children), React.createElement("div", { className: 'image' })));
}
exports.Jumbotron = Jumbotron;
exports.default = Jumbotron;