
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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

  mode: 'production',
  target: 'node',
  devtool: false,

  resolve: {
    extensions: [
      '.js', '.ts', '.tsx', '.scss',
    ],
    alias: {
      '@website': path.resolve(__dirname),
    },
  },

  resolveLoader: {
    alias: {
      'config-loader': 'paramorph/loader/config',
      'markdown-loader': 'paramorph/loader/markdown',
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'emit-file-loader',
            options: {
              transform: (exports) => exports.locals,
            },
          },
          'css-loader?modules&localIdentName=[local]-[hash:base64:5]',
          'resolve-url-loader',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

