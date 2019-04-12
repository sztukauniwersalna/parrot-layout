"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var s = require('./style');
function Spinner() {
    return (React.createElement("span", { className: s.spinner },
        React.createElement("div", null,
            React.createElement("i", null),
            React.createElement("i", null),
            React.createElement("i", null),
            React.createElement("i", null))));
}
exports.Spinner = Spinner;
exports.default = Spinner;
