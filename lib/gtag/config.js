"use strict";
var _1 = require(".");
if (GA_TRACKING_ID) {
    _1.default('js', new Date());
    _1.default('config', GA_TRACKING_ID);
    window.addEventListener('load', sendPageviewOnLocationChange);
}
function sendPageviewOnLocationChange() {
    var page_path = location.pathname;
    global.setInterval(function () {
        if (page_path === location.pathname) {
            return;
        }
        page_path = location.pathname;
        _1.default('config', GA_TRACKING_ID, { page_path: page_path });
        console.log("page view: " + page_path);
    }, 300);
}
module.exports = {};
