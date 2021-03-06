"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var s = require('./style');
function Icon(_a) {
    var name = _a.name;
    if (name === undefined) {
        return null;
    }
    switch (name) {
        case 'facebook': return renderFacebookIcon();
        case 'instagram': return renderInstagramIcon();
        case 'youtube': return renderYoutubeIcon();
        default: return renderMaterialIcon(name);
    }
}
exports.Icon = Icon;
exports.default = Icon;
function renderMaterialIcon(name) {
    return (React.createElement("i", { className: 'material-icons' }, name));
}
function renderFacebookIcon() {
    return (React.createElement("svg", { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', className: s.icon },
        React.createElement("g", null,
            React.createElement("path", { d: 'M20.85,0H3.17C1.08,0,0,1.09,0,3.2V20.86A2.82,2.82,0,0,0,3.1,24h8.74V12H9.61V8.85h2.23V7.72a7.74,7.74,0,0,1,.4-2.85,3.2,3.2,0,0,1,1.51-1.53,5.64,5.64,0,0,1,2.76-.59,11.23,11.23,0,0,1,3.35.51L19.31,6a8.2,8.2,0,0,0-1.84-.23,1.59,1.59,0,0,0-1.24.42,2.26,2.26,0,0,0-.38,1.55V8.85h3V12h-3V24h5A2.84,2.84,0,0,0,24,20.82V3.15A2.82,2.82,0,0,0,20.85,0Z' }))));
}
function renderInstagramIcon() {
    return (React.createElement("svg", { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', className: s.icon },
        React.createElement("g", null,
            React.createElement("path", { d: 'M20.85,0H3.17C1.08,0,0,1.09,0,3.2V20.86A2.82,2.82,0,0,0,3.1,24H20.85A2.84,2.84,0,0,0,24,20.82V3.15A2.82,2.82,0,0,0,20.85,0Zm-2,2.7c2.37,0,2.37,0,2.37,2.4s0,2.33-2.33,2.33-2.37,0-2.37-2.38S16.57,2.7,18.9,2.7ZM12,7.34a4.65,4.65,0,1,1-.07,9.3,4.72,4.72,0,0,1-4.6-4.71A4.74,4.74,0,0,1,12,7.34Zm9.26,12.5c0,1.12-.32,1.42-1.43,1.42H4.15c-1.1,0-1.42-.3-1.42-1.42,0-2.91,0-5.85,0-8.76,0-.83.23-1,1-1,1.09.1,1.11,0,1,1.1a7.41,7.41,0,0,0,5.81,8,7.47,7.47,0,0,0,8.57-5.15,7.39,7.39,0,0,0,.16-3.44c-.09-.41,0-.5.39-.5,1.66-.12,1.66-.16,1.66,1.55Z' }))));
}
function renderYoutubeIcon() {
    return (React.createElement("svg", { xmlns: 'http://www.w3.org/2000/svg', viewBox: "0 0 576 512", className: s.icon + " " + s.yt },
        React.createElement("g", null,
            React.createElement("path", { d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" }))));
}
