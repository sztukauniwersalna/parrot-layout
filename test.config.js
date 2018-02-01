const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ReactHtmlPlugin = require('react-html-webpack-plugin');
const externalReact = require('webpack-external-react');

const path = require('path');

const ThumbnailsPlugin = require('./plugins/thumbnails');

const GA_TRACKING_ID = '';
const VERSION = Date.now();

module.exports = {
	entry: {
    'gtagConfig': [
      './lib/gtag',
    ],
    'gtagConfig': [
      './test/styles',
    ],
    'entry': [
      './test/entry',
    ],
  },

  output: {
    filename: `[name]-${VERSION}.bundle.js`,
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
  },

  target: 'web',

  resolve: {
    extensions: [
      '.ts', '.tsx', '.js',
    ],
    alias: {
      'paramorph/data': path.resolve(__dirname, './test/data/index.tsx'),
      'parrot-layout': path.resolve(__dirname, './test/bundle'),
    },
  },

  externals: externalReact.extranals,

  module: {
    noParse: externalReact.noParse,
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'raw-loader',
        })
      },
    ],
  },

  plugins: [
    new ThumbnailsPlugin({ output: `thumbs-${VERSION}.js` }),
    new ExtractTextPlugin(`style-${VERSION}.bundle.css`),
    new CopyPlugin(
      [
        'jpg',
        'png',
        'svg',
        'ttf',
        'eot',
        'woff',
        'woff2',
      ]
      .map(ext => ({ context: './lib', from: `*.${ext}` }))
    ),
    new ReactHtmlPlugin({
      component: './src/Root/index.tsx',
      output: 'index.html',
      props: {
        website: {
          title: 'ParrotLayout',
          baseUrl: 'http://localhost:8080',
          locale: 'pl_PL',
        },
        page: {
          title: 'Feed',
          tags: [],
          description: '',
          url: '/',
          image: null,
        },
        localBundles: {
          js: [
            `thumbs-${VERSION}.js`,
            `entry-${VERSION}.bundle.js`,
            `gtagConfig-${VERSION}.bundle.js`,
          ],
          css: [
            `style-${VERSION}.bundle.css`,
          ],
        },
        externalBundles: {
          js: [
            'https://unpkg.com/react@15/dist/react.js',
            'https://unpkg.com/prop-types@15.6.0/prop-types.min.js',
            'https://unpkg.com/react-dom@15/dist/react-dom.js',
            'https://unpkg.com/react-router-dom@4.1.2/umd/react-router-dom.js',
          ],
          css: [],
        },
      },
    }),
    new webpack.DefinePlugin({
      GA_TRACKING_ID: JSON.stringify(GA_TRACKING_ID),
    }),
  ],
};

