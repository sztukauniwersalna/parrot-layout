const path = require('path');

const { JSDOM } = require('jsdom');

const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDOM = require('react-router-dom');

module.exports = {
	entry: {
    entry: [
      './test/entry',
    ],
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: path.resolve(__dirname, './test'),
    libraryTarget: 'umd',
  },

  target: 'web',

  resolve: {
    extensions: ['.ts', '.tsx', '.sass'],
  },

  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
    'react-dom/server': {
      root: 'ReactDOMServer',
      commonjs: 'react-dom/server',
      commonjs2: 'react-dom/server',
    },
    'react-router-dom': {
      root: 'ReactRouterDOM',
      commonjs: 'react-router-dom',
      commonjs2: 'react-router-dom',
    },
  },

  module: {
    noParse: [
      require.resolve('react'),
      require.resolve('react-dom'),
      require.resolve('react-dom/server'),
      require.resolve('react-router-dom'),
    ],
    rules: [
      { test: /\.tsx?$/, use: [ 'babel-loader', 'ts-loader' ] },
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
      {
        test: /\.scss?$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader', options: { importLoaders: true, modules: true } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40 * 1024,
            },
          },
        ],
      },
    ],
  },
};

