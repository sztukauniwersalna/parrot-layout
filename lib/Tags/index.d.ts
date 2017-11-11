/// <reference types="react" />
import { Page, Website } from 'paramorph/models';
export interface Props {
    website: Website;
    page: Page;
}
export declare function Tags({website, page}: Props): JSX.Element | null;
export default Tags;
