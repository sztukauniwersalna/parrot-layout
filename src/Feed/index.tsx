
import * as React from 'react';

import { Post, PureComponent } from 'paramorph';

import Tile from '../Tile';
import { Branch as TocBranch } from '../TableOfContents';
import Spinner from '../Spinner';
import Link from 'paramorph/react/Link';

const s = require('./style');

export interface Props {
  posts : Post[];
  preloadSize ?: number;
  batchSize ?: number;
  respectLimit ?: boolean;
};

export interface State {
  loading : number;
  loaded : number;
}

const DEFAULT_PRELOAD_SIZE = 20;
const DEFAULT_BATCH_SIZE = 5;
const PAGE_PATH_PARAM = 'pageNumber';

export class Feed extends PureComponent<Props, State> {
  private loadTrigger : HTMLDivElement;

  constructor(props : Props) {
    super(props);

    const preloadSize = Math.min(
      props.preloadSize || props.batchSize || DEFAULT_PRELOAD_SIZE,
      props.posts.length,
    );
    this.state = {
      loading: preloadSize,
      loaded: preloadSize,
    };

    this.onContent = this.onContent.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  render() {
    const { paramorph, post } = this.context;
    const { posts, respectLimit = false, ...props } = this.props;
    const { loading, loaded } = this.state;

    if (respectLimit) {
      return <TocBranch posts={ posts.slice(0, post.limit) } shallow { ...props } />;
    }
    const content = this.getContent();

    return (
      <div className={ loaded !== loading ? s.loading : '' }>
        { this.renderPreviousLink() }

        { content.map(({ post, Content }) => {
          return (
            <Tile key={ post.url } post={ post } Content={ Content } />
          );
        }) }
        <div
          className={ s.loadTrigger }
          ref={ e => this.loadTrigger = e as HTMLDivElement }
        >
          <Spinner />
        </div>

        { this.renderNextLink() }
      </div>
    );
  }

  componentDidMount() {
    const { paramorph, post } = this.context;
    const { respectLimit = false } = this.props;
    const { loaded } = this.state;

    if (!respectLimit) {
      paramorph.addContentListener(this.onContent);
    }
    window.addEventListener('scroll', this.onScroll);

    this.maybeLoadInitialBatch();

    if (!this.hasPathParam()) {
      console.error(`'${PAGE_PATH_PARAM}' path param not found in permalink of '${post.url}'`);
    }
  }
  componentWillUnmount() {
    const { paramorph } = this.context;
    const { respectLimit = false } = this.props;

    if (!respectLimit) {
      paramorph.removeContentListener(this.onContent);
    }
    window.removeEventListener('scroll', this.onScroll);
  }

  private renderPreviousLink() {
    if (this.isOnFirstPage() || !this.hasPathParam()) {
      return null;
    }
    return (
      <p><Link to={ this.getPreviousUrl() }>Previous Posts</Link></p>
    );
  }
  private renderNextLink() {
    if (this.isOnLastPage() || !this.hasPathParam()) {
      return null;
    }
    return (
      <p><Link to={ this.getNextUrl() }>Next Posts</Link></p>
    );
  }

  private getContent() {
    const { paramorph } = this.context;
    const { posts } = this.props;
    const { loading } = this.state;

    const content : {
      post : Post;
      Content: React.ComponentType<{}>;
    }[] = [];

    const pageOffset = this.getPageOffset();
    const pagePosts = posts.slice(pageOffset, pageOffset + loading);

    for (const post of pagePosts) {
      const Content = paramorph.content[post.url];
      if (Content === undefined) {
        break;
      }
      content.push({ post, Content });
    }
    return content;
  }

  private onScroll() {
    if (this.needsMoreContent() && !this.isAtEnd() && !this.isLoading()) {
      this.loadNextBatch();
    }
  }

  private onContent() {
    if (!this.isLoading()) {
      // not loaded by us
      return;
    }
    const { loaded } = this.state;
    const content = this.getContent();

    if (content.length > loaded) {
      this.setState(prev => ({ ...prev, loaded: content.length }));
    }
  }

  private needsMoreContent() {
    const { scrollY, innerHeight } = window;

    const offsetTop = this.getOffsetTop(this.loadTrigger);
    return scrollY + innerHeight >= offsetTop;
  }

  private isLoading() {
    const { loading, loaded } = this.state;

    return loading !== loaded;
  }

  private maybeLoadInitialBatch() {
    const { paramorph } = this.context;
    const { loaded } = this.state;
    const { posts } = this.props;

    const content = this.getContent();
    if (content.length === loaded) {
      this.onScroll();
      return;
    }
    const pageOffset = this.getPageOffset();
    const loading = Math.min(posts.length - pageOffset, this.state.loading);

    this.setState(
      prev => ({ ...prev, loading, loaded: content.length }),
      () => {
        const pageOffset = this.getPageOffset();

        const batch = posts.slice(pageOffset, pageOffset + loading);
        batch.map(post => paramorph.loadContent(post.url));
      },
    );
  }

  private loadNextBatch() {
    const { paramorph, post } = this.context;
    const { posts, batchSize = DEFAULT_BATCH_SIZE } = this.props;
    const { loading } = this.state;

    const nextLoading = Math.min(loading + batchSize, posts.length);

    this.setState(
      prev => ({ ...prev, loading: nextLoading }),
      () => {
        const pageOffset = this.getPageOffset();

        const batch = posts.slice(pageOffset + loading, pageOffset + nextLoading);
        batch.map(post => paramorph.loadContent(post.url));
      },
    );
  }

  private getOffsetTop(elem : HTMLElement) : number {
    const { offsetParent } = elem;

    const parentOffset = (offsetParent ? this.getOffsetTop(offsetParent as HTMLElement) : 0);
    return elem.offsetTop + parentOffset;
  }

  private isAtEnd() {
    const { loading } = this.state;
    const { posts } = this.props;

    return loading === posts.length;
  }

  private isOnFirstPage() {
    return this.getPageNumber() === 0;
  }
  private isOnLastPage() {
    const { posts } = this.props;
    const pageSize = this.getPageSize();

    const lastPageNumber = Math.round(posts.length / pageSize)
    return this.getPageNumber() === lastPageNumber;
  }

  private getPageNumber() {
    const { pathParams } = this.context;

    return Number.parseInt(pathParams.get('pageNumber') || '0');
  }
  private getPageSize() {
    const { preloadSize = DEFAULT_PRELOAD_SIZE } = this.props;

    return preloadSize;
  }
  private getPageOffset() {
    const pageSize = this.getPageSize();
    const pageNumber = this.getPageNumber();
    const offset = pageSize * pageNumber;

    return offset;
  }

  private getPreviousUrl() {
    const { pathParams, post } = this.context;

    const pageNumber = Number.parseInt(pathParams.get(PAGE_PATH_PARAM));
    return post.url.replace(`:${PAGE_PATH_PARAM}`, `${pageNumber - 1}`);
  }
  private getNextUrl() {
    const { pathParams, post } = this.context;

    const pageNumber = Number.parseInt(pathParams.get(PAGE_PATH_PARAM));
    return post.url.replace(`:${PAGE_PATH_PARAM}`, `${pageNumber + 1}`);
  }

  private hasPathParam() {
    const { post } = this.context;

    return post.url.match(new RegExp(`\/:${PAGE_PATH_PARAM}(\/|$)`));
  }
}

export default Feed;

