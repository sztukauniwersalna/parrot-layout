/// <reference types="react" />
import { Component } from 'react';
import { Page, Website } from 'paramorph/models';
export interface Props {
    website: Website;
    page: Page;
}
export declare class Footer extends Component<Props, {}> {
    render(): JSX.Element;
}
export default Footer;
