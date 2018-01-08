const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const externalReact = require('webpack-external-react');

const path = require('path');

module.exports = {
	entry: {
    'bundle': './src/index',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './lib'),
    libraryTarget: 'commonjs',
  },

  target: 'node',

  resolve: {
    extensions: [
      '.js', '.ts', '.tsx', '.scss',
    ],
  },

  resolveLoader: {
    alias: {
      'emit-file-loader': path.resolve(__dirname, './loaders/emit-file.js'),
      'relative-path-loader': path.resolve(__dirname, './loaders/relative-path.js'),
    },
  },

  externals: externalReact.externals,

  module: {
    noParse: externalReact.noParse,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'emit-file-loader',
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
                transform: (exports) => exports.locals,
              },
            },
            'css-loader?modules&localIdentName=[local]-[hash:base64:5]',
            'resolve-url-loader?attempts=1',
            'postcss-loader?sourceMap',
            'sass-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff2|woff|ttf)$/,
        use: [
          'emit-file-loader',
          'url-loader?limit='+ (40 * 1024),
        ],
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],
};

