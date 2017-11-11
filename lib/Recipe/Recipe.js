"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var withStyles_1 = require("isomorphic-style-loader/lib/withStyles");
var Icon_1 = require("../Icon");
var s = require('./style');
function Ingredient(_a) {
    var title = _a.title, quantity = _a.quantity;
    return (React.createElement("li", null,
        title,
        quantity
            ? React.createElement("span", { className: s.quantity }, " (" + quantity + ")")
            : null));
}
exports.Ingredient = Ingredient;
function Method(_a) {
    var children = _a.children;
    return (React.createElement("p", null, children));
}
exports.Method = Method;
function Recipe(_a) {
    var title = _a.title, photo = _a.photo, altText = _a.altText, time = _a.time, level = _a.level, mealFor = _a.mealFor, children = _a.children;
    var childs = [].concat(children);
    var ingredients = childs.filter(function (c) { return c.type === Ingredient; });
    var methods = childs.filter(function (c) { return c.type === Method; });
    return (React.createElement("div", { className: s.recipe + " contrast" },
        React.createElement("div", { className: s.header },
            React.createElement("h2", null, title),
            React.createElement("ul", null,
                React.createElement("li", { key: '1', title: 'posiłek dla' },
                    React.createElement(Icon_1.default, { name: 'child_care' }),
                    mealFor),
                React.createElement("li", { key: '2', title: 'poziom trudności' },
                    React.createElement(Icon_1.default, { name: 'whatshot' }),
                    level),
                React.createElement("li", { key: '3', title: 'czas przygotowania' },
                    React.createElement(Icon_1.default, { name: 'access_time' }),
                    time))),
        React.createElement("img", { src: photo, alt: altText }),
        React.createElement("div", { className: s.details },
            React.createElement("div", { className: s.ingredients },
                React.createElement("h3", null, "Sk\u0142adniki"),
                React.createElement("div", { className: 'compact' },
                    React.createElement("ol", null, ingredients))),
            React.createElement("div", { className: s.method },
                React.createElement("h3", null, "Spos\u00F3b Przygotowania"),
                methods))));
}
exports.Recipe = Recipe;
exports.default = withStyles_1.default(s)(Recipe);
