
import * as React from 'react';

import { PureComponent, Page } from 'paramorph';
import { Feed } from 'parrot-layout';

export class FeedPage extends PureComponent<{}, {}> {
  render() {
    const { paramorph } = this.context;

    return (
      <Feed
        pages={
          Object.keys(paramorph.pages)
          .map(url => paramorph.pages[url] as Page)
          .filter(page => page.output && page.feed)
          .sort((a, b) => a.compareTo(b))
        }
        preloadSize={ 2 }
        batchSize={ 1 }
      />
    );
  }
}

export default FeedPage;

