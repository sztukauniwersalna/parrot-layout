const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      '.js',
    ],
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
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              declaration: false,
            },
          },
        },
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

