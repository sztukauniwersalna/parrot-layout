/// <reference types="react" />
import { Component } from 'react';
import { Page, Website } from 'paramorph/models';
export interface Props {
    website: Website;
    page: Page;
}
export interface State {
    sideMenuClassName: string;
}
export declare class ParrotLayout extends Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private showMenu();
    private hideMenu();
    private disableMenu();
    private setSideMenuClassName(sideMenuClassName);
}
declare const _default: typeof ParrotLayout;
export default _default;
