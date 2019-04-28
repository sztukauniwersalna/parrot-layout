
import * as React from 'react';

import { Post, PureComponent, Link, ContextTypes } from 'paramorph';

import Tags from '../Tags';
import Button from '../Button';
import Image from '../Image';
import { Branch as TocBranch } from '../TableOfContents';

const s = require('./style');

export interface Props {
  post : Post;
  Content : React.ComponentType<any>;
}

export class Tile extends PureComponent<Props, {}> {
  static readonly childContextTypes = ContextTypes;

  getChildContext() {
    const { post } = this.props;

    return {
      ...this.context,
      post,
    }
  }

  render() {
    const { post, Content, ...props } = this.props;

    return (
      <article>
        <h1><Link to={ post.url }>{ post.title }</Link></h1>
        <div className={ s.tags }>
          <Tags />
        </div>

        { maybeRenderImage(post) }
        <Content { ...props } respectLimit={ true } />

        <div className={ s.more }>
          <Button url={ post.url } variant='raised' color='purple'>Read More</Button>
        </div>
      </article>
    );
  }
}

function maybeRenderImage(post : Post) {
  if (!post.image) {
    return null;
  }
  return (
    <Link to={ post.url }>
      <Image src={ post.image } alt={ `${post.title}` } />
    </Link>
  );
}

export default Tile;

