
import * as React from 'react';
import ReactDisqusComments from 'react-disqus-comments';

import { Post, Category, Tag, Link, PureComponent } from 'paramorph';

import TopBar from '../TopBar';
import Crumbs from '../Crumbs';
import Tags from '../Tags';
import Footer from '../Footer';
import Logo from '../Logo';
import Icon from '../Icon';
import Image from '../Image';
import SideMenu, { Item } from '../SideMenu';
import Jumbotron from '../Jumbotron';

import FacebookLike from '../FacebookLike';
import '../polyfill/swipe-events';

const s = require('./style');

export interface State {
  sideMenuClassName : string;
  currentPost : Post | null;
}

export class ParrotLayout extends PureComponent<{}, State> {
  constructor(props : {}) {
    super(props);

    this.state = {
      sideMenuClassName: s.closed,
      currentPost : null,
    };

    this.hideMenu = this.hideMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.disableMenu = this.disableMenu.bind(this);
  }

  render() {
    const { children } = this.props;
    const { paramorph, post } = this.context;

    return (
      <div id={ s.all }>
        <div className={ s.header }>
          <TopBar onMenuClick={ this.showMenu } />
        </div>

        <div className={ s.main }>
          { this.renderJumbotron() }
          <main>
            { this.maybeRenderTitle() }

            { children }

            <div className={ s.bottomLike }>
              <FacebookLike url={ `${paramorph.config.baseUrl}${post.url}` } />
            </div>
          </main>
        </div>

        { this.maybeRenderComments() }
        { this.renderFooter() }
        { this.renderSideMenu() }
      </div>
    );
  }

  componentDidMount() {
    const { post, paramorph, history } = this.context;

    document.body.addEventListener('swipe-left', this.hideMenu);
    document.body.addEventListener('swipe-right', this.showMenu);

    this.setState(prev => ({ ...prev, currentPost: post }));
  }
  componentWillUnmount() {
    document.body.removeEventListener('swipe-left', this.hideMenu);
    document.body.removeEventListener('swipe-right', this.showMenu);
  }

  componentDidUpdate(prevProps : {}, prevState : State) {
    const { post, paramorph } = this.context;
    const { sideMenuClassName } = this.state;

    if (prevState.currentPost === null) {
      // after mount
      return;
    }
    if (prevState.currentPost === post && prevState.sideMenuClassName !== sideMenuClassName) {
      // just closing the menu
      return;
    }
    window.scrollTo(0, 0);
    document.title = `${post.title} | ${paramorph.config.title}`;

    this.setState(prev => ({ ...prev, currentPost: post }));
  }

  private renderJumbotron() {
    const { post, paramorph } = this.context;

    if (post.url === '/') {
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

    const menuEntry = this.getMenuEntryForCurrentPost();

    if (menuEntry) {
      return (
        <div className={ s.menuEntryJumbo }>
          <Jumbotron fullscreen align='bottom'>
            <h2>
              <Icon name={ menuEntry.icon } />
              <Link to={ post.url }>{ post.title }</Link>
            </h2>
            <Crumbs responsive />
          </Jumbotron>
        </div>
      );
    }

    if (post instanceof Category) {
      return (
        <div className={ s.categoryJumbo }>
          <Jumbotron fullscreen align='bottom'>
            <h2><Link to={ post.url }>{ post.title }</Link></h2>
            <Crumbs responsive />
          </Jumbotron>
        </div>
      );
    }

    if (post instanceof Tag) {
      return (
        <div className={ s.tagJumbo }>
          <Jumbotron fullscreen align='bottom'>
            <h2><Link to={ post.url}>{ (post as Tag).originalTitle }</Link></h2>
            <Crumbs responsive />
          </Jumbotron>
        </div>
      );
    }

    return (
      <Jumbotron align='bottom'>
        <Crumbs />
      </Jumbotron>
    );
  }

  private maybeRenderTitle() {
    const { post, paramorph } = this.context;

    if (post.url === '/' || post instanceof Category || post instanceof Tag) {
      return null;
    }

    return (
      <div className={ s.title }>
        <h1><Link to={ post.url }>{ post.title }</Link></h1>
        <Tags />
        <div className={ s.topLike }>
          <FacebookLike url={ `${paramorph.config.baseUrl}${post.url}` } />
        </div>
      </div>
    );
  }

  private maybeRenderComments() {
    const { post, paramorph } = this.context;

    if (post.url === '/' || post instanceof Category || post instanceof Tag) {
      return null;
    }
    return (
      <div className={ s.comments }>
        <ReactDisqusComments
          shortname='sztukauniwersalna'
          identifier={ post.title }
          title={ post.title }
          url={ `http://sztukauniwersalna.pl${post.url}` }
        />
      </div>
    );
  }

  private renderFooter() {
    return (
      <div className={ `${s.footer} contrast` }>
        <Footer />

        <div className={ s.bottom }>
          <div className={ s.content }>
            <div className={ s.zblogowani }>
              <a href='https://zblogowani.pl/' title='Sprawdź serwis zBLOGowani.pl!'>
                <img
                  src='//zblogowani.pl/code/160x50/silver/341338/btn.png'
                  alt='zBLOGowani.pl'
                />
              </a>
            </div>
            <div className={ s.logo }>
              <Logo variant='full' />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderSideMenu() {
    const { post, paramorph } = this.context;
    const { sideMenuClassName } = this.state;

    return (
      <div
        className={ `${s.sideMenu} ${sideMenuClassName}` }
        onClick={ this.hideMenu }
      >
        <SideMenu
          visible={ sideMenuClassName === s.visible }
          onCloseRequested={ this.hideMenu }
          onClosed={ this.disableMenu }
          currentUrl={ post.url }
        >
        { paramorph.config.menu.map(entry => (
          <Item
            key={ entry.url }
            url={ entry.url }
            title={ entry.title }
            icon={ entry.icon }
          />
        )) }
        </SideMenu>
      </div>
    );
  }

  private getMenuEntryForCurrentPost() {
    const { post, paramorph } = this.context;

    const found = paramorph.config.menu.filter(entry => entry.url === post.url);
    return found.length === 0 ? undefined : found[0];
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

