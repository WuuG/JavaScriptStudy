// function* generatorFn() {}
// let generatorFn = function *() {}
// let foo = {
// 	*generatorFn(){}
// }
// class Foo {
// 	* generatorFn() {}
// }
// class Bar {
// 	static *generatorFn() {}
// }


// function* generatorFn() { }
// const g = generatorFn()
// console.log(g); // generatorFn {<suspended>}
// console.log(g.next);// [Function: next]
// // next()方法也类似迭代器，有一个done和value属性
// console.log(g.next()); // { value: undefined, done: true }


// function* generatorFn() {
// 	return 'foo'
// }
// let g = generatorFn()
// console.log(g.next()); //{ value: 'foo', done: true } 


// 生成器函数只有再初次调用next()方法后才开始执行
// function* generatorFn() {
// 	console.log('foobar');
// }
// let g = generatorFn() // 并没有打印log
// g.next() // foobar



// function* generator() {
// 	yield 'bar'
// 	yield 'foo'
// 	return 'exit'
// }
// let g = generator()
// console.log(g.next()); // { value: 'bar', done: false }
// console.log(g.next()); // { value: 'foo', done: false }
// console.log(g.next()); // { value: 'exit', done: true }


// 生成器函数内部的执行流程会对每个生成器对象区分作用域。不会互相影响。 <--应该就是不同实例的意思把
// function* generator() {
// 	yield 'bar'
// 	yield 'foo'
// 	return 'exit'
// }
// let g1 = generator()
// let g2 = generator()
// console.log(g1.next()); // { value: 'bar', done: false }
// console.log(g2.next()); // { value: 'bar', done: false }
// console.log(g1.next()); // { value: 'foo', done: false }
// console.log(g2.next()); // { value: 'foo', done: false }


// yield生成器只能在函数内部使用，在其他地方会抛出错误。类似return关键字，yield只能直接位于生成器函数定义中，出现在嵌套的非生成器函数中会抛出错误
// 无效,但是不报错,因为里面的函数没被调用，调用就报错
// function* generator() {
// 	function a() { // 
// 		console.log(1);
// 		yield
// 	}
// }

// function* validGenerator() {
// 	const b = () => {
// 		yield
// 	}
// }

// function *validaGenerator() {
// 	(()=> {
// 		yield
// 	})()
// }


// 生成器对象作为可迭代对象
// function* generator() {
// 	yield 1
// 	yield 2
// 	yield 3
// }
// for (const x of generator()) {
// 	console.log(x);
// }
// // 1
// // 2
// // 3

// // 在需要自定义迭代对象时，这样使用生成器对象特别有用。下面的迭代器就是会执行指定次数
// function* nTime(n) {
// 	while (n--) {
// 		yield
// 	}
// }
// for (let _ of nTime(3)) {
// 	console.log('foo');
// }
// // foo
// // foo
// // foo



// yield 实现输入和输出
// function* generator(initial) {
// 	console.log(initial); //foo

// 	console.log(yield); // buz

// 	console.log(yield); // qux
// }
// let generatorObject = generator('foo')
// generatorObject.next('bar') // foo
// generatorObject.next('buz') // buz
// generatorObject.next('qux') // qux


// function* generator() {
// 	return yield 'foo' // 先执行yield 然后再执行return
// }
// let gObj = generator()
// console.log(gObj.next()); // {done:false,value:'foo'}
// console.log(gObj.next('bar')); // {done:true,value:'bar'}


// function* generator() {
// 	yield* [1, 2, 3]
// }
// const g = generator()
// for (const x of g) {
// 	console.log(x);
// }
// // 1
// // 2
// // 3


// function* generatorA() {
// 	for (const x of [1, 2, 3]) {
// 		yield x
// 	}
// }
// function* generatorB() {
// 	yield* [1, 2, 3]
// }


// function* generator() {
// 	console.log('yiedl* value', yield* [1, 2, 3]);
// }
// for (const x of generator()) {
// 	console.log(`value: ${x}`);
// }
// // value: 1
// // value: 2
// // value: 3
// // yiedl* value undefined


// function* innerGenerator() {
// 	yield 'foo'
// 	return 'bar'
// }
// function* outerGenerator() {
// 	console.log(`iter Value ${yield* innerGenerator()}`);
// }
// for (const x of outerGenerator()) {
// 	console.log(`value : ${x}`);
// }
// value : foo
// iter Value bar



// function* nTimes(n) {
// 	if (n > 0) {
// 		yield* nTimes(n - 1)
// 		yield n - 1
// 	}
// }

// for (const x of nTimes(3)) {
// 	console.log(x);
// }
// // 0
// // 1
// // 2


// class Node {
// 	constructor(id) {
// 		this.id = id
// 		this.neighbors = new Set()
// 	}
// 	connect(node) {
// 		if (node !== this) {
// 			this.neighbors.add(node)
// 			node.neighbors.add(this)
// 		}
// 	}
// }

// class RandomGraph {
// 	constructor(size) {
// 		this.nodes = new Set()
// 		for (let i = 0; i < size; i++) {
// 			this.nodes.add(new Node(i))
// 		}
// 		const threshold = 1 / size // 为什么要设置这个阈值呢？ 这样的话，图越大连接的概率就越大。
// 		for (const x of this.nodes) {
// 			for (const y of this.nodes) {
// 				if (Math.random() < threshold) {
// 					x.connect(y)
// 				}
// 			}
// 		}
// 	}
// 	print() {
// 		for (const node of this.nodes) {
// 			const ids = [...node.neighbors].map(n => n.id).join(',')
// 			console.log(`${node.id}: ${ids}`);
// 		}
// 	}
// 	// 通过递归，进行深度优先遍历，来判断图是否连通
// 	isConnected() {
// 		const visitedNode = new Set()
// 		function* traverse(nodes) {
// 			for (const node of nodes) {
// 				if (!visitedNode.has(node)) {
// 					yield node;
// 					yield* traverse(node.neighbors)
// 				}
// 			}
// 		}
// 		const firstNode = this.nodes[Symbol.iterator]().next().value
// 		for (const node of traverse([firstNode])) {
// 			visitedNode.add(node)
// 		}
// 		return visitedNode.size === this.nodes.size
// 	}
// }
// const graph = new RandomGraph(6)
// graph.print()
// // 其中一种生成图的可能性
// // 0: 2,4
// // 1: 2,4,5
// // 2: 0,1
// // 3: 
// // 4: 0,1
// // 5: 1
// console.log(graph.isConnected()); // false



// class Foo {
// 	constructor() {
// 		this.values = [1, 2, 3]
// 	}
// 	*[Symbol.iterator]() {
// 		yield* this.values
// 	}
// }
// const f = new Foo()
// for (const x of f) {
// 	console.log(x); // 1   2   3
// }



// function* generator() { }
// const g = generator()
// console.log(g.next); // [Function: next]
// console.log(g.return);// [Function: return]
// console.log(g.throw);// [Function: throw]


// function* generator() {
// 	yield* [1, 2, 3, 4]
// }
// const g = generator()
// console.log(g);// Object [Generator] {<suspended>}
// console.log(g.return(10));// { value: 10, done: true } 		value是return时传入的值
// console.log(g);// Object [Generator] {<closed>}


// 所有生成器对象都有return()方法，只要进入关闭状态就无法恢复。后续调用next()均显示done:ture
// function* generator() {
// 	yield* [1, 2, 3, 4]
// }
// const g = generator()
// console.log(g.next()); // { value: 1, done: false }
// console.log(g.return('closed')); // { value: 'closed', done: true }
// console.log(g.next()); // { value: undefined, done: true }
// console.log(g.next()); // { value: undefined, done: true }
// console.log(g.next()); // { value: undefined, done: true }


// for-of等内置语言结构会省略done:true时所返回的值。
// function* generator() {
// 	yield* [1, 2, 3, 4]
// }
// const g = generator()
// for (const x of g) {
// 	if (x > 1) {
// 		g.return(10)
// 	}
// 	console.log(x); // 1     2
// }



// throw
// function* generator() {
// 	for (const x of [1, 2, 3, 4]) {
// 		yield x
// 	}
// }
// const g = generator()
// try {
// 	g.throw('foo error')
// } catch (error) {
// 	console.log(error); // foo error
// }
// console.log(g);  //Object [Generator] {<closed>}


// 假如生成器内部处理了这个错误，那么生成器就不会关闭
function* generator() {
	for (const x of [1, 2, 3, 4]) {
		try {
			yield x
		} catch (err) { }
	}
}
const g = generator()
console.log(g.next()); // { value: 1, done: false }
g.throw('error') // 这个error会被yield x捕获，并在内部trycatch中获取，因为抛出了错误，所以生成器不会产生2，下次执行next()时，会直接从3开始
console.log(g.next()); // { value: 3, done: false }