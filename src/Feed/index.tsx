
import * as React from 'react';

import { Post, PureComponent } from 'paramorph';

import Tile from '../Tile';
import { Branch as TocBranch } from '../TableOfContents';
import Spinner from '../Spinner';
import Button from '../Button';
import Icon from '../Icon';

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
const PAGE_PARAM_FORMAT = '(~\\d+~)';

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

  componentWillMount() {
    const { post, requestParameterizedRender } = this.context;

    if (!this.hasPathParam()) {
      console.error(`'${
        PAGE_PATH_PARAM}${PAGE_PARAM_FORMAT
      }' path param not found in permalink: '${
        post.permalink
      }'`);
      return;
    }
    // pages in url are numbered starting from 1
    const lastPageNumber = this.getLastPageNumber() + 1;

    // first page is already rendered
    for (let i = 2; i <= lastPageNumber + 1; ++i) {
      requestParameterizedRender({ [PAGE_PATH_PARAM]: `~${i}~` });
    }
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
      <p className={ s.staticLink }>
        <Button variant='flat' color='gray' url={ this.getPreviousUrl() }>
          <Icon name='arrow_back' /> Previous Posts
        </Button>
      </p>
    );
  }
  private renderNextLink() {
    if (this.isOnLastPage() || !this.hasPathParam()) {
      return null;
    }
    return (
      <p className={ s.staticLink }>
        <Button variant='flat' color='gray' url={ this.getNextUrl() }>
          Next Posts <Icon name='arrow_forward' />
        </Button>
      </p>
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
    return this.getPageNumber() === this.getLastPageNumber();
  }

  private getPageNumber() {
    const { pathParams } = this.context;

    // pages in url are numbered starting from 1
    const pageNumber = pathParams.get('pageNumber') || '~1~';
    return Number.parseInt(pageNumber.replace(/[^\d]+/g, '')) - 1;
  }
  private getLastPageNumber() {
    const { posts } = this.props;
    const pageSize = this.getPageSize();

    return Math.round(posts.length / pageSize)
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

    // pages in url are numbered starting from 1
    const pageNumber = this.getPageNumber() + 1;

    if (pageNumber === 2) {
      return post.url;
    } else {
      return this.createUrl(pageNumber - 1);
    }
  }

  private getNextUrl() {
    const { pathParams } = this.context;

    // pages in url are numbered starting from 1
    const pageNumber = this.getPageNumber() + 1;
    return this.createUrl(pageNumber + 1);
  }

  private createUrl(pageNumber : number) {
    const { post } = this.context;

    return post.permalink.replace(
      `:${PAGE_PATH_PARAM}${PAGE_PARAM_FORMAT}?`,
      `~${pageNumber - 1}~`,
    );
  }

  private hasPathParam() {
    const { post } = this.context;

    return post.permalink.indexOf(`:${PAGE_PATH_PARAM}${PAGE_PARAM_FORMAT}?/`) !== -1;
  }
}

export default Feed;

