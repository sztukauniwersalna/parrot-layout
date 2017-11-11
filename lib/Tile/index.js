"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var Tags_1 = require("../Tags");
var Button_1 = require("../Button");
var s = require('./style');
function Tile(_a) {
    var website = _a.website,
        page = _a.page;
    var Body = page.body;
    return React.createElement("article", null, React.createElement("h1", null, React.createElement(react_router_dom_1.Link, { to: page.url }, page.title)), React.createElement("div", { className: s.tags }, React.createElement(Tags_1.default, { website: website, page: page })), React.createElement(Body, { website: website, page: page, respectLimit: true }), React.createElement("div", { className: s.more }, React.createElement(Button_1.default, { url: page.url, variant: 'raised', color: 'purple' }, "Read More")));
}
exports.Tile = Tile;
exports.default = Tile;