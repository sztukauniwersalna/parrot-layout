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
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var paramorph_1 = require("paramorph");
var Tile_1 = require("../Tile");
var TableOfContents_1 = require("../TableOfContents");
;
var DEFAULT_PRELOAD_SIZE = 20;
var DEFAULT_BATCH_SIZE = 5;
var Feed = /** @class */ (function (_super) {
    __extends(Feed, _super);
    function Feed(props) {
        var _this = _super.call(this, props) || this;
        var preloadSize = Math.min(props.preloadSize || props.batchSize || DEFAULT_PRELOAD_SIZE, props.pages.length);
        _this.state = {
            loading: preloadSize,
            loaded: preloadSize,
        };
        _this.onContent = _this.onContent.bind(_this);
        _this.onScroll = _this.onScroll.bind(_this);
        return _this;
    }
    Feed.prototype.render = function () {
        var _this = this;
        var _a = this.context, paramorph = _a.paramorph, page = _a.page;
        var _b = this.props, pages = _b.pages, _c = _b.respectLimit, respectLimit = _c === void 0 ? false : _c, props = __rest(_b, ["pages", "respectLimit"]);
        var _d = this.state, loading = _d.loading, loaded = _d.loaded;
        if (respectLimit) {
            return React.createElement(TableOfContents_1.Branch, __assign({ pages: pages.slice(0, page.limit), shallow: true }, props));
        }
        var content = this.getContent();
        return (React.createElement("div", null,
            content.map(function (Content, i) {
                var page = pages[i];
                return (React.createElement(Tile_1.default, { key: page.url, page: page, Content: Content }));
            }),
            React.createElement("div", { ref: function (e) { return _this.loadTrigger = e; } }, loading !== loaded ? 'Loading...' : null)));
    };
    Feed.prototype.componentDidMount = function () {
        var paramorph = this.context.paramorph;
        var _a = this.props.respectLimit, respectLimit = _a === void 0 ? false : _a;
        if (!respectLimit) {
            paramorph.addContentListener(this.onContent);
        }
        window.addEventListener('scroll', this.onScroll);
        this.onScroll();
    };
    Feed.prototype.componentWillUnmount = function () {
        var paramorph = this.context.paramorph;
        var _a = this.props.respectLimit, respectLimit = _a === void 0 ? false : _a;
        if (!respectLimit) {
            paramorph.removeContentListener(this.onContent);
        }
        window.removeEventListener('scroll', this.onScroll);
    };
    Feed.prototype.getContent = function () {
        var e_1, _a;
        var paramorph = this.context.paramorph;
        var pages = this.props.pages;
        var loading = this.state.loading;
        var content = [];
        try {
            for (var pages_1 = __values(pages), pages_1_1 = pages_1.next(); !pages_1_1.done; pages_1_1 = pages_1.next()) {
                var page = pages_1_1.value;
                var pageContent = paramorph.content[page.url];
                if (pageContent === undefined) {
                    break;
                }
                content.push(pageContent);
                if (content.length === loading) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (pages_1_1 && !pages_1_1.done && (_a = pages_1.return)) _a.call(pages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return content;
    };
    Feed.prototype.onScroll = function () {
        if (this.needsMoreContent() && !this.isAtEnd() && !this.isLoading()) {
            this.loadNextBatch();
        }
    };
    Feed.prototype.onContent = function () {
        if (!this.isLoading()) {
            // not loaded by us
            return;
        }
        var loaded = this.state.loaded;
        var content = this.getContent();
        if (content.length > loaded) {
            this.setState(function (prev) { return ({ loaded: content.length }); });
        }
    };
    Feed.prototype.needsMoreContent = function () {
        var scrollY = window.scrollY, innerHeight = window.innerHeight;
        var offsetTop = this.getOffsetTop(this.loadTrigger);
        return scrollY + innerHeight >= offsetTop;
    };
    Feed.prototype.isLoading = function () {
        var _a = this.state, loading = _a.loading, loaded = _a.loaded;
        return loading !== loaded;
    };
    Feed.prototype.loadNextBatch = function () {
        var _a = this.context, paramorph = _a.paramorph, page = _a.page;
        var _b = this.props, pages = _b.pages, _c = _b.batchSize, batchSize = _c === void 0 ? DEFAULT_BATCH_SIZE : _c;
        var loading = this.state.loading;
        var nextLoading = Math.min(loading + batchSize, pages.length);
        var batch = pages.slice(loading, nextLoading);
        batch.map(function (page) { return paramorph.loadContent(page.url); });
        this.setState(function (prev) { return (__assign({}, prev, { loading: nextLoading })); });
    };
    Feed.prototype.getOffsetTop = function (elem) {
        var offsetParent = elem.offsetParent;
        var parentOffset = (offsetParent ? this.getOffsetTop(offsetParent) : 0);
        return elem.offsetTop + parentOffset;
    };
    Feed.prototype.isAtEnd = function () {
        var loading = this.state.loading;
        var pages = this.props.pages;
        return loading === pages.length;
    };
    return Feed;
}(paramorph_1.PureComponent));
exports.Feed = Feed;
exports.default = Feed;
