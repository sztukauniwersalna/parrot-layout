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
declare const _default: typeof Footer;
export default _default;
