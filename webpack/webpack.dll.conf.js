"use strict";
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let { dllPath, verdorPaths, nodeModulesPath } = require('./config');

module.exports = {
  entry: {
    vendor: verdorPaths
  },
  output: {
    path: dllPath,
    filename: '[name].dll.js', //输出动态连接库的文件名称
    library: '_dll_[name]' //全局变量名称
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'react': path.resolve(nodeModulesPath, './react/umd/react.development.js'),
      "react-dom": path.resolve(nodeModulesPath, './react-dom/umd/react-dom.development.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(less|css)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          // more:https://github.com/webpack-contrib/css-loader
          {
            loader: 'css-loader',
            options: {
              minimize: true, //css压缩
            }
          },
        ]
      },
    ]
  },
  plugins: [
    // more:https://webpack.docschina.org/plugins/dll-plugin/
    new webpack.DllPlugin({
      context: __dirname,
      name: '_dll_[name]', //和output.library中一致，也就是输出的manifest.json中的 name值
      path: path.resolve(dllPath, '[name].manifest.json')
    }),
    new MiniCssExtractPlugin({
      filename: "[name].dll.css",
      chunkFilename: "[id].dll.css"
    }),
  ]
}