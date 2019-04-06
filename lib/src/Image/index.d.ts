import * as React from 'react';
export interface Props {
    src: string;
    alt: string;
}
export declare type LoadingStep = 'static' | 'loading' | 'transition' | 'ready';
export interface State {
    step: LoadingStep;
}
export declare class Image extends React.Component<Props, State> {
    private container;
    constructor(props: Props);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private maybeStartLoading;
    private setStep;
}
export default Image;
