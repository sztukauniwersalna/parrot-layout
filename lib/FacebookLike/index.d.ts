/// <reference types="react" />
import * as React from 'react';
export interface Props {
    url: string;
}
export interface State {
    ready: boolean;
}
export declare class FacebookLike extends React.Component<Props, State> {
    private iframe;
    constructor(props: Props);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private setReady();
}
export default FacebookLike;
