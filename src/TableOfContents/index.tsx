
import * as React from 'react';

import { Post, Category, Tag, PureComponent, Link } from 'paramorph';

export interface Props {
  respectLimit ?: boolean;
}

export class TableOfContents extends PureComponent<Props, {}> {
  render() {
    const { respectLimit = false } = this.props;
    const { paramorph } = this.context;

    const topLevel = Object.keys(paramorph.posts)
      .map(key => paramorph.posts[key] as Post)
      .filter(post => post.categories.length == 0)
      .filter(post => post.url != '/')
    ;
    const tags = Object.keys(paramorph.tags)
      .map(key => paramorph.tags[key])
    ;
    const index = paramorph.posts['/'] as Post;

    return (
      <ul>
        <li key={ '/' }>
          <Link to='/'>{ index.title }</Link>
          <Branch posts={ topLevel } shallow={ respectLimit } ellipsis={ respectLimit } />
        </li>
      {
        !respectLimit
        ? tags.map(({ title, url, posts }: Tag) => (
        <li key={ url }>
          <Link to={ url }>{ title }</Link>
          <Branch posts={ posts } shallow />
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
  posts : Post[];
  shallow ?: boolean;
  ellipsis ?: boolean;
}

export function Branch({
  posts,
  shallow = false,
  ellipsis = false
} : BranchProps) : React.ReactElement<BranchProps> {

  return (
    <ul>
  { posts
    .filter(post => post instanceof Category)
    .filter(post => post.output)
    .map(post => post as Category)
    .map(({ url, title, posts } : Category) => (
      <li key={ url }>
        <Link to={ url }>{ title }</Link>
        { !shallow ? <Branch posts={ posts } /> : null }
      </li>
    ))
  }
  { posts
    .filter(post => !(post instanceof Category))
    .filter(post => post.output)
    .map(({ title, url } : Post) => (
      <li key={ url }>
        <Link to={ url }>{ title }</Link>
      </li>
    )) }
  { ellipsis ? <li key='ellipsis'>…</li> : null }
    </ul>
  );
}

