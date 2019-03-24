/// <reference types="react" />
import { PureComponent } from 'paramorph';
export declare type Align = 'center' | 'bottom';
export interface Props {
    fullscreen?: boolean;
    align?: Align;
}
export declare class Jumbotron extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
export default Jumbotron;
