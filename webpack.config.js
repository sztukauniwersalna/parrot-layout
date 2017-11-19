const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

module.exports = {
	entry: {
    'index': './src/index.ts',
  },

  output: {
    filename: 'bundle.js',
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

  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
    },
    'prop-types': {
      root: 'React.PropTypes',
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
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

