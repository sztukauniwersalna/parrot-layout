const path = require('path');
const webpack = require('webpack');

const externalReact = require('webpack-external-react');
const ReactHtmlPlugin = require('react-html-webpack-plugin');

module.exports = {
	entry: {
    'hot-bootstrap': [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
    ],
    'gtagConfig': [
      './src/gtag',
    ],
    'entry': [
      './test/entry',
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: path.resolve(__dirname, '/'),
    libraryTarget: 'umd',
  },

  target: 'web',

  resolve: {
    extensions: [
      '.js', '.ts', '.tsx', '.scss',
    ],
    alias: {
      'parrot-layout': path.resolve(__dirname, './src/index.ts'),
    },
  },
  resolveLoader: {
    alias: {
      'wrap-with-styles-loader': path.resolve(__dirname, './loaders/wrap-with-styles.js'),
    },
  },

  externals: externalReact.externals,

  module: {
    noParse: externalReact.noParse,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [ 'react-hot-loader/babel' ],
            },
          },
          'wrap-with-styles-loader',
          'ts-loader',
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
      {
        test: /\.scss?$/,
        use: [
          'isomorphic-style-loader',
          'css-loader?modules&localIdentName=[local]-[hash:base64:5]',
          'resolve-url-loader',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff2|woff|ttf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
            'hot-bootstrap.bundle.js',
            'entry.bundle.js',
            'gtagConfig.bundle.js',
          ],
          css: [],
        },
        externalBundles: {
          js: [
            'https://unpkg.com/react@15/dist/react.js',
            'https://unpkg.com/prop-types@15.6.0/prop-types.min.js',
            'https://unpkg.com/react-dom@15/dist/react-dom.js',
            'https://unpkg.com/react-dom@15.6.1/dist/react-dom-server.min.js',
            'https://unpkg.com/react-router-dom@4.1.2/umd/react-router-dom.js',
          ],
          css: [],
        },
      },
      globals: {
        window: {},
      },
    }),
    new webpack.DefinePlugin({
      GA_TRACKING_ID: JSON.stringify(''),
    }),
  ],
};

