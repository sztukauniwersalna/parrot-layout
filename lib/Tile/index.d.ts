/// <reference types="react" />
import { Page, Website } from 'paramorph/models';
export interface Props {
    website: Website;
    page: Page;
}
export declare function Tile({website, page}: Props): JSX.Element;
export default Tile;
