/**
 * 以往的异步编程模式
*/
// 异步返回值
// function double(value, callback) {
// 	setTimeout(() => {
// 		callback(value * 2)
// 	}, 200);
// }

// double(3, (x) => { console.log(x); }) // 6


// 失败处理
// function double(value, success, failure) {
// 	setTimeout(() => {
// 		try {
// 			if (typeof value != 'number') {
// 				throw 'Must provide number as first argument'
// 			}
// 			success(value)
// 		} catch (error) {
// 			failure(error)
// 		}
// 	}, 200);
// }

// double(3, (x) => {  // Success: 3
// 	console.log(`Success: ${x}`);
// }, (x) => {
// 	console.log(`Failure: ${x}`);
// })

// double('3', (x) => { // Failure: Must provide number as first argument
// 	console.log(`Success: ${x}`);
// }, (x) => {
// 	console.log(`Failure: ${x}`);
// })


// 嵌套异步回调
// function double(value, success, failure) {
// 	setTimeout(() => {
// 		try {
// 			if (typeof value != 'number') {
// 				throw 'Must provide number as first argument'
// 			}
// 			success(value * 2)
// 		} catch (error) {
// 			failure(error)
// 		}
// 	}, 200);
// }


// function triple(value, success, failure) {
// 	setTimeout(() => {
// 		try {
// 			if (value >= 10) {
// 				throw 'number must less 10'
// 			}
// 			success(value * 3)
// 		} catch (error) {
// 			failure(error)
// 		}
// 	}, 200);
// }

// // 成功的回调，去进行3倍处理
// const successCallback = (x) => {
// 	triple(x,
// 		(x) => console.log(`triple success: ${x}`),
// 		(x) => console.log(`triple error: ${x}`)
// 	)
// }

// double('2', successCallback, (x) => { console.log(`Failure: ${x}`); }) // Failure: Must provide number as first argument
// double(10, successCallback, (x) => { console.log(`Failure: ${x}`); }) // triple error: number must less 10
// double(3, successCallback, (x) => { console.log(`Failure: ${x}`); })  // triple success: 18



/**
 * promise
*/
// let p = new Promise((x) => x)
// setTimeout(console.log, 0, p);

// new Promise((resolve,reject)=> {})

// let p = new Promise(() => setTimeout(() => {
// 	console.log('promise fuilfilled')
// }, 100))
// console.log(p)
// // Promise { <pending> }
// // promise fuilfilled


// 为避免期约卡在待定状态，可以添加定时退出功能
// let p = new Promise((resolve, rejcet) => {
// 	setTimeout(() => { rejcet() }, 200);
// 	// ... 其他代码逻辑
// })
// setTimeout(() => {
// 	console.log(p); //  Promise { <rejected> undefined }
// }, 1000);



// promise.resolve()
// 期约并非一开始就必须处于待定状态，再通过执行器函数才会转换为fuilfiiled或者rejected.可以直接通过Promise.resolve()实例化一个解决了的期约
// let p1 = new Promise((resolve, rejcet) => resolve())
// let p2 = Promise.resolve()
// console.log(p1, p2); // Promise { undefined } Promise { undefined } 


// 可以将任何值装欢为一个期约
// setTimeout(console.log, 200, Promise.resolve(3)); // Promise {<fulfilled>: 3}


// 对于这个方法而言，若是传入的参数本身是一个期约，则去行为类似一个空包装。因此可以说Promise.resolve()可以说是一个幂等方法（其任意多次执行所产生的影响均与一次执行的影响相同）
// let p = Promise.resolve(7)
// setTimeout(console.log, 200, p === Promise.resolve(p)); // true
// setTimeout(console.log, 200, p === Promise.resolve(Promise.resolve(p))); // true


// 对于这个方法而言，其会保存传入的的期约的状态
/* let p = new Promise((resolve, reject) => setTimeout(() => {
	resolve()
}, 200))

setTimeout((x) => {
	console.log(x)
}, 100, Promise.resolve(p)); // Promise { <pending> }
setTimeout((x) => {
	console.log(x);
}, 300, Promise.resolve(p)); // Promise { undefined } */


// 因为其可以传入任何非期约值，包括错误对象，并转换为fulfilled的期约，因此可能导致不符合预期的行为
// let p = Promise.resolve(new Error('error'))

// setTimeout(console.log, 200, p); // Promise {<fulfilled>: Error: error


// Promise.rejcet()
// let p = Promise.reject(3)
// setTimeout(console.log, 200, p); //Promise { <rejected> 3 } 
// p.then(null, (e) => {
// 	setTimeout((x) => {
// 		console.log(x)  // 3
// 	}, 200, e)
// })


/* // Promise.reject()与Promise.resolve()的幂等逻辑不同。如果传入期约，那么这个期约会成为他返回的拒绝期约的理由。
setTimeout(console.log, 0, Promise.reject(Promise.resolve()))
// Promise {<rejected>: Promise} */



// 同步/异步执行的二元性
// try {
// 	Promise.reject(new Error('promise error'))
// } catch (error) {
// 	console.log(error); // Uncaught (in promise) Error: promise error
// }



/**
 * 期约的实例方法
*/
// then
// Promise.prototype.then() 接受两个参数 onResolved处理程序和onRejected处理程序。两个参数都是可选的，会在期约进入fulfilled和rejected状态时执行。
// function onResolved(id) {
// 	setTimeout(console.log, 0, id, 'resolved')
// }
// function onRejected(id) {
// 	setTimeout(console.log, 0, id, 'rejected')
// }

// let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000))
// let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000))

// p1.then(() => onResolved('p1'), () => onRejected('p1'))
// p2.then(() => onResolved('p2'), () => onRejected('p2'))
// // p1 resolved
// // p2 rejected



// 传给then()的任何非函数类型的参数都会被静默忽略。如果只提供onRejected参数，那就要在onResolved参数的位置上传入undefined
// function onResolved(id) {
// 	setTimeout(console.log, 0, id, 'resolved')
// }
// function onRejceted(id) {
// 	setTimeout(console.log, 0, id, 'rejected')
// }
// let p1 = new Promise((resolve, reject) => setTimeout(resolve, 300))
// let p2 = new Promise((resolve, reject) => setTimeout(reject, 300))
// // 非函数处理程序会被静默忽略
// p1.then('gobbeltygook')
// // 不传onResolved的标准写法
// p2.then(null, () => onRejceted('p2'))


// then()方法返回一个新的期约实例。
// let p1 = new Promise(() => { })
// let p2 = p1.then()
// setTimeout(console.log, 0, p1) // Promise { <pending> }
// setTimeout(console.log, 0, p2) // Promise { <pending> }
// setTimeout(console.log, 0, p1 === p2) // false


// // then()方法的新期约实例基于onResolved处理程序的返回值构建。如是没有提供处理程序，则Promise.resolve()就会包装上一个期约解决之后的值。如果没有显示的返回语句，则Promise.resolve()会包装默认的返回值undefined
// let p1 = Promise.resolve('foo')
// // 调用then()时不传处理程序，则原样向后传
// let p2 = p1.then()
// setTimeout(console.log, 0, p2)  // Promise { 'foo' }
// setTimeout(console.log, 0, p1 === p2) // false 虽然是原样，但是是新的期约实例

// // // 以下三者均是Promise.Resolved()进行包装的返回值，
// let p3 = p1.then(() => undefined)
// let p4 = p1.then(() => { })
// let p5 = p1.then(() => Promise.resolve())
// setTimeout(console.log, 0, p3) // Promise { undefined }
// setTimeout(console.log, 0, p4) // Promise { undefined }
// setTimeout(console.log, 0, p5) // Promise { undefined }

// // 如果有显示的返回值，则Promise.resolve()会包装这个值,下面二者返回相同值
// let p6 = p1.then(() => 'bar')
// let p7 = p1.then(() => Promise.resolve('bar'))
// setTimeout(console.log, 0, p6) // Promise { 'bar' }
// setTimeout(console.log, 0, p7) // Promise { 'bar' }

// // Promise.resolve()保留返回的期约
// let p8 = p1.then(() => new Promise(() => { }))
// let p9 = p1.then(() => Promise.reject())
// // Uncaught (in promise) undefined
// setTimeout(console.log, 0, p8) // Promise { <pending> }
// setTimeout(console.log, 0, p9) // Promise { <rejected> undefined }

// // 抛出异常会返回拒绝的期约
// let p10 = p1.then(() => { throw 'baz' })
// // Uncaught (in promise) baz
// setTimeout(console.log, 0, p10) // Promise { <rejected> 'baz' }

// // 但返回错误值不会触发rejected，而是会将错误对象包装在一个解决了的期约中
// let p11 = p1.then(() => Error('qux'))
// setTimeout(console.log, 0, p11) // Promise {<fulfilled>: Error: qux at file:///D:/study-git/JavaScriptStudy/3-code-professional-javascrpt-for-web-devele…}



// Promise.prototype.catch()
// promise.prototype.catch()方法用于给期约添加拒绝处理程序。这个方法只接受一个参数。相当于Promise.prototype.then(null,onRejected)的语法糖。
// let p = Promise.reject()
// let onRejected = function (e) {
// 	setTimeout(console.log, 0, 'rejected')
// }
// // 这两种添加拒绝处理程序的方式是一样的。
// p.then(null, onRejected) // rejected
// p.catch(onRejected) // rejected


// // Promise.prototype.catch()返回一个新的期约实例。
// let p1 = new Promise(() => { })
// let p2 = p1.catch()
// setTimeout(console.log, 0, p1) // Promise { <pending> }
// setTimeout(console.log, 0, p2) // Promise { <pending> }
// setTimeout(console.log, 0, p1 === p2) // false



// Promise.prototype.finally()
// Promise.prototype.finally()方法用于给期约添加onFinally处理程序，这个处理程序在期约转换为解决或拒绝状态时都会执行。这个方法可以避免onResolve和onRejceted处理程序中出现冗余代码。但onFinally处理程序无法判断是期约的状态，所以这个方法主要用于添加清理代码。
// let p1 = Promise.resolve()
// let p2 = Promise.reject()
// let onFianlly = function () {
// 	setTimeout(console.log, 0, 'Finally !')
// }
// p1.finally(onFianlly) // Finally !
// // Uncaught (in promise) undefined
// p2.finally(onFianlly) // Finally !


// // Promise.prototype.finally()方法返回一个新的期约实例
// let p1 = new Promise(() => { })
// let p2 = p1.finally()
// setTimeout(console.log, 0, p1) // Promise { <pending> }
// setTimeout(console.log, 0, p2) // Promise { <pending> }
// setTimeout(console.log, 0, p1 === p2) // false


// 这个新期约不同于then()或catch()方式返回的实例。因为onFinally被设计为一个状态无关的方法，所以大多数情况下它将表现为父期约的传递。
// let p1 = Promise.resolve('foo')
// // 这里都会原样先后传,结果都是一样的
// let p2 = p1.finally()
// let p3 = p1.finally(() => undefined)
// let p4 = p1.finally(() => { })
// let p5 = p1.finally(() => Promise.resolve())
// let p6 = p1.finally(() => 'bar')
// let p7 = p1.finally(() => Promise.resolve('bar'))
// let p8 = p1.finally(() => Error('qux'))

// setTimeout(console.log, 0, p2) // Promise { 'foo' }
// setTimeout(console.log, 0, p3) // Promise { 'foo' }
// setTimeout(console.log, 0, p4) // Promise { 'foo' }
// setTimeout(console.log, 0, p5) // Promise { 'foo' }
// setTimeout(console.log, 0, p6) // Promise { 'foo' }
// setTimeout(console.log, 0, p7) // Promise { 'foo' }
// setTimeout(console.log, 0, p8) // Promise { 'foo' }


// 如果返回的是一个待定的期约，或者onFinally处理程序抛出了错误（显式抛出或返回一个拒绝期约）,则会返回相应的期约(待定或拒绝)
// let p9 = p1.finally(() => new Promise(() => { }))
// let p10 = p1.finally(() => Promise.reject())
// // Uncaught (in promise) undefined
// setTimeout(console.log, 0, p9) // Promise { <pending> }
// setTimeout(console.log, 0, p10) // Promise { <rejected> undefined }


// 返回待定期约的情形并不常见，这是因为只要期约一解决，新期约会作为初始期约的传递。也就是说如果状态变为解决，则新期约也会返回解决状态。
// let p1 = Promise.resolve('foo')
// let p2 = p1.finally(
// 	() => new Promise((resolve, reject) => setTimeout(() => resolve('bar'), 100))
// )
// setTimeout(console.log, 0, p2) // Promise {<pending>}
// setTimeout(() => setTimeout(console.log, 0, p2), 200)  // Promise {<fulfilled>: "foo"}



// 非重入期约方法
// let p = Promise.resolve()
// p.then(() => console.log('onResolved handler')) // then return 
// // 同步方法，先执行
// console.log('then return '); // onResolved handler


// 
// let synchornousResolve;
// // 先执行构造函数内的同步函数，对synchornousResolve的定义
// let p = new Promise((resolve) => {
// 	synchornousResolve = function () {
// 		console.log('1: invoking resolve()');
// 		// 这里resolve会执行then后的onResolved <-- 回调？ 但因为non-reentrancy特性，会执行2
// 		resolve()
// 		console.log('2: resolve() return');
// 	}
// })

// //  传入onResolve函数做参数
// p.then((x) => console.log("4: then() hander executes", x))
// //	先执行第一个同步函数，同时转变p为fulfilled状态
// synchornousResolve()
// // 执行第二个同步函数
// console.log("3: synchornousResolve() return ");
// // 1: invoking resolve()
// // 2: resolve() return
// // 3: synchornousResolve() return 
// // 4: then() hander execute undefined


// 测试代码， 测试new Promise内部函数何时执行
// let p = new Promise((resolve, rejcet) => {
// 	console.log('init');
// 	setTimeout(() => {
// 		console.log('2');
// 		rejcet('rejcet')
// 		console.log("after rejcet");
// 	}, 200);
// 	setTimeout(() => {
// 		console.log('1');
// 		resolve('resolve')
// 		console.log("after resovle");
// 	}, 100);
// })
// p.then(x => {
// 	console.log('3' + x);
// }).catch(x => {
// 	console.log('4' + x);
// })
// console.log('5');
// 5
// 1
// after resovle
// 3resolve
// 2
// after rejce


// 非重入适用于onResolved/onRejected处理程序、catch()处理程序和finally()处理程序。下面是例子：
// let p1 = Promise.resolve()
// p1.then(() => console.log('p1.then() onResolved'))
// console.log('p1.then() return');
// let p2 = Promise.reject()
// p2.then(null, () => console.log('p2.then() onRejected'))
// console.log('p2.then() return');

// let p3 = Promise.reject()
// p3.catch(() => console.log('p3.catch() onReject'))
// console.log('p3.catch() return');
// let p4 = Promise.resolve()
// p4.finally(() => console.log('p4.finally() onFinally'))
// console.log('p4.finally() return');
// p1.then() return
// p2.then() return
// p3.catch() return
// p4.finally() return
// p1.then() onResolved
// p2.then() onRejected
// p3.catch() onReject
// p4.finally() onFinally



// 临近处理程序的执行顺序
// 如果给期约添加多个处理程序，当期约状态变化时，相关处理程序会按照添加它们的顺序一次执行。无论是then(),catch()还是finally()添加的是程序都是如此
// let p1 = Promise.resolve()
// let p2 = Promise.reject()
// p1.then(() => setTimeout(console.log, 0, 1))
// p1.then(() => setTimeout(console.log, 0, 2))

// p2.then(null, () => setTimeout(console.log, 0, 3))
// p2.then(null, () => setTimeout(console.log, 0, 4))

// p2.catch(() => setTimeout(console.log, 0, 5))
// p2.catch(() => setTimeout(console.log, 0, 6))

// p1.finally(() => setTimeout(console.log, 0, 7))
// p1.finally(() => setTimeout(console.log, 0, 8))
// 1 2 3 4 5 6 7 8



// fulfilled和reject会将参数/理由传递给onResolved和onRejected作为唯一的参数.
// let p1 = new Promise((resolve, rejcet) => resolve('foo'))
// p1.then(value => console.log(value)) // foo
// let p2 = new Promise((resolve, rejcet) => rejcet('bar'))
// p2.catch(reason => console.log(reason)) // bar


// Promise.resolve()和Promise.reject()同上相同
// let p1 = Promise.resolve('foo')
// p1.then((value) => console.log(value)) // foo
// let p2 = Promise.reject('bar')
// p2.catch(reason => console.log(reason)) // bar



// 拒绝期约类似于throw()表达式，因为它们都代表一种程序状态，即需要中断或者特殊处理。在期约的执行函数或处理程序中抛出错误会导致拒绝，对应的错误对象会称为拒绝的理由。因此以下这些期约会以一个错误对象为由被拒绝。
// let p1 = new Promise((resolve, rejcet) => rejcet(Error('foo')))
// let p2 = new Promise((resolve, rejcet) => { throw Error('bar') })
// let p3 = Promise.resolve().then(() => { throw Error('buz') })
// let p4 = Promise.reject(Error('foo'))
// setTimeout(console.log, 0, p1) // Promise {<rejected>: Error: foo
// setTimeout(console.log, 0, p2) // Promise {<rejected>: Error: bar
// setTimeout(console.log, 0, p3) // Promise {<rejected>: Error: buz
// setTimeout(console.log, 0, p4) // Promise {<rejected>: Error: foo
// // 同时抛出4个未捕获错误


// 普通的JavaScript错误处理机制
// throw Error('foo')
// console.log('bar'); // 不会执行


// 但在期约中抛出错误时，因为错误实际上从消息队列异步抛出的，所以不会阻止运行时继续执行同步指令：
// Promise.reject(Error('foo'))
// console.log('bar');
// bar  <-- bar先执行
// Uncaught(in promise) Error: foo


// Promise.reject()示例，异步错误只能通过异步的onRejected处理程序捕获：
// Promise.reject(Error('foo')).catch((e) => { console.log(e); })
// // 无法通过trycatch获取
// try {
// 	Promise.reject(Error('foo'))
// } catch (error) {
// 	console.log(errro);
// 	// Uncaught (in promise) Error: foo
// }


// 但是在执行函数中可以进行错误的捕获(trycatch)
// let p = new Promise((resolve, rejcet) => {
// 	try {
// 		throw Error('foo')
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	resolve()
// })
// setTimeout(console.log, 0, p)
// // Error: foo
// // Promise {<fulfilled>: undefined}


// onRejected处理程序的任务应该是在捕获异步错误之后返回一个解决的期约。下面的例子中对比了同步错误处理于异步错误处理。
// 同步错误处理
// console.log('begin synchronous execution');
// try {
// 	throw Error('foo')
// } catch (error) {
// 	console.log('caught error', error);
// }
// // begin synchronous execution
// // caught error Error: foo
// // 异步错误处理
// new Promise((resolve, reject) => {
// 	console.log('begin asynchronous execution');
// 	reject(Error('bar'))
// }).catch(e => {
// 	console.log('caugth error', e);
// }).then(() => {
// 	console.log('contiue asynchronous execution');
// })
// begin asynchronous execution
// caugth error Error: bar
// contiue asynchronous execution



// 期约连锁与合成
// 期约连锁
// let p = new Promise((resolve, rejcet) => {
// 	console.log('first');
// 	resolve()
// })
// p.then(() => console.log('second'))
// 	.then(() => console.log('third'))
// 	.then(() => console.log('fourth'))
// first
// second
// third
// fourth


// 期约连锁实现串行化异步任务
// let p1 = new Promise((resolve, reject) => {
// 	console.log('p1 executor');
// 	setTimeout(resolve, 1000)
// })
// p1.then(() => new Promise((resolve, rejcet) => {
// 	console.log('p2 executor');
// 	setTimeout(resolve, 1000)
// }))
// 	.then(() => new Promise((resolve, rejcet) => {
// 		console.log('p3 executor');
// 		setTimeout(resolve, 1000)
// 	}))
// // p1 executor
// // p2 executor
// // p3 executo


// 