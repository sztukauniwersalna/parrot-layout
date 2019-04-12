
import * as React from 'react';

import { Page, PureComponent } from 'paramorph';

import Tile from '../Tile';
import { Branch as TocBranch } from '../TableOfContents';
import Spinner from '../Spinner';

export interface Props {
  pages : Page[];
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

const s = require('./style');

export class Feed extends PureComponent<Props, State> {
  private loadTrigger : HTMLDivElement;

  constructor(props : Props) {
    super(props);

    const preloadSize = Math.min(
      props.preloadSize || props.batchSize || DEFAULT_PRELOAD_SIZE,
      props.pages.length,
    );
    this.state = {
      loading: preloadSize,
      loaded: preloadSize,
    };

    this.onContent = this.onContent.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  render() {
    const { paramorph, page } = this.context;
    const { pages, respectLimit = false, ...props } = this.props;
    const { loading, loaded } = this.state;

    if (respectLimit) {
      return <TocBranch pages={ pages.slice(0, page.limit) } shallow { ...props } />;
    }
    const content = this.getContent();

    return (
      <div className={ loaded !== loading ? s.loading : '' }>
        { content.map((Content, i) => {
          const page = pages[i];

          return (
            <Tile key={ page.url } page={ page } Content={ Content } />
          );
        }) }
        <div
          className={ s.loadTrigger }
          ref={ e => this.loadTrigger = e as HTMLDivElement }
        >
          <Spinner />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { paramorph } = this.context;
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

  private getContent() : React.ComponentType<{}>[] {
    const { paramorph } = this.context;
    const { pages } = this.props;
    const { loading } = this.state;

    const content : React.ComponentType<{}>[] = [];
    for (const page of pages) {
      const pageContent = paramorph.content[page.url];
      if (pageContent === undefined) {
        break;
      }
      content.push(pageContent);

      if (content.length === loading) {
        break;
      }
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
      this.setState(prev => ({ loaded: content.length }));
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
    const { loading, loaded } = this.state;
    const { pages } = this.props;

    const content = this.getContent();
    if (content.length === loaded) {
      this.onScroll();
      return;
    }
    this.setState(
      prev => ({ loaded: content.length }),
      () => {
        const batch = pages.slice(0, loading);
        batch.map(page => paramorph.loadContent(page.url));
      },
    );
  }

  private loadNextBatch() {
    const { paramorph, page } = this.context;
    const { pages, batchSize = DEFAULT_BATCH_SIZE } = this.props;
    const { loading } = this.state;

    const nextLoading = Math.min(loading + batchSize, pages.length);
    const batch = pages.slice(loading, nextLoading);

    batch.map(page => paramorph.loadContent(page.url));
    this.setState(prev => ({ ...prev, loading: nextLoading }));
  }

  private getOffsetTop(elem : HTMLElement) : number {
    const { offsetParent } = elem;

    const parentOffset = (offsetParent ? this.getOffsetTop(offsetParent as HTMLElement) : 0);
    return elem.offsetTop + parentOffset;
  }

  private isAtEnd() {
    const { loading } = this.state;
    const { pages } = this.props;

    return loading === pages.length;
  }
}

export default Feed;

export interface HashMap<T> {
  [_ : string] : T;
}

