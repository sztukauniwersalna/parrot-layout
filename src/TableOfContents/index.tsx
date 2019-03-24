
import * as React from 'react';

import { Page, Category, Tag, PureComponent, Link } from 'paramorph';

export interface Props {
  respectLimit ?: boolean;
}

export class TableOfContents extends PureComponent<Props, {}> {
  render() {
    const { respectLimit = false } = this.props;
    const { paramorph } = this.context;

    const topLevel = Object.keys(paramorph.pages)
      .map(key => paramorph.pages[key] as Page)
      .filter(page => page.categories.length == 0)
      .filter(page => page.url != '/')
    ;
    const tags = Object.keys(paramorph.tags)
      .map(key => paramorph.tags[key])
    ;
    const index = paramorph.pages['/'] as Page;

    return (
      <ul>
        <li key={ '/' }>
          <Link to='/'>{ index.title }</Link>
          <Branch pages={ topLevel } shallow={ respectLimit } ellipsis={ respectLimit } />
        </li>
      {
        !respectLimit
        ? tags.map(({ title, url, pages }: Tag) => (
        <li key={ url }>
          <Link to={ url }>{ title }</Link>
          <Branch pages={ pages } shallow />
        </li>
        ))
        : null
      }
      </ul>
    );
  }
}

export default TableOfContents;

export interface BranchProps {
  pages : Page[];
  shallow ?: boolean;
  ellipsis ?: boolean;
}

export function Branch({
  pages,
  shallow = false,
  ellipsis = false
} : BranchProps) : React.ReactElement<BranchProps> {

  return (
    <ul>
  { pages
    .filter(page => page instanceof Category)
    .filter(page => page.output)
    .map(page => page as Category)
    .map(({ url, title, pages } : Category) => (
      <li key={ url }>
        <Link to={ url }>{ title }</Link>
        { !shallow ? <Branch pages={ pages } /> : null }
      </li>
    ))
  }
  { pages
    .filter(page => !(page instanceof Category))
    .filter(page => page.output)
    .map(({ title, url } : Page) => (
      <li key={ url }>
        <Link to={ url }>{ title }</Link>
      </li>
    )) }
  { ellipsis ? <li key='ellipsis'>…</li> : null }
    </ul>
  );
}

