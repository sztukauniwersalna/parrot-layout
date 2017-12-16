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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var FacebookSdk = /** @class */function (_super) {
    __extends(FacebookSdk, _super);
    function FacebookSdk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FacebookSdk.prototype.render = function () {
        var _a = this.props,
            children = _a.children,
            url = _a.url;
        return React.createElement("div", { id: 'fb-root', "data-url": url }, children);
    };
    FacebookSdk.prototype.componentDidMount = function () {
        this.parseXfbml();
    };
    FacebookSdk.prototype.componentDidUpdate = function () {
        this.parseXfbml();
    };
    FacebookSdk.prototype.parseXfbml = function () {
        if (FB === undefined) {
            return;
        }
        FB.XFBML.parse();
    };
    return FacebookSdk;
}(React.Component);
exports.FacebookSdk = FacebookSdk;
exports.default = FacebookSdk;
function load(doc, id) {
    var head = doc.getElementsByTagName('head')[0];
    if (doc.getElementById(id) !== null) {
        return;
    }
    var js = doc.createElement('script');
    js.id = id;
    js.src = 'https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.11';
    head.appendChild(js);
}
if (document !== undefined) {
    load(document, 'facebook-jssdk');
}