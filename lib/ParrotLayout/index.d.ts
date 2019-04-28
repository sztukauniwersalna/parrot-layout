/// <reference types="react" />
import { Post, PureComponent } from 'paramorph';
import '../polyfill/swipe-events';
export interface State {
    sideMenuClassName: string;
    currentPost: Post | null;
}
export declare class ParrotLayout extends PureComponent<{}, State> {
    constructor(props: {});
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: {}, prevState: State): void;
    private renderJumbotron;
    private maybeRenderTitle;
    private maybeRenderComments;
    private renderFooter;
    private renderSideMenu;
    private getMenuEntryForCurrentPost;
    private showMenu;
    private hideMenu;
    private disableMenu;
    private setSideMenuClassName;
}
export default ParrotLayout;
