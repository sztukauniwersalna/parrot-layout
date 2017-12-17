"use strict";

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var s = require('./style');
var FB_PLUGINS_SERVICE = 'https://www.facebook.com/plugins/like.php';
var FacebookLike = /** @class */function (_super) {
    __extends(FacebookLike, _super);
    function FacebookLike(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ready: false
        };
        _this.setReady = _this.setReady.bind(_this);
        return _this;
    }
    FacebookLike.prototype.render = function () {
        var _this = this;
        var url = this.props.url;
        var ready = this.state.ready;
        var classNames = [s.like];
        if (ready) {
            classNames.push(s.ready);
        }
        var params = {
            href: url,
            layout: 'button_count',
            action: 'like',
            size: 'large',
            show_faces: false,
            share: false,
            height: 21
        };
        return React.createElement("div", { className: classNames.join(' ') }, React.createElement("iframe", { src: FB_PLUGINS_SERVICE + "?" + urlParamsToString(params), scrolling: 'no', allowTransparency: true, ref: function ref(e) {
                return _this.iframe = e;
            } }));
    };
    FacebookLike.prototype.componentDidMount = function () {
        this.iframe.addEventListener('load', this.setReady);
    };
    FacebookLike.prototype.componentWillUnmount = function () {
        this.iframe.removeEventListener('load', this.setReady);
    };
    FacebookLike.prototype.setReady = function () {
        this.setState(function (prev) {
            return { ready: true };
        });
    };
    return FacebookLike;
}(React.Component);
exports.FacebookLike = FacebookLike;
exports.default = FacebookLike;
function urlParamsToString(params) {
    return Object.keys(params).map(function (key) {
        return key + "=" + encodeURIComponent(params[key]);
    }).join('&');
}