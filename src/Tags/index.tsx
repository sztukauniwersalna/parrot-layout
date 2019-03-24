
import * as React from 'react';

import { Page, Tag, Paramorph, PureComponent } from 'paramorph';

import Button from '../Button';

const s = require('./style');

export class Tags extends PureComponent<{}, {}> {
  render() {
    const { page, paramorph } = this.context;

    if (page.tags.length === 0) {
      return null;
    }

    return (
      <ul className={ s.tags }>
      { page.tags
        .map(title => paramorph.tags[title] as Tag)
        .map(({ title, url } : Tag) => (
          <li key={ url }><Button url={ url }>{ title }</Button></li>
        )) }
      </ul>
    );
  }
}

export default Tags;

