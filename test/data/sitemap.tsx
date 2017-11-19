import * as React from 'react';

import { Website, Page } from 'paramorph/models';
import { TableOfContents } from 'parrot-layout';

export interface Props {
  website : Website;
  page : Page;
}

export function SitemapPage({ website, page } : Props) {
  return (
    <div className='compact'>
      <TableOfContents website={ website } />
    </div>
  );
}

export default SitemapPage;

