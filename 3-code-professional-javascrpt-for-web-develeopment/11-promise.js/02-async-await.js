/**
 * 异步函数
 */
// let p = new Promise((resolve, reject) => setTimeout(console.log, 1000, 3))

// async
// async function foo() { }
// let bar = async function () { }
// let baz = async () => { }
// class Qux {
// 	async qux()
// }

// 使用async关键字可以让函数具有异步特征，但总体上代码仍是同步求值的。在闭包或参数方面，具有正常的JavaScript函数的正常行为。
// async function foo() {
// 	console.log(1);
// }
// foo()
// console.log(2);

// 异步函数如果使用async关键字返回了值(如果没有return返回undefined),这个值会被promise.resolve()包装成为一个期约对象。异步函数始终返回期约对象。在函数外部调用这个函数可以得到它返回的期约。
// async function foo() {
// 	return 3
// }
// foo().then(x => console.log(x)) // 3

// // 异步函数期待一个实现thenable的接口，但常规值也可。若是实现了thenable接口的对象，则这个对象可以由提供给then()处理程序"解包".若不是，则返回值会经过Promise.resolve()进行封装。
// // 返回一个原始值
// async function foo() {
// 	return 'foo'
// }
// foo().then(console.log)
// // foo

// // 返回一个没有实现thenable接口的对象
// async function bar() {
// 	return { bar: 'bar' }
// }
// bar().then(console.log)
// // {bar:'bar}

// // 返回一个实现了thenable的非期约对象
// async function baz() {
// 	const thenable = {
// 		then(callback) {
// 			console.log('baz then');
// 			callback('baz')
// 		}
// 	}
// 	return thenable
// }
// baz().then(console.log)
// // baz then
// // baz

// // 返回一个期约
// async function qux() {
// 	return Promise.resolve('qux')
// }
// qux().then(console.log)
// // qux

// 抛出错误会返回拒绝的期约
// async function foo() {
// 	console.log(1);
// 	throw 3
// }
// foo().catch(console.log)
// console.log(2);
// 1
// 2
// 3

// 拒绝期约的错误不会被异步函数捕获,但是return的话可以包装成rejcet了的promise。
// async function foo() {
// 	console.log(1);
// 	Promise.reject(3)
// }
// foo().catch(console.log)
// console.log(2);
// 1
// 2
// Uncaught (in promise) 3

// async function foo() {
// 	console.log(1);
// 	Promise.resolve(3)
// }
// foo().then(console.log)
// console.log(2);

// await
// async function foo() {
// 	let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3))
// 	console.log(await p);
// }
// foo()
// 3 （一秒后打印）

// // await的使用
// async function foo() {
// 	console.log(await Promise.resolve('foo'));
// }
// foo()
// // 'foo'
// async function bar() {
// 	return await Promise.resolve('bar')
// }
// bar().then(console.log)
// // bar
// async function baz() {
// 	await new Promise((resolve, reject) => {
// 		setTimeout(resolve, 1000)
// 	})
// 	console.log('baz')
// }
// baz()
// // baz (一秒后打印)

// awati期待(实际上并不要求)一个实现了thenable接口的对象，但常规的值也可以。如果是实现thenable接口的对象，则这个对象可以有await"解包"。如果不是，则这个值就会被当作已经解决的期约
// // 原始值
// async function foo() {
// 	console.log(await 'foo');
// }
// foo()
// // 'foo'

// // 等待一个没有thenable接口的对象
// async function bar() {
// 	console.log(await ['bar']);
// }
// bar()
// // ['bar']

// //等待一个实现了thenable接口的非期约对象
// async function baz() {
// 	const thenable = {
// 		then(callback) {
// 			callback('baz')
// 		}
// 	}
// 	console.log(await thenable);
// }
// baz()
// // 'baz'

// // 等待一个期约
// async function qux() {
// 	console.log(await Promise.resolve('qux'));
// }
// qux()
// // 'qux'

// 等待抛出错误的同步操作，async函数,会返回拒绝的期约
// async function foo() {
// 	console.log(1);
// 	await (() => { throw 3 })()
// }
// foo().catch(console.log)
// console.log(2);
// // 1
// // 2
// // 3

// 单独的Promise.reject()不会被async函数捕获，而会抛出未捕获错误。但若是用await去接受拒绝的promise，则会释放(unwrap)错误值(将拒绝期约返回 <-- return)
// async function foo() {
// 	console.log(1);
// 	await Promise.reject(3)
// 	console.log('不执行');
// }
// foo().catch(console.log)
// console.log(2);
// // 1
// // 2
// // 3

// await的限制
// 立即执行的async/await函数
// (async function foo() {
// 	console.log(await Promise.resolve(3));
// })()
// 3

// 报错的例子
// async function foo() {
// 	const syncFn = () => {
// 		return await Promise.resolve('foo')
// 	}
// 	console.log(syncFn);
// }
// async function baz() {
// 	(function () {
// 		console.log(await Promise.resolve('baz'));
// 	})()
// }

/**
 * 停止和恢复执行
 */
// async function foo() {
// 	console.log(await Promise.resolve('foo'));
// }
// async function bar() {
// 	console.log(await 'bar');
// }
// async function baz() {
// 	console.log('baz');
// }
// foo()
// bar()
// baz()
// baz
// foo
// bar

// async的同步执行
// async function foo() {
// 	console.log(2);
// }
// console.log(1);
// foo()
// console.log(3);
// // 1 2 3

// async函数中，加入await的执行顺序
// async function foo() {
// 	console.log(2);
// 	// 立即推入消息队列，进行等待。待同步线程执行完毕后，从消息队列中去除任务，恢复异步函数执行。
// 	await null
// 	console.log(4);
// }
// console.log(1);
// foo()
// console.log(3);
// 1 2 3 4

// await的执行顺序
// async function foo() {
// 	console.log(2);
// 	console.log(await Promise.resolve(6));
// 	console.log(7);
// }
// async function bar() {
// 	console.log(4);
// 	console.log(await 8);
// 	console.log(9);
// }
// console.log(1);
// foo()
// console.log(3);
// bar()
// console.log(5);
// // 1 2 3 4 5 6 7 8

/**
 * 异步函数策略
 */
// async function sleep(delay) {
// 	// setTimeout无法直接使用await哦
// 	return new Promise((resolve, reject) => setTimeout(resolve, delay))
// }
// async function foo() {
// 	const t0 = Date.now()
// 	await sleep(1500)
// 	console.log(Date.now() - t0);
// }
// foo() // 1517

// 平行执行
async function randomDelay(id) {
  const random = Math.random() * 1000;
  return await new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log(`${id} finished`);
      resolve();
    }, random)
  );
}

async function foo() {
  const t0 = Date.now();
  await randomDelay(0);
  await randomDelay(1);
  await randomDelay(2);
  await randomDelay(3);
  await randomDelay(4);
  await randomDelay(5);
  console.log(`${Date.now() - t0}ms all finished`);
}
foo();
// 0 finished
// 1 finished
// 2 finished
// 3 finished
// 4 finished
// 5 finished
// 3257ms all finished
