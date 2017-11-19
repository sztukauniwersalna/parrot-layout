import * as React from 'react';

import { Website, Page } from 'paramorph/models';
import { Feed } from 'parrot-layout';

export interface Props {
  website : Website;
  page : Page;
}

export function FeedPage({ website, page } : Props) {
  return (
    <Feed
      website={ website }
      page={ page }
      feed={
        Object.keys(website.pages)
        .map(url => website.pages[url])
        .sort((a, b) => a.date.getTime() - b.date.getTime())
      }
    />
  );
}

export default FeedPage;

