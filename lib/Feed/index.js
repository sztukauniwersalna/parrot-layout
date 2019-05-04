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
var Spinner_1 = require("../Spinner");
var Button_1 = require("../Button");
var Icon_1 = require("../Icon");
var s = require('./style');
;
var DEFAULT_PRELOAD_SIZE = 20;
var DEFAULT_BATCH_SIZE = 5;
var PAGE_PATH_PARAM = 'pageNumber(~\\d+~)';
var Feed = /** @class */ (function (_super) {
    __extends(Feed, _super);
    function Feed(props) {
        var _this = _super.call(this, props) || this;
        var preloadSize = Math.min(props.preloadSize || props.batchSize || DEFAULT_PRELOAD_SIZE, props.posts.length);
        _this.state = {
            loading: preloadSize,
            loaded: preloadSize,
        };
        _this.onContent = _this.onContent.bind(_this);
        _this.onScroll = _this.onScroll.bind(_this);
        return _this;
    }
    Feed.prototype.componentWillMount = function () {
        var _a;
        var _b = this.context, post = _b.post, requestParameterizedRender = _b.requestParameterizedRender;
        if (!this.hasPathParam()) {
            console.error("'" + PAGE_PATH_PARAM + "' path param not found in permalink: '" + post.permalink + "'");
            return;
        }
        // pages in url are numbered starting from 1
        var lastPageNumber = this.getLastPageNumber() + 1;
        // first page is already rendered
        for (var i = 2; i <= lastPageNumber + 1; ++i) {
            requestParameterizedRender((_a = {}, _a[PAGE_PATH_PARAM] = "-" + i + "-", _a));
        }
    };
    Feed.prototype.render = function () {
        var _this = this;
        var _a = this.context, paramorph = _a.paramorph, post = _a.post;
        var _b = this.props, posts = _b.posts, _c = _b.respectLimit, respectLimit = _c === void 0 ? false : _c, props = __rest(_b, ["posts", "respectLimit"]);
        var _d = this.state, loading = _d.loading, loaded = _d.loaded;
        if (respectLimit) {
            return React.createElement(TableOfContents_1.Branch, __assign({ posts: posts.slice(0, post.limit), shallow: true }, props));
        }
        var content = this.getContent();
        return (React.createElement("div", { className: loaded !== loading ? s.loading : '' },
            this.renderPreviousLink(),
            content.map(function (_a) {
                var post = _a.post, Content = _a.Content;
                return (React.createElement(Tile_1.default, { key: post.url, post: post, Content: Content }));
            }),
            React.createElement("div", { className: s.loadTrigger, ref: function (e) { return _this.loadTrigger = e; } },
                React.createElement(Spinner_1.default, null)),
            this.renderNextLink()));
    };
    Feed.prototype.componentDidMount = function () {
        var _a = this.context, paramorph = _a.paramorph, post = _a.post;
        var _b = this.props.respectLimit, respectLimit = _b === void 0 ? false : _b;
        var loaded = this.state.loaded;
        if (!respectLimit) {
            paramorph.addContentListener(this.onContent);
        }
        window.addEventListener('scroll', this.onScroll);
        this.maybeLoadInitialBatch();
    };
    Feed.prototype.componentWillUnmount = function () {
        var paramorph = this.context.paramorph;
        var _a = this.props.respectLimit, respectLimit = _a === void 0 ? false : _a;
        if (!respectLimit) {
            paramorph.removeContentListener(this.onContent);
        }
        window.removeEventListener('scroll', this.onScroll);
    };
    Feed.prototype.renderPreviousLink = function () {
        if (this.isOnFirstPage() || !this.hasPathParam()) {
            return null;
        }
        return (React.createElement("p", { className: s.staticLink },
            React.createElement(Button_1.default, { variant: 'flat', color: 'gray', url: this.getPreviousUrl() },
                React.createElement(Icon_1.default, { name: 'arrow_back' }),
                " Previous Posts")));
    };
    Feed.prototype.renderNextLink = function () {
        if (this.isOnLastPage() || !this.hasPathParam()) {
            return null;
        }
        return (React.createElement("p", { className: s.staticLink },
            React.createElement(Button_1.default, { variant: 'flat', color: 'gray', url: this.getNextUrl() },
                "Next Posts ",
                React.createElement(Icon_1.default, { name: 'arrow_forward' }))));
    };
    Feed.prototype.getContent = function () {
        var e_1, _a;
        var paramorph = this.context.paramorph;
        var posts = this.props.posts;
        var loading = this.state.loading;
        var content = [];
        var pageOffset = this.getPageOffset();
        var pagePosts = posts.slice(pageOffset, pageOffset + loading);
        try {
            for (var pagePosts_1 = __values(pagePosts), pagePosts_1_1 = pagePosts_1.next(); !pagePosts_1_1.done; pagePosts_1_1 = pagePosts_1.next()) {
                var post = pagePosts_1_1.value;
                var Content = paramorph.content[post.url];
                if (Content === undefined) {
                    break;
                }
                content.push({ post: post, Content: Content });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (pagePosts_1_1 && !pagePosts_1_1.done && (_a = pagePosts_1.return)) _a.call(pagePosts_1);
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
            this.setState(function (prev) { return (__assign({}, prev, { loaded: content.length })); });
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
    Feed.prototype.maybeLoadInitialBatch = function () {
        var _this = this;
        var paramorph = this.context.paramorph;
        var loaded = this.state.loaded;
        var posts = this.props.posts;
        var content = this.getContent();
        if (content.length === loaded) {
            this.onScroll();
            return;
        }
        var pageOffset = this.getPageOffset();
        var loading = Math.min(posts.length - pageOffset, this.state.loading);
        this.setState(function (prev) { return (__assign({}, prev, { loading: loading, loaded: content.length })); }, function () {
            var pageOffset = _this.getPageOffset();
            var batch = posts.slice(pageOffset, pageOffset + loading);
            batch.map(function (post) { return paramorph.loadContent(post.url); });
        });
    };
    Feed.prototype.loadNextBatch = function () {
        var _this = this;
        var _a = this.context, paramorph = _a.paramorph, post = _a.post;
        var _b = this.props, posts = _b.posts, _c = _b.batchSize, batchSize = _c === void 0 ? DEFAULT_BATCH_SIZE : _c;
        var loading = this.state.loading;
        var nextLoading = Math.min(loading + batchSize, posts.length);
        this.setState(function (prev) { return (__assign({}, prev, { loading: nextLoading })); }, function () {
            var pageOffset = _this.getPageOffset();
            var batch = posts.slice(pageOffset + loading, pageOffset + nextLoading);
            batch.map(function (post) { return paramorph.loadContent(post.url); });
        });
    };
    Feed.prototype.getOffsetTop = function (elem) {
        var offsetParent = elem.offsetParent;
        var parentOffset = (offsetParent ? this.getOffsetTop(offsetParent) : 0);
        return elem.offsetTop + parentOffset;
    };
    Feed.prototype.isAtEnd = function () {
        var loading = this.state.loading;
        var posts = this.props.posts;
        return loading === posts.length;
    };
    Feed.prototype.isOnFirstPage = function () {
        return this.getPageNumber() === 0;
    };
    Feed.prototype.isOnLastPage = function () {
        return this.getPageNumber() === this.getLastPageNumber();
    };
    Feed.prototype.getPageNumber = function () {
        var pathParams = this.context.pathParams;
        var pageNumber = pathParams.get('pageNumber') || '~0~';
        return Number.parseInt(pageNumber.replace(/[^\d]+/g, ''));
    };
    Feed.prototype.getLastPageNumber = function () {
        var posts = this.props.posts;
        var pageSize = this.getPageSize();
        return Math.round(posts.length / pageSize);
    };
    Feed.prototype.getPageSize = function () {
        var _a = this.props.preloadSize, preloadSize = _a === void 0 ? DEFAULT_PRELOAD_SIZE : _a;
        return preloadSize;
    };
    Feed.prototype.getPageOffset = function () {
        var pageSize = this.getPageSize();
        var pageNumber = this.getPageNumber();
        var offset = pageSize * pageNumber;
        return offset;
    };
    Feed.prototype.getPreviousUrl = function () {
        var _a = this.context, pathParams = _a.pathParams, post = _a.post;
        // pages in url are numbered starting from 1
        var pageNumber = this.getPageNumber() + 1;
        if (pageNumber === 2) {
            return post.url;
        }
        else {
            return post.permalink.replace(":" + PAGE_PATH_PARAM + "?", "~" + (pageNumber - 1) + "~");
        }
    };
    Feed.prototype.getNextUrl = function () {
        var _a = this.context, pathParams = _a.pathParams, post = _a.post;
        // pages in url are numbered starting from 1
        var pageNumber = this.getPageNumber() + 1;
        return post.permalink.replace(":" + PAGE_PATH_PARAM + "?", "~" + (pageNumber + 1) + "~");
    };
    Feed.prototype.hasPathParam = function () {
        var post = this.context.post;
        return post.permalink.indexOf(":" + PAGE_PATH_PARAM + "?/") !== -1;
    };
    return Feed;
}(paramorph_1.PureComponent));
exports.Feed = Feed;
exports.default = Feed;
