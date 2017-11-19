import * as React from 'react';

import FeedPage from './feed';
import ArticlePage from './article';
import TypographyPage from './typography';
import ImagesPage from './images';
import RecipePage from './recipe';
import SitemapPage from './sitemap';

import { Website, Layout, Page, MenuEntry } from 'paramorph/models';
import ContentLimiter from 'paramorph/components/ContentLimiter';

import { ParrotLayout } from 'parrot-layout';

export const website = new Website();

const layout = new Layout('parrot', ParrotLayout);
website.addLayout(layout);

website.addPage(createPage('Feed', '/', FeedPage, false));
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

function createPage(title : string, url : string, Body : React.ComponentType<any>, feed ?: boolean) {
  const page : Page = new Page(
    title,
    'description',
    url,
    layout,
    (props : any) => (
      <ContentLimiter limit={ 5 } { ...props }><Body { ...props } /></ContentLimiter>
    ),
    true,
    new Date(),
    [],
    [],
    feed === undefined ? true : feed,
  );
  return page;
}

