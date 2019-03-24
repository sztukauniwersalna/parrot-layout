/// <reference types="react" />
export declare type Variant = 'small' | 'inline' | 'full';
export interface Props {
    variant?: Variant;
}
export declare function Logo({ variant }: Props): JSX.Element;
export default Logo;
