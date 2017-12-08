"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Button_1 = require("../Button");
var Icon_1 = require("../Icon");
var s = require('./style');
function SocialButtons() {
    return React.createElement("ul", { className: s.socialButtons }, React.createElement("li", { key: 'facebook' }, React.createElement(Button_1.default, { variant: 'action', color: 'green', url: 'https://www.facebook.com/sztukauniwersalna/' }, React.createElement(Icon_1.default, { name: 'facebook' }))), React.createElement("li", { key: 'instagram' }, React.createElement(Button_1.default, { variant: 'action', color: 'green', url: 'https://www.instagram.com/sztuka_uniwersalna/' }, React.createElement(Icon_1.default, { name: 'instagram' }))));
}
exports.SocialButtons = SocialButtons;
exports.default = SocialButtons;