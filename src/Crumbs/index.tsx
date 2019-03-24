
import * as React from 'react';

import { Page, PureComponent, Link } from 'paramorph';

const s = require('./style');

export interface Props {
  responsive ?: boolean;
}

export class Crumbs extends PureComponent<Props, {}> {
  render() {
    const { responsive = false } = this.props;
    const { paramorph, page } = this.context;

    return (
      <div className={ `${s.crumbs} ${responsive ? s.responsive : ''}` }>

    { paramorph.getCrumbs(page)
      .map((crumbs : Page[], key : number) => (
        <ul key={ key }>
        { crumbs.map((page : Page) => (
          <li key={ page.url }>
            <Link to={ page.url }>
              { page.url === '/' ? paramorph.config.title : page.title }
            </Link>
          </li>
        )) }
        </ul>
      )) }

      </div>
    );
  }
}

export default Crumbs;

