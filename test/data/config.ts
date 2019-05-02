
import { Paramorph, Config, Layout, Collection, Post } from 'paramorph/model';

import { ParrotLayout } from 'parrot-layout';

import FeedPost from './feed';
import ArticlePost from './article';
import TypographyPost from './typography';
import ImagesPost from './images';
import RecipePost from './recipe';
import SitemapPost from './sitemap';
import NotFoundPost from './notfound';

const config : Config = {
  title: 'Parrot',
  timezone: 'Europe/Warsaw',
  baseUrl: '/',
  image: '',
  locale: 'pl_PL',
  menu: [
    {
      title: 'Main Post',
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
    posts: {
    },
  },
};

export const paramorph = new Paramorph(config);
export default paramorph;

paramorph.addLayout(new Layout('parrot-layout', require.resolve('parrot-layout')));
paramorph.addCollection(new Collection("posts", "posts", "./_posts", undefined, undefined, undefined));

paramorph.addPost(createPost('Feed', '/:pageNumber(\\d+)?/', './feed', false));
paramorph.addPost(createPost('Article', '/article/', './article', true));
paramorph.addPost(createPost('Typography Test', '/typography/', './typography', true));
paramorph.addPost(createPost('Images Test', '/images/', './images', true));
paramorph.addPost(createPost('Recipe Test', '/recipe/', './recipe', true));
paramorph.addPost(createPost('Sitemap', '/sitemap/', './sitemap', false));
paramorph.addPost(createPost('NotFound', '/404/', './notfound', false));

paramorph.addLayoutLoader('parrot-layout', () => Promise.resolve(ParrotLayout));
paramorph.addContentLoader('/', () => Promise.resolve(FeedPost));
paramorph.addContentLoader('/article/', () => Promise.resolve(ArticlePost));
paramorph.addContentLoader('/typography/', () => Promise.resolve(TypographyPost));
paramorph.addContentLoader('/images/', () => Promise.resolve(ImagesPost));
paramorph.addContentLoader('/recipe/', () => Promise.resolve(RecipePost));
paramorph.addContentLoader('/sitemap/', () => Promise.resolve(SitemapPost));
paramorph.addContentLoader('/404/', () => Promise.resolve(NotFoundPost));

function createPost(
  title : string,
  url : string,
  filepath : string,
  feed : boolean,
) {
  const post : Post = new Post(
    url,
    title,
    '',
    null,
    'posts',
    'parrot-layout',
    filepath,
    true,
    feed,
    5,
    [],
    [],
    0,
  );
  return post;
}

