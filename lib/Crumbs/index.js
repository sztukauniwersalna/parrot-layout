"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var withStyles_1 = require("isomorphic-style-loader/lib/withStyles");
var s = require('./Crumbs.scss');
function Crumbs(_a) {
    var website = _a.website, page = _a.page, _b = _a.responsive, responsive = _b === void 0 ? false : _b;
    return (React.createElement("div", { className: s.crumbs + " " + (responsive ? s.responsive : '') }, page.getCrumbs(website)
        .map(function (crumbs, key) { return (React.createElement("ul", { key: key }, crumbs.map(function (page) { return (React.createElement("li", { key: page.url },
        React.createElement(react_router_dom_1.Link, { to: page.url }, page.title))); }))); })));
}
exports.Crumbs = Crumbs;
exports.default = withStyles_1.default(s)(Crumbs);
//# sourceMappingURL=index.js.map