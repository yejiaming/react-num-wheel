# NumWheel 数字滚动特效组件
## 安装

```bash
npm i -S react-num-wheel
```

## 参数说明

```js
// 设置参数类型
NumWheel.propTypes = {
  className: PropTypes.string,                                      // 自定义样式名称
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 滚动的数字值
  separate: PropTypes.string,                                       // 数字千分位分隔符，默认是，
}
```

## 用法

```jsx
import { NumWheel } from 'react-num-wheel';
<NumWheel value={value} />
```

## 发布
* 本项目可以作为平常的开发项目来使用，用法如下：
  1. 把该项目`git clone`到本地
  2. `npm install`
  3. `npm run start` 或者 `npm run page`
  4. 浏览器打开：`http://localhost:8080/组件名称`，就可以看到本组件的开发原始案例了
  5. 开发完成要发布上线的话，可以运行` npm run build `即可在本地dist目录下看到压缩之后的发布包了

* 本项目也可以作为开发自己的 `react library` 来使用，用法如下：
  1. 这里如果要开发自己的`react library`，就可以修改`components` 目录下的组件，开发自己的组件即可
  2. npm run publish 发布开发好的包到本地 lib 目录下
  3. 自己本地开发完成要发布npm的话，查看下面npm publish 流程

## npm publish

```bash
 # 如果npm设置了国内镜像，要先设置成npm原来的镜像地址，否则不用这一步
npm config set registry https://registry.npm.taobao.org
# 登录 npm，没有的话需要去 npm 官网注册一个账号
npm login
# 发布，这里如果重新发布，需要加大package.json中的version，这里要注意如果报错了，那可能是package.json中的name（name不能大写）属性和第三方的重名了，需要修改成唯一才能发布
npm publish
```