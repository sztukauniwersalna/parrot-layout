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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var paramorph_1 = require("paramorph");
var Tags_1 = require("../Tags");
var Button_1 = require("../Button");
var Image_1 = require("../Image");
var s = require('./style');
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tile.prototype.getChildContext = function () {
        var post = this.props.post;
        return __assign({}, this.context, { post: post });
    };
    Tile.prototype.render = function () {
        var _a = this.props, post = _a.post, Content = _a.Content, props = __rest(_a, ["post", "Content"]);
        return (React.createElement("article", null,
            React.createElement("h1", null,
                React.createElement(paramorph_1.Link, { to: post.url }, post.title)),
            React.createElement("div", { className: s.tags },
                React.createElement(Tags_1.default, null)),
            maybeRenderImage(post),
            React.createElement(Content, __assign({}, props, { respectLimit: true })),
            React.createElement("div", { className: s.more },
                React.createElement(Button_1.default, { url: post.url, variant: 'raised', color: 'purple' }, "Read More"))));
    };
    Tile.childContextTypes = paramorph_1.ContextTypes;
    return Tile;
}(paramorph_1.PureComponent));
exports.Tile = Tile;
function maybeRenderImage(post) {
    if (!post.image) {
        return null;
    }
    return (React.createElement(paramorph_1.Link, { to: post.url },
        React.createElement(Image_1.default, { src: post.image, alt: "" + post.title })));
}
exports.default = Tile;
