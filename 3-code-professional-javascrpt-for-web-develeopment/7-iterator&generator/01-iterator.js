// let num = 1
// let obj = {}
// console.log(num[Symbol.iterator]); // undefined
// console.log(obj[Symbol.iterator]); // undefined
// let str = 'abc'
// let arr = ['a', 'b', 'c']
// let map = new Map().set('a', 1).set('b', 2).set('c', 3)
// let set = new Set([...arr])
// // let els = document.querySelectorAll('div')
// // 以下类型都是先了迭代器工厂函数
// console.log(str[Symbol.iterator]);
// console.log(arr[Symbol.iterator]);
// console.log(map[Symbol.iterator]);
// console.log(set[Symbol.iterator]);
// console.log(str[Symbol.iterator]);
// // console.log(els[Symbol.iterator]);
// // 调用工厂函数会生产一个迭代器
// console.log(str[Symbol.iterator]());
// console.log(arr[Symbol.iterator]());
// console.log(map[Symbol.iterator]());
// console.log(set[Symbol.iterator]());
// console.log(str[Symbol.iterator]());
// Object [String Iterator] {}
// Object [Array Iterator] {}
// [Map Entries] { [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] }
// [Set Iterator] { 'a', 'b', 'c' }
// Object [String Iterator] {}



// let arr = ['foo', 'bar', 'baz']
// for (let el of arr) {
// 	console.log(el);
// }
// // foo
// // bar
// // baz
// let [a, b, c] = arr;
// console.log(a, b, c); // foo bar baz
// let arr2 = [...arr]
// console.log(arr2); // [ 'foo', 'bar', 'baz' ]
// let arr3 = Array.from(arr)
// console.log(arr3); // [ 'foo', 'bar', 'baz' ]
// let set = new Set(arr)
// console.log(set); // Set(3) { 'foo', 'bar', 'baz' }
// let pairs = new Map(arr.map(x => [x, `val${x}`]))
// console.log(pairs); // Map(3) { 'foo' => 'valfoo', 'bar' => 'valbar', 'baz' => 'valbaz' }



// // 父类实现iterator接口，这个对象也实现了这个接口
// class FooArray extends Array { }
// let fooArr = new FooArray('foo', 'bar', 'buz')
// for (let el of fooArr) {
// 	console.log(el);
// }
// // foo
// // bar
// // buz



// 迭代器对象
// let arr = ['foo', 'bar']
// console.log(arr[Symbol.iterator]); // [Function: values]
// let iter = arr[Symbol.iterator]()
// console.log(iter); // Object [Array Iterator] {}
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// // { value: 'foo', done: false }
// // { value: 'bar', done: false }
// // { value: undefined, done: true } 
// // 到达done后就调用就返回同样的值了
// // { value: undefined, done: true }



// // 不同的迭代器实例相互之间没有联系，独立的遍历可迭代对象,可以嵌套使用啦，看来
// let arr = ['foo']
// let iter1 = arr[Symbol.iterator]()
// let iter2 = arr[Symbol.iterator]()
// console.log(iter1.next());
// console.log(iter2.next());
// console.log(iter1.next());
// console.log(iter2.next());
// // { value: 'foo', done: false }
// // { value: 'foo', done: false }
// // { value: undefined, done: true }
// // { value: undefined, done: true }


// 迭代器并不与可迭代对象某个时刻的快照绑定，而仅仅是使用游标来记录遍历可迭代对象的历程(指针？)。换句话说，如果可迭代对象在迭代期间被修改了，那么迭代器也会反映相应的变化：
// let arr = ['foo', 'baz']
// let iter = arr[Symbol.iterator]()
// console.log(iter.next()); // {value:'foo',done:false}
// arr.splice(1, 0, 'buz')
// console.log(iter.next()); // {value:'buz',done:false}
// console.log(iter.next()); // {value:'baz',done:false}


// class Foo {
// 	[Symbol.iterator]() {
// 		return {
// 			next() {
// 				return { done: false, value: 'foo' }
// 			}
// 		}
// 	}
// }
// let f = new Foo()
// console.log(f[Symbol.iterator]());// { next: [Function: next] }
// let a = new Array()
// console.log(a[Symbol.iterator]());// Object [Array Iterator] {}



// // 自定义迭代器
// class Count {
// 	constructor(limit) {
// 		this.count = 1;
// 		this.limit = limit
// 	}
// 	next() {
// 		if (this.count <= this.limit) {
// 			return { done: false, value: this.count++ }
// 		} else {
// 			return { done: true, value: undefined }
// 		}
// 	}
// 	[Symbol.iterator]() {
// 		return this
// 	}
// }
// let counter = new Count(3)
// for (let i of counter) {
// 	console.log(i);
// }
// 1
// 2
// 3


// 为了让可迭代对象创建多个对象，因此每创建一个迭代器就对应一个新技术器。为此，可以把计数器变量放到闭包里，再通过闭包返回迭代器 ??? 这...
// class Counter {
// 	constructor(limit) {
// 		this.limit = limit
// 	}
// 	[Symbol.iterator]() {
// 		let count = 1,
// 			limit = this.limit
// 		return {
// 			next() {
// 				if (count <= limit) {
// 					return { done: false, value: count++ }
// 				} else {
// 					return { done: true, value: undefined }
// 				}
// 			}
// 		}
// 	}
// }
// let count = new Counter(3)
// for (const i of count) { console.log(i); } // 1 2 3
// for (const i of count) { console.log(i); } // 1 2 3


// iterator的Symbol.iterator属性引用的工厂函数会返回相同的迭代器。
// let arr = ['foo', 'bar', 'baz']
// let iter1 = arr[Symbol.iterator]()
// console.log(iter1); // Object [Array Iterator] {}
// console.log(iter1[Symbol.iterator]()); // Object [Array Iterator] {}
// let iter2 = iter1[Symbol.iterator]()
// console.log(iter1 === iter2); //true



// 提前终止
// class Counter {
// 	constructor(limit) {
// 		this.limit = limit
// 	}
// 	[Symbol.iterator]() {
// 		let count = 1,
// 			limit = this.limit
// 		return {
// 			next() {
// 				if (count <= limit) {
// 					return { value: count++, done: false }
// 				} else {
// 					return { value: undefined, done: true }
// 				}
// 			},
// 			return() {
// 				console.log('Early Exit');
// 				return { done: true }
// 			}
// 		}
// 	}
// }
// let counter1 = new Counter(3)
// for (let i of counter1) {
// 	if (i > 2) {
// 		break
// 	}
// 	console.log(i);
// }
// // 1
// // 2
// // Early Exit
// for (let i of counter1) {
// 	try {
// 		if (i > 2) {
// 			throw 'err'
// 		}
// 		console.log(i);
// 	} catch (error) { }
// }
// // 1
// // 2
// // 为什么没有Early Exit呢？
// let counter2 = new Counter(3)
// let [a, b] = counter2
// // Early Exit


// let a = [1, 2, 3, 4, 5]
// let iter = a[Symbol.iterator]()
// for (const i of iter) {
// 	console.log(i);
// 	if (i > 2) {
// 		break
// 	}
// }
// // 1
// // 2
// // 3
// for (const i of iter) {
// 	console.log(i);
// }
// // 4
// // 5


let a = [1, 2, 3, 4, 5]
let iter = a[Symbol.iterator]()
iter.return = function () {
	console.log('Early Exit');
	return { done: true }
}
for (const i of iter) {
	console.log(i);
	if (i > 2) {
		break
	}
}
// 1
// 2
// 3
// Early Exit
for (const i of iter) {
	console.log(i);
}
// 4
// 5