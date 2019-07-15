"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var DeferredScripts_1 = require("paramorph/react/DeferredScripts");
var DeferredStyles_1 = require("paramorph/react/DeferredStyles");
var GA_API_URL = 'https://www.google-analytics.com/analytics.js';
var GTAG_API_URL = "https://www.googletagmanager.com/gtag/js?id=" + GA_TRACKING_ID;
function Root(_a) {
    var paramorph = _a.paramorph, post = _a.post, localBundles = _a.localBundles, externalBundles = _a.externalBundles, preload = _a.preload;
    var gtagConfigScript = getGtagConfigBundle(localBundles.js);
    var deferredScripts = externalBundles.js.concat(removeGtagConfigBundle(localBundles.js));
    var deferredStyles = externalBundles.css;
    return (React.createElement("html", { className: 'noscript' },
        React.createElement("head", null,
            React.createElement("title", null,
                post.title,
                " | ",
                paramorph.config.title),
            React.createElement("meta", { name: 'keywords', content: post.tags.join(', ') }),
            React.createElement("meta", { name: 'description', content: post.description }),
            React.createElement("meta", { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
            React.createElement("script", { async: true, type: "text/javascript", src: GA_API_URL }),
            React.createElement("script", { async: true, type: 'text/javascript', src: GTAG_API_URL }),
            React.createElement("script", { type: 'text/javascript', src: gtagConfigScript }),
            React.createElement(FoucRemovalTrick, null),
            React.createElement(NoScriptTrick, null),
            React.createElement("meta", { property: 'og:url', content: "" + paramorph.config.baseUrl + post.url }),
            React.createElement("meta", { property: 'og:title', content: post.title }),
            post.image !== null
                ? React.createElement("meta", { property: 'og:image', content: post.image })
                : null,
            React.createElement("meta", { property: 'og:description', content: post.description }),
            React.createElement("meta", { property: 'og:locale', content: paramorph.config.locale }),
            React.createElement("meta", { property: 'og:type', content: post.url === '/' ? 'website' : 'article' }),
            preload.map(function (url, i) { return (React.createElement("meta", { name: 'paramorph-preload', content: url, key: "preload-" + i })); }),
            localBundles.css.map(function (url) { return (React.createElement("link", { type: 'text/css', rel: 'stylesheet', href: url, key: url })); })),
        React.createElement("body", null,
            React.createElement("div", { id: 'root' }, "%%%BODY%%%"),
            React.createElement(DeferredScripts_1.default, { srcs: deferredScripts }),
            React.createElement(DeferredStyles_1.default, { hrefs: deferredStyles }))));
}
exports.Root = Root;
exports.default = Root;
function getGtagConfigBundle(bundles) {
    var found = bundles.filter(function (src) { return src.indexOf('gtagConfig') !== -1; });
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
function FoucRemovalTrick() {
    return (React.createElement("script", { type: 'text/javascript', dangerouslySetInnerHTML: { __html: 'document.addEventListener(\'DOMContentLoaded\', function() { '
                + 'document.body.setAttribute(\'class\', \'ready\'); '
                + '});'
                + 'document.write(\'<style type="text/css">'
                + 'body { opacity: 0; transition: opacity 300ms ease-in; }'
                + 'body.ready { opacity: 1; }'
                + '</style>\');' } }));
}
function NoScriptTrick() {
    return (React.createElement("script", { type: 'text/javascript', dangerouslySetInnerHTML: { __html: 'document.documentElement.classList.remove("noscript");' } }));
}
