import * as React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Page, Website } from 'paramorph/models';

import Tags from '../Tags';
import Button from '../Button';
import { Branch as TocBranch } from '../TableOfContents';

const s = require('./style');

export interface Props {
  website : Website;
  page : Page;
}

export function Tile({ website, page } : Props) {
  const Body = page.body;

  return (
    <article>
      <h1><Link to={ page.url }>{ page.title }</Link></h1>
      <div className={ s.tags }>
        <Tags website={ website } page={ page } />
      </div>

      <Body website={ website } page={ page } respectLimit={ true } />

      <div className={ s.more }>
        <Button url={ page.url } variant='raised' color='purple'>Read More</Button>
      </div>
    </article>
  );
}

export default Tile;

