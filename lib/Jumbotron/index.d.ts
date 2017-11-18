/// <reference types="react" />
import { ReactNode } from 'react';
export declare type Align = 'center' | 'bottom';
export interface Props {
    children?: ReactNode;
    fullscreen?: boolean;
    align?: Align;
}
export declare function Jumbotron({children, fullscreen, align}: Props): JSX.Element;
export default Jumbotron;
