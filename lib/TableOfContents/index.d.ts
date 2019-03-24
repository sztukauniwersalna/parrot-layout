import * as React from 'react';
import { Page, PureComponent } from 'paramorph';
export interface Props {
    respectLimit?: boolean;
}
export declare class TableOfContents extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
export default TableOfContents;
export interface BranchProps {
    pages: Page[];
    shallow?: boolean;
    ellipsis?: boolean;
}
export declare function Branch({ pages, shallow, ellipsis }: BranchProps): React.ReactElement<BranchProps>;
