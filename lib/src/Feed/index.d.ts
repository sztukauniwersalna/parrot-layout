/// <reference types="react" />
import { Page, PureComponent } from 'paramorph';
export interface Props {
    pages: Page[];
    batchSize?: number;
    respectLimit?: boolean;
}
export interface State {
    loaded: number;
    loading: number;
}
export declare class Feed extends PureComponent<Props, State> {
    private loadTrigger;
    constructor(props: Props);
    componentWillMount(): void;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onScroll;
    private needsMoreContent;
    private loadNextBatch;
    private getOffsetTop;
    private isAtEnd;
}
export default Feed;
