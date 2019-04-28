
import * as React from 'react';

import { Post, PureComponent, Link } from 'paramorph';

const s = require('./style');

export interface Props {
  responsive ?: boolean;
}

export class Crumbs extends PureComponent<Props, {}> {
  render() {
    const { responsive = false } = this.props;
    const { paramorph, post } = this.context;

    return (
      <div className={ `${s.crumbs} ${responsive ? s.responsive : ''}` }>

    { paramorph.getCrumbs(post)
      .map((crumbs : Post[], key : number) => (
        <ul key={ key }>
        { crumbs.map((post : Post) => (
          <li key={ post.url }>
            <Link to={ post.url }>
              { post.url === '/' ? paramorph.config.title : post.title }
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

