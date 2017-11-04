/// <reference types="react" />
import * as React from 'react';
import { ReactNode } from 'react';
export declare type Variant = 'flat' | 'raised' | 'action';
export declare type Color = 'green' | 'purple' | 'gray';
export declare type ClickListener = (event: React.MouseEvent<any>) => void;
export interface Props {
    url?: string;
    onClick?: ClickListener;
    variant?: Variant;
    color?: Color;
    children: ReactNode;
}
export declare function Button({url, variant, color, onClick, children}: Props): JSX.Element;
declare const _default: typeof Button;
export default _default;
