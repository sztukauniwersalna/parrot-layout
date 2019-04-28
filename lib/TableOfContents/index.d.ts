import * as React from 'react';
import { Post, PureComponent } from 'paramorph';
export interface Props {
    respectLimit?: boolean;
}
export declare class TableOfContents extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
export default TableOfContents;
export interface BranchProps {
    posts: Post[];
    shallow?: boolean;
    ellipsis?: boolean;
}
export declare function Branch({ posts, shallow, ellipsis }: BranchProps): React.ReactElement<BranchProps>;
