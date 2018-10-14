const path = require('path');
const execSync = require('child_process').execSync;
const pascalCase = require('pascal-case');

process.chdir(path.resolve(__dirname, '..'));

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  });

const packageName = require('../package.json').name;

console.log('\nBuilding CommonJS modules...');

exec(`rollup -c rollup/config.js -f cjs -o lib/cjs/${packageName}.js`);

console.log('\nBuilding ES modules...');

exec(`rollup -c rollup/config.js -f es -o lib/esm/${packageName}.js`);

console.log('\nBuilding UMD modules...');

exec(
  `rollup -c rollup/config.js -f umd -n ${pascalCase(
    packageName
  )} -o lib/umd/${packageName}.js`,
  {
    BUILD_ENV: 'development'
  }
);

exec(
  `rollup -c rollup/config.js -f umd -n ${pascalCase(
    packageName
  )} -o lib/umd/${packageName}.min.js`,
  {
    BUILD_ENV: 'production'
  }
);
