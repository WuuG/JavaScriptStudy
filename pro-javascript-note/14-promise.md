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
		- [Promise.prototype.catch()](#promiseprototypecatch)
		- [Promise.prototype.finally()](#promiseprototypefinally)
		- [非重入期约方法](#非重入期约方法)
		- [临近处理程序的执行顺序](#临近处理程序的执行顺序)
		- [传递解决值和拒绝理由](#传递解决值和拒绝理由)
		- [拒绝期约与拒绝错误处理](#拒绝期约与拒绝错误处理)
		- [期约连锁与合成](#期约连锁与合成)
			- [期约连锁](#期约连锁)
			- [Promise.all()和Promise.race()](#promiseall和promiserace)
			- [串行期约合成](#串行期约合成)
		- [期约拓展](#期约拓展)
			- [期约取消](#期约取消)
			- [期约进度通知](#期约进度通知)
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
Promise.prototype.then()是为期约实例添加处理程序的主要方法。then()方法接受最多两个参数：onResolve和onRejcet。两个参数均是可选的，如果提供的话，会在进入fulfilled和rejected的状态时执行。
``` js
function onResolved(id) {
	setTimeout(console.log, 0, id, 'resolved')
}
function onRejected(id) {
	setTimeout(console.log, 0, id, 'rejected')
}

let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000))
let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000))

p1.then(() => onResolved('p1'), () => onRejected('p1'))
p2.then(() => onResolved('p2'), () => onRejected('p2'))
// p1 resolved
// p2 rejected
```
传给then()的任何非函数类型的参数都会被静默忽略。如果只提供onRejected参数，那就要在onResolved参数的位置上传入undefined
``` js
function onResolved(id) {
	setTimeout(console.log, 0, id, 'resolved')
}
function onRejceted(id) {
	setTimeout(console.log, 0, id, 'rejected')
}
let p1 = new Promise((resolve, reject) => setTimeout(resolve, 300))
let p2 = new Promise((resolve, reject) => setTimeout(reject, 300))
// 非函数处理程序会被静默忽略
p1.then('gobbeltygook')
// 不传onResolved的标准写法
p2.then(null, () => onRejceted('p2'))
```
then()方法返回一个新的期约实例。
``` js
let p1 = new Promise(() => { })
let p2 = p1.then()
setTimeout(console.log, 0, p1) // Promise { <pending> }
setTimeout(console.log, 0, p2) // Promise { <pending> }
setTimeout(console.log, 0, p1 === p2) // false
```
then()方法的新期约实例基于onResolved处理程序的返回值构建。如是没有提供处理程序，则Promise.resolve()就会包装上一个期约解决之后的值。如果没有显示的返回语句，则Promise.resolve()会包装默认的返回值undefined
``` js
let p1 = Promise.resolve('foo')
// 调用then()时不传处理程序，则原样向后传
let p2 = p1.then()
setTimeout(console.log, 0, p2)  // Promise { 'foo' }
setTimeout(console.log, 0, p1 === p2) // false 虽然是原样，但是是新的期约实例

// 以下三者均是Promise.Resolved()进行包装的返回值，
let p3 = p1.then(() => undefined)
let p4 = p1.then(() => { })
let p5 = p1.then(() => Promise.resolve())
setTimeout(console.log, 0, p3) // Promise { undefined }
setTimeout(console.log, 0, p4) // Promise { undefined }
setTimeout(console.log, 0, p5) // Promise { undefined }
```
如果有显示的返回值，则Promise.resolve()会包装这个值,下面二者返回相同值
``` js
let p6 = p1.then(() => 'bar')
let p7 = p1.then(() => Promise.resolve('bar'))
setTimeout(console.log, 0, p6) // Promise { 'bar' }
setTimeout(console.log, 0, p7) // Promise { 'bar' }
```
Promise.resolve()保留返回的期约
``` js
let p8 = p1.then(() => new Promise(() => { }))
let p9 = p1.then(() => Promise.reject())
// Uncaught (in promise) undefined
setTimeout(console.log, 0, p8) // Promise { <pending> }
setTimeout(console.log, 0, p9) // Promise { <rejected> undefined }
```
抛出异常会返回拒绝的期约
``` js
let p10 = p1.then(() => { throw 'baz' })
// Uncaught (in promise) baz
setTimeout(console.log, 0, p10) // Promise { <rejected> 'baz' }
```
但返回错误值不会触发rejected，而是会将错误对象包装在一个解决了的期约中
``` js
let p11 = p1.then(() => Error('qux'))
setTimeout(console.log, 0, p11) // Promise {<fulfilled>: Error: qux at file:///D:/study-git/JavaScriptStudy/3-code-professional-javascrpt-for-web-devele…}
```
### Promise.prototype.catch()
promise.prototype.catch()方法用于给期约添加拒绝处理程序。这个方法只接受一个参数。相当于Promise.prototype.then(null,onRejected)的语法糖。
``` js
let p = Promise.reject()
let onRejected = function (e) {
	setTimeout(console.log, 0, 'rejected')
}
// 这两种添加拒绝处理程序的方式是一样的。
p.then(null, onRejected) // rejected
p.catch(onRejected) // rejected
```
Promise.prototype.catch()返回一个新的期约实例。
``` js
// Promise.prototype.catch()返回一个新的期约实例。
let p1 = new Promise(() => { })
let p2 = p1.catch()
setTimeout(console.log, 0, p1) // Promise { <pending> }
setTimeout(console.log, 0, p2) // Promise { <pending> }
setTimeout(console.log, 0, p1 === p2) // false
```
### Promise.prototype.finally()
Promise.prototype.finally()方法用于给期约添加onFinally处理程序，这个处理程序在期约转换为解决或拒绝状态时都会执行。这个方法可以避免onResolve和onRejceted处理程序中出现冗余代码。但onFinally处理程序无法判断是期约的状态，所以这个方法主要用于添加清理代码。
``` js
let p1 = Promise.resolve()
let p2 = Promise.reject()
let onFianlly = function () {
	setTimeout(console.log, 0, 'Finally !')
}
p1.finally(onFianlly) // Finally !
// Uncaught (in promise) undefined
p2.finally(onFianlly) // Finally !
```
Promise.prototype.finally()方法返回一个新的期约实例
``` js
let p1 = new Promise(() => { })
let p2 = p1.finally()
setTimeout(console.log, 0, p1) // Promise { <pending> }
setTimeout(console.log, 0, p2) // Promise { <pending> }
setTimeout(console.log, 0, p1 === p2) // false
```
这个新期约不同于then()或catch()方式返回的实例。因为onFinally被设计为一个状态无关的方法，所以大多数情况下它将表现为父期约的传递。
``` js
let p1 = Promise.resolve('foo')
// 这里都会原样先后传,结果都是一样的
let p2 = p1.finally()
let p3 = p1.finally(() => undefined)
let p4 = p1.finally(() => { })
let p5 = p1.finally(() => Promise.resolve())
let p6 = p1.finally(() => 'bar')
let p7 = p1.finally(() => Promise.resolve('bar'))
let p8 = p1.finally(() => Error('qux'))

setTimeout(console.log, 0, p2) // Promise { 'foo' }
setTimeout(console.log, 0, p3) // Promise { 'foo' }
setTimeout(console.log, 0, p4) // Promise { 'foo' }
setTimeout(console.log, 0, p5) // Promise { 'foo' }
setTimeout(console.log, 0, p6) // Promise { 'foo' }
setTimeout(console.log, 0, p7) // Promise { 'foo' }
setTimeout(console.log, 0, p8) // Promise { 'foo' }
```
返回待定期约的情形并不常见，这是因为只要期约一解决，新期约会作为初始期约的传递。也就是说如果状态变为解决，则新期约也会返回解决状态。
``` js
let p1 = Promise.resolve('foo')
let p2 = p1.finally(
	() => new Promise((resolve, reject) => setTimeout(() => resolve('bar'), 100))
)
setTimeout(console.log, 0, p2) // Promise {<pending>}
setTimeout(() => setTimeout(console.log, 0, p2), 200)  // Promise {<fulfilled>: "foo"}
```
### 非重入期约方法
期约进入落定状态时，于其状态相关的处理程序仅仅会被排期，而非立即执行。在处理程序程序的代码之后的代码一定会在处理程序之前先执行。即使期约不是异步代码，而是直接执行代码，执行顺序也是先执行其他代码。这个特性由JavaScript运行时保证，被称为“非重入”(non-reentrancy)特性。
``` js
// 非重入期约方法
let p = Promise.resolve()
p.then(() => console.log('onResolved handler')) // then return 
// 同步方法，先执行
console.log('then return '); // onResolved handler
```
在上面的例子中，在一个解决期约上调用then()会把onResolved处理程序推进消息队列。但这个处理程序在当前线程上的同步代码执行完成前不会执行。因此then()后的同步代码一定先于处理程序执行。

先添加处理程序后解决期约也是一样的。如果添加处理程序后，同步代码才改变期约状态。那么处理程序会根据后面改变的状态表现出非重入特性。入下面的例子，先添加了onResovled处理程序，再调用resovle()[synchronousResolve()]，处理程序不会进入同步线程。而是在同步线程执行后，根据状态调用onResolved()
``` js
let synchornousResolve;
// 先执行构造函数内的同步函数，对synchornousResolve的定义
let p = new Promise((resolve) => {
	synchornousResolve = function () {
		console.log('1: invoking resolve()');
		// 这里resolve会执行then后的onResolved <-- 回调？ 但因为non-reentrancy特性，会执行2
		resolve()
		console.log('2: resolve() return');
	}
})

//  传入onResolve函数做参数
p.then((x) => console.log("4: then() hander executes", x))
//	先执行第一个同步函数，同时转变p为fulfilled状态
synchornousResolve()
// 执行第二个同步函数
console.log("3: synchornousResolve() return ");
// 1: invoking resolve()
// 2: resolve() return
// 3: synchornousResolve() return 
// 4: then() hander execute undefined
```
非重入适用于onResolved/onRejected处理程序、catch()处理程序和finally()处理程序。下面是例子：
``` js
let p1 = Promise.resolve()
p1.then(() => console.log('p1.then() onResolved'))
console.log('p1.then() return');
let p2 = Promise.reject()
p2.then(null, () => console.log('p2.then() onRejected'))
console.log('p2.then() return');

let p3 = Promise.reject()
p3.catch(() => console.log('p3.catch() onReject'))
console.log('p3.catch() return');
let p4 = Promise.resolve()
p4.finally(() => console.log('p4.finally() onFinally'))
console.log('p4.finally() return');
// p1.then() return
// p2.then() return
// p3.catch() return
// p4.finally() return
// p1.then() onResolved
// p2.then() onRejected
// p3.catch() onReject
// p4.finally() onFinally
```
### 临近处理程序的执行顺序
如果给期约添加多个处理程序，当期约状态变化时，相关处理程序会按照添加它们的顺序一次执行。无论是then(),catch()还是finally()添加的是程序都是如此
``` js
// 临近处理程序的执行顺序
let p1 = Promise.resolve()
let p2 = Promise.reject()
p1.then(() => setTimeout(console.log, 0, 1))
p1.then(() => setTimeout(console.log, 0, 2))

p2.then(null, () => setTimeout(console.log, 0, 3))
p2.then(null, () => setTimeout(console.log, 0, 4))

p2.catch(() => setTimeout(console.log, 0, 5))
p2.catch(() => setTimeout(console.log, 0, 6))

p1.finally(() => setTimeout(console.log, 0, 7))
p1.finally(() => setTimeout(console.log, 0, 8))
// 1 2 3 4 5 6 7 8
```
### 传递解决值和拒绝理由
fulfilled和reject会将参数/理由传递给onResolved和onRejected作为唯一的参数.
``` js
let p1 = new Promise((resolve, rejcet) => resolve('foo'))
p1.then(value => console.log(value)) // foo
let p2 = new Promise((resolve, rejcet) => rejcet('bar'))
p2.catch(reason => console.log(reason)) // bar
```
Promise.resolve()和Promise.reject()同上相同
``` js
let p1 = Promise.resolve('foo')
p1.then((value) => console.log(value)) // foo
let p2 = Promise.reject('bar')
p2.catch(reason => console.log(reason)) // bar
```
### 拒绝期约与拒绝错误处理
拒绝期约类似于throw()表达式，因为它们都代表一种程序状态，即需要中断或者特殊处理。在期约的执行函数或处理程序中抛出错误会导致拒绝，对应的错误对象会称为拒绝的理由。因此以下这些期约会以一个错误对象为由被拒绝。
``` js
let p1 = new Promise((resolve, rejcet) => rejcet(Error('foo')))
let p2 = new Promise((resolve, rejcet) => { throw Error('bar') })
let p3 = Promise.resolve().then(() => { throw Error('buz') })
let p4 = Promise.reject(Error('foo'))
setTimeout(console.log, 0, p1) // Promise {<rejected>: Error: foo
setTimeout(console.log, 0, p2) // Promise {<rejected>: Error: bar
setTimeout(console.log, 0, p3) // Promise {<rejected>: Error: buz
setTimeout(console.log, 0, p4) // Promise {<rejected>: Error: foo
// 同时抛出4个未捕获错误
```
期约可以以任何理由拒绝，包括undefined，但最好统一使用错误对象。这样可以让浏览器捕获错误对象中的栈追踪信息。

异步处理抛出错误的不同之处。 正常情况下，在通过throw()关键字抛出错误时，JavaScript运行时错误机制会停止执行抛出错误之后的任何执行：
``` js
// 普通的JavaScript错误处理机制
throw Error('foo')
console.log('bar'); // 不会执行
```
但在期约中抛出错误时，因为错误实际上从消息队列异步抛出的，所以不会阻止运行时继续执行同步指令：
``` js
Promise.reject(Error('foo')) // bar
// Uncaught(in promise) Error: foo
console.log('bar');
```
Promise.reject()示例，异步错误只能通过异步的onRejected处理程序捕获：
``` js
Promise.reject(Error('foo')).catch((e) => { console.log(e); })
// 无法通过trycatch获取
try {
	Promise.reject(Error('foo'))
} catch (error) {
	console.log(errro);
	// Uncaught (in promise) Error: foo
}
```
但是在执行函数中可以进行错误的捕获(trycatch)
``` js
let p = new Promise((resolve, rejcet) => {
	try {
		throw Error('foo')
	} catch (error) {
		console.log(error);
	}
	resolve()
})
setTimeout(console.log, 0, p)
// Error: foo
// Promise {<fulfilled>: undefined}
```
onRejected处理程序的任务应该是在捕获异步错误之后返回一个解决的期约。下面的例子中对比了同步错误处理于异步错误处理。
``` js
// 同步错误处理
console.log('begin synchronous execution');
try {
	throw Error('foo')
} catch (error) {
	console.log('caught error', error);
}
// begin synchronous execution
// caught error Error: foo
// 异步错误处理
new Promise((resolve, reject) => {
	console.log('begin asynchronous execution');
	reject(Error('bar'))
}).catch(e => {
	console.log('caugth error', e); // 返回一个fulfilled的期约
}).then(() => {
	console.log('contiue asynchronous execution');
})
// begin asynchronous execution
// caugth error Error: bar
// contiue asynchronous execution
```
### 期约连锁与合成
#### 期约连锁
将期约逐个串联起来进行使用，因为每个期约实例方法(then,catch,finally)都会返回一个新的期约对象。因而可连缀使用。
``` js
let p = new Promise((resolve, rejcet) => {
	console.log('first');
	resolve()
})
p.then(() => console.log('second'))
	.then(() => console.log('third'))
	.then(() => console.log('fourth'))
// first
// second
// third
// fourth
```
期约连锁实现串行化异步任务
``` js
let p1 = new Promise((resolve, reject) => {
	console.log('p1 executor');
	setTimeout(resolve, 1000)
})
p1.then(() => new Promise((resolve, rejcet) => {
	console.log('p2 executor');
	setTimeout(resolve, 1000)
}))
	.then(() => new Promise((resolve, rejcet) => {
		console.log('p3 executor');
		setTimeout(resolve, 1000)
	}))
// p1 executor
// p2 executor
// p3 executo
```
工厂函数封装期约连锁
``` js
function delayResolve(str) {
	return new Promise((resolve, reject) => {
		console.log(`${str} executor`);
		setTimeout(() => {
			resolve()
		}, 1000);
	});
}
let p1 = delayResolve('p1')
p1.then(delayResolve('p2'))
	.then(delayResolve('p3'))
	.then(delayResolve('p4'))
	.then(delayResolve('p5'))
// p1 executor
// p2 executor
// p3 executor
// p4 executor
// p5 executor
```
若是不使用期约则需要
``` js
function delayExecute(str, clallback = null) {
	return new Promise((resolve, reject) => {
		console.log(`${str} executor`);
		setTimeout(() => {
			clallback && clallback()
		}, 1000);
	});
}
// 回调地狱问题
delayExecute('p1 callback', () => {
	delayExecute('p2 callback', () => {
		delayExecute('p3 callbakc')
	})
})
// p1 callback executor
// p2 callback executor
// p3 callbakc executor
```
then(),catch(),finally()串联使用
``` js
let p = new Promise((resolve, reject) => {
	console.log(`initial promise rejects`);
	reject()
})
p.catch(() => {
	console.log(`reject handler`);
}).then(() => {
	console.log(`resolve handler`);
}).finally(() => {
	console.log(`finally handler`);
})
// initial promise rejects
// reject handler
// resolve handler
// finally handler
```
> 因为期约可以有任意多个处理程序，所以期约连锁可以构成有向循环图结构。
#### Promise.all()和Promise.race()
Promise类提供两个将多个期约实例组合成一个期约的静态方法。

Promise.all()静态方法创建的期约会在一组期约全部解决之后再解决。这个静态方法接受一个可迭代对象，返回一个新期约。
``` js
let p1 = Promise.all([
	Promise.resolve(),
	Promise.resolve()
])
// 可迭代对象中的元素会通过Promise.resolve()转换为期约
let p2 = Promise.all([3, 4])
// 空的可迭代对象等价于Promise.resolve()
let p3 = Promise.all([])
// 不传参数，无效
let p4 = Promise.all() // TypeError: undefined is not iterable 
```
合成的期约要在每个期约都解决之后解决
``` js
let p = Promise.all([
	Promise.resolve(),
	new Promise((resolve, rejcet) => setTimeout(resolve, 1000))
])
setTimeout(console.log, 0, p)
p.then(() => setTimeout(console.log, 0, `all() resolved`))
// Promise { <pending> }
// all() resolved (一秒后..)
```
如果至少有一个期约待定，则合成期约待定。如果一个包含的期约拒绝，则合成的期约也会拒绝。
``` js
let p1 = Promise.all([new Promise(() => { })])
setTimeout(console.log, 0, p1) // Promise { <rejected> undefined }

let p2 = Promise.all([
	Promise.resolve(),
	Promise.reject(),
	Promise.resolve()
])
setTimeout(console.log, 0, p2) // Promise { <pending> }
```
若是所有期约都成功解决，则合成的期约的解决值是所有包含期约解决值的数组
``` js
let p = Promise.all([
	Promise.resolve(3),
	Promise.resolve(),
	Promise.resolve('all')
])
setTimeout(console.log, 0, p) // Promise { [ 3, undefined, 'all' ] }
```
若是有期约拒绝，则第一个拒绝的期约会将自己的理由作为合成期约的拒绝理由。之后再拒绝的期约不会影响到合成期约的理由。但是其余期约的拒绝期约的正常操作还是会在后台静默进行,会静默处理所有包含期约的拒绝操作。
``` js
let p = Promise.all([
	Promise.reject(3),
	new Promise((resolve, rejcet) => setTimeout(rejcet, 0))
])
p.catch((reason) => console.log(reason)) // 3
// 没有未处理的错误，因为后台会静默处理其他拒绝操作。
```
Promise.race()是一个包装期约，是一组集合中最先解决或拒绝的期约的镜像。这个方法接受可迭代对象，返回一个新期约。
``` js
let p1 = Promise.race([
	Promise.resolve(),
	Promise.resolve()
])
// 通过Promise.resolve()转化为期约
let p2 = Promise.race([3,4])
// 空的可迭代对象，等价于new Promise(()=>{})
let p3 = Promise.race([])
// 无效语法
let p4 = Promise.race()
```
Promise.race()对拒绝和解决一视同仁，只要第一个落定，就会包装成期约对象返回
``` js
let p1 = Promise.race([
	Promise.resolve(3),
	new Promise((resolve, rejcet) => setTimeout(rejcet, 1000))
])
setTimeout(console.log, 0, p1) // Promise { 3 }
let p2 = Promise.race([
	Promise.reject(4),
	new Promise((resolve, reject) => setTimeout(resolve, 1000))
])
setTimeout(console.log, 0, p2) // Promise { <rejected> 4 }
// 迭代顺序决定了落定顺序
let p3 = Promise.race([
	Promise.resolve(5),
	Promise.resolve(6),
	Promise.resolve(7),
])
setTimeout(console.log, 0, p3) // Promise { 5 }
```
与Promise.all()类似，只要有一个期约拒绝(第一个落定)，其就会成为拒绝合成期约的理由。其他拒绝期约会在后台处理其拒绝操作。
``` js
let p = Promise.race([
	Promise.reject(3),
	new Promise((resolve, reject) => setTimeout(reject, 1000))
])
p.catch(reason => setTimeout(console.log, 0, reason)) // 3
// 无其他错误，后台静默拒绝操作处理
```
#### 串行期约合成
类似函数调用间的传参。 期约也可以利用前一个期约的参数
``` js
function addTow(x) { return x + 2 }
function addThree(x) { return x + 3 }
function addFive(x) { return x + 5 }
function addTen(x) {
	return Promise.resolve(x).then(addTow).then(addThree).then(addFive)
}
addTen(2).then((x) => console.log(x)) // 12

// 使用Array.prototype.reduce()可以写成更简洁的模式
function addTen_1(x) {
	return [addTwo, addThree, addFive].reduce((pre, cur) => pre.then(cur), Promise.resolve(x))
}
addTen_1(2).then(console.log) // 12
```
这个模式可以提炼出一个通用函数，将任意多个函数作为处理程序合成一个连续传值的期约连锁。
``` js
function addTwo(x) { return x + 2 }
function addThree(x) { return x + 3 }
function addFive(x) { return x + 5 }
function compose(...fns) {
	return (x) => fns.reduce((pre, cur) => pre.then(cur), Promise.resolve(x))
}
let addTen = compose(addTwo, addThree, addFive)
addTen(2).then(console.log) // 12
```
### 期约拓展
#### 期约取消
取消令牌(cancelToken)类
``` js
		class CancelToken {
			constructor(cancelFn) {
				this.promise = new Promise((resolve, reject) => {
					// 2. 执行函数,执行后，这个promise切换为fulfilled状态。
					cancelFn(() => {
						setTimeout(console.log, 0, "delay cancelled")
						resolve()
					})
				})
			}
		}
```
通过cancelToken来实现，期约的取消。在下例中，通过新建CancelToken的实例来为cancelButton绑定取消事件。 一旦点击cancel按钮，就会执行内部promise的resolve，进而去处理定义好的onResolve函数，在此函数中可以提前进行状态切换，或者取消之间设置的定时器来进行期约的取消。
``` js
	<button id="start">start</button>
	<button id="cancel">cancel</button>
	<script>
		class CancelToken {
			constructor(cancelFn) {
				this.promise = new Promise((resolve, reject) => {
					// 2. 执行函数,执行后，这个promise切换为fulfilled状态。
					cancelFn(() => {
						setTimeout(console.log, 0, "delay cancelled")
						resolve()
					})
				})
			}
		}
		const startButton = document.querySelector('#start')
		const cancelButton = document.querySelector('#cancel')
		function cancelDelayedResolved(delay) {
			setTimeout(console.log, 0, 'set delay')
			const promise = new Promise((resolve, reject) => {
				const id = setTimeout(() => {
					setTimeout(console.log, 0, 'delay resolve')
					resolve('resolve')
				}, delay);
				const cancelToken = new CancelToken(
					// 1. 传了个函数参数进去,同时这个函数的作用是，将获取的参数作为取消按钮的点击事件
					(callback) => cancelButton.onclick = callback
				)
				// 3. 一旦内部的promise切换为fulfilled状态，则clear掉之前的定时器,此后外部promise就不会取执行resolve()，因而无法进入fulfilled状态,并一直处于pending状态（可以根据需求进行处理）。
				cancelToken.promise.then(() => {
					clearTimeout(id)
					reject()
				})
			})
			// 4. 1.4s打印promise，来判断其所处状态
			setTimeout(console.log, 1400, promise)
			return promise
		}
		const handlePromise = () => cancelDelayedResolved(1000)
			.then(x => console.log(`handle ${x}`))
			.catch(x => console.log(`handle ${x}`))
		startButton.addEventListener('click', handlePromise)
```
#### 期约进度通知
一种方法是通过扩展Promise类，为它添加notify()方法
``` js
class TrackPromise extends Promise {
	constructor(excutor) {
		const notifyHandler = []
		super((resolve, reject) => {
			return excutor(resolve, reject, (status) => {
				// 2. 对每一个状态去调用通知函数（通知函数在notifyHandler中）
				notifyHandler.map((handler) => handler(status))
			})
		})
		this.notifyHandler = notifyHandler
	}
```
countdown 例子
``` js
class TrackPromise extends Promise {
	constructor(excutor) {
		const notifyHandler = []
		super((resolve, reject) => {
			return excutor(resolve, reject, (status) => {
				// 2. 对每一个状态去调用通知函数（通知函数在notifyHandler中）
				notifyHandler.map((handler) => handler(status))
			})
		})
		this.notifyHandler = notifyHandler
	}
	// 1. 添加通知函数进入notifyHander
	notify(notifyHandler) {
		this.notifyHandler.push(notifyHandler)
		return this
	}
}

let p = new TrackPromise((resolve, rejcet, notify) => {
	function countdown(x) {
		if (x > 0) {
			// 3. 调用(status)=> {}那个函数，进而去调用通知函数
			notify(`${20 * x}% remaining`)
			setTimeout(() => countdown(x - 1), 1000)
		} else {
			resolve()
		}
	}
	countdown(5)
})
// 添加通知函数
p.notify((x) => setTimeout(console.log, 0, 'progress:', x))
p.then(() => setTimeout(console.log, 0, 'complete'))
```
因为是return this, 所以可以在p上进行连缀调用。连缀会添加多个处理程序,其实就是往notifyHander里push了两个handler。
``` js
p.notify((x) => setTimeout(console.log, 0, 'progress A:', x))
	.notify((x) => setTimeout(console.log, 0, 'progress B:', x))
	.then(() => setTimeout(console.log, 0, 'complete'))
// progress A: 80% remaining
// progress B: 80% remaining
// progress A: 60% remaining
// progress B: 60% remaining
// progress A: 40% remaining
// progress B: 40% remaining
// progress A: 20% remaining
// progress B: 20% remaining
// complete
```
> ES6不支持取消期约和通知进度，是因为会导致期约连锁和期约合成过度复杂化。