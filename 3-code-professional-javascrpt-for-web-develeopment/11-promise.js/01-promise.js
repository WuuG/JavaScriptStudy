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