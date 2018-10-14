let { vwWdith } = require('./webpack/config');
module.exports = {
  "plugins": [
    // more:https://github.com/postcss/autoprefixer
    require('autoprefixer')({
      browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 35',
        'Firefox >= 31',
        'Explorer >= 9',
        'iOS >= 7',
        'Opera >= 12',
        'Safari >= 7.1',
      ]
    }),
    // more:https://github.com/jonathantneal/postcss-write-svg
    require('postcss-write-svg')({ utf8: false }),
    // more:https://github.com/evrone/postcss-px-to-viewport
    require('postcss-px-to-viewport')({
      viewportWidth: vwWdith,                             // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 3,                                   // 指定`px`转换为视窗单位值的小数位数
      viewportUnit: 'vw',                                 // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [],                              // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1,                                   // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false                                   // 是否允许在媒体查询中转换`px` 
    }),
  ]
}