- [异步编程](#异步编程)
	- [以往的异步编程模式](#以往的异步编程模式)
- [期约](#期约)
	- [期约基础](#期约基础)
		- [期约状态机](#期约状态机)
		- [期约的内部值](#期约的内部值)
		- [通过执行函数控制期约状态](#通过执行函数控制期约状态)
		- [promise.resolve()](#promiseresolve)
		- [Promise.rejcet()](#promiserejcet)
		- [同步/异步执行的二元性](#同步异步执行的二元性)
	- [期约的实例方法](#期约的实例方法)
		- [Thenable接口](#thenable接口)
		- [Promise.prototype.then()](#promiseprototypethen)
# 异步编程
## 以往的异步编程模式
异步返回值,回调函数
```  js
function double(value, callback) {
	setTimeout(() => {
		callback(value * 2)
	}, 200);
}

double(3, (x) => { console.log(x); }) // 6
```
失败处理
``` js
function double(value, success, failure) {
	setTimeout(() => {
		try {
			if (typeof value != 'number') {
				throw 'Must provide number as first argument'
			}
			success(value)
		} catch (error) {
			failure(error)
		}
	}, 200);
}

double(3, (x) => {  // Success: 3
	console.log(`Success: ${x}`);
}, (x) => {
	console.log(`Failure: ${x}`);
})

double('3', (x) => { // Failure: Must provide number as first argument
	console.log(`Success: ${x}`);
}, (x) => {
	console.log(`Failure: ${x}`);
})
```
嵌套异步回调
``` js
function double(value, success, failure) {
	setTimeout(() => {
		try {
			if (typeof value != 'number') {
				throw 'Must provide number as first argument'
			}
			success(value * 2)
		} catch (error) {
			failure(error)
		}
	}, 200);
}


function triple(value, success, failure) {
	setTimeout(() => {
		try {
			if (value >= 10) {
				throw 'number must less 10'
			}
			success(value * 3)
		} catch (error) {
			failure(error)
		}
	}, 200);
}

// 成功的回调，去进行3倍处理
const successCallback = (x) => {
	triple(x,
		(x) => console.log(`triple success: ${x}`),
		(x) => console.log(`triple error: ${x}`)
	)
}

double('2', successCallback, (x) => { console.log(`Failure: ${x}`); }) // Failure: Must provide number as first argument
double(10, successCallback, (x) => { console.log(`Failure: ${x}`); }) // triple error: number must less 10
double(3, successCallback, (x) => { console.log(`Failure: ${x}`); })  // triple success: 18
```
# 期约
## 期约基础
### 期约状态机
+ pending
+ fulfilled
+ rejected

期约故意将异步行为封装起来，从而隔离外部代码。
### 期约的内部值
只要期约的状态切换为fulfilled，则内部会生成一个value值。 若是期约状态切换为rejected，则内部会生成一个私有的reason。
### 通过执行函数控制期约状态
两个参数：resolve和reject
``` js
new Promise((resolve,reject)=> {})
```
异步执行
``` js
let p = new Promise(() => setTimeout(() => {
	console.log('promise fuilfilled')
}, 100))
console.log(p)
// Promise { <pending> }
// promise fuilfilled
```
resolve()或reject()哪个被调用，另一个就不会执行了。换句话，期约状态转变后，就不可撤销了。

为避免期约卡在待定状态，可以添加定时退出功能
``` js
let p = new Promise((resolve, rejcet) => {
	setTimeout(() => { rejcet() }, 200);
	// ... 其他代码逻辑
})
setTimeout(() => {
	console.log(p); //  Promise { <rejected> undefined }
}, 1000);
```
### promise.resolve()
期约并非一开始就必须处于待定状态，再通过执行器函数才会转换为fuilfiiled或者rejected.可以直接通过Promise.resolve()实例化一个解决了的期约
``` js
let p1 = new Promise((resolve, rejcet) => resolve())
let p2 = Promise.resolve()
console.log(p1, p2); // Promise { undefined } Promise { undefined } 
```
可以将任何值装欢为一个期约
``` js
setTimeout(console.log, 200, Promise.resolve(3)); // Promise {<fulfilled>: 3}
```
对于这个方法而言，若是传入的参数本身是一个期约，则去行为类似一个空包装。因此可以说Promise.resolve()可以说是一个幂等方法（其任意多次执行所产生的影响均与一次执行的影响相同）
``` js
let p = Promise.resolve(7)
setTimeout(console.log, 200, p === Promise.resolve(p)); // true
setTimeout(console.log, 200, p === Promise.resolve(Promise.resolve(p))); // true
```
对于这个方法而言，其会保存传入的的期约的状态
``` js
let p = new Promise((resolve, reject) => setTimeout(() => {
	resolve()
}, 200))

setTimeout((x) => {
	console.log(x)
}, 100, Promise.resolve(p)); // Promise { <pending> }
setTimeout((x) => {
	console.log(x);
}, 300, Promise.resolve(p)); // Promise { undefined }
```
因为其可以传入任何非期约值，包括错误对象，并转换为fulfilled的期约，因此可能导致不符合预期的行为
``` js
let p = Promise.resolve(new Error('error'))

setTimeout(console.log, 200, p); // Promise {<fulfilled>: Error: error
```
### Promise.rejcet()
与Promise.resolve()类似。Promise.reject()会实例化一个拒绝期约并抛出一个异步错误(但是这个错误无法被try catch获取，只能通过拒绝处理程序捕获).

其参数就是拒绝期约的理由
``` js
let p = Promise.reject(3)
setTimeout(console.log, 200, p); //Promise { <rejected> 3 } 
p.then(null, (e) => {
	setTimeout((x) => {
		console.log(x)  // 3
	}, 200, e)
})
```
Promise.reject()与Promise.resolve()的幂等逻辑不同。如果传入期约，那么这个期约会成为他返回的拒绝期约的理由。
``` js
setTimeout(console.log, 0, Promise.reject(Promise.resolve()))
// Promise {<rejected>: Promise}
```
### 同步/异步执行的二元性
Promise的设计很大程度上，会导致一种完全不同与JavaScript的计算模式.如下式随让抛出错误，但是没有捕获到
``` js
try {
	Promise.reject(new Error('promise error'))
} catch (error) {
	console.log(error); // Uncaught (in promise) Error: promise error
}
```
## 期约的实例方法
### Thenable接口
在ECMAScript暴露的异步结构中，任何对象都有一个then()方法。该方法被认为实现了Thenable接口
### Promise.prototype.then()
Promise