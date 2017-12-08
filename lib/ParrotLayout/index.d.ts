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
    componentWillReceiveProps(newProps: Props): void;
    private showMenu();
    private hideMenu();
    private disableMenu();
    private setSideMenuClassName(sideMenuClassName);
}
export default ParrotLayout;
