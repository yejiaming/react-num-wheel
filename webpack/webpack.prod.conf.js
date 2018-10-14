"use strict";
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseWebpackConfig = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin')
let { distPath, publicPath } = require('./config');

module.exports = (env = {}, argv) => {
  let prodMode = argv.mode === 'production';
  let prodConfig = {
    output: {
      path: distPath,
      publicPath: publicPath,
      crossOriginLoading: 'anonymous',
      filename: "[name]/[name].[chunkhash:8].js",
      chunkFilename: "[name]/[name].[chunkhash:8].js"
    },
    devtool: '#source-map',
    plugins: [
      // more:https://github.com/johnagan/clean-webpack-plugin
      new CleanWebpackPlugin(['*'], {
        root: distPath,
        verbose: true,
        dry: false
      })
    ]
  }
  return merge(baseWebpackConfig(env, prodMode), prodConfig);
}