/// <reference types="react" />
import { ReactElement } from 'react';
import { Page, Website } from 'paramorph/models';
export interface Props {
    website: Website;
    respectLimit?: boolean;
}
export declare const TableOfContents: ({website, respectLimit}: Props) => JSX.Element;
export interface BranchProps {
    pages: Page[];
    shallow?: boolean;
    ellipsis?: boolean;
}
export declare function Branch({pages, shallow, ellipsis}: BranchProps): ReactElement<BranchProps>;
export default TableOfContents;
