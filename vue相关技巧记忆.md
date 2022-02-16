# vue-router的beforeEach( ( to,from,next)=>{ } )  
## to.fullPath  
路由跳转其实具有刷新的功能，fullPath能缓存路由跳转后面携带的参数，使其刷新后依旧存在
而 path则是不能缓存 路由跳转后面携带的参数  
```
to.path - 当前的路径，始终解析为绝对路径。
to.fullPath - 完整的解析URL包含查询参数和哈希。
```
## next( ) 参数问题  
next（ false） 可传false，当用户点击浏览器后退按钮时，url地址会重置到from路由对象的地址（通俗说，就是路由不会跳转了！无法回退）  
next（ "/"）或者 next（{path："/"}）可以传路径,它会跳转到不同地址。例如：当用户访问路由名为play的页面时，它会直接重定向到路径为 “ /news ” 的页面。
```
router.beforeEach((to,from,next)=>{
    if(to.name == "play"){
        next({path:"/news"})
    }
    next()
})
```


# vue指令 v-for列表的 key
## 不使用 key 或者 用index作为key  
v-for数组使用:key = index
```
let arr = [data1, data2, data3, data4]
key(index):   0      1      2      3  
value:      data1  data2  data3  data4

如果在arr[1]与arr[2]中插入一个data5；
let arr = [data1, data2, data5, data3, data4]
key(index):   0      1      2      3      4
value:      data1  data2  data5  data3  data4

除了arr[0]与arr[1]，插入的元素data5至后面的全部元素，对应的位置关系发生了变更。所以在 patch 过程中会将它们全都执行更新操作，再重新渲染。

```


## 使用唯一 key
用数据的id做key（猜测）
```
let arr = [data1, data2, data3, data4]
key:    id1    id2    id3    id4
value: data1  data2  data3  data4

如果在arr[1]与arr[2]中插入一个data5；
let arr = [data1, data2, data5, data3, data4]
key:    id1    id2    id5    id3    id4
value: data1  data2  data5  data3  data4

如此只有 data5 重新渲染。其后的值 key 对应 value 皆未发生改变，不会重新渲染。
```


## Array.protoType.push, Array.protoType.concat
push()，pop()的返回值是数组push后的length，而concat的返回值是一个新的有处理结果的数组
```
let a = [1, 2, 3];
a.push(4)  // 4  a: [1, 2, 3, 4]
a.pop()  // 2 a: [1, 2]
```


# vue指令 v-on修饰符 / v-model修饰符
## v-on修饰符  
.stop - 调用 event.stopPropagation()。  
.prevent - 调用 event.preventDefault()。  
.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。  
.native - 监听组件根元素的原生事件。  
.once - 只触发一次回调。


## v-model修饰符  
**v-model.lazy**  
lazy修饰符可以让数据在失去焦点或者回车时才会更新  

**v-model.number**  
number修饰符可以让在输入框中输入的内容自动转成数字类型  

**v-model.trim**  
trim修饰符可以过滤内容左右两边的空格  



