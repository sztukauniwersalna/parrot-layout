"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var withStyles_1 = require("isomorphic-style-loader/lib/withStyles");
var Button_1 = require("../Button");
var s = require('./Tags.scss');
function Tags(_a) {
    var website = _a.website, page = _a.page;
    if (page.tags.length == 0) {
        return null;
    }
    return (React.createElement("ul", { className: s.tags }, page.tags
        .map(function (title) { return website.getTagOfTitle(title); })
        .map(function (_a) {
        var title = _a.title, url = _a.url;
        return (React.createElement("li", { key: url },
            React.createElement(Button_1.default, { url: url }, title)));
    })));
}
exports.Tags = Tags;
exports.default = withStyles_1.default(s)(Tags);
//# sourceMappingURL=Tags.js.map