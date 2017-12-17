"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var s = require('./style');
var FB_PLUGINS_SERVICE = 'https://www.facebook.com/plugins/like.php';
function FacebookLike(_a) {
    var url = _a.url;
    var params = {
        href: url,
        layout: 'button_count',
        action: 'like',
        size: 'large',
        show_faces: false,
        share: false,
        height: 21
    };
    return React.createElement("div", { className: s.like }, React.createElement("iframe", { src: FB_PLUGINS_SERVICE + "?" + urlParamsToString(params), scrolling: 'no', allowTransparency: true }));
}
exports.FacebookLike = FacebookLike;
exports.default = FacebookLike;
function urlParamsToString(params) {
    return Object.keys(params).map(function (key) {
        return key + "=" + encodeURIComponent(params[key]);
    }).join('&');
}