/// <reference types="react" />
import { PureComponent } from 'paramorph';
import '../polyfill/swipe-events';
export interface State {
    sideMenuClassName: string;
}
export declare class ParrotLayout extends PureComponent<{}, State> {
    constructor(props: {});
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private renderJumbotron;
    private maybeRenderTitle;
    private maybeRenderComments;
    private renderFooter;
    private renderSideMenu;
    private getMenuEntryForCurrentPage;
    private showMenu;
    private hideMenu;
    private disableMenu;
    private setSideMenuClassName;
}
export default ParrotLayout;
