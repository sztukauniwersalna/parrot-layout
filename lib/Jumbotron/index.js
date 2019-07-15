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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var paramorph_1 = require("paramorph");
var SocialButtons_1 = require("../SocialButtons");
var s = require('./style');
var Jumbotron = /** @class */ (function (_super) {
    __extends(Jumbotron, _super);
    function Jumbotron(props) {
        var _this = _super.call(this, props) || this;
        _this.loader = new Image();
        _this.state = {
            animation: true,
            imageLoaded: false,
        };
        _this.onImageLoaded = _this.onImageLoaded.bind(_this);
        _this.onAnimationEnd = _this.onAnimationEnd.bind(_this);
        return _this;
    }
    Jumbotron.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, _b = _a.fullscreen, fullscreen = _b === void 0 ? false : _b, _c = _a.align, align = _c === void 0 ? 'center' : _c;
        var _d = this.state, imageLoaded = _d.imageLoaded, animation = _d.animation;
        var classNames = [s.container, s[align]];
        if (fullscreen) {
            classNames.push(s.fullscreen);
        }
        if (imageLoaded) {
            classNames.push('loaded');
        }
        if (animation) {
            classNames.push('animation');
        }
        return (React.createElement("div", { className: classNames.join(' ') },
            React.createElement("div", { className: s.jumbo + " contrast compact non-responsive strong" },
                React.createElement("div", { className: s.text + " " + (align === 'center' ? 'centered' : '') },
                    React.createElement("div", { className: 'text', onAnimationEnd: this.onAnimationEnd }, children)),
                React.createElement("div", { className: 'image', ref: function (e) { return _this.image = e; } })),
            React.createElement("div", { className: s.footer },
                React.createElement("div", { className: s.social },
                    React.createElement(SocialButtons_1.default, null)))));
    };
    Jumbotron.prototype.componentDidMount = function () {
        var _a = this, image = _a.image, loader = _a.loader;
        loader.addEventListener('load', this.onImageLoaded);
        if (!image) {
            return;
        }
        var style = window.getComputedStyle(image, "::before");
        if (!style) {
            return;
        }
        var backgroundImage = style.getPropertyValue('background-image');
        if (!backgroundImage) {
            return;
        }
        var url = backgroundImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
        loader.src = url;
    };
    Jumbotron.prototype.componentWillUnmount = function () {
        var loader = this.loader;
        loader.removeEventListener('load', this.onImageLoaded);
    };
    Jumbotron.prototype.onImageLoaded = function () {
        this.setState(function (prev) { return (__assign({}, prev, { imageLoaded: true })); });
        this.loader.src = '';
    };
    Jumbotron.prototype.onAnimationEnd = function () {
        this.setState(function (prev) { return (__assign({}, prev, { animation: false })); });
    };
    return Jumbotron;
}(paramorph_1.PureComponent));
exports.Jumbotron = Jumbotron;
exports.default = Jumbotron;
