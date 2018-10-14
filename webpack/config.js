const path = require('path');

module.exports = {
  srcPath: path.join(__dirname, '../src'),
  pagePath: path.join(__dirname, '../src/pages'),
  utilsPath: path.join(__dirname, '../src/utils'),
  dllPath: path.join(__dirname, '../src/assets/dll'),
  distPath: path.join(__dirname, '../dist'),
  nodeModulesPath: path.join(__dirname, '../node_modules'),
  // host: process.env.HOST || "demo.m.taobao.com",       // ip配置
  host: process.env.HOST || "0.0.0.0",                    // ip配置
  port: process.env.PORT || "8080",                       // 端口号配置
  imgPathName: "media/[name].[hash:8].[ext]",             // 图片文件名称
  publicPath: "../",                                   // 打包之后的路径配置 
  // publicPath: "http://g.assets.daily.taobao.net/rcfed/shopkeeper/0.0.1/",
  stylePathName: "[name]/[name].[contenthash:8].css",     // 提取CSS之后的文件名称
  className: "[local]",                   // classname的样式名称的CSS module命名规则，建议值：[local]_[hash:base64:8]
  verdorPaths: [                          // 需要提取的公共的第三方插件
    "react",
    // "react-css-modules",
    // "create-react-class",
    // "react-router-dom",
    // "prop-types",
    // "classnames",
    "react-dom",
  ],
  vwWdith: 750,                            // 视口宽度，根据UI给的图来设置
}