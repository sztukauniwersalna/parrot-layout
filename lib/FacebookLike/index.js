"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function FacebookLike(_a) {
    var url = _a.url;
    return React.createElement("div", { className: 'fb-like', "data-href": url, "data-layout": 'button_count', "data-action": 'like', "data-size": 'large', "data-show-faces": 'false', "data-share": 'false' });
}
exports.FacebookLike = FacebookLike;
exports.default = FacebookLike;