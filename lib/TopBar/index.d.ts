/// <reference types="react" />
import { Component } from 'react';
import { Page, Website } from 'paramorph/models';
import '../polyfill/swipe-events';
export interface Props {
    website: Website;
    page: Page;
    onMenuClick?: () => void;
}
export declare class TopBar extends Component<Props, {}> {
    render(): JSX.Element;
}
export default TopBar;
