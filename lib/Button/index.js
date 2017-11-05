"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var withStyles_1 = require("isomorphic-style-loader/lib/withStyles");
var s = require('./Button.css');
function Button(_a) {
    var url = _a.url, _b = _a.variant, variant = _b === void 0 ? 'flat' : _b, _c = _a.color, color = _c === void 0 ? 'gray' : _c, onClick = _a.onClick, children = _a.children;
    var classNames = [s.button, s[variant]];
    if (variant !== 'flat') {
        classNames.push(s[color]);
    }
    if (url !== undefined) {
        if (url.match(/^[a-z0-9]+?:\/\/.*$/) !== null) {
            return renderExternalLink(classNames, url, onClick, children);
        }
        return renderLink(classNames, url, onClick, children);
    }
    if (onClick === undefined) {
        throw new Error('url or onClick prop must be set on Button element');
    }
    return renderButton(classNames, onClick, children);
}
exports.Button = Button;
function renderExternalLink(classNames, url, onClick, children) {
    return (React.createElement("span", { className: classNames.join(' ') },
        React.createElement("a", { href: url, onClick: onClick }, children)));
}
function renderLink(classNames, url, onClick, children) {
    return (React.createElement("span", { className: classNames.join(' ') },
        React.createElement(react_router_dom_1.Link, { to: url, onClick: onClick }, children)));
}
function renderButton(classNames, onClick, children) {
    return (React.createElement("span", { className: classNames.join(' ') },
        React.createElement("button", { onClick: onClick }, children)));
}
exports.default = withStyles_1.default(s)(Button);
//# sourceMappingURL=index.js.map