Promise.all  
一个Promise在调用成功后到达.then，失败触发.catch。  
这种情况，如果想无论成功还是失败都进行一些操作，可以使用Promise.all  
```
new Promise ((resolve, reject) => {
  //doSomething
  resolve(res)
}).then()
.catch()
.finally(() => {
  //finally here
})
```

Array.flat()  
flat()可以按照一个给定的深度遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。（需要考虑兼容性）  
```
//数组降维
var arr = [1, 2, 3, [3, 5, [2, 4], 4], 7]
arr.flat()        //[1, 2, 3, 3, 5, [2, 4], 4, 7]
arr.flat(2)       // [1, 2, 3, 3, 5, 2, 4, 4, 7]
arr,flat(Infinity)    //同上。Infinity作为深度，展开任意维度的嵌套数组。

//数组去除空项
var arr = [1, 2, 3, ,4, 5]
arr.flat();       //  [1 2, 3, 4, 5]    

//两个功能。顺序是先降维，再去除空项
var arr = [1, 2, , 3, 4, [5, , 6, [7, , 8]]]
arr.flat()       //[1, 2, 3, 4, 5, 6, [7, , 8]]     同样，如果flat()设置参数的number，就会降维numbe度
```

Array.flatMap()    
类似是map()和flat()的结合，既可处理元素，又可降维/结构深度 depth 值为1/数组。  
顺序是先map()后flat()——需要考虑兼容性  
```
var arr1 = [1, 2, 3, 4];
arr.map(x => [x * 2]);           //[[2], [4], [6], [8]]
arr1.flatMap(x => [x * 2]);         // [2, 4, 6, 8]

let arr1 = ["aa bb cc", "", "dd"];                       //map处理之后降维1度
arr1.map(x => x.split(" "));          // [["aa", "bb", "cc"], [""], ["dd"]]
arr1.flatMap(x => x.split(" "));          //["aa", "bb", "cc", "", "dd"]

//在map期间实现增减项目
var arr = [3, 4, 5, -3, 12, -14, 45, 20]
arr.flatMap(n => 
  n <0 ? [] :
  n %2 == 0 ? [n] :
  [n, n-1]
)                                       //[3, 2, 4, 3, 5, 4, 12, 45, 44, 20]
```