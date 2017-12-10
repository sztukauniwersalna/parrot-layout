import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ReactDisqusComments from 'react-disqus-comments';

import { Page, Category, Tag, Website, MenuEntry } from 'paramorph/models';

import TopBar from '../TopBar';
import Crumbs from '../Crumbs';
import Tags from '../Tags';
import Footer from '../Footer';
import Logo from '../Logo';
import Icon from '../Icon';
import SideMenu, { Item } from '../SideMenu';
import Jumbotron from '../Jumbotron';
import gtag from './gtag';

const s = require('./style');

export interface Props {
  website : Website;
  page : Page;
}
export interface State {
  sideMenuClassName : string;
}

const GA_TRACKING_ID = 'UA-110945340-1';
gtag('js', new Date());
gtag('config', GA_TRACKING_ID, { 'send_page_view': false });

export class ParrotLayout extends Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      sideMenuClassName: s.closed,
    };

    this.hideMenu = this.hideMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('swipe-left', this.hideMenu);
    document.body.addEventListener('swipe-right', this.showMenu);

    window.scrollTo(0, 0);
    document.title = `${this.props.page.title} | SztukaUniwersalna.PL`;
    gtag('config', GA_TRACKING_ID, { 'page-path': this.props.page.url });
  }
  componentWillUnmount() {
    document.body.removeEventListener('swipe-left', this.hideMenu);
    document.body.removeEventListener('swipe-right', this.showMenu);
  }

  render() {
    const { website, page } = this.props;

    const Body = page.body;

    return (
      <div id={ s.all }>
        <div className={ s.header }>
          <TopBar website={ website } page={ page } onMenuClick={ this.showMenu } />
        </div>
        <div className={ s.main }>
          { jumbotronFor(website, page) }
          <main>
            { maybeRenderTitle(website, page) }

            <Body website={ website } page={ page } />
          </main>
        </div>
        { maybeRenderComments(page) }
        <div className={ `${s.footer} contrast` }>
          <Footer website={ website } page={ page } />

          <div className={ s.bottom }>
            <div className={ s.logo }>
              <Logo variant='full' />
            </div>
          </div>
        </div>
        <div className={ `${s.sideMenu} ${this.state.sideMenuClassName}` } onClick={ this.hideMenu } >
          <SideMenu
            visible={ this.state.sideMenuClassName === s.visible }
            onCloseRequested={ () => this.hideMenu() }
            onClosed={ () => this.disableMenu() }
            currentUrl={ page.url }
          >
          { website.menu.map(entry => (
            <Item key={ entry.url } url={ entry.url } title={ entry.title } icon={ entry.icon } />
          )) }
          </SideMenu>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(newProps : Props) {
    if (newProps.page === this.props.page) {
      return;
    }

    gtag('config', GA_TRACKING_ID, { 'page-path': newProps.page.url });
  }

  private showMenu() {
    this.setSideMenuClassName(s.visible);
  }
  private hideMenu() {
    this.setSideMenuClassName('');
  }
  private disableMenu() {
    this.setSideMenuClassName(s.closed);
  }

  private setSideMenuClassName(sideMenuClassName : string) {
    this.setState(prev => ({ ...prev, sideMenuClassName }));
  }
}

export default ParrotLayout;

function jumbotronFor(website : Website, page : Page) {
    if (page.url === '/') {
    return (
      <div className={ s.indexJumbo }>
        <Jumbotron fullscreen align='center'>
          <h2>uniwer•sal•ny; -na</h2>
          <ol>
            <li>«obejmujący całość, dotyczący wszystkiego lub wszystkich»</li>
            <li>«mający wszechstronne zastosowanie»</li>
            <li>«mający różne umiejętności»</li>
          </ol>
        </Jumbotron>
      </div>
    );
  }

  if (website.menuContains(page)) {
    return (
      <div className={ s.menuEntryJumbo }>
        <Jumbotron fullscreen align='bottom'>
          <h2>
            <Icon name={ website.getMenuEntry(page).icon } />
            <Link to={ page.url }>{ page.title }</Link>
          </h2>
          <Crumbs responsive website={ website } page={ page } />
        </Jumbotron>
      </div>
    );
  }

  if (page instanceof Category) {
    return (
      <div className={ s.categoryJumbo }>
        <Jumbotron fullscreen align='bottom'>
          <h2><Link to={ page.url }>{ page.title }</Link></h2>
          <Crumbs responsive website={ website } page={ page } />
        </Jumbotron>
      </div>
    );
  }

  if (page instanceof Tag) {
    return (
      <div className={ s.tagJumbo }>
        <Jumbotron fullscreen align='bottom'>
          <h2><Link to={ page.url}>{ (page as Tag).originalTitle }</Link></h2>
          <Crumbs responsive website={ website } page={ page } />
        </Jumbotron>
      </div>
    );
  }

  return (
    <Jumbotron align='bottom'>
      <Crumbs website={ website } page={ page } />
    </Jumbotron>
  );
}

function maybeRenderTitle(website : Website, page : Page) {
  if (page.url === '/' || page instanceof Category || page instanceof Tag) {
    return null;
  }

  return (
    <div>
      <h1><Link to={ page.url }>{ page.title }</Link></h1>
      <Tags website={ website } page={ page } />
    </div>
  );
}

function maybeRenderComments(page: Page) {
  if (page.url === '/' || page instanceof Category || page instanceof Tag) {
    return null;
  }

  return (
    <div className={ s.comments }>
      <ReactDisqusComments
        shortname='sztukauniwersalna'
        identifier={ page.title }
        title={ page.title }
        url={ `http://sztukauniwersalna.pl${page.url}` }
      />
    </div>
  );
}

