
import * as React from 'react';

import { Page, PureComponent, Link, ContextTypes } from 'paramorph';

import Tags from '../Tags';
import Button from '../Button';
import Image from '../Image';
import { Branch as TocBranch } from '../TableOfContents';

const s = require('./style');

export interface Props {
  page : Page;
  Content : React.ComponentType<any>;
}

export class Tile extends PureComponent<Props, {}> {
  static readonly childContextTypes = ContextTypes;

  getChildContext() {
    const { page } = this.props;

    return {
      ...this.context,
      page,
    }
  }

  render() {
    const { page, Content, ...props } = this.props;

    return (
      <article>
        <h1><Link to={ page.url }>{ page.title }</Link></h1>
        <div className={ s.tags }>
          <Tags />
        </div>

        { maybeRenderImage(page) }
        <Content { ...props } respectLimit={ true } />

        <div className={ s.more }>
          <Button url={ page.url } variant='raised' color='purple'>Read More</Button>
        </div>
      </article>
    );
  }
}

function maybeRenderImage(page : Page) {
  if (!page.image) {
    return null;
  }
  return (
    <Link to={ page.url }>
      <Image src={ page.image } alt={ `${page.title}` } />
    </Link>
  );
}

export default Tile;

