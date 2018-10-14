"use strict";
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');
let { port, host, srcPath, openPage } = require('./config');

module.exports = (env = {}, argv) => {
  let prodMode = argv.mode === 'production';
  console.log(`打开地址如下：http://${host}:${port}`)
  return merge(baseWebpackConfig(env, prodMode), {
    // more:https://webpack.docschina.org/configuration/dev-server/
    devServer: {
      contentBase: srcPath,
      noInfo: true,
      hot: true,
      open: true,
      inline: true,
      openPage: openPage,
      overlay: {
        warnings: true,
        errors: true
      },
      historyApiFallback: true,
      port: port,
      host: host
    },
    // devtool: '#cheap-module-eval-source-map',
    devtool: 'none',   // 这里devtool只能使用soure-map,其他的会报错：script error
    plugins: [
      // more:https://webpack.docschina.org/plugins/hot-module-replacement-plugin/
      new webpack.HotModuleReplacementPlugin(),
      // 用户名替代id，more:https://webpack.docschina.org/plugins/named-modules-plugin/
      new webpack.NamedModulesPlugin(),
    ]
  });
}
