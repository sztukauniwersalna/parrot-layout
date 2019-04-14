
import { Paramorph, Config, Layout, Collection, Page } from 'paramorph/model';

import { ParrotLayout } from 'parrot-layout';

import FeedPage from './feed';
import ArticlePage from './article';
import TypographyPage from './typography';
import ImagesPage from './images';
import RecipePage from './recipe';
import SitemapPage from './sitemap';
import NotFoundPage from './notfound';

const config : Config = {
  title: 'Parrot',
  timezone: 'Europe/Warsaw',
  baseUrl: '/',
  image: '',
  locale: 'pl_PL',
  menu: [
    {
      title: 'Main Page',
      short: 'Home',
      url: '/',
    },
    {
      title: 'Sitemap',
      short: 'Sitemap',
      url: '/sitemap/',
    },
  ],
  collections: {
    pages: {
    },
  },
};

export const paramorph = new Paramorph(config);
export default paramorph;

paramorph.addLayout(new Layout('parrot-layout', require.resolve('parrot-layout')));
paramorph.addCollection(new Collection("pages", "pages", "./_pages", undefined, undefined, undefined));

paramorph.addPage(createPage('Feed', '/', './feed', false));
paramorph.addPage(createPage('Article', '/article/', './article', true));
paramorph.addPage(createPage('Typography Test', '/typography/', './typography', true));
paramorph.addPage(createPage('Images Test', '/images/', './images', true));
paramorph.addPage(createPage('Recipe Test', '/recipe/', './recipe', true));
paramorph.addPage(createPage('Sitemap', '/sitemap/', './sitemap', false));
paramorph.addPage(createPage('NotFound', '/404/', './notfound', false));

paramorph.addLayoutLoader('parrot-layout', () => Promise.resolve(ParrotLayout));
paramorph.addContentLoader('/', () => Promise.resolve(FeedPage));
paramorph.addContentLoader('/article/', () => Promise.resolve(ArticlePage));
paramorph.addContentLoader('/typography/', () => Promise.resolve(TypographyPage));
paramorph.addContentLoader('/images/', () => Promise.resolve(ImagesPage));
paramorph.addContentLoader('/recipe/', () => Promise.resolve(RecipePage));
paramorph.addContentLoader('/sitemap/', () => Promise.resolve(SitemapPage));
paramorph.addContentLoader('/404/', () => Promise.resolve(NotFoundPage));

function createPage(
  title : string,
  url : string,
  filepath : string,
  feed : boolean,
) {
  const page : Page = new Page(
    url,
    title,
    '',
    null,
    'pages',
    'parrot-layout',
    filepath,
    true,
    feed,
    5,
    [],
    [],
    0,
  );
  return page;
}

