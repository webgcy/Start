使用JavaScript实现一个once函数，要求函数只执行一次，再次传值执行只返回第一次的值。  
要求：  
```
const addOnce = once(function(a, b) {
    return a + b
});
addOnce(1, 2)   // 3
addOnce(1, 99)  // 3 
```

思路： 利用闭包  
```
function once(fn) {
    let res;
    return function(...args) {
        if (!fn) return res;
        res = fn(...args);
        fn = undefined;
        return res
    }
}
```