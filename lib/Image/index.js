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
var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var s = require('./style');
var Image = /** @class */function (_super) {
    __extends(Image, _super);
    function Image(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            step: 'static'
        };
        _this.maybeStartLoading = _this.maybeStartLoading.bind(_this);
        return _this;
    }
    Image.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            ratio = _a.ratio,
            src = _a.src,
            alt = _a.alt,
            thumbnail = _a.thumbnail;
        var step = this.state.step;
        var height = 100 / ratio;
        return React.createElement("div", { className: "image " + s.container + " " + s[step], style: { height: height + "vw" }, ref: function ref(e) {
                return _this.container = e;
            } }, React.createElement("img", { className: s.image, src: step !== 'static' ? src : '', alt: alt, onLoad: function onLoad() {
                return _this.setStep('transition');
            }, onTransitionEnd: function onTransitionEnd() {
                return _this.setStep('ready');
            } }), React.createElement("img", { className: s.thumbnail, src: thumbnail, alt: 'thumbnail' }), React.createElement("noscript", null, React.createElement("img", { src: src, alt: alt })));
    };
    Image.prototype.componentDidMount = function () {
        window.addEventListener('scroll', this.maybeStartLoading);
        window.addEventListener('resize', this.maybeStartLoading);
        this.maybeStartLoading();
    };
    Image.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.maybeStartLoading);
        window.removeEventListener('resize', this.maybeStartLoading);
    };
    Image.prototype.maybeStartLoading = function () {
        if (this.state.step !== 'static' || !isInViewport(this.container, 128)) {
            return;
        }
        this.setStep('loading');
    };
    Image.prototype.setStep = function (step) {
        this.setState(function (prev) {
            return __assign({}, prev, { step: step });
        });
    };
    return Image;
}(React.Component);
exports.Image = Image;
exports.default = Image;
function isInViewport(element, margin) {
    if (margin === void 0) {
        margin = 0;
    }
    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var upperTrigger = 0 + margin;
    var lowerTrigger = windowHeight - margin;
    return !(rect.top <= upperTrigger && rect.bottom <= upperTrigger || rect.top >= lowerTrigger && rect.bottom >= lowerTrigger);
}