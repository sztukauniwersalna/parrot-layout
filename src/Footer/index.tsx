
import * as React from 'react';

import { PureComponent, Link, Page } from 'paramorph';

import Button from '../Button';
import Icon from '../Icon';
import SocialButtons from '../SocialButtons';

const s = require('./style');

export class Footer extends PureComponent<{}, {}> {
  render() {
    const { paramorph, page } = this.context;

    const index = paramorph.pages['/'] as Page;
    const sitemap = paramorph.pages['/sitemap'] as Page;

    return (
      <footer className={ s.footer }>
        <div className={ s.socialButtons }>
          <SocialButtons />
        </div>
        <ul className={ s.categories }>
        { paramorph.config.menu.map(entry => (
          <li key={ entry.url }><Button url={ entry.url }>{ entry.title }</Button></li>
        )) }
        </ul>
        <p className={ s.bottomParagraph }>
          <span className={ s.copyright }>&copy; 2017 Aleksandra Krawczyk</span>
          <span className={ s.indexLink }><Link to={ index.url }>{ index.title }</Link></span>
          <span className={ s.sitemapLink }><Link to={ sitemap.url }>{ sitemap.title }</Link></span>
        </p>
        <div className={ s.scrollUpButton }>
          <Button variant='action' color='gray' onClick={ () => window.scrollTo(0, 0) }>
            <Icon name='arrow_upward' />
          </Button>
        </div>
      </footer>
    );
  }
}

export default Footer;

