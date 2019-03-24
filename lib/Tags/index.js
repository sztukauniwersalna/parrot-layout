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
var s = require('./style');
var Tags = /** @class */ (function (_super) {
    __extends(Tags, _super);
    function Tags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tags.prototype.render = function () {
        var _a = this.context, page = _a.page, paramorph = _a.paramorph;
        if (page.tags.length === 0) {
            return null;
        }
        return (React.createElement("ul", { className: s.tags }, page.tags
            .map(function (title) { return paramorph.tags[title]; })
            .map(function (_a) {
            var title = _a.title, url = _a.url;
            return (React.createElement("li", { key: url },
                React.createElement(Button_1.default, { url: url }, title)));
        })));
    };
    return Tags;
}(paramorph_1.PureComponent));
exports.Tags = Tags;
exports.default = Tags;
