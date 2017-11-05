/// <reference types="react" />
import { Page, Website } from 'paramorph/models';
export interface Props {
    website: Website;
    page: Page;
    feed: Page[];
    respectLimit?: boolean;
}
export declare function Feed({website, page, feed, respectLimit, ...props}: Props): JSX.Element;
export default Feed;
