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
var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_disqus_comments_1 = require("react-disqus-comments");
var models_1 = require("paramorph/models");
var TopBar_1 = require("../TopBar");
var Crumbs_1 = require("../Crumbs");
var Tags_1 = require("../Tags");
var Footer_1 = require("../Footer");
var Logo_1 = require("../Logo");
var Icon_1 = require("../Icon");
var SideMenu_1 = require("../SideMenu");
var Jumbotron_1 = require("../Jumbotron");
var s = require('./style');
var image = require('./cover');
var ParrotLayout = /** @class */function (_super) {
    __extends(ParrotLayout, _super);
    function ParrotLayout(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            sideMenuClassName: s.closed
        };
        _this.hideMenu = _this.hideMenu.bind(_this);
        _this.showMenu = _this.showMenu.bind(_this);
        return _this;
    }
    ParrotLayout.prototype.componentDidMount = function () {
        document.body.addEventListener('swipe-left', this.hideMenu);
        document.body.addEventListener('swipe-right', this.showMenu);
        window.scrollTo(0, 0);
        document.title = this.props.page.title + " | SztukaUniwersalna.PL";
    };
    ParrotLayout.prototype.componentWillUnmount = function () {
        document.body.removeEventListener('swipe-left', this.hideMenu);
        document.body.removeEventListener('swipe-right', this.showMenu);
    };
    ParrotLayout.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            website = _a.website,
            page = _a.page;
        var Body = page.body;
        return React.createElement("div", { id: s.all }, React.createElement("div", { className: s.header }, React.createElement(TopBar_1.default, { website: website, page: page, onMenuClick: this.showMenu })), React.createElement("div", { className: s.main }, jumbotronFor(website, page), React.createElement("main", null, maybeRenderTitle(website, page), React.createElement(Body, { website: website, page: page }))), maybeRenderComments(page), React.createElement("div", { className: s.footer + " contrast" }, React.createElement(Footer_1.default, { website: website, page: page }), React.createElement("div", { className: s.bottom }, React.createElement("div", { className: s.logo }, React.createElement(Logo_1.default, { variant: 'full' })))), React.createElement("div", { className: s.sideMenu + " " + this.state.sideMenuClassName, onClick: this.hideMenu }, React.createElement(SideMenu_1.default, { visible: this.state.sideMenuClassName === s.visible, onCloseRequested: function onCloseRequested() {
                return _this.hideMenu();
            }, onClosed: function onClosed() {
                return _this.disableMenu();
            }, currentUrl: page.url }, website.menu.map(function (entry) {
            return React.createElement(SideMenu_1.Item, { key: entry.url, url: entry.url, title: entry.title, icon: entry.icon });
        }))));
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
        this.setState(function (prev) {
            return __assign({}, prev, { sideMenuClassName: sideMenuClassName });
        });
    };
    return ParrotLayout;
}(react_1.Component);
exports.ParrotLayout = ParrotLayout;
exports.default = ParrotLayout;
function jumbotronFor(website, page) {
    if (page.url === '/') {
        return React.createElement(Jumbotron_1.default, { fullscreen: true, align: 'center', src: image }, React.createElement("div", { className: s.indexJumbo }, React.createElement("h2", null, "uniwer\u2022sal\u2022ny; -na"), React.createElement("ol", null, React.createElement("li", null, "\xABobejmuj\u0105cy ca\u0142o\u015B\u0107, dotycz\u0105cy wszystkiego lub wszystkich\xBB"), React.createElement("li", null, "\xABmaj\u0105cy wszechstronne zastosowanie\xBB"), React.createElement("li", null, "\xABmaj\u0105cy r\xF3\u017Cne umiej\u0119tno\u015Bci\xBB"))));
    }
    if (website.menuContains(page)) {
        return React.createElement(Jumbotron_1.default, { fullscreen: true, align: 'bottom' }, React.createElement("div", { className: s.menuEntryJumbo }, React.createElement("h2", null, React.createElement(Icon_1.default, { name: website.getMenuEntry(page).icon }), React.createElement(react_router_dom_1.Link, { to: page.url }, page.title)), React.createElement(Crumbs_1.default, { responsive: true, website: website, page: page })));
    }
    if (page instanceof models_1.Category) {
        return React.createElement(Jumbotron_1.default, { fullscreen: true, align: 'bottom' }, React.createElement("div", { className: s.categoryJumbo }, React.createElement("h2", null, React.createElement(react_router_dom_1.Link, { to: page.url }, page.title)), React.createElement(Crumbs_1.default, { responsive: true, website: website, page: page })));
    }
    if (page instanceof models_1.Tag) {
        return React.createElement(Jumbotron_1.default, { fullscreen: true, align: 'bottom' }, React.createElement("div", { className: s.tagJumbo }, React.createElement("h2", null, React.createElement(react_router_dom_1.Link, { to: page.url }, page.originalTitle)), React.createElement(Crumbs_1.default, { responsive: true, website: website, page: page })));
    }
    return React.createElement(Jumbotron_1.default, { align: 'bottom' }, React.createElement(Crumbs_1.default, { website: website, page: page }));
}
function maybeRenderTitle(website, page) {
    if (page.url === '/' || page instanceof models_1.Category || page instanceof models_1.Tag) {
        return null;
    }
    return React.createElement("div", null, React.createElement("h1", null, React.createElement(react_router_dom_1.Link, { to: page.url }, page.title)), React.createElement(Tags_1.default, { website: website, page: page }));
}
function maybeRenderComments(page) {
    if (page.url === '/' || page instanceof models_1.Category || page instanceof models_1.Tag) {
        return null;
    }
    return React.createElement("div", { className: s.comments }, React.createElement(react_disqus_comments_1.default, { shortname: 'sztukauniwersalna', identifier: page.title, title: page.title, url: "http://sztukauniwersalna.pl" + page.url }));
}