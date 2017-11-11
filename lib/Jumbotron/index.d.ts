/// <reference types="react" />
import { ReactNode } from 'react';
export declare type Align = 'center' | 'bottom';
export interface Props {
    src?: string;
    children?: ReactNode;
    fullscreen?: boolean;
    align?: Align;
}
export declare function Jumbotron({children, src, fullscreen, align}: Props): JSX.Element;
declare const _default: typeof Jumbotron;
export default _default;
