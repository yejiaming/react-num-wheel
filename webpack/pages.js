/**
 * 该配置是为了命令行可视化打包开发需要开发的页面，以免不必要的全量打包，精简页面可以更快的开发（热加载）和构建
 */
const inquirer = require('inquirer');
const shell = require('shelljs');
let { pagePath } = require('./config');
let { getFiles } = require('./utils.js');

let currentEnv = null;                                        // 环境
let choicesPages = [{ name: 'all', value: 'all' }];    // 默认页面选择
choicesPages = choicesPages.concat(getPages());
inquirerEnv().then((env) => {
  currentEnv = env;
  inquirerPages(choicesPages).then((pages) => {
    execCompnent(pages, currentEnv);
  })
})

// 单页SPA不做处理，直接运行，只处理多页情况
function getPages() {
  let pages = [];
  let files = getFiles(pagePath);
  if (files.indexOf('index.jsx') >= 0 || files.indexOf('index.js') >= 0) {
    console.log('单页SPA不做处理，请直接运行：npm run dev 和 npm run build');
  } else {
    files.forEach((item, index) => {
      pages.push({
        name: item,
        value: `${item}`
      })
    })
  }
  return pages;
}

// 询问选择打包环境，more:https://github.com/SBoudrias/Inquirer.js/
function inquirerEnv() {
  return new Promise((resolve) => {
    inquirer.prompt([
      {
        type: 'list', // 多选
        name: 'select-env',
        choices: [{
          name: '开发',
          value: 'dev',
        }, {
          name: '生产',
          value: 'build',
        }],
        message: '请选择需要打包的环境:'
      }
    ]).then((answers) => {
      let env = answers['select-env'];
      console.log(`您选择的环境是：${env === 'dev' ? '开发-dev' : '生产-build'}`)
      resolve(env);
    })
  })
}

// 询问选择打包页面
function inquirerPages(choices) {
  return new Promise((resolve) => {
    inquirer.prompt([
      {
        type: 'checkbox', // 多选
        name: 'select-page',
        choices: choices,
        message: '请选择需要打包的页面:'
      }
    ]).then((answers) => {
      let pages = answers['select-page'];
      pages = pages.join(',');
      if (pages.indexOf('all') >= 0) { // 如果有all就全部打包
        pages = null;
      }
      console.log(`你的选择的页面有：${pages ? JSON.stringify(pages) : '所有页面'}，正在执行打包页面命令，请稍后...`)
      resolve(pages);
    })
  })
}
/**
 * 组件数组
 * @param {*} pages ["pageA","pageB"]
 */
function execCompnent(pages, env = 'dev') {
  let currentEnv = env;
  pages = pages ? `--pages=${pages}` : '';
  console.log(`npm run ${currentEnv} ${pages}`);  // 打印类似：npm run dev --pages=pageA,pageB
  // 由于exec()现在同步方法的实现占用了大量CPU，所以这里使用async异步模式保活的进程，shelljs其实分装的就是child_process
  // more:https://github.com/shelljs/shelljs
  shell.exec(`npm run ${currentEnv} ${pages}`, { async: true });
}