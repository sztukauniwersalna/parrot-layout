"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var DeferredScripts_1 = require("paramorph/components/DeferredScripts");
var DeferredStyles_1 = require("paramorph/components/DeferredStyles");
var GTAG_API_URL = "https://www.googletagmanager.com/gtag/js?id=" + GA_TRACKING_ID;
function Root(_a) {
    var website = _a.website,
        page = _a.page,
        localBundles = _a.localBundles,
        externalBundles = _a.externalBundles;
    var gtagConfigScript = getGtagConfigBundle(localBundles.js);
    var deferredScripts = externalBundles.js.concat(removeGtagConfigBundle(localBundles.js));
    var deferredStyles = externalBundles.css;
    return React.createElement("html", null, React.createElement("head", null, React.createElement("title", null, page.title, " | ", website.title), React.createElement("meta", { name: 'keywords', content: page.tags.join(', ') }), React.createElement("meta", { name: 'description', content: page.description }), React.createElement("meta", { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }), React.createElement("script", { async: true, type: 'text/javascript', src: GTAG_API_URL }), React.createElement("script", { type: 'text/javascript', src: gtagConfigScript }), React.createElement("style", { type: 'text/css', dangerouslySetInnerHTML: { __html: 'body { opacity: 0; transition: opacity 300ms ease-in; } ' + 'body.ready { opacity: 1; }' } }), React.createElement("script", { async: true, type: 'text/javascript', dangerouslySetInnerHTML: { __html: 'document.addEventListener(\'DOMContentLoaded\', function() { ' + 'document.body.setAttribute(\'class\', \'ready\'); ' + '});' } }), React.createElement("meta", { property: 'og:url', content: "" + website.baseUrl + page.url }), React.createElement("meta", { property: 'og:title', content: page.title }), page.image !== null ? React.createElement("meta", { property: 'og:image', content: page.image }) : null, React.createElement("meta", { property: 'og:description', content: page.description }), React.createElement("meta", { property: 'og:locale', content: website.locale }), React.createElement("meta", { property: 'og:type', content: page.url === '/' ? 'website' : 'article' }), localBundles.css.map(function (url) {
        return React.createElement("link", { type: 'text/css', rel: 'stylesheet', href: url, key: url });
    })), React.createElement("body", null, React.createElement("div", { id: 'root' }, "%%%BODY%%%"), React.createElement(DeferredScripts_1.default, { srcs: deferredScripts }), React.createElement(DeferredStyles_1.default, { hrefs: deferredStyles })));
}
exports.Root = Root;
exports.default = Root;
function getGtagConfigBundle(bundles) {
    var found = bundles.filter(function (src) {
        return src.indexOf('gtagConfig') !== -1;
    });
    if (found.length === 0) {
        throw new Error('gtagConfig script bundle is missing');
    }
    if (found.length !== 1) {
        throw new Error("found more than one (" + found.length + ") gtagConfig script bundle");
    }
    return found[0];
}
function removeGtagConfigBundle(bundles) {
    var gtagBundle = getGtagConfigBundle(bundles);
    var index = bundles.indexOf(gtagBundle);
    return bundles.slice(0, index).concat(bundles.slice(index + 1));
}