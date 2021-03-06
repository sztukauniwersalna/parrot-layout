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
var paramorph_1 = require("paramorph");
var TableOfContents = /** @class */ (function (_super) {
    __extends(TableOfContents, _super);
    function TableOfContents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableOfContents.prototype.render = function () {
        var _a = this.props.respectLimit, respectLimit = _a === void 0 ? false : _a;
        var paramorph = this.context.paramorph;
        var topLevel = Object.keys(paramorph.posts)
            .map(function (key) { return paramorph.posts[key]; })
            .filter(function (post) { return post.categories.length == 0; })
            .filter(function (post) { return post.url != '/'; });
        var tags = Object.keys(paramorph.tags)
            .map(function (key) { return paramorph.tags[key]; });
        var index = paramorph.posts['/'];
        return (React.createElement("ul", null,
            React.createElement("li", { key: '/' },
                React.createElement(paramorph_1.Link, { to: '/' }, index.title),
                React.createElement(Branch, { posts: topLevel, shallow: respectLimit, ellipsis: respectLimit })),
            !respectLimit
                ? tags.map(function (_a) {
                    var title = _a.title, url = _a.url, posts = _a.posts;
                    return (React.createElement("li", { key: url },
                        React.createElement(paramorph_1.Link, { to: url }, title),
                        React.createElement(Branch, { posts: posts, shallow: true })));
                })
                : null));
    };
    return TableOfContents;
}(paramorph_1.PureComponent));
exports.TableOfContents = TableOfContents;
exports.default = TableOfContents;
function Branch(_a) {
    var posts = _a.posts, _b = _a.shallow, shallow = _b === void 0 ? false : _b, _c = _a.ellipsis, ellipsis = _c === void 0 ? false : _c;
    return (React.createElement("ul", null,
        posts
            .filter(function (post) { return post instanceof paramorph_1.Category; })
            .filter(function (post) { return post.output; })
            .map(function (post) { return post; })
            .map(function (_a) {
            var url = _a.url, title = _a.title, posts = _a.posts;
            return (React.createElement("li", { key: url },
                React.createElement(paramorph_1.Link, { to: url }, title),
                !shallow ? React.createElement(Branch, { posts: posts }) : null));
        }),
        posts
            .filter(function (post) { return !(post instanceof paramorph_1.Category); })
            .filter(function (post) { return post.output; })
            .map(function (_a) {
            var title = _a.title, url = _a.url;
            return (React.createElement("li", { key: url },
                React.createElement(paramorph_1.Link, { to: url }, title)));
        }),
        ellipsis ? React.createElement("li", { key: 'ellipsis' }, "\u2026") : null));
}
exports.Branch = Branch;
