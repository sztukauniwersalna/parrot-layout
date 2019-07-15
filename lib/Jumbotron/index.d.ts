/// <reference types="react" />
import { PureComponent } from 'paramorph';
export declare type Align = 'center' | 'bottom';
export interface Props {
    fullscreen?: boolean;
    align?: Align;
}
export interface State {
    animation: boolean;
    imageLoaded: boolean;
}
export declare class Jumbotron extends PureComponent<Props, State> {
    private image;
    private loader;
    constructor(props: Props);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onImageLoaded;
    private onAnimationEnd;
}
export default Jumbotron;
