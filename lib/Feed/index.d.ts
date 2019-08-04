/// <reference types="react" />
import { Post, PureComponent } from 'paramorph';
export interface Props {
    posts: Post[];
    preloadSize?: number;
    batchSize?: number;
    respectLimit?: boolean;
}
export interface State {
    loading: number;
    loaded: number;
}
export declare class Feed extends PureComponent<Props, State> {
    private loadTrigger;
    constructor(props: Props);
    componentWillMount(): void;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private renderPreviousLink;
    private renderNextLink;
    private getContent;
    private onScroll;
    private onContent;
    private needsMoreContent;
    private isLoading;
    private maybeLoadInitialBatch;
    private loadNextBatch;
    private isAtEnd;
    private isOnFirstPage;
    private isOnLastPage;
    private getPageNumber;
    private getLastPageNumber;
    private getPageSize;
    private getPageOffset;
    private getNextUrl;
    private getPreviousUrl;
    private createUrl;
    private hasPathParam;
}
export default Feed;
