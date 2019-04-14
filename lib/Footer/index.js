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
var Button_1 = require("../Button");
var Icon_1 = require("../Icon");
var SocialButtons_1 = require("../SocialButtons");
var s = require('./style');
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        var _a = this.context, paramorph = _a.paramorph, page = _a.page;
        var index = paramorph.pages['/'];
        var sitemap = paramorph.pages['/sitemap/'];
        return (React.createElement("footer", { className: s.footer },
            React.createElement("div", { className: s.socialButtons },
                React.createElement(SocialButtons_1.default, null)),
            React.createElement("ul", { className: s.categories }, paramorph.config.menu.map(function (entry) { return (React.createElement("li", { key: entry.url },
                React.createElement(Button_1.default, { url: entry.url }, entry.title))); })),
            React.createElement("p", { className: s.bottomParagraph },
                React.createElement("span", { className: s.copyright }, "\u00A9 2017 Aleksandra Krawczyk"),
                React.createElement("span", { className: s.indexLink },
                    React.createElement(paramorph_1.Link, { to: index.url }, index.title)),
                React.createElement("span", { className: s.sitemapLink },
                    React.createElement(paramorph_1.Link, { to: sitemap.url }, sitemap.title))),
            React.createElement("div", { className: s.scrollUpButton },
                React.createElement(Button_1.default, { variant: 'action', color: 'gray', onClick: function () { return window.scrollTo(0, 0); } },
                    React.createElement(Icon_1.default, { name: 'arrow_upward' })))));
    };
    return Footer;
}(paramorph_1.PureComponent));
exports.Footer = Footer;
exports.default = Footer;
