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
var SocialButtons_1 = require("../SocialButtons");
var s = require('./style');
var Jumbotron = /** @class */ (function (_super) {
    __extends(Jumbotron, _super);
    function Jumbotron() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Jumbotron.prototype.render = function () {
        var _a = this.props, children = _a.children, _b = _a.fullscreen, fullscreen = _b === void 0 ? false : _b, _c = _a.align, align = _c === void 0 ? 'center' : _c;
        return (React.createElement("div", { className: s.container + " " + (fullscreen ? s.fullscreen : '') + " " + s[align] },
            React.createElement("div", { className: s.jumbo + " contrast compact non-responsive strong" },
                React.createElement("div", { className: s.text + " " + (align === 'center' ? 'centered' : '') },
                    React.createElement("div", { className: 'text' }, children)),
                React.createElement("div", { className: 'image' })),
            React.createElement("div", { className: s.footer },
                React.createElement("div", { className: s.social },
                    React.createElement(SocialButtons_1.default, null)))));
    };
    return Jumbotron;
}(paramorph_1.PureComponent));
exports.Jumbotron = Jumbotron;
exports.default = Jumbotron;
