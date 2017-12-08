import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

import { Page, MenuEntry, Website } from 'paramorph/models';
import Button from '../Button';
import Icon from '../Icon';
import SocialButtons from '../SocialButtons';

const s = require('./style');

export interface Props {
  website : Website;
  page : Page;
}

export class Footer extends Component<Props, {}> {
  render() {
    const { website, page } = this.props;
    const index = website.getPageOfUrl('/');
    const sitemap = website.getPageOfUrl('/sitemap');

    return (
      <footer className={ s.footer }>
        <div className={ s.socialButtons }>
          <SocialButtons />
        </div>
        <ul className={ s.categories }>
        { website.menu.map((entry : MenuEntry) => (
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

