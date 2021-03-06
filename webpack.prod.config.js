const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[hash].[name].bundle.js',
    chunkFilename: '[hash].[id].bundle.js',
    publicPath: '/'
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style/useable!css!postcss!'
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less!'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: [
            'react',
            'es2015'
          ]
        }
      }
    ]
  },
  postcss: () => {
    return [
      autoprefixer({browsers: ['last 5 versions']})
    ];
  },
  resolve: {
    root: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'js', 'fw', 'lib')
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
        {from: 'img', to: 'img'}
    ]),
    new webpack.optimize.CommonsChunkPlugin('[hash].common.bundle.js'),
    new HtmlWebpackPlugin({
      title: 'BTC-E | Trading fee calculator',
      description: 'Bitcoin trading fee calculator calculates an amount of profits, losses, and threshold. The calculator supports the BTC-e bitcoin exchange with 0.2% transaction fee. Edit',
      username: 'my8bit',
      filename: 'index.html',
      inject: 'body',
      template: 'index.html_vm',
      favicon: 'img/favicon.ico',
      hash: false
    })
  ]
};
