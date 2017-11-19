import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Page } from 'paramorph/models';

import website from './data';

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {
          Object.keys(website.pages)
            .filter(url => url !== '/')
            .map(url => website.pages[url])
            .map(page => createRoute(page, true))
            .concat([ createRoute(website.getPageOfUrl('/'), false) ])
        }
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

function createRoute(page : Page, exact : boolean) {
  const Layout = page.layout.component;
  const component : React.StatelessComponent<{}> = () => (
    <Layout website={ website } page={ page } />
  );
  return (
    <Route key={page.url} path={ page.url } component={ component } exact />
  );
}

