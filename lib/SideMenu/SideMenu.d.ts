/// <reference types="react" />
import { Component, ReactElement } from 'react';
export interface ItemProps {
    icon?: string;
    title: string;
    url: string;
}
export declare function Item(props: ItemProps): null;
export interface Props {
    visible?: boolean;
    onCloseRequested: () => void;
    onClosed: () => void;
    children?: ReactElement<ItemProps>[];
    currentUrl: string;
}
export interface State {
    visible: boolean;
}
export declare class SideMenu extends Component<Props, State> {
    private element;
    constructor(props: Props);
    componentWillReceiveProps(props: Props): void;
    render(): JSX.Element;
    private renderItems();
    private renderItem(item);
    private onTransitionEnd();
}
declare const _default: typeof SideMenu;
export default _default;
