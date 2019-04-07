/// <reference types="react" />
import { Page, PureComponent } from 'paramorph';
export interface Props {
    pages: Page[];
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
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private getContent;
    private onScroll;
    private onContent;
    private needsMoreContent;
    private isLoading;
    private loadNextBatch;
    private getOffsetTop;
    private isAtEnd;
}
export default Feed;
export interface HashMap<T> {
    [_: string]: T;
}
