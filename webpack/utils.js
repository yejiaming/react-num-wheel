const globby = require('globby');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let { srcPath, pagePath, utilsPath } = require('./config');

const utils = {
  /**
   * 获取某一个目录下所有的的文件名称，并以数组形式返回
   * @param {string} dir 
   */
  getFiles(dir) {
    // more:https://github.com/sindresorhus/globby
    let files = globby.sync(['*'], { cwd: dir });
    return files;
  },
  /**
   * 多页和单页设置entry
   * @param {多页面的父级目录} dir 
   */
  getEntry(dir) {
    let entry = {};
    // 看是否有配置--pages
    let pages = utils.getDynamicEntries();
    let files = utils.getFiles(dir);
    // 如果项目是SPA方式，那么pages下可以不设置单独建立页面目录，只需要满足有index.jsx即可
    if (files.indexOf('index.jsx') >= 0 || files.indexOf('index.js') >= 0) {
      entry = [
        path.resolve(pagePath, './index.jsx'),
      ]
    } else {
      let realPages = pages.length > 0 ? pages : files;
      let realPagesName = [];
      // 多页面打包方式必须满足pages下面包含单个或多个页面目录
      realPages.forEach(function (item) {
        realPagesName.push(item);
        if (files.indexOf(item) >= 0) {    // 过滤可能出现填写页面名称错误的情况
          entry[item] = [
            path.resolve(pagePath, item + '/index.jsx'),
          ];
        }
      });
      console.log(`正在对以下页面打包：${JSON.stringify(realPagesName)}`)
    }
    return entry;
  },
  /**
   * 多页和单页面设置HTML模板
   * @param {多页面的父级目录} dir 
   */
  getHtmlWebpackPlugin(dir) {
    let templetes = [];
    let pages = utils.getDynamicEntries();
    let files = utils.getFiles(dir);
    // SPA方式的打包模板
    if (files.indexOf('index.jsx') >= 0 || files.indexOf('index.js') >= 0) {
      templetes.push(
        // 配置html模板，并注入依赖的JS和CSS，more:https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
          template: path.resolve(srcPath, 'template.html'),
          files: {
            css: ['style.css'],
            js: "[name].[chunkhash:8].js",
          },
          filename: 'index.html',
          inject: 'body'
        })
      )
    } else {
      let realPages = pages.length > 0 ? pages : files;
      // 多页面打包方式必须满足pages下面包含单个或多个页面目录
      realPages.forEach(function (item) {
        if (files.indexOf(item) >= 0) {    // 过滤可能出现填写页面名称错误的情况
          let config = {
            template: path.resolve(srcPath, 'template.html'),
            files: {
              css: ['style.css'],
              js: "[name].[chunkhash:8].js",
            },
            filename: item + '/index.html',
            inject: 'body',
            chunks: [item]
          };
          try {
            tmplConfig = require(path.resolve(pagePath, item, 'config.json'));
            config.title = tmplConfig.title || '';
          } catch (err) {
            console.log(`请对${item}页面增加config.json文件，来设置页面title`)
          }
          templetes.push(
            // 配置html模板，并注入依赖的JS和CSS，more:https://github.com/jantimon/html-webpack-plugin
            new HtmlWebpackPlugin(config)
          )
        }
      });
    }
    return templetes;
  },
  /**
   * 根据入参进行动态读取
   * 如， npm run dev --pages=spa,mulitple         // 这样就是打包针对pages目录下的sap/mulitple两个页面
   * 支持 npm run dev                                   // 默认这样就是打包针对所有页面
   * 生产环境同样支持上述的构建方式
   */
  getDynamicEntries() {
    // 支持三种参数：--pages，--page，--p
    let pagesString = process.env.npm_config_pages || process.env.npm_config_page || process.env.npm_config_p;
    if (pagesString === "true") { // 防止出现 --pages等于空的情况
      pagesString = "";
    }
    let pagesArray = [];
    //替换所有的空格（中文空格、英文空格都会被替换）
    pagesString = pagesString && pagesString.replace(/\s/g, "");
    if (pagesString && typeof pagesString === 'string') {
      pagesArray = pagesString.split(',');
    }
    return utils.unique(pagesArray);
  },
  // 去重一个数组
  unique(array) {
    // res用来存储结果
    var res = [];
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
      for (var j = 0, resLen = res.length; j < resLen; j++) {
        if (array[i] === res[j]) {
          break;
        }
      }
      // 如果array[i]是唯一的，那么执行完循环，j等于resLen
      if (j === resLen) {
        res.push(array[i])
      }
    }
    return res;
  }
}

module.exports = utils;