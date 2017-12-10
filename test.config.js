const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const externalReact = require('webpack-external-react');

const path = require('path');

module.exports = {
	entry: {
    'test': './test/test.tsx',
  },

  output: {
    filename: '[name]-[hash].bundle.js',
    path: path.resolve(__dirname, './build'),
    libraryTarget: 'umd',
  },

  target: 'web',

  resolve: {
    extensions: [
      '.ts', '.tsx', '.js',
    ],
    alias: {
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
        test: /\.css?$/,
        use: ExtractTextPlugin.extract({
          use: 'raw-loader',
        })
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('style-[hash].bundle.css'),
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
    new HtmlPlugin({
      template: 'test/index.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
};
