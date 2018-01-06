"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataLayer = window.dataLayer = window.dataLayer || [];
function gtag(action) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    dataLayer.push(arguments);
}
exports.gtag = gtag;
exports.default = gtag;
gtag('js', new Date());
gtag('config', GA_TRACKING_ID);
window.addEventListener('load', sendPageviewOnLocationChange);
function sendPageviewOnLocationChange() {
    var page_path = location.pathname;
    global.setInterval(function () {
        if (page_path === location.pathname) {
            return;
        }
        page_path = location.pathname;
        gtag('config', GA_TRACKING_ID, { page_path: page_path });
    }, 300);
}