import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { Page, Layout, MenuEntry, Website } from 'paramorph/models';
import IsomorphicStyleContext from './IsomorphicStyleContext';

import ParrotLayout from '../src/ParrotLayout';

const mainBody = () => (
  <div>
    <h1><Link to='/'>Parrot Layout</Link></h1>
    <p>
      Lorem ipsum dolor sit amet.
    </p>
  </div>
);

const sitemapBody = () => (
  <div>
    <ul>
      <li><Link to='/'>Parrot Layout</Link></li>
      <li><Link to='/sitemap'>Sitemap</Link></li>
    </ul>
  </div>
);

const website = new Website();

const layout = new Layout('parrot', ParrotLayout);
website.addLayout(layout);

const mainPage = new Page(
  'Parrot',
  'Layout',
  '/',
  layout,
  mainBody,
  true,
  new Date(),
  [],
  [],
  true,
);
website.addPage(mainPage);

const sitemapPage = new Page(
  'Sitemap',
  'Sitemap',
  '/sitemap',
  layout,
  sitemapBody,
  true,
  new Date(),
  [],
  [],
  true,
);
website.addPage(sitemapPage);

website.menu = [
  new MenuEntry('Main Page', 'Home', '/'),
  new MenuEntry('Sitemap', 'Sitemap', '/sitemap'),
];

window.addEventListener('load', () => {
  render(
    (
      <IsomorphicStyleContext>
        <BrowserRouter>
          <Switch>
            <Route path='/sitemap' component={ component(sitemapPage) } />
            <Route path='/' component={ component(mainPage) } />
          </Switch>
        </BrowserRouter>
      </IsomorphicStyleContext>
    ),
    document.getElementById("root"),
  );
});

function component(page : Page) {
  return () => React.createElement(ParrotLayout, { website, page });
}

