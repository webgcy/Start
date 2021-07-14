1、在项目的vue.config.js的module.exports中遇到了 *productionSourceMap: false* 属性
```
productionSourceMap
Type: boolean;
Default: true;
```
它是用来设置生产环境的*source map*开启与关闭。决定生产环境是否生成 sourceMap 文件。  
*source map*直译就是资源地图，作用就是定位，定位浏览器控制台输出语句在项目文件的位置。  
如果设置false，js文件在控制台输出语句的定位就不准确，且打包文件时会没有.map文件。