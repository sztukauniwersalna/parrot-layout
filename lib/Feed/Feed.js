"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
var Tile_1 = require("../Tile");
var TableOfContents_1 = require("../TableOfContents");
;
function Feed(_a) {
    var website = _a.website, page = _a.page, feed = _a.feed, _b = _a.respectLimit, respectLimit = _b === void 0 ? false : _b, props = __rest(_a, ["website", "page", "feed", "respectLimit"]);
    var pages = feed.filter(function (page) { return page.feed; });
    if (respectLimit) {
        return React.createElement(TableOfContents_1.Branch, __assign({ pages: pages, shallow: true }, props));
    }
    return (React.createElement("div", null, pages.sort(function (a, b) { return b.compareTo(a); })
        .map(function (page) { return (React.createElement(Tile_1.default, { key: page.url, page: page, website: website })); })));
}
exports.Feed = Feed;
exports.default = Feed;
//# sourceMappingURL=Feed.js.map