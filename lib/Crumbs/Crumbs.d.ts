/// <reference types="react" />
import { Page, Website } from 'paramorph/models';
export interface Props {
    website: Website;
    page: Page;
    responsive?: boolean;
}
export declare function Crumbs({website, page, responsive}: Props): JSX.Element;
declare const _default: typeof Crumbs;
export default _default;
