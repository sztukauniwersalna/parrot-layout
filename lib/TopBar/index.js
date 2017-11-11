"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var withStyles_1 = require("isomorphic-style-loader/lib/withStyles");
var Button_1 = require("../Button");
var Icon_1 = require("../Icon");
var Logo_1 = require("../Logo");
require("../polyfill/swipe-events");
var s = require('./style');
var TopBar = /** @class */ (function (_super) {
    __extends(TopBar, _super);
    function TopBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopBar.prototype.render = function () {
        var _a = this.props, website = _a.website, page = _a.page, onMenuClick = _a.onMenuClick;
        return (React.createElement("header", { className: s.topBar },
            React.createElement("div", { className: s.hamburger },
                React.createElement(Button_1.default, { onClick: onMenuClick },
                    React.createElement(Icon_1.default, { name: "\uE5D2" }))),
            React.createElement(react_router_dom_1.Link, { to: '/' },
                React.createElement("span", { className: s.title }, "Sztuka Uniwersalna"),
                React.createElement("div", { className: s.smallLogo },
                    React.createElement(Logo_1.default, { variant: 'small' })),
                React.createElement("div", { className: s.inlineLogo },
                    React.createElement(Logo_1.default, { variant: 'inline' }))),
            React.createElement("nav", { className: s.topMenu },
                React.createElement("ul", null, website.menu.map(function (entry) { return (React.createElement("li", { key: entry.url },
                    React.createElement(Button_1.default, { url: entry.url }, entry.short))); })))));
    };
    return TopBar;
}(react_1.Component));
exports.TopBar = TopBar;
exports.default = withStyles_1.default(s)(TopBar);
