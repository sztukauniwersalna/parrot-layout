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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var paramorph_1 = require("paramorph");
var Tile_1 = require("../Tile");
var TableOfContents_1 = require("../TableOfContents");
;
var DEFAULT_BATCH_SIZE = 20;
var Feed = /** @class */ (function (_super) {
    __extends(Feed, _super);
    function Feed(props) {
        var _this = _super.call(this, props) || this;
        var batchSize = Math.min(props.pages.length, props.batchSize || DEFAULT_BATCH_SIZE);
        _this.state = {
            loading: batchSize,
            loaded: batchSize,
        };
        _this.onScroll = _this.onScroll.bind(_this);
        return _this;
    }
    Feed.prototype.componentWillMount = function () {
        var _this = this;
        var _a = this.context, paramorph = _a.paramorph, page = _a.page;
        var _b = this.props, pages = _b.pages, _c = _b.respectLimit, respectLimit = _c === void 0 ? false : _c;
        var loading = this.state.loading;
        if (respectLimit) {
            // Everything contained in props.pages. No need to fetch.
            return;
        }
        var firstBatch = pages.slice(0, loading);
        paramorph
            .loadData(page.url, function () { return Promise.all(firstBatch.map(function (page) { return paramorph.loadPage(page.url); })); })
            .then(function () {
            _this.forceUpdate();
        });
    };
    Feed.prototype.render = function () {
        var _this = this;
        var _a = this.context, paramorph = _a.paramorph, page = _a.page;
        var _b = this.props, pages = _b.pages, _c = _b.respectLimit, respectLimit = _c === void 0 ? false : _c, props = __rest(_b, ["pages", "respectLimit"]);
        var _d = this.state, loading = _d.loading, loaded = _d.loaded;
        if (respectLimit) {
            return React.createElement(TableOfContents_1.Branch, __assign({ pages: pages, shallow: true }, props));
        }
        var data = paramorph.data[page.url] || [];
        if (data.length > pages.length) {
            throw new Error(page.url + ": pages.length (" + pages.length + ") < data.length (" + data.length + ")");
        }
        return (React.createElement("div", null,
            data.map(function (Content, i) {
                var page = pages[i];
                return (React.createElement(Tile_1.default, { key: page.url, page: page, Content: Content }));
            }),
            React.createElement("div", { ref: function (e) { return _this.loadTrigger = e; } }, loading !== loaded ? 'Loading...' : null)));
    };
    Feed.prototype.componentDidMount = function () {
        window.addEventListener('scroll', this.onScroll);
        this.onScroll();
    };
    Feed.prototype.componentWillUnmount = function () {
        window.removeEventListener('scroll', this.onScroll);
    };
    Feed.prototype.onScroll = function () {
        if (this.needsMoreContent() && !this.isAtEnd()) {
            this.loadNextBatch();
        }
    };
    Feed.prototype.needsMoreContent = function () {
        var scrollY = window.scrollY;
        var offsetTop = this.getOffsetTop(this.loadTrigger);
        return scrollY >= offsetTop;
    };
    Feed.prototype.loadNextBatch = function () {
        var _this = this;
        var _a = this.context, paramorph = _a.paramorph, page = _a.page;
        var _b = this.props, pages = _b.pages, _c = _b.batchSize, batchSize = _c === void 0 ? DEFAULT_BATCH_SIZE : _c;
        var _d = this.state, loading = _d.loading, loaded = _d.loaded;
        if (loading !== loaded) {
            return;
        }
        var nextLoading = Math.min(loading + batchSize, pages.length);
        var batch = pages.slice(loaded, nextLoading);
        var previousData = paramorph.data[page.url] || [];
        var dataLoaded = paramorph.loadData(page.url, function () {
            return Promise.all(batch.map(function (page) { return paramorph.loadPage(page.url); }))
                .then(function (newData) { return previousData.concat(newData); });
        });
        this.setState(function (prev) { return (__assign({}, prev, { loading: nextLoading })); }, function () {
            dataLoaded.then(function () {
                _this.setState(function (prev) { return (__assign({}, prev, { loaded: nextLoading })); }, _this.onScroll);
            });
        });
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
