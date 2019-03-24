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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_disqus_comments_1 = require("react-disqus-comments");
var paramorph_1 = require("paramorph");
var TopBar_1 = require("../TopBar");
var Crumbs_1 = require("../Crumbs");
var Tags_1 = require("../Tags");
var Footer_1 = require("../Footer");
var Logo_1 = require("../Logo");
var Icon_1 = require("../Icon");
var SideMenu_1 = require("../SideMenu");
var Jumbotron_1 = require("../Jumbotron");
var FacebookLike_1 = require("../FacebookLike");
require("../polyfill/swipe-events");
var s = require('./style');
var ParrotLayout = /** @class */ (function (_super) {
    __extends(ParrotLayout, _super);
    function ParrotLayout(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            sideMenuClassName: s.closed,
        };
        _this.hideMenu = _this.hideMenu.bind(_this);
        _this.showMenu = _this.showMenu.bind(_this);
        _this.disableMenu = _this.disableMenu.bind(_this);
        return _this;
    }
    ParrotLayout.prototype.render = function () {
        var children = this.props.children;
        var _a = this.context, paramorph = _a.paramorph, page = _a.page;
        return (React.createElement("div", { id: s.all },
            React.createElement("div", { className: s.header },
                React.createElement(TopBar_1.default, { onMenuClick: this.showMenu })),
            React.createElement("div", { className: s.main },
                this.renderJumbotron(),
                React.createElement("main", null,
                    this.maybeRenderTitle(),
                    children,
                    React.createElement("div", { className: s.bottomLike },
                        React.createElement(FacebookLike_1.default, { url: "" + paramorph.config.baseUrl + page.url })))),
            this.maybeRenderComments(),
            this.renderFooter(),
            this.renderSideMenu()));
    };
    ParrotLayout.prototype.componentDidMount = function () {
        var _a = this.context, page = _a.page, paramorph = _a.paramorph;
        document.body.addEventListener('swipe-left', this.hideMenu);
        document.body.addEventListener('swipe-right', this.showMenu);
        window.scrollTo(0, 0);
        document.title = page.title + " | " + paramorph.config.title;
    };
    ParrotLayout.prototype.componentWillUnmount = function () {
        document.body.removeEventListener('swipe-left', this.hideMenu);
        document.body.removeEventListener('swipe-right', this.showMenu);
    };
    ParrotLayout.prototype.renderJumbotron = function () {
        var _a = this.context, page = _a.page, paramorph = _a.paramorph;
        if (page.url === '/') {
            return (React.createElement("div", { className: s.indexJumbo },
                React.createElement(Jumbotron_1.default, { fullscreen: true, align: 'center' },
                    React.createElement("h2", null, "uniwer\u2022sal\u2022ny; -na"),
                    React.createElement("ol", null,
                        React.createElement("li", null, "\u00ABobejmuj\u0105cy ca\u0142o\u015B\u0107, dotycz\u0105cy wszystkiego lub wszystkich\u00BB"),
                        React.createElement("li", null, "\u00ABmaj\u0105cy wszechstronne zastosowanie\u00BB"),
                        React.createElement("li", null, "\u00ABmaj\u0105cy r\u00F3\u017Cne umiej\u0119tno\u015Bci\u00BB")))));
        }
        var menuEntry = this.getMenuEntryForCurrentPage();
        if (menuEntry) {
            return (React.createElement("div", { className: s.menuEntryJumbo },
                React.createElement(Jumbotron_1.default, { fullscreen: true, align: 'bottom' },
                    React.createElement("h2", null,
                        React.createElement(Icon_1.default, { name: menuEntry.icon }),
                        React.createElement(paramorph_1.Link, { to: page.url }, page.title)),
                    React.createElement(Crumbs_1.default, { responsive: true }))));
        }
        if (page instanceof paramorph_1.Category) {
            return (React.createElement("div", { className: s.categoryJumbo },
                React.createElement(Jumbotron_1.default, { fullscreen: true, align: 'bottom' },
                    React.createElement("h2", null,
                        React.createElement(paramorph_1.Link, { to: page.url }, page.title)),
                    React.createElement(Crumbs_1.default, { responsive: true }))));
        }
        if (page instanceof paramorph_1.Tag) {
            return (React.createElement("div", { className: s.tagJumbo },
                React.createElement(Jumbotron_1.default, { fullscreen: true, align: 'bottom' },
                    React.createElement("h2", null,
                        React.createElement(paramorph_1.Link, { to: page.url }, page.originalTitle)),
                    React.createElement(Crumbs_1.default, { responsive: true }))));
        }
        return (React.createElement(Jumbotron_1.default, { align: 'bottom' },
            React.createElement(Crumbs_1.default, null)));
    };
    ParrotLayout.prototype.maybeRenderTitle = function () {
        var _a = this.context, page = _a.page, paramorph = _a.paramorph;
        if (page.url === '/' || page instanceof paramorph_1.Category || page instanceof paramorph_1.Tag) {
            return null;
        }
        return (React.createElement("div", { className: s.title },
            React.createElement("h1", null,
                React.createElement(paramorph_1.Link, { to: page.url }, page.title)),
            React.createElement(Tags_1.default, null),
            React.createElement("div", { className: s.topLike },
                React.createElement(FacebookLike_1.default, { url: "" + paramorph.config.baseUrl + page.url }))));
    };
    ParrotLayout.prototype.maybeRenderComments = function () {
        var _a = this.context, page = _a.page, paramorph = _a.paramorph;
        if (page.url === '/' || page instanceof paramorph_1.Category || page instanceof paramorph_1.Tag) {
            return null;
        }
        return (React.createElement("div", { className: s.comments },
            React.createElement(react_disqus_comments_1.default, { shortname: 'sztukauniwersalna', identifier: page.title, title: page.title, url: "http://sztukauniwersalna.pl" + page.url })));
    };
    ParrotLayout.prototype.renderFooter = function () {
        return (React.createElement("div", { className: s.footer + " contrast" },
            React.createElement(Footer_1.default, null),
            React.createElement("div", { className: s.bottom },
                React.createElement("div", { className: s.content },
                    React.createElement("div", { className: s.zblogowani },
                        React.createElement("a", { href: 'https://zblogowani.pl/', title: 'Sprawd\u017A serwis zBLOGowani.pl!' },
                            React.createElement("img", { src: '//zblogowani.pl/code/160x50/silver/341338/btn.png', alt: 'zBLOGowani.pl' }))),
                    React.createElement("div", { className: s.logo },
                        React.createElement(Logo_1.default, { variant: 'full' }))))));
    };
    ParrotLayout.prototype.renderSideMenu = function () {
        var _a = this.context, page = _a.page, paramorph = _a.paramorph;
        var sideMenuClassName = this.state.sideMenuClassName;
        return (React.createElement("div", { className: s.sideMenu + " " + sideMenuClassName, onClick: this.hideMenu },
            React.createElement(SideMenu_1.default, { visible: sideMenuClassName === s.visible, onCloseRequested: this.hideMenu, onClosed: this.disableMenu, currentUrl: page.url }, paramorph.config.menu.map(function (entry) { return (React.createElement(SideMenu_1.Item, { key: entry.url, url: entry.url, title: entry.title, icon: entry.icon })); }))));
    };
    ParrotLayout.prototype.getMenuEntryForCurrentPage = function () {
        var _a = this.context, page = _a.page, paramorph = _a.paramorph;
        var found = paramorph.config.menu.filter(function (entry) { return entry.url === page.url; });
        return found.length === 0 ? undefined : found[0];
    };
    ParrotLayout.prototype.showMenu = function () {
        this.setSideMenuClassName(s.visible);
    };
    ParrotLayout.prototype.hideMenu = function () {
        this.setSideMenuClassName('');
    };
    ParrotLayout.prototype.disableMenu = function () {
        this.setSideMenuClassName(s.closed);
    };
    ParrotLayout.prototype.setSideMenuClassName = function (sideMenuClassName) {
        this.setState(function (prev) { return (__assign({}, prev, { sideMenuClassName: sideMenuClassName })); });
    };
    return ParrotLayout;
}(paramorph_1.PureComponent));
exports.ParrotLayout = ParrotLayout;
exports.default = ParrotLayout;
