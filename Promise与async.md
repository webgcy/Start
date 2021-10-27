# Promise  
## 一、Promise.all 与 Promise.race 与 Promise.finally   
**Promise.finally**：无论Promise处理成功还是失败，都可以进行一些操作  
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


**Promise.all**：进行并发异步操作时，等待操作都完成后才会进入.then()。  
同时，成功和失败的返回值是不同的，成功时返回的是一个结果数组，而失败则返回最先被reject失败状态的值。  
另外，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的。  
```
let a = new Promise((resolve, reject) => {
  resolve('Hello');
});
let b = new Promise((resolve, reject) => {
  resolve('Wrold');
});
let c = new Promise((resolve, reject) => {
  reject('Light');
});

Promise.all([a, b]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});                  //  ['Hello', 'Wrold']
Promise.all([a, b, c]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});                  //  'Light'
```

**Promise.race**：用法类似Promise.all，接收的异步迭代数组中，哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。  
返回一个Promise，此Promise状态与值取决于异步迭代数组中最先成功或失败的结果。  
```
let a = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1500)
});
let b = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failure')
  }, 1000)
});

Promise.race([a, b]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})                  // 'failure'
```


## 二、Promise调用then后的第二个参数（err）与catch（err）的区别。  
先说结论，在Promise().then(res..., err...).catch()中，如果Promise内部抛出错误，则采用就近原则，err执行，如果没有err则catch获取错误。
如果.then中的res抛出错误，这时只有catch可以抓取错误。  
```
new Promise((resolve, reject) => {
  throw new Error('test');
}).then(res => {
  console.log(res);
}, err => {
  console.log(err + '111');
}).catch(err => {
  console.log(err + '222');
})                        // 'Error: test111'

new Promise((resolve, reject) => {
  resolve('test001');
}).then(res => {
  throw new Error('res')
}, err => {
  console.log(err + '111');
}).catch(err => {
  console.log(err + '222');
})                       // "Error: res222"
```


catch也是Promise的一个语法糖，也是通过.then()实现的。  
```
Promise.prototype.catch = function(fn) {
  return this.then(null, fn);
}
```


# 重学async与await  
## async与await用法  
之前一直认为async是promise的语法糖，但实际上并不是，写得少导致记忆偏差，现在重新学习  
```
function testPromise () {
  return new Promise (resolve => {
    setTimeout(function() {
      console.log('China')
      resolve();
    }, 1000)
  })
}

async function helloworld() {
  await testPromise();
  console.log('Hello World');
}
console.log(helloworld())             // Promise {<pending>} ,    China  ,  Hello World
helloworld()                                // China  ,  Hello World
```
**async**返回的是一个Promise的对象，可以用.then的方法调用。执行时，遇到await会暂停执行，等触发的异步操作完成后，
恢复async函数的执行并返回解析值。await仅在async function内部有效，放在外部将会报错。  
await用于等待一个Promise对象，等待这个Promise的resolve()完成后返回的结果。如果等待的不是Promise，将返回等待值本身(字符串，布尔值，数值，函数)
```
function test1 (a) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(a);
    }, 1000)
  })
}

async function hello () {
  let x = await test1('Hello');
  console.log(x)
}
hello();                           // Hello
```

## 加入try，catch，finally的async  
首先，来看一下try，catch，finally的作用  
**try**：允许定义在执行时进行错误测试的代码块。
**catch**：允许定义当 try 代码块发生错误时，所执行的代码块。
**finally**：在 try 和 catch 之后无论有无异常都会执行。  
```
async function getData() {
    try {
      let msg = await new Promise(resolve => {
        resolve('hello');
      })
      console.log(msg);
    } catch (err) {
      console.log(err)   
    } finally {
      console.log('ANYWAY')
    }
}
getData();    // hello ANYWAY


await中报错直接跳到步骤catch。如果 await值正常，try中后续代码报错，则跳转catch。  
async function getData1() {
    try {
      let msg = await new Promise(resolve => {
        throw new Error('error111');
      });
      throw new Error('error222')
      console.log(msg);
    } catch(err) {
      console.log(err, 'outer')
    };
}
getData1()  //  Error: error111 "outer"
```
