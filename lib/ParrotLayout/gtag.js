"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataLayer = [];
self.dataLayer = dataLayer;
function gtag(action) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    dataLayer.push(arguments);
}
exports.gtag = gtag;
exports.default = gtag;