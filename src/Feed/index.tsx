
import * as React from 'react';

import { Page, PureComponent } from 'paramorph';

import Tile from '../Tile';
import { Branch as TocBranch } from '../TableOfContents';

export interface Props {
  pages : Page[];
  batchSize ?: number;
  respectLimit ?: boolean;
};

export interface State {
  loaded : number;
  loading : number;
}

const DEFAULT_BATCH_SIZE = 20;

export class Feed extends PureComponent<Props, State> {
  private loadTrigger : HTMLDivElement;

  constructor(props : Props) {
    super(props);

    const batchSize = Math.max(props.pages.length, props.batchSize || DEFAULT_BATCH_SIZE);

    this.state = {
      loading: batchSize,
      loaded: batchSize,
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentWillMount() {
    const { paramorph, page } = this.context;
    const { pages, respectLimit = false } = this.props;
    const { loading } = this.state;

    if (respectLimit) {
      // Everything contained in props.pages. No need to fetch.
      return;
    }
    const firstBatch = pages.slice(0, loading);

    paramorph
      .loadData(
        page.url,
        () => Promise.all(firstBatch.map(page => paramorph.loadPage(page.url))),
      )
      .then(() => {
        this.forceUpdate();
      })
    ;
  }

  render() {
    const { paramorph, page } = this.context;
    const { pages, respectLimit = false, ...props } = this.props;
    const { loading, loaded } = this.state;

    if (respectLimit) {
      return <TocBranch pages={ pages } shallow { ...props } />;
    }
    const data = paramorph.data[page.url] as React.ComponentType<{}>[] || [];

    if (data.length > pages.length) {
      throw new Error(`${page.url}: pages.length (${pages.length}) < data.length (${data.length})`);
    }
    return (
      <div>
        { data.map((Content, i) => {
          const page = pages[i];

          return (
            <Tile key={ page.url } page={ page } Content={ Content } />
          );
        }) }
        <div ref={ e => this.loadTrigger = e as HTMLDivElement }>
          { loading !== loaded ? 'Loading...' : null }
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);

    this.onScroll();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  private onScroll() {
    if (this.needsMoreContent() && !this.isAtEnd()) {
      this.loadNextBatch();
    }
  }

  private needsMoreContent() {
    const { scrollY } = window;

    const offsetTop = this.getOffsetTop(this.loadTrigger);
    return scrollY >= offsetTop;
  }

  private loadNextBatch() {
    const { paramorph, page } = this.context;
    const { pages, batchSize = DEFAULT_BATCH_SIZE } = this.props;
    const { loading, loaded } = this.state;

    if (loading !== loaded) {
      return;
    }

    const nextLoading = Math.min(loading + batchSize, pages.length);
    const batch = pages.slice(loaded, nextLoading);

    const previousData : React.ComponentType<{}>[] = paramorph.data[page.url] || [];
    const dataLoaded = paramorph.loadData<React.ComponentType<{}>[]>(
      page.url,
      () => {
        return Promise.all(batch.map(page => paramorph.loadPage(page.url)))
          .then(newData => previousData.concat(newData))
        ;
      },
    );

    this.setState(
      prev => ({ ...prev, loading: nextLoading }),
      () => {
        dataLoaded.then(() => {
          this.setState(
            prev => ({ ...prev, loaded: nextLoading }),
            this.onScroll,
          );
        });
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
    const { pages } = this.props;

    return loading === pages.length;
  }
}

export default Feed;

