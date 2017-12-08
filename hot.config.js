const path = require('path');
const webpack = require('webpack');
const externalReact = require('webpack-external-react');

const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
    'hot-bootstrap': [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
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
    new HtmlPlugin({
      template: 'test/index.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
};

