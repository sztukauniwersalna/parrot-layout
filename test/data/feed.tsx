
import * as React from 'react';

import { PureComponent, Post } from 'paramorph';
import { Feed } from 'parrot-layout';

export class FeedPost extends PureComponent<{}, {}> {
  render() {
    const { paramorph } = this.context;

    return (
      <Feed
        posts={
          Object.keys(paramorph.posts)
          .map(url => paramorph.posts[url] as Post)
          .filter(post => post.output && post.feed)
          .sort((a, b) => a.compareTo(b))
        }
        preloadSize={ 2 }
        batchSize={ 1 }
      />
    );
  }
}

export default FeedPost;

