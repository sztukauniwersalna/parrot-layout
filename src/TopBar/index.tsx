
import * as React from 'react';

import { PureComponent, Link } from 'paramorph';

import Button from '../Button';
import Icon from '../Icon';
import Logo from '../Logo';

const s = require('./style');

export interface Props {
  onMenuClick ?: () => void;
}

export class TopBar extends PureComponent<Props, {}> {
  render() {
    const { onMenuClick } = this.props;
    const { paramorph } = this.context;

    return (
      <header className={ s.topBar }>
        <div className={ s.hamburger }>
          <Button onClick={ onMenuClick }>
            <Icon name='&#xE5D2;' />
          </Button>
        </div>

        <Link to='/'>
          <span className={ s.title }>Sztuka Uniwersalna</span>
          <div className={ s.smallLogo }><Logo variant='small' /></div>
          <div className={ s.inlineLogo }><Logo variant='inline' /></div>
        </Link>

        <nav className={ s.topMenu }>
          <ul>
          { paramorph.config.menu.map(entry => (
            <li key={ entry.url }><Button url={ entry.url }>{ entry.short }</Button></li>
          )) }
          </ul>
        </nav>
      </header>
    );
  }
}

export default TopBar;

