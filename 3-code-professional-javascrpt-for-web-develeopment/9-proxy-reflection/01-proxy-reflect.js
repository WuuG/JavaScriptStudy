// 代理
// 创建代理
// const target = {
// 	id: 'target'
// }
// const handler = {}
// const proxy = new Proxy(target, handler)
// // 访问id
// console.log(target.id); // target
// console.log(proxy.id); // target
// // 赋值
// target.id = 'foo'
// console.log(target.id);  // foo
// console.log(proxy.id);  // foo
// // 添加属性，在代理属性赋值，也会转移到目标对象上
// proxy.id = 'baz'
// console.log(target.id); // baz
// console.log(proxy.id); // baz
// // hasOwnProperty()方法在两个地方都是应用到目标对象上
// console.log(proxy.hasOwnProperty('id')); // true
// console.log(target.hasOwnProperty('id')); // true
// // Proxy.prototype是undefined,因此无法使用instanceof操作符
// console.log(target instanceof Proxy); //TypeError
// console.log(proxy instanceof Proxy);// TypeError
// // 严格相等可以用来区分代理和目标
// console.log(target === proxy); // false



// // get()捕获器
// const target = {
// 	foo: 'bar'
// }
// const handler = {
// 	// 捕获器再处理程序对象中以方法名为键
// 	get() {
// 		return 'hanlder override'
// 	}
// }
// const proxy = new Proxy(target, handler)
// console.log(target.foo);// bar
// console.log(proxy.foo); // hanlder override
// console.log(proxy['foo']); // hanlder override
// console.log(Object.create(proxy)['foo']); // hanlder override
// let proxy1 = Object.create(proxy)
// console.log(proxy1); // Object [hanlder override] {}



// get
// const target = {
// 	foo: 'bar'
// }
// const handelr = {
// 	get(trapTarget, property, receiver) {
// 		console.log(trapTarget === target); // true
// 		console.log(property);
// 		console.log(receiver); // 代理对象
// 	}
// }
// const proxy = new Proxy(target, handelr)
// proxy.foo
// // true
// // foo
// // { foo: 'bar' }



// const target = {
// 	foo: 'bar'
// }
// const handler = {
// 	get() {
// 		return Reflect.get(...arguments)
// 		// 也可以写成下式
// 		return Reflect.get
// 	}
// }
// const proxy = new Proxy(target, handler)
// console.log(proxy.foo); // bar
// console.log(target.foo); // bar


// const target = {
// 	foo: 'bar'
// }
// const proxy = new Proxy(target, Reflect)
// console.log(proxy.foo); // bar
// console.log(target.foo); // bar



// const target = {
// 	foo: 'bar',
// 	baz: 'qux'
// }
// const handler = {
// 	get(target, property, receiver) {
// 		let decoration = '';
// 		if (property === 'foo') {
// 			decoration = '!!!'
// 		}
// 		return Reflect.get(...arguments) + decoration
// 	}
// }
// const proxy = new Proxy(target, handler)
// console.log(target.foo);// bar
// console.log(proxy.foo); // bar!!!
// console.log(target.baz); // qux
// console.log(proxy.baz); // qux



// const target = {}
// Object.defineProperty(target, 'foo', {
// 	value: 'bar'
// })
// const handler = {
// 	get() {
// 		return 'foo'
// 	}
// }
// const proxy = new Proxy(target, handler)
// console.log(target.foo); // bar
// console.log(proxy.foo); // TypeError



// // 撤销函数的代理现象是在实例化时同时生成的
// const target = {
// 	foo: 'bar'
// }
// const handler = {
// 	get() {
// 		return 'inteceptor'
// 	}
// }
// const { proxy, revoke } = Proxy.revocable(target, handler)
// console.log(proxy.foo); // inteceptor
// console.log(target.foo); // ba
// revoke()
// console.log(proxy.foo); // TypeError



// 源代码
// const o = {}
// try {
// 	Object.defineProperties(o, 'foo', 'bar')
// 	console.log('success');
// } catch (error) {
// 	console.log('failure'); // failure
// }


// // 重构后代码
// const o = {}
// Object.defineProperties(o, {
// 	foo: {
// 		value: 'baz'
// 	}
// })
// if (Reflect.defineProperty(o, 'foo', { value: 'bar' })) { // 无法配置，不是抛出错误，而是false。细粒度更高
// 	console.log('success');
// } else {
// 	console.log('failue'); // failure
// }


// 状态标记方法
// Reflect.defineProperty()
// Reflect.preventExtensions()
// Reflect.setPrototypeOf()
// Reflect.set()
// Reflect.defineProperty()



// 提供只有操作符才能完成的的操作
// Reflect.get(): 可以代替对象属性访问操作符？
// Reflect.set(): 可以替代=赋值操作符
// Reflect.has():可以代替in操作符或with()
// Reflect.deleteProperty():可以代替delete操作符
// Reflect.construct(): 可以代替new操作符


// Function.prototype.apply.call(myFunc,thisVal,argumentList)
// 上面代码可以用下面来避免
// Reflect.apply(myFunc,thisVal,argumentList)



// 多重代理
// const target = {
// 	foo: 'bar'
// }
// const firstProxy = new Proxy(target, {
// 	get() {
// 		console.log('first proxy');
// 		return Reflect.get(...arguments)
// 	}
// })
// const secondPrxoy = new Proxy(firstProxy, {
// 	get() {
// 		console.log('second proxy');
// 		return Reflect.get(...arguments)
// 	}
// })
// console.log(secondPrxoy.foo);
// // second proxy
// // first proxy
// // bar



// this
// 正常情况下
// const target = {
// 	thisValEqualsProxy() {
// 		return this === proxy
// 	}
// }
// const proxy = new Proxy(target, {})
// console.log(target.thisValEqualsProxy()); // false
// console.log(proxy.thisValEqualsProxy()); // true

// 目标对象依赖于对象标识的情况下
// const User = (() => {
// 	const wm = new WeakMap()
// 	class User {
// 		constructor(userId) {
// 			wm.set(this, userId) // 这里的key就是this,依赖于User的this。
// 		}
// 		set id(userId) {
// 			wm.set(this, userId)
// 		}
// 		get id() {
// 			return wm.get(this)
// 		}
// 	}
// 	return User
// })()
// const user = new User(123)
// console.log(user.id); // 123
// const userInstanceProxy = new Proxy(user, {})
// console.log(userInstanceProxy.id); // undefined 以代理对象的this作为键，所以查找不到

// // 为了解决this的问题，可以代理类再进行实例创建。但这样不就是代理类了么，代理操作就是针对类对象了
// const UserClassProxy = new Proxy(User, {})
// const proxyUser = new UserClassProxy(456)
// console.log(proxyUser.id); // 456



// Date proxy
// const target = new Date()
// const proxy = new Proxy(target, {})
// console.log(proxy instanceof Date); // true
// proxy.getDate() // TypeError: this is not a Date object.




// get()捕获器会在获取属性值的操作中被调用.
// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	get(target, property, receiver) {
// 		console.log('get()');
// 		return Reflect.get(...arguments)
// 	}
// })
// proxy.foo // get()



//set()捕获器会在设置属性值的操作中被调用
// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	set(target, property, value, receiver) {
// 		console.log('set()');
// 		return Reflect.set(...arguments)
// 	}
// })
// proxy.foo = 'bar' // set()



// has()捕获器会在in操作符中被调用。对用反射API方法为Reflect.has()
// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	has(target, property) {
// 		console.log('has()');
// 		return Reflect.has(...arguments)
// 	}
// })
// 'foo' in proxy // has()
// Reflect.has(proxy, 'foo') // has()


// defineProperty()捕获器会在Object.defindProperty()中被调用。对应反射API方法为Reflect.defindProperty()
// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	defineProperty(target, property, descriptor) {
// 		console.log("defineProperty");
// 		return Reflect.defineProperty(...arguments)
// 	}
// })
// Object.defineProperty(proxy, 'foo', { value: 'bar' }) // defineProperty



// getOwnPropertyDescriptor(),存在对应反射API方法
// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	getOwnPropertyDescriptor() {
// 		console.log('getOwnPropertyDescriptor');
// 		return Reflect.getOwnPropertyDescriptor(...arguments)
// 	}
// })
// Object.getOwnPropertyDescriptor(proxy, 'foo') // getOwnPropertyDescriptor



// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	deleteProperty(target, property) {
// 		console.log('deleteProperty()');
// 		return Reflect.deleteProperty(...arguments)
// 	}
// })
// delete proxy.foo // deleteProperty()



// ownKeys()由Object.keys()及类似方法中被调用。对应反射API方法为Reflect.ownKeys()
// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	ownKeys() {
// 		console.log('ownKeys()');
// 		return Reflect.ownKeys(...arguments)
// 	}
// })
// Object.keys(proxy) // ownKeys
// Reflect.ownKeys(proxy)// ownKeys



// 在Object.getPrototypeOf()中调用。存在同名反射API方法
// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	getPrototypeOf(target) {
// 		console.log('getPrototypeOf');
// 		return Reflect.getPrototypeOf(...arguments)
// 	}
// })
// Object.getPrototypeOf(proxy) // getPrototypeOf



// setPrototypeOf()
// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	setPrototypeOf(target, prototype) {
// 		console.log('setPrototypeOf()');
// 		return Reflect.setPrototypeOf(...arguments)
// 	}
// })
// Object.setPrototypeOf(proxy, Object) // setPrototypeOf()
// proxy.__proto__ = Object.prototype // // setPrototypeOf()



// 在Object.isExtensible()中被调用。存在同名反射API方法
// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	isExtensible(target) {
// 		console.log('isExtensible');
// 		return Reflect.isExtensible(...arguments)
// 	}
// })
// Object.isExtensible(proxy) // isExtensible



// 被Object.preventExtensions()调用，存在对应同名反射API方法
// const myTarget = {}
// const proxy = new Proxy(myTarget, {
// 	preventExtensions(target) {
// 		console.log('preventExtensions');
// 		return Reflect.preventExtensions(...arguments)
// 	}
// })
// Object.preventExtensions(proxy) // preventExtensions



// apply()在调用函数时被调用，对应的反射API方法为Reflect.apply()
// const myTarget = () => { }
// const proxy = new Proxy(myTarget, {
// 	apply(target, thisArg, ...argumentList) {
// 		console.log('apply()');
// 		return Reflect.apply(...arguments)
// 	}
// })
// proxy() // apply()



// construct()捕获器会在new操作时被调用。对应反射API方法为Reflect.construct()
// const myTarget = function () { }
// const proxy = new Proxy(myTarget, {
// 	construct(target, argumentList, newTarget) {
// 		console.log('construct()');
// 		return Reflect.construct(...arguments)
// 	}
// })
// new proxy // construct()





// 跟踪属性访问
// const user = {
// 	name: 'Nico'
// }
// const proxy = new Proxy(user, {
// 	get(target, property, receiver) {
// 		const s = new Date()
// 		console.log(`Getting ${property} in ${s}`);
// 		return Reflect.get(...arguments)
// 	},
// 	set(target, property, value, receiver) {
// 		console.log(`Setting ${property}=${value}`);
// 		return Reflect.set(...arguments)
// 	}
// })
// proxy.name // Getting name in [[time]]
// proxy.name = 'Grey' // Setting name=Gery



// const hiddenProperties = ['foo', 'bar']
// const targetObject = {
// 	foo: 1,
// 	bar: 2,
// 	baz: 3
// }
// const proxy = new Proxy(targetObject, {
// 	get(target, property, receiver) {
// 		if (hiddenProperties.includes(property)) {
// 			return undefined
// 		}
// 		return Reflect.get(...arguments)
// 	},
// 	has(target, property) {
// 		if (hiddenProperties.includes(property)) {
// 			return undefined
// 		}
// 		return Reflect.has(...arguments)
// 	}
// })
// console.log(proxy.foo); // undefined
// console.log(proxy.bar); // undefined
// console.log(proxy.baz); // 3

// console.log('foo' in proxy); // false
// console.log('bar' in proxy); // false
// console.log('baz' in proxy); // true



// 属性验证
// const target = {
// 	onlyNumbersGohere: 0
// }
// const proxy = new Proxy(target, {
// 	set(target, p, value) {
// 		if (typeof value != 'number') {
// 			return false
// 		}
// 		return Reflect.set(...arguments)
// 	}
// })
// proxy.onlyNumbersGohere = 1
// console.log(proxy.onlyNumbersGohere); // 1
// proxy.onlyNumbersGohere = '2'
// console.log(proxy.onlyNumbersGohere); // 1



// 同属性验证类似，也可以对函数和构造函数参数进行审查。
// function median(...nums) { // 中位数
// 	return nums.sort(
// 		(num1, num2) => num1 > num2 ? 1 : -1
// 	)[Math.floor(nums.length / 2)]
// }
// const proxy = new Proxy(median, {
// 	apply(target, thisArg, argumentsList) {
// 		for (const arg of argumentsList) {
// 			if (typeof arg !== 'number') {
// 				throw 'Non-number argument provided'
// 			}
// 		}
// 		return Reflect.apply(...arguments)
// 	}
// })
// console.log(proxy(1, 2, 92, 4, 29));
// console.log(proxy(1, '2', 3)); // Non-number argument provided


// 构造函数传参
// class User {
// 	constructor(id) {
// 		this.id_ = id
// 	}
// }
// const proxy = new Proxy(User, {
// 	construct(target, argumentsList, newTarget) {
// 		if (argumentsList[0] === undefined) {
// 			throw 'User cannot be instantiated without id'
// 		} else {
// 			return Reflect.construct(...arguments)
// 		}
// 	}
// })
// new proxy(1)
// new proxy() // User cannot be instantiated without id



// 将代理的类绑定到一个全局实例集合，让所有被创建的实例都添加到这个集合中。
// const userList = []
// class User {
// 	constructor(name) {
// 		this.name_ = name
// 	}
// }
// const proxy = new Proxy(User, {
// 	construct(target, aryArray, newTarget) {
// 		const newUser = Reflect.construct(...arguments)
// 		userList.push(newUser)
// 		return newUser
// 	}
// })
// new proxy('John')
// new proxy('Nico')
// new proxy('Gery')
// console.log(userList);
// // [User { name_: 'John' }, User { name_: 'Nico' }, User { name_: 'Gery' }]


// 或者把集合绑定到一个时间分派程序，每次插入新实例就发送消息：
const user = []
function emit(newValue) {
	console.log(`push value = ${newValue}`);
}
const proxy = new Proxy(user, {
	set(target, p, value, receiver) {
		const result = Reflect.set(...arguments)
		if (result) {
			emit(value)
		}
		return result
	}
})
proxy.push('john')// 有点意思,set了两次,应该是length
// push value = john
// push value = 1
proxy.push('Nico')
// push value = Nico
// push value = 2