# 技术胖vue视频学习问题整理

## vue-cli配置文件并全局引入scss公共方法 
<p align="right">2019-07-31</p>

&emsp;&emsp;在编写*searchBar组件*过程中，发现居中等公共样式可以使用 `scss` 的 `mixin` 方法封装成统一的居中函数。由于该类样式使用频繁，所以最好的引用方式是一次性引用而不是每个模块使用时再单独引入，由此引出 `vue-cli` 配置全局 `scss` 这个问题。  

&emsp;&emsp;由于本项目使用`vue-cli3.0`创建，所以我们要自己手动创建配置文件`vue.config.js`  
  
&emsp;&emsp;`vue.config.js` 是一个可选的配置文件，如果项目的 (和  `package.json` 同级的) 根目录中存在这个文件，那么它会被 `@vue/cli-service` 自动加载。你也可以使用 `package.json` 中的 `vue` 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写。  

这个文件应该导出一个包含了选项的对象
```
// vue.config.js
module.expores = {
// 选项...
}
```
&emsp;&emsp;scss全局引入配置方法：
```
// vue.config.js
module.expores = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 以本项目为例，我们的公共scss样式是写在src/assets/common/common.scss 中的
        data: `@import "@/assets/common/common.scss";`
      }
    }
  }
}
```
当我们在vue.config.js中配置完相关路径后，再在`main.js`中进行相应引入，就可以达到引入一次，全局使用了。  
```
//main.js中引入全局scss
import "@/assets/common/common.scss";
```