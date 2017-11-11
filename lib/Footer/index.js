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
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Button_1 = require("../Button");
var Icon_1 = require("../Icon");
var s = require('./style');
var Footer = /** @class */function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        var _a = this.props,
            website = _a.website,
            page = _a.page;
        var index = website.getPageOfUrl('/');
        var sitemap = website.getPageOfUrl('/sitemap');
        return React.createElement("footer", { className: s.footer }, React.createElement("ul", { className: s.socialButtons }, React.createElement("li", { key: 'facebook' }, React.createElement(Button_1.default, { variant: 'action', color: 'green', url: 'https://www.facebook.com/sztukauniwersalna/' }, React.createElement(Icon_1.default, { name: 'facebook' }))), React.createElement("li", { key: 'instagram' }, React.createElement(Button_1.default, { variant: 'action', color: 'green', url: 'https://www.instagram.com/sztuka_uniwersalna/' }, React.createElement(Icon_1.default, { name: 'instagram' })))), React.createElement("ul", { className: s.categories }, website.menu.map(function (entry) {
            return React.createElement("li", { key: entry.url }, React.createElement(Button_1.default, { url: entry.url }, entry.title));
        })), React.createElement("p", { className: s.bottomParagraph }, React.createElement("span", { className: s.copyright }, "\xA9 2017 Aleksandra Krawczyk"), React.createElement("span", { className: s.indexLink }, React.createElement(react_router_dom_1.Link, { to: index.url }, index.title)), React.createElement("span", { className: s.sitemapLink }, React.createElement(react_router_dom_1.Link, { to: sitemap.url }, sitemap.title))), React.createElement("div", { className: s.scrollUpButton }, React.createElement(Button_1.default, { variant: 'action', color: 'gray', onClick: function onClick() {
                return window.scrollTo(0, 0);
            } }, React.createElement(Icon_1.default, { name: 'arrow_upward' }))));
    };
    return Footer;
}(react_1.Component);
exports.Footer = Footer;
exports.default = Footer;