import * as React from 'react';
export declare type Variant = 'flat' | 'raised' | 'action';
export declare type Color = 'green' | 'purple' | 'gray';
export declare type ClickListener = (event: React.MouseEvent<any>) => void;
export interface Props {
    url?: string;
    onClick?: ClickListener;
    variant?: Variant;
    color?: Color;
    children: React.ReactNode;
}
export declare function Button({ url, variant, color, onClick, children }: Props): JSX.Element;
export default Button;
