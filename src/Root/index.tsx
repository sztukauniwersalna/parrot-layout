import * as React from 'react';

import { RootProps } from 'paramorph/components/Root';
import DeferredScript from 'paramorph/components/DeferredScript';
import DeferredLink from 'paramorph/components/DeferredLink';

declare var global : GaTrackingId;

interface GaTrackingId extends NodeJS.Global {
  GA_TRACKING_ID : string;
}

export function Root({ website, page, localBundles, externalBundles } : RootProps) {
  return (
    <html>
      <head>
        <title>{ page.title } | { website.title }</title>
        <meta name='path' content={ page.url }/>
        <meta name='keywords' content={ page.tags.join(', ') } />
        <meta name='description' content={ page.description } />
        <meta name='viewport' content='width=device-width; initial-scale=1.0'/>
        <script
          async
          type='text/javascript'
          src={ `https://www.googletagmanager.com/gtag/js?id=${global.GA_TRACKING_ID}` }
        />
        <script type='text/javascript' src={ getGtagConfigBundle(localBundles.js) } />
        { localBundles.css.map(url => (
          <link type='text/css' rel='stylesheet' href={ url } key={ url } />
        )) }
        <meta property='og:url' content={ `${website.baseUrl}${page.url}` } />
        <meta property='og:title' content={ page.title } />
        {
          page.image !== null
          ? <meta property='og:image' content={ page.image } />
          : null
        }
        <meta property='og:description' content={ page.description } />
        <meta property='og:locale' content={ website.locale } />
        <meta property='og:type' content={ page.url === '/' ? 'website' : 'article' } />
      </head>
      <body>
        <div id='root'>
          %%%BODY%%%
        </div>
        { externalBundles.js.map(url => (
          <DeferredScript src={ url } key={ url } />
        )) }
        { removeGtagConfigBundle(localBundles.js).map(url => (
          <DeferredScript src={ url } key={ url } />
        )) }
        { externalBundles.css.map(url => (
          <DeferredLink href={ url } rel='stylesheet' key={ url } />
        )) }
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

