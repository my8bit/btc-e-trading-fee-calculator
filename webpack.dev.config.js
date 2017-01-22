'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
    publicPath: '/'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'eslint?{quiet:true,rules:{\'no-debugger\':1}}'
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
        loader: 'react-hot!babel?presets[]=react&presets[]=es2015',
        exclude: /(node_modules)/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file'
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
    new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
    new HtmlWebpackPlugin({
      title: 'BTC-E | Bitcoin trading fee calculator',
      description: 'Bitcoin trading fee calculator calculates an amount of profits, losses, and threshold. The calculator supports the BTC-e bitcoin exchange with 0.2% transaction fee.',
      username: 'my8bit',
      filename: 'index.html',
      inject: 'body',
      template: 'index.html_vm',
      favicon: 'img/favicon.ico',
      hash: false
    })
  ]
};
