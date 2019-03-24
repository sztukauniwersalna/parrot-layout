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
var Logo_1 = require("../Logo");
var s = require('./style');
var TopBar = /** @class */ (function (_super) {
    __extends(TopBar, _super);
    function TopBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopBar.prototype.render = function () {
        var onMenuClick = this.props.onMenuClick;
        var paramorph = this.context.paramorph;
        return (React.createElement("header", { className: s.topBar },
            React.createElement("div", { className: s.hamburger },
                React.createElement(Button_1.default, { onClick: onMenuClick },
                    React.createElement(Icon_1.default, { name: '\uE5D2' }))),
            React.createElement(paramorph_1.Link, { to: '/' },
                React.createElement("span", { className: s.title }, "Sztuka Uniwersalna"),
                React.createElement("div", { className: s.smallLogo },
                    React.createElement(Logo_1.default, { variant: 'small' })),
                React.createElement("div", { className: s.inlineLogo },
                    React.createElement(Logo_1.default, { variant: 'inline' }))),
            React.createElement("nav", { className: s.topMenu },
                React.createElement("ul", null, paramorph.config.menu.map(function (entry) { return (React.createElement("li", { key: entry.url },
                    React.createElement(Button_1.default, { url: entry.url }, entry.short))); })))));
    };
    return TopBar;
}(paramorph_1.PureComponent));
exports.TopBar = TopBar;
exports.default = TopBar;
