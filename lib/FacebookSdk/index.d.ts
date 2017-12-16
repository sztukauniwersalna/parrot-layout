/// <reference types="react" />
import * as React from 'react';
export interface Props {
    url: string;
    children: React.ReactNode;
}
export declare class FacebookSdk extends React.Component<Props, {}> {
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private parseXfbml();
}
export default FacebookSdk;
