const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

const { JSDOM } = require('jsdom');

const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDOM = require('react-router-dom');

module.exports = {
	entry: {
    'index': './src/index.ts',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './lib'),
    libraryTarget: 'commonjs2',
  },

  target: 'node',

  resolve: {
    extensions: [
      '.js', '.ts', '.tsx',
      '.scss',
      '.jpg', '.png', '.gif', '.svg',
      '.eot', '.woff2', '.woff', '.ttf',
    ],
    alias: {
      'parrot-layout': path.resolve(__dirname, './src'),
    },
  },

  resolveLoader: {
    alias: {
      'emit-file-loader': path.resolve(__dirname, './loaders/emit-file.js'),
    },
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
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: '[path][name].js',
              context: './src',
            },
          },
          'babel-loader',
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
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'emit-file-loader',
              options: {
                name: '[path][name].js',
                context: './src',
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: true,
                localIdentName: '[local]-[hash:base64:5]',
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff2|woff|ttf)$/,
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

  plugins: [
    new ExtractTextPlugin('style.bundle.scss'),
  ],
};

