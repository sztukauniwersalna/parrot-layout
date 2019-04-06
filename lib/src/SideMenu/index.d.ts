import * as React from 'react';
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
    children?: React.ReactElement<ItemProps>[];
    currentUrl: string;
}
export interface State {
    visible: boolean;
}
export declare class SideMenu extends React.Component<Props, State> {
    private element;
    constructor(props: Props);
    componentWillReceiveProps(props: Props): void;
    render(): JSX.Element;
    private renderItems;
    private renderItem;
    private onTransitionEnd;
}
export default SideMenu;
