
import * as React from 'react';

import { Link } from 'paramorph';

import Button from '../Button';
import Icon from '../Icon';

const s = require('./style');

export interface ItemProps {
  icon ?: string;
  title : string;
  url : string;
}

export function Item(props : ItemProps) {
  return null;
}

export interface Props {
  visible ?: boolean;
  onCloseRequested : () => void;
  onClosed : () => void;
  children ?: React.ReactElement<ItemProps>[];
  currentUrl : string;
}
export interface State {
  visible : boolean;
}

export class SideMenu extends React.Component<Props, State> {
  private element : HTMLDivElement;

  constructor(props : Props) {
    super(props);

    const { visible = false } = props;

    this.state = {
      visible,
    };
  }

  componentWillReceiveProps(props : Props) {
    this.setState(prevState => {
      const { visible = false } = props;
      return { ...prevState, visible };
    });
  }

  render() {
    const classNames = [ s.panel ];
    if (this.state.visible) {
      classNames.push(s.visible);
    }

    const { onCloseRequested, children } = this.props;

    return (
      <aside
        className={ classNames.join(' ') }
        onTransitionEnd={ () => this.onTransitionEnd() }
        ref={ elem => this.element = elem as HTMLDivElement }
        onClick={ e => e.stopPropagation() }
      >
        <div className={ s.header }>
          <div className={ s.closeButton }>
            <Button onClick={ onCloseRequested }>
              <Icon name='close' />
            </Button>
          </div>
        </div>
        <ul className={ s.content }>
          { this.renderItems() }
        </ul>
      </aside>
    );
  }

  private renderItems() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return ([] as React.ReactElement<ItemProps>[]).concat(children as React.ReactElement<ItemProps>[])
      .map(item => this.renderItem(item));
  }

  private renderItem(item : React.ReactElement<ItemProps>) {
    const { currentUrl, onCloseRequested } = this.props;

    if (currentUrl === item.props.url) {
      // just scroll to top and close the menu for already selected item
      return (
        <li key={ item.props.url } className={ s.current }>
          <a onClick={ () => { window.scrollTo(0, 0); onCloseRequested(); } }>
            <span className={ s.itemIcon }><Icon name={ item.props.icon } /></span>
            <span className={ s.itemTitle }>{ item.props.title }</span>
          </a>
        </li>
      );
    }

    return (
      <li key={ item.props.url }>
        <Link to={ item.props.url }>
          <span className={ s.itemIcon }><Icon name={ item.props.icon } /></span>
          <span className={ s.itemTitle }>{ item.props.title }</span>
        </Link>
      </li>
    );
  }

  private onTransitionEnd() {
    if (this.props.visible) {
      return;
    }
    this.props.onClosed();
  }
}

export default SideMenu;

