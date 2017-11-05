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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var withStyles_1 = require("isomorphic-style-loader/lib/withStyles");
var Button_1 = require("../Button");
var Icon_1 = require("../Icon");
var s = require('./SideMenu.css');
function Item(props) {
    return null;
}
exports.Item = Item;
var SideMenu = /** @class */ (function (_super) {
    __extends(SideMenu, _super);
    function SideMenu(props) {
        var _this = _super.call(this, props) || this;
        var _a = props.visible, visible = _a === void 0 ? false : _a;
        _this.state = {
            visible: visible,
        };
        return _this;
    }
    SideMenu.prototype.componentWillReceiveProps = function (props) {
        this.setState(function (prevState) {
            var _a = props.visible, visible = _a === void 0 ? false : _a;
            return __assign({}, prevState, { visible: visible });
        });
    };
    SideMenu.prototype.render = function () {
        var _this = this;
        var classNames = [s.panel];
        if (this.state.visible) {
            classNames.push(s.visible);
        }
        var _a = this.props, onCloseRequested = _a.onCloseRequested, children = _a.children;
        return (React.createElement("aside", { className: classNames.join(' '), onTransitionEnd: function () { return _this.onTransitionEnd(); }, ref: function (elem) { return _this.element = elem; }, onClick: function (e) { return e.stopPropagation(); } },
            React.createElement("div", { className: s.header },
                React.createElement("div", { className: s.closeButton },
                    React.createElement(Button_1.default, { onClick: onCloseRequested },
                        React.createElement(Icon_1.default, { name: 'close' })))),
            React.createElement("ul", { className: s.content }, this.renderItems())));
    };
    SideMenu.prototype.renderItems = function () {
        var _this = this;
        var children = this.props.children;
        if (!children) {
            return null;
        }
        return [].concat(children)
            .map(function (item) { return _this.renderItem(item); });
    };
    SideMenu.prototype.renderItem = function (item) {
        var _a = this.props, currentUrl = _a.currentUrl, onCloseRequested = _a.onCloseRequested;
        if (currentUrl === item.props.url) {
            // just scroll to top and close the menu for already selected item
            return (React.createElement("li", { key: item.props.url, className: s.current },
                React.createElement("a", { onClick: function () { window.scrollTo(0, 0); onCloseRequested(); } },
                    React.createElement("span", { className: s.itemIcon },
                        React.createElement(Icon_1.default, { name: item.props.icon })),
                    React.createElement("span", { className: s.itemTitle }, item.props.title))));
        }
        return (React.createElement("li", { key: item.props.url },
            React.createElement(react_router_dom_1.Link, { to: item.props.url },
                React.createElement("span", { className: s.itemIcon },
                    React.createElement(Icon_1.default, { name: item.props.icon })),
                React.createElement("span", { className: s.itemTitle }, item.props.title))));
    };
    SideMenu.prototype.onTransitionEnd = function () {
        if (this.props.visible) {
            return;
        }
        this.props.onClosed();
    };
    return SideMenu;
}(react_1.Component));
exports.SideMenu = SideMenu;
exports.default = withStyles_1.default(s)(SideMenu);
//# sourceMappingURL=SideMenu.js.map