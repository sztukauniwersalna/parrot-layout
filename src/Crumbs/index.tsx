import * as React from 'react';
import { Link } from 'react-router-dom';

import { Page, Website } from 'paramorph/models';

const s = require('./style');

export interface Props {
  website : Website;
  page : Page;
  responsive ?: boolean;
}

export function Crumbs({ website, page, responsive = false } : Props) {
  return (
    <div className={ `${s.crumbs} ${responsive ? s.responsive : ''}` }>
  { page.getCrumbs(website)
    .map((crumbs : Page[], key : number) => (
      <ul key={ key }>
      { crumbs.map((page : Page) => (
        <li key={ page.url }>
          <Link to={ page.url }>
            { page.url === '/' ? website.title : page.title }
          </Link>
        </li>
      )) }
      </ul>
    )) }
    </div>
  );
}

export default Crumbs;

