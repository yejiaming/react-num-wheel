const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const babel = require('rollup-plugin-babel');
const postcss = require('rollup-plugin-postcss');
const commonjs = require('rollup-plugin-commonjs');
const { uglify } = require('rollup-plugin-uglify');

const getPlugins = (env) => {
  const plugins = [
    resolve(),
    postcss({
      extensions: ['.css'],
      // extract: 'lib/css/bundle.css' // 如果不设置该输出路径，那就就会直接将解析之后的CSS 打包注入到最终的JS中
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true,
      plugins: ["@babel/plugin-external-helpers"]
    }),
    commonjs({
      include: /node_modules/
    })
  ]
  if (env === 'production') {
    plugins.push(uglify())
  }
  return plugins
}

const rollupConfig = {
  input: 'src/components/index.js',
  output: {
    globals: {
      'react': 'React',
      'prop-types': 'PropTypes',
      'react-dom': 'ReactDOM',
    }
  },
  onwarn: function (warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') { return; }
    console.warn(warning.message);
  },
  external: ['react', 'prop-types', 'react-dom'],
  plugins: getPlugins(process.env.BUILD_ENV)
}

module.exports = rollupConfig
