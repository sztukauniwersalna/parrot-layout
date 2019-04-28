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
var s = require('./style');
var Crumbs = /** @class */ (function (_super) {
    __extends(Crumbs, _super);
    function Crumbs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Crumbs.prototype.render = function () {
        var _a = this.props.responsive, responsive = _a === void 0 ? false : _a;
        var _b = this.context, paramorph = _b.paramorph, post = _b.post;
        return (React.createElement("div", { className: s.crumbs + " " + (responsive ? s.responsive : '') }, paramorph.getCrumbs(post)
            .map(function (crumbs, key) { return (React.createElement("ul", { key: key }, crumbs.map(function (post) { return (React.createElement("li", { key: post.url },
            React.createElement(paramorph_1.Link, { to: post.url }, post.url === '/' ? paramorph.config.title : post.title))); }))); })));
    };
    return Crumbs;
}(paramorph_1.PureComponent));
exports.Crumbs = Crumbs;
exports.default = Crumbs;
