"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var s = require('./style');
var FB_PLUGINS_SERVICE = 'https://www.facebook.com/plugins/like.php';
var FacebookLike = /** @class */ (function (_super) {
    __extends(FacebookLike, _super);
    function FacebookLike() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FacebookLike.prototype.render = function () {
        var url = this.props.url;
        var params = {
            href: url,
            layout: 'button_count',
            action: 'like',
            size: 'large',
            show_faces: false,
            share: false,
            height: 21,
        };
        return (React.createElement("div", { className: s.like },
            React.createElement("iframe", { src: FB_PLUGINS_SERVICE + "?" + urlParamsToString(params), scrolling: 'no' })));
    };
    return FacebookLike;
}(React.Component));
exports.FacebookLike = FacebookLike;
exports.default = FacebookLike;
function urlParamsToString(params) {
    return Object.keys(params)
        .map(function (key) { return key + "=" + encodeURIComponent(params[key]); })
        .join('&');
}
