
import * as React from 'react';

import { RootProps } from 'paramorph/react/Root';
import DeferredScripts from 'paramorph/react/DeferredScripts';
import DeferredStyles from 'paramorph/react/DeferredStyles';

declare var GA_TRACKING_ID : string | undefined;

const GA_API_URL = 'https://www.google-analytics.com/analytics.js';
const GTAG_API_URL = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;

export function Root({ paramorph, post, localBundles, externalBundles, preload } : RootProps) {
  const gtagConfigScript = getGtagConfigBundle(localBundles.js);
  const deferredScripts = externalBundles.js.concat(removeGtagConfigBundle(localBundles.js));
  const deferredStyles = externalBundles.css;

  return (
    <html className='noscript'>
      <head>
        <meta httpEquiv='Content-Security-Policy' content="default-src 'self' * 'unsafe-inline'; script-src 'self' * 'unsafe-inline';" />
        <title>{ post.title } | { paramorph.config.title }</title>
        <meta name='keywords' content={ post.tags.join(', ') } />
        <meta name='description' content={ post.description } />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'/>

        <script async type="text/javascript" src={ GA_API_URL }></script>
        <script async type='text/javascript' src={ GTAG_API_URL } />
        <script type='text/javascript' src={ gtagConfigScript } />
        <FoucRemovalTrick/>
        <NoScriptTrick />

        <meta property='og:url' content={ `${paramorph.config.baseUrl}${post.url}` } />
        <meta property='og:title' content={ post.title } />
        {
          post.image !== null
          ? <meta property='og:image' content={ post.image } />
          : null
        }
        <meta property='og:description' content={ post.description } />
        <meta property='og:locale' content={ paramorph.config.locale } />
        <meta property='og:type' content={ post.url === '/' ? 'website' : 'article' } />

        { preload.map((url, i) => (
          <meta name='paramorph-preload' content={ url } key={ `preload-${i}` } />
        )) }
        { localBundles.css.map(url => (
          <link type='text/css' rel='stylesheet' href={ url } key={ url } />
        )) }
      </head>

      <body>
        <div id='root'>
          %%%BODY%%%
        </div>

        <DeferredScripts srcs={ deferredScripts } />
        <DeferredStyles hrefs={ deferredStyles } />
      </body>
    </html>
  );
}

export default Root;

function getGtagConfigBundle(bundles : string[]) {
  const found = bundles.filter(src => src.indexOf('gtagConfig') !== -1);
  if (found.length === 0) {
    throw new Error('gtagConfig script bundle is missing');
  }
  if (found.length !== 1) {
    throw new Error(`found more than one (${found.length}) gtagConfig script bundle`);
  }
  return found[0];
}

function removeGtagConfigBundle(bundles : string[]) {
  const gtagBundle = getGtagConfigBundle(bundles);
  const index = bundles.indexOf(gtagBundle);
  return bundles.slice(0, index).concat(bundles.slice(index + 1));
}

function FoucRemovalTrick() {
  return (
    <script type='text/javascript' dangerouslySetInnerHTML={
      { __html: 'document.addEventListener(\'DOMContentLoaded\', function() { '
          +'document.body.setAttribute(\'class\', \'ready\'); '
          +'});'
          +'document.write(\'<style type="text/css">'
          +'body { opacity: 0; transition: opacity 300ms ease-in; }'
          +'body.ready { opacity: 1; }'
          +'</style>\');' }
    } />
  );
}

function NoScriptTrick() {
  return (
    <script type='text/javascript' dangerouslySetInnerHTML={
      { __html: 'document.documentElement.classList.remove("noscript");' }
    } />
  );
}

