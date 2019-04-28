"use strict";
var _1 = require(".");
if (GA_TRACKING_ID) {
    _1.default('js', new Date());
    _1.default('config', GA_TRACKING_ID);
    window.addEventListener('load', sendPostviewOnLocationChange);
}
function sendPostviewOnLocationChange() {
    var post_path = location.pathname;
    global.setInterval(function () {
        if (post_path === location.pathname) {
            return;
        }
        post_path = location.pathname;
        _1.default('config', GA_TRACKING_ID, { post_path: post_path });
        console.log("post view: " + post_path);
    }, 300);
}
module.exports = {};
