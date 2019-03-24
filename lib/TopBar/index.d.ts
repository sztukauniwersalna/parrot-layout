/// <reference types="react" />
import { PureComponent } from 'paramorph';
export interface Props {
    onMenuClick?: () => void;
}
export declare class TopBar extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
export default TopBar;
