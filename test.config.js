
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactHtmlPlugin = require('react-html-webpack-plugin');
const externalReact = require('webpack-external-react');

const path = require('path');

// const ThumbnailsPlugin = require('./plugins/thumbnails');

const GA_TRACKING_ID = '';
const VERSION = Date.now();

module.exports = {
	entry: {
    'gtagConfig': [
      './lib/gtag',
    ],
    'styles': [
      './test/styles',
    ],
    'entry': [
      'paramorph/entry/client',
    ],
  },

  output: {
    filename: `[name]-${VERSION}.bundle.js`,
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
  },

  mode: 'development',
  target: 'web',

  resolve: {
    extensions: [
      '.ts', '.tsx', '.js',
    ],
    alias: {
      'parrot-layout': path.resolve(__dirname, './test/bundle'),
      '@website/_config.yml': path.resolve(__dirname, './test/data/config.ts'),
    },
  },

  externals: externalReact.externals,

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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
        ],
      },
    ],
  },

  plugins: [
//    new ThumbnailsPlugin({ output: `thumbs-${VERSION}.js` }),
    new MiniCssExtractPlugin({
      filename: `style-${VERSION}.bundle.css`,
    }),
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
        paramorph: {
          config: {
            title: 'ParrotLayout',
            baseUrl: 'http://localhost:8080',
            locale: 'pl_PL',
          },
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
//            `thumbs-${VERSION}.js`,
            `entry-${VERSION}.bundle.js`,
            `gtagConfig-${VERSION}.bundle.js`,
          ],
          css: [
            `style-${VERSION}.bundle.css`,
          ],
        },
        externalBundles: {
          js: [
            'https://unpkg.com/react@16.8.6/umd/react.development.js',
            'https://unpkg.com/prop-types@15.7.2/prop-types.min.js',
            'https://unpkg.com/react-dom@16.8.6/umd/react-dom.development.js',
            'https://unpkg.com/react-dom@16.8.6/umd/react-dom-server.browser.development.js',
          ],
          css: [],
        },
        preload: [],
      },
      globals: {
        window: {},
      },
    }),
    new webpack.DefinePlugin({
      GA_TRACKING_ID: JSON.stringify(GA_TRACKING_ID),
    }),
  ],
};

