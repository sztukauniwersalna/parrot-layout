import * as React from 'react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import FeedPage from './feed';
import ArticlePage from './article';
import TypographyPage from './typography';
import ImagesPage from './images';
import RecipePage from './recipe';
import SitemapPage from './sitemap';

import IsomorphicStyleContext from '../IsomorphicStyleContext';

import { Website, Layout, Page, MenuEntry } from 'paramorph/models';
import Content from 'paramorph/components/Content';

import { ParrotLayout } from 'parrot-layout';

export const website = new Website(
  'Parrot',
  'http://sztukauniwersalna.pl',
  'Europe/Warsaw',
  'pl_PL',
);

const layout = new Layout('parrot', ParrotLayout);
website.addLayout(layout);

export const feed = createPage('Feed', '/', FeedPage, false);

website.addPage(feed);
website.addPage(createPage('Article', '/article', ArticlePage));
website.addPage(createPage('Typography Test', '/typography-test', TypographyPage));
website.addPage(createPage('Images Test', '/images-test', ImagesPage));
website.addPage(createPage('Recipe Test', '/recipe-test', RecipePage));
website.addPage(createPage('Sitemap', '/sitemap', SitemapPage, false));

website.menu = [
  new MenuEntry('Main Page', 'Home', '/'),
  new MenuEntry('Sitemap', 'Sitemap', '/sitemap'),
];

export default website;

interface Props {
  website : Website;
  page : Page;
}

function createPage(
  title : string,
  url : string,
  body : (props ?: Props) => JSX.Element,
  feed ?: boolean,
  image ?: string,
) {
  const page : Page = new Page(
    title,
    'description',
    url,
    layout,
    (props : any) => (
      <Content limit={ 5 } { ...props }>{ body(props) }</Content>
    ),
    image || null,
    true,
    new Date(),
    [],
    [],
    feed === undefined ? true : feed,
  );
  if (page.image === null) {
    Object.defineProperty(page, 'image', {
      get: () => imageFromContent(page),
      set: () => { throw new Error('Page.image is readonly'); }
    });
  }
  return page;
}

function imageFromContent(page : Page) {
  const element = createElement(page.body, { website, page, respectLimit: false })
  const router = createElement(StaticRouter, { location: page.url, context: {}}, element);
  const context = createElement(IsomorphicStyleContext, {}, router);
  const markup = renderToStaticMarkup(context);
  const found = /<img[^>]* src="([^"]*)"[^>]*>/.exec(markup);
  if (!found) {
    return null;
  }
  return found[1];
}

