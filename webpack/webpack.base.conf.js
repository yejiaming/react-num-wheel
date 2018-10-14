"use strict";
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const os = require('os');
let happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
let { getEntry, getHtmlWebpackPlugin } = require('./utils');
let { srcPath, nodeModulesPath, pagePath, dllPath, imgPathName, publicPath, className, stylePathName } = require('./config');

module.exports = (env = {}, prodMode) => {
  var baseConfig = {
    entry: getEntry(pagePath),
    module: {
      rules: [
        // more:https://github.com/gaearon/react-hot-loader
        {
          test: /\.jsx?$/,
          // include: srcPath,
          use: "happypack/loader?id=babel"
        },
        // more:https://github.com/webpack-contrib/url-loader
        // 依赖于file-loader,more:https://github.com/webpack-contrib/file-loader
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [{
            loader: "url-loader",
            options: {
              limit: 10000,
              name: imgPathName,
              publicPath: publicPath       // 目的是为了在生产环境下路劲指向正确的目录
            }
          }]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [{
            loader: "url-loader",
            options: {
              limit: 10000,
              name: imgPathName,
              publicPath: publicPath
            }
          }]
        },
        {
          test: /\.(less|css)/,
          exclude: nodeModulesPath,
          use: [
            // more:https://github.com/webpack-contrib/style-loader
            {
              loader: prodMode ? MiniCssExtractPlugin.loader : "style-loader"
            },
            // more:https://github.com/webpack-contrib/css-loader
            {
              loader: 'css-loader',
              options: {
                minimize: prodMode, //css压缩
                modules: true,
                importLoaders: 1,
                localIdentName: className  // css modules模块化路径配置
              }
            },
            // more:https://github.com/postcss/postcss-loader
            {
              loader: 'postcss-loader',
            },
            // more:https://github.com/webpack-contrib/less-loader
            {
              loader: 'less-loader'
            }
          ]
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
        srcPath,
        nodeModulesPath
      ],
      alias: {
        '@': srcPath,
        'react': path.resolve(nodeModulesPath, './react/umd/react.development.js'),
        "react-dom": path.resolve(nodeModulesPath, './react-dom/umd/react-dom.development.js'),
        "styles": path.resolve(srcPath, './assets/styles/'),
        "@images": path.resolve(srcPath, './assets/images/'),
        "@utils": path.resolve(srcPath, './utils/'),
        "@service": path.resolve(srcPath, './service/'),
        '@assets': path.resolve(srcPath, './assets/'),
        '@pages': path.resolve(srcPath, './pages/'),
        '@components': path.resolve(srcPath, './components/'),
      }
    },
    plugins: [
      ...getHtmlWebpackPlugin(pagePath),
      // 配置好Dll，more:https://webpack.docschina.org/plugins/dll-plugin/
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(path.resolve(dllPath, './vendor.manifest.json')), // 指定manifest.json
      }),
      // 作用域提升优化，more:https://webpack.docschina.org/plugins/module-concatenation-plugin/
      new webpack.optimize.ModuleConcatenationPlugin(),
      // 提取CSS，more:https://github.com/webpack-contrib/mini-css-extract-plugin
      new MiniCssExtractPlugin({
        filename: stylePathName,
        chunkFilename: stylePathName
      }),
      // more:https://github.com/SimenB/add-asset-html-webpack-plugin
      new AddAssetHtmlPlugin([{
        filepath: path.resolve(dllPath, './vendor.dll.js'),
        publicPath: publicPath,
        includeSourcemap: false,
      }]),
      // more:https://github.com/amireh/happypack
      // more:https://github.com/babel/babel-loader
      new HappyPack({
        id: 'babel',
        threadPool: happyThreadPool,
        loaders: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }],
      }),
      // more:https://github.com/chalk/chalk
      // more:https://github.com/clessg/progress-bar-webpack-plugin
      new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
      }),
    ]
  }
  // 分析webpack打包大小
  env.analyze && baseConfig.plugins.push(new BundleAnalyzerPlugin())
  return baseConfig;
}