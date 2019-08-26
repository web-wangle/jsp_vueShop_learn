# 技术胖vue视频学习问题整理
<!-- TOC -->

- [技术胖vue视频学习问题整理](#技术胖vue视频学习问题整理)
  - [1.vue-cli配置文件并全局引入scss公共方法](#1vue-cli配置文件并全局引入scss公共方法)
  - [2.第43课中的一个错误问题](#2第43课中的一个错误问题)

<!-- /TOC -->
## 1.vue-cli配置文件并全局引入scss公共方法 
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
## 2.第43课中的一个错误问题
<p align="right">2019-08-26</p>

&emsp;&emsp;由于自己看的是免费的文字教程，所以是以博客文字内容为主。学习到第43课时发现一直获取不到返回结果。经过`console.log`打印过后，发现`categoryId`获取的值为**undefined**，`/getCategorySubList`路由在文字教程中使用的是`router.get`方法，但是在获取入参时使用的却是`ctx.request.body`方法。这里我们需要了解的是，`get`方法应该使用`ctx.request.query`方法获取参数。在查阅过博主的源代码后，发现博主最终该处使用的是`post`请求而非`get`请求，所以各位小伙伴们在学习的时候需要注意，不能照搬照抄。