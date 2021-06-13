// Map
// const m1 = new Map([ //初始化
// 	['key1', 'val1'],
// 	['key2', 'val2'],
// 	['key3', 'val3'],
// ])
// console.log(m1.size); // 3
// const m2 = new Map({ // 这算是初始化的第二种方式嘛
// 	[Symbol.iterator]: function* () { 
// 		yield ["key1", 'val1']
// 		yield ["key2", 'val2']
// 		yield ["key3", 'val3']
// 	}
// })
// console.log(m2.size); //3
// const m3 = new Map([[]]) // [] 为空undefined
// console.log(m3.has(undefined)); // true
// console.log(m3.get(undefined)); // undefined


// API
// const m = new Map()
// console.log(m.has(undefined)); // false 
// console.log(m.get('firstName')); // undefined
// console.log(m.size); //0

// m.set('firstName', 'Matt').set('firstName', 'Niko').set('lastName', 'jerry')
// console.log(m.has('firstName'));
// console.log(m.get('firstName')); // 覆盖啦
// console.log(m.size); // 2

// m.delete('firstName')
// console.log(m.has('fistName')); // false
// console.log(m.has('lastName')); // true
// console.log(m.size); // 1
// m.clear() // 删除所有键值对
// console.log(m.size); // 0


// set()返回的是映射实例，所以可以连缀使用
// const m = new Map().set('key1', 'val1')
// m.set('key2', 'val2').set('key3', 'key3')
// console.log(m); // Map(3) { 'key1' => 'val1', 'key2' => 'val2', 'key3' => 'key3' }


// const m = new Map()
// const functionKey = function () { }
// const symbolKey = Symbol()
// const objectKey = new Object()
// m.set(functionKey, 'functionKey').set(symbolKey, 'symbolKey').set(objectKey, 'objectKey')
// console.log(m.get(functionKey)); // 'functionKey'
// console.log(m.get(symbolKey)); // 'symbolKey'
// console.log(m.get(objectKey)); // 'objectKey'
// // SameValueZero比较  实例不同
// console.log(m.has(function () { })); // false


// const m = new Map()
// const objKey = {}, objVal = {}, arrKey = [], arrVal = []
// m.set(objKey, objVal).set(arrKey, arrVal)
// objKey.bar = 'bar'
// objVal.foo = 'foo'
// arrKey.push('buz')
// arrVal.push('qux')
// console.log(m.get(objKey)); // {foo:'foo'}
// console.log(m.get(arrKey)); // ['qux']


// const m = new Map()
// const a = 0 / "", b = 0 / 'a', pz = +0, nz = -0
// console.log(a === b); // flase
// console.log(pz === nz); // true
// m.set(a, 'foo').set(pz, 'bar')
// console.log(m.get(b)); // foo NaN等于NaN？ ☺
// console.log(m.get(nz)); // bar 



// const m = new Map([
// 	['key1', 'value1'],
// 	['key2', 'value2'],
// 	['key3', 'value3'],
// ])
// // 以下三者是一样的
// console.log(m.entries === m[Symbol.iterator]); // true
// for (const pair of m) {
// 	console.log(pair);
// }
// // [ 'key1', 'value1' ]
// // [ 'key2', 'value2' ]
// // [ 'key3', 'value3' ]
// for (const pair of m.entries()) {
// 	console.log(pair);
// }
// for (const pair of m[Symbol.iterator]()) {
// 	console.log(pair);
// }


// const m = new Map([
// 	['key1', 'value1'],
// 	['key2', 'value2'],
// 	['key3', 'value3'],
// ])
// m.forEach((key, value) => console.log(`${key}--> ${value}`))
// // value1--> key1
// // value2--> key2
// // value3--> key3

// for (const key of m.keys()) {
// 	console.log(key);
// }
// // key1
// // key2
// // key3
// for (const value of m.values()) {
// 	console.log(value);
// }
// // value1
// // value2
// // value3


// const m1 = new Map([
// 	['key1', 'value1']
// ])
// for (let key of m1.keys()) {
// 	key = 'newKey';
// 	console.log(key);// 'newKey'
// 	// 作为键的字符串的原始值是不能修改的
// 	console.log(m1.get('key1')) // value1
// 	console.log(m1.get(key)) //undefined
// 	console.log(m1.get('newKey')); // undefined
// }
// // 当然对象内部的属性是可以修改的
// const keyObj = { id: 1 }
// const m2 = new Map([
// 	[keyObj, 'value2']
// ])
// for (let key of m2.keys()) {
// 	key.id = 2
// 	console.log(key);
// 	console.log(m2.get(key)); // value2
// }
// console.log(m2.get(keyObj)); // value2




// WeakMap
// const wm = new WeakMap()
// // 弱映射中的键只能是Object或者继承自Object的类型,使用非对象设置键会抛出TypeError错误
// const key1 = { id: 1 }
// const key2 = { id: 2 }
// const key3 = { id: 3 }
// const wm1 = new WeakMap([
// 	[key1, 'val1'],
// 	[key2, 'val2'],
// 	[key3, 'val3']
// ])
// console.log(wm1.get(key1)); // val1
// console.log(wm1.get(key2)); // val2
// console.log(wm1.get(key3)); // val3

// const wm2 = new WeakMap([ // TypeError
// 	[key1, 'val1']
// 	['badKey', 'val2']
// ])

// const strKey = new String('key1')
// const wm3 = new WeakMap([
// 	[strKey, 'value1']
// ])
// console.log(wm3.get(strKey));


// set
// const key1 = { id: 1 }
// const key2 = { id: 2 }
// const key3 = { id: 3 }
// const wm = new WeakMap().set(key1, 'value1').set(key2, 'value2').set(key3, 'value3')
// console.log(wm.get(key1)); // value1
// console.log(wm.get(key2)); // value2
// console.log(wm.get(key3)); // value3




// 弱键
// weak表示，这些键不属于正式的引用，不会阻止垃圾回收.但若是这些键被引用，就不会被当作垃圾回收
// 初始化了一个新对象作为一个字符串的键。因为没有指向这个对象的其他引用,所以这行代码执行后，这个对象就会被当作垃圾回收。之后这个键值对就从弱映射中消失了，称为一个空映射。又因为值没有被引用，所以值本身也会称为垃圾回收的目标
// const wm = new WeakMap()
// wm.set({}, 'val')


// 这个例子中container维持着key的引用，因此对象键不会称为垃圾回收的目标。但若是调用removeReference则会摧毁键对象的最后一个引用，垃圾回收程序就会把这个键值对清理掉。
// const wm = new WeakMap()
// const container = {
// 	key: {}
// }
// wm.set(container.key, 'val')
// function removeReference() {
// 	container.key = null
// }
// // 其实若是没有引用的化，你也无法调用其内部的value，因此被回收是很正常的做法



// 私有变量
// 弱映射实现了JavaScript中实现私有变量的一种新方式。前提很明确：私有变量存储在弱映射中，以对象实例为键，以私有成员的字段为值。
// const wm = new WeakMap()
// class User {
// 	constructor(id) {
// 		this.idProperty = Symbol('id')
// 		this.setId(id)
// 	}
// 	setPrivate(property, value) {
// 		const privateMember = wm.get(this) || {}
// 		privateMember[property] = value
// 		wm.set(this, privateMember)
// 	}
// 	getPrivate(property) {
// 		return wm.get(this)[property]
// 	}
// 	setId(id) {
// 		this.setPrivate(this.idProperty, id)
// 	}
// 	getId() {
// 		return this.getPrivate(this.idProperty)
// 	}
// }
// const user = new User(123)
// console.log(user.getId());
// user.setId(456)
// console.log(user.getId());
// // 不是真正的私有，外部也能访问。
// console.log(wm.get(user[user.idProperty])); //456


// const User = (() => {
// 	const wm = new WeakMap()
// 	class User {
// 		constructor(id) {
// 			this.idProperty = Symbol('id')
// 			this.setId(id)
// 		}
// 		setPrivate(property, value) {
// 			const privateMember = wm.get(this) || {}
// 			privateMember[property] = value
// 			wm.set(this, privateMember)
// 		}
// 		getPrivate(property) {
// 			return wm.get(this)[property]
// 		}
// 		setId(id) {
// 			this.setPrivate(this.idProperty, id)
// 		}
// 		getId() {
// 			return this.getPrivate(this.idProperty)
// 		}
// 	}
// 	return User
// })()
// const user = new User(123)
// console.log(user.getId());
// user.setId(456)
// console.log(user.getId());
// console.log(wm.get(user[user.idProperty])); // ReferenceError


// DOM
// // #login按钮移除后，由于映射中保存按钮的引用，所以除非明确冲map中移除，否则不会被回收程序处理
// const m = new Map()
// const btn = document.querySelector('#login')
// m.set(btn, { disable: true })

// // 若是使用WeakMap。当节点从DOM树中移除后，若是这个btn没有被其他东西引用的话,垃圾回收程序就可以对其进行回收。
// const wm = new WeakMap()
// const loginBtn = document.querySelector('#login')
// wm.set(loginBtn,{disable:true})