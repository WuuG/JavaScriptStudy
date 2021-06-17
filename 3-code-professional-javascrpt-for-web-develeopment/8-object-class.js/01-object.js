// let person = {}
// Object.defineProperty(person, 'name', {
// 	writable: false,
// 	value: 'GERO'
// })
// console.log(person.name); // GERO
// person.name = 'Nico' // 没有修改成功，严格模式下抛出错误
// console.log(person.name); // GERO

// 一个属性被定义成不可配置之后，就不能再变回可配置的了。再次调用Objec.defineProperty()并修改任何非writable属性会导致错误
// let person = {}
// Object.defineProperty(person, 'name', {
// 	configurable: false,
// 	value: 'Nico'
// })
// console.log(person.name);
// // 报错,因为configurable等于false
// Object.defineProperty(person, 'name', {
// 	// configurable: true,
// 	// value: 'AINO'
// })

// 属性的writable为true时，是可以修改value的
// let person = {}
// Object.defineProperty(person, 'name', {
// 	configurable: false,
// 	writable: true,
// 	value: 'Nico'
// })
// console.log(person.name);
// // 报错,因为configurable等于false
// Object.defineProperty(person, 'name', {
// 	value: 'AINO'
// })

// 访问器属性不能直接定义，必须使用Object.DefindProperty()
// const book = {
// 	year_: 2017, // 伪私有成员
// 	edition: 1
// }
// Object.defineProperty(book, 'year', {
// 	get() {
// 		return this.year_
// 	},
// 	set(newValue) {
// 		if (newValue > 2017) {
// 			this.year_ = newValue;
// 			this.edition += newValue - 2017
// 		}
// 	}
// })
// book.year = 2020
// console.log(book.year); // 2020
// console.log(book.edition);// 4

// 定义多个属性
// let book = {}
// Object.defineProperties(book, {
// 	year_: {
// 		value: 2017
// 	},
// 	edition: {
// 		value: 1
// 	},
// 	year: {
// 		get() {
// 			return this.year_
// 		},
// 		set(newValue) {
// 			if (newValue) {
// 				this.year_ = newValue
// 				this.edition += newValue - 2017
// 			}
// 		}
// 	}
// })

// // 使用getOwnPropertyDescriptor()方法获取指定属性的属性描述符。方法接受两个参数：
// let book = {}
// Object.defineProperties(book, {
// 	year_: {
// 		value: 2017
// 	},
// 	edition: {
// 		value: 1
// 	},
// 	year: {
// 		get() {
// 			return this.year_
// 		},
// 		set(newValue) {
// 			if (newValue) {
// 				this.year_ = newValue
// 				this.edition += newValue - 2017
// 			}
// 		}
// 	}
// })
// let descriptor1 = Object.getOwnPropertyDescriptor(book, 'year_')
// console.log(descriptor1);
// // {
// // value: 2017,
// // writable: false,
// // enumerable: false,
// // configurable: false
// // }
// let descriptor2 = Object.getOwnPropertyDescriptor(book, 'year')
// console.log(descriptor2);
// // {
// // get: [Function: get],
// // set: [Function: set],
// // enumerable: false,
// // configurable: false
// // }

// ECMAScript新增Object.getOwnpropertyDescriptors()
// console.log(Object.getOwnPropertyDescriptors(book));
// {
//   year_: {
//     value: 2017,
//     writable: false,
//     enumerable: false,
//     configurable: false
//   },
//   edition: { value: 1, writable: false, enumerable: false, configurable: false },
//   year: {
//     get: [Function: get],
//     set: [Function: set],
//     enumerable: false,
//     configurable: false
//   }
// }

// /**
//  * 简单复制
//  */
// let dest, src, result;
// dest = {}
// src = { id: 'src' }
// result = Object.assign(dest, src)
// console.log(result);// { id: 'src' }
// console.log(dest === result, dest === src, result === src); // true false false
// /**
//  * 多个源对象
//  */
// dest = {}
// result = Object.assign(dest, { 'foo': 1 }, { 'bar': 2 })
// console.log(result);  //{ foo: 1, bar: 2 }
// /**
//  * 获取函数与设置函数
//  */
// dest = {
// 	set a(val) {
// 		console.log(`dest setter with param ${val}`);
// 	}
// }
// src = {
// 	get a() {
// 		console.log('src getter');
// 		return 'foo'
// 	}
// }
// Object.assign(dest, src)
// console.log(dest);
// // src getter		先调用src getter方法
// // dest setter with param foo 然后调用dest setter方法，参数为src getter所获取的值。
// // { a: [Setter] }

// /**
//  * 覆盖属性
//  */
// let dest, src, result
// dest = { id: 'dest' }
// result = Object.assign(dest, { id: 'src1', a: 'foo' }, { id: 'src2' })
// console.log(result);// { id: 'src2', a: 'foo' }
// // 通过setter可以看到函数覆盖的过程
// dest = {
// 	set id(x) {
// 		console.log(x);
// 	}
// }
// Object.assign(dest, { id: 'first' }, { id: 'second' }, { id: 'third' })
// // first
// // second
// // third
// /**
//  * 对象引用
//  */
// dest = {}
// src = { a: {} }
// // 因为是浅复制，所以只复制对象的引用
// Object.assign(dest, src)
// console.log(dest.a === src.a); // true

// let dest, src, result
// dest = {}
// src = {
// 	a: 'foo',
// 	get b() {
// 		throw new Error()
// 	},
// 	c: 'bar'
// }
// try {
// 	Object.assign(dest, src)
// } catch (error) { }
// // 复制到b时发生错误，但是a已经复制成功了
// console.log(dest); // {a:'foo'}

// // Object.is()
// // 符合预期
// console.log(true === 1); // false
// console.log({} === {}); // false
// console.log('2' === 2); // false
// // 在不同JavaScript引擎中表现不同,但仍被认为是相等。
// console.log(+0 === 0); // true
// console.log(-0 === 0); // true
// console.log(+0 === -0);// true
// // NaN
// console.log(NaN === NaN); // false
// console.log(isNaN(NaN)); // true

// console.log(Object.is(true, 1)); //false
// console.log(Object.is({}, {})); // false
// console.log(Object.is('2', 2)); // fasle
// console.log(Object.is(+0, -0)); // false
// console.log(Object.is(-0, 0)); // false
// console.log(Object.is(+0, 0)); // true
// console.log(Object.is(NaN, NaN)); // true

// function recursilyCheckEquel(x, ...rest) {
// 	return Object.is(x, rest[0]) &&
// 		(rest.length < 2 || recursilyCheckEquel(...rest))
// }
// const result = recursilyCheckEquel(1, 1, 1, 1, 1, 1, 1, 1) // true

// 增强的对象语法
// 属性值简写
// let name = 'Nico'
// let person = {
// 	name
// }
// console.log(person);  // { name: 'Nico' }

// function makePerson(name) {
// 	return {
// 		name
// 	}
// }
// let person = makePerson('Nico')
// console.log(person.name); // Nico

// 可计算属性
// const nameKey = 'name'
// const ageKey = 'age'
// const jobKey = 'job'
// let person = {
// 	[nameKey]: 'Nico',
// 	[ageKey]: '18',
// 	[jobKey]: 'job'
// }
// console.log(person); //  { name: 'Nico', age: '18', job: 'job' }

// const nameKey = 'name'
// const ageKey = 'age'
// const jobKey = 'job'
// let uniqueToken = 0
// function getUniqueKey(key) {
// 	return `${key}_${uniqueToken++}`
// }
// let person = {
// 	[getUniqueKey(nameKey)]: 'Nico',
// 	[getUniqueKey(ageKey)]: '18',
// 	[getUniqueKey(jobKey)]: 'Software engineer'
// }
// console.log(person);// { name_0: 'Nico', age_1: '18', job_2: 'Software engineer' }

// 简写方法名
// let person = {
// 	sayName: function (name) {
// 		console.log(`my Name is ${name}`);
// 	}
// }
// let person = {
// 	sayName(name) {
// 		console.log(`my Name is ${name}`);
// 	}
// }

// 可以用于setter和getter。并与计算属性共同使用
// const func = 'sayName'
// let person = {
// 	name_: '',
// 	get name() {
// 		return this.name_
// 	},
// 	set name(name) {
// 		this.name_ = name
// 	},
// 	[func]() {
// 		console.log(`my name is ${this.name_}`);
// 	}
// }
// person.name = 'Matt'
// person.sayName() // my name is Matt

// 对象解构
// let person = {
// 	name: 'Nico',
// 	age: 18
// }
// let { name: personName, age: personAge } = person
// console.log(personName, personAge); // Nico 18
// // 若是直接使用使用属性的名称,可进行简写
// let { name, age } = person
// console.log(name, age);// Nico 18
// // 解构赋值时，若是引用的属性不存在。则改变量的值时undefined
// let { job } = person
// console.log(job); // undefined
// // 但可以在赋值时定义默认值，若是找不到引用使用默认值
// let { job: career = 'Software engineer' } = person
// console.log(career);

// 原始值解构
// let { length } = 'footbar'
// console.log(length);
// let { constructor: c } = 4 //  解构了Number构造函数
// console.log(c === Number); // true

// let { _ } = null; // TypeError
// let { _ } = undefined // TypeError

// 解构并不要求必须在解构表达式中进行声明。但若是对事先声明的变量赋值，需要将赋值表达式包含在一对括号中。
// let personName, personAge
// let person = {
// 	name: 'Nico',
// 	age: 19
// }; // 这里需要分号，否则后面的解构会被当作函数的参数处理
// ({ name: personName, age: personAge } = person)
// console.log(personName, personAge); //Nico 19

// 嵌套解构
// let person = {
// 	name: 'Nico',
// 	age: 18,
// 	job: {
// 		title: 'softwart engieer'
// 	}
// }
// let personCopy = {};
// ({
// 	name: personCopy.name,
// 	age: personCopy.age,
// 	job: personCopy.job
// } = person)
// // 浅复制，赋值引用，所以改动内部属性，copy也会发生改变。
// person.job.title = 'hacker'
// console.log(person);// { name: 'Nico', age: 18, job: { title: 'hacker' } }
// console.log(personCopy);// { name: 'Nico', age: 18, job: { title: 'hacker' } }
// // 嵌套解构赋值
// personCopy = { job: {} };
// ({
// 	name: personCopy.name,
// 	age: personCopy.age,
// 	job: { title: personCopy.job.title } = person
// } = person)
// person.job.title = 'web designer'
// console.log(person);// { name: 'Nico', age: 18, job: { title: 'web designer' } }
// console.log(personCopy);// { job: { title: 'hacker' }, name: 'Nico', age: 18 }

// // 部分解构
// // 需要注意的是，涉及多个属性的机构赋值时一个输出无关的顺序化操作。如果一个解构表达式涉及多个赋值，中途赋值出错，则整个解构赋值指挥完成一部分。
// let person = {
// 	name: 'Matt',
// 	age: 19
// }
// let personName, personBar, personAge
// try {
// 	({
// 		name: personName,
// 		foo: { bar: personBar },
// 		age: personAge
// 	} = person)
// } catch (error) { }
// console.log(personName, personBar, personAge); // Matt undefined undefined

// // 参数上下文匹配
// // 在函数参数列表中也可以进行解构赋值。解构赋值不会影响到arguments对象
// let person = {
// 	name: 'Matt',
// 	age: 20
// }
// function printPerson1(foo, { name, age }, bar) {
// 	console.log(arguments);
// 	console.log(foo, name, age, bar);
// }
// function printPerson2(foo, { name: personName, age: personAge }, bar) {
// 	console.log(arguments);
// 	console.log(foo, personName, personAge, bar);
// }
// printPerson1('foo', person, 'bar')
// // [Arguments] { '0': 'foo', '1': { name: 'Matt', age: 20 }, '2': 'bar' }
// // foo Matt 20 bar
// printPerson2('foo', person, 'bar')
// // [Arguments] { '0': 'foo', '1': { name: 'Matt', age: 20 }, '2': 'bar' }
// // foo Matt 20 bar

// 工厂模式
// function createPerson(name, age, job) {
// 	return {
// 		name,
// 		age,
// 		job,
// 		sayName() {
// 			console.log(`my name is ${name}`);
// 		}
// 	}
// }
// let person1 = createPerson('Nico', 20, 'Doctor')
// let person2 = createPerson('Grey', 40, 'Vet')

// // 构造函数模式
// function Person(name, age, job) {
// 	this.name = name;
// 	this.age = age;
// 	this.job = job;
// 	this.sayName = function () {
// 		console.log(this.name);
// 	}
// }
// let person1 = new Person('Nico', 18, 'Vet')
// let person2 = new Person('Grey', 40, 'Doctor')

// console.log(person1.constructor === Person); // true
// console.log(person2.constructor === Person); // true

// console.log(person1 instanceof Person); //  true
// console.log(person1 instanceof Object); //  true
// console.log(person2 instanceof Person); //  true
// console.log(person2 instanceof Object); //  true

// let Person = function (name, age, job) {
// 	this.name = name;
// 	this.age = age;
// 	this.job = job;
// 	this.sayName = function () {
// 		console.log(this.name);
// 	}
// }
// let person1 = new Person('Nico', 18, 'Vet')
// let person2 = new Person('Grey', 40, 'Doctor')

// console.log(person1.constructor === Person); // true
// console.log(person2.constructor === Person); // true

// console.log(person1 instanceof Person); //  true
// console.log(person1 instanceof Object); //  true
// console.log(person2 instanceof Person); //  true
// console.log(person2 instanceof Object); //  true

// 构造函数与普通函数
// let Person = function (name, age, job) {
// 	this.name = name;
// 	this.age = age;
// 	this.job = job;
// 	this.sayName = function () {
// 		console.log(this.name);
// 	}
// }
// let person = new Person('Nico', 18, 'SoftWare Enginerr')
// person.sayName() // Nico
// // 直接调用，添加到Window(全局代理)中去了
// let person2 = Person("Grog", 19, 'Vet')
// // window.sayName() // Nico
// let o = new Object()
// Person.call(o, 'Steven', 20, 'Doctor')
// o.sayName() // Steven

// 构造函数的问题：定义的方法会在每个实例上都创建一遍。在前面的例子person1和person2都有名为sayName()的方法，当着两个方法不是同一个Function实例。也就是说之前的代码等价于
// function Person(name, age, job) {
// 	this.name = name
// 	this.age = age
// 	this.job = job
// 	this.sayname = new Function('console.log(this.name)')
// }

// function Person(name, age, job) {
// 	this.name = name;
// 	this.age = age;
// 	this.job = job;
// 	this.sayName = sayName
// }
// function sayName() {
// 	console.log(this.name);
// }
// let person1 = new Person('Nico', 19, 'Doctor')
// let person2 = new Person('Gery', 49, 'Vet')
// console.log(person1.sayName === person2.sayName);// true

// function Person() { }
// Person.prototype.name = 'Nico'
// Person.prototype.age = 18
// Person.prototype.job = 'Software Engineer'
// Person.prototype.sayName = function () {
// 	console.log(this.name);
// }
// let person1 = new Person()
// let person2 = new Person()
// console.log(person1 === person2); // false
// console.log(person1.sayName === person2.sayName); // true

// 原型
// function Person() { }

// console.log(typeof Person.prototype); // object
// console.log(Person.prototype);//  {constructor: ƒ}
// // 构造函数有一个prototype属性，引用其原型其原型对象，而这个原型对象有一个constructor属性，引用这个构造函数。所以二者循环引用
// console.log(Person.prototype.constructor === Person); // true
// // 正常的原型链都会终止与Object的原型对象，Object的原型是null
// console.log(Person.prototype.__proto__ === Object.prototype); // true
// console.log(Person.prototype.__proto__.constructor === Object); // true
// console.log(Person.prototype.__proto__.__proto__ === null); // true
// console.log(Person.prototype.__proto__);
// // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, … }
// let person1 = new Person()
// let person2 = new Person()
// // 实例，构造函数和原型对象。是3个完全不同的对象。
// console.log(person1 !== Person); // true
// console.log(person1 !== Person.prototype); // true
// console.log(Person.prototype !== Person); // true
// /**
//  * 实例通过__prototype__连接到原型对象。实际指向隐藏特性[[Prototype]]
//  *
//  * 构造函数通过prototype属性连接到原型对象
//  *
//  * 实例与构造函数没有直接联系，域原型对象有直接联系
//  * 也就是说实例需要通过__prototype__访问Person.prototype才能获取到其对应构造函数
//  */
// console.log(person1.__proto__ === Person.prototype); // true
// console.log(person1.__proto__.constructor == Person); // true
// // 同一个构造函数创建的两个实例，共享同一个原型对象
// console.log(person1.__proto__ === person2.__proto__); //  true
// /**
//  * instanceof检查实例的原型链中 是否包含指定构造函数的原型
//  * 在下例中，其实就是查person1.__proto__?.__proto__.... 有没有包含 Preson.prototype
//  */
// console.log(person1 instanceof Person); // true
// console.log(person1 instanceof Object); // true
// console.log(Person.prototype instanceof Object); // true

// // 并不是所有实现都对外暴露了[[prototype]],因此使用prototype.isPrototypeof()来进行对象关系判断
// console.log(Person.prototype.isPrototypeOf(person1)); // true
// console.log(Person.prototype.isPrototypeOf(person2)); // true

// // Object.getPrototypeof()
// console.log(Object.getPrototypeOf(person1) === Person.prototype); // true

// Object.setPrototypeOf()
// let student = {
// 	major: 'cs'
// }
// let person = {
// 	name: 'Nico'
// }
// Object.setPrototypeOf(student, person)
// console.log(student.major); // cs
// console.log(student.name); // Nico
// console.log(Object.getPrototypeOf(student) === person); // true

// let student1 = Object.create(person)
// student1.major = 'Math'
// console.log(student1.name); // Nico
// console.log(Object.getPrototypeOf(student1) === person); // true

// 原型层级
// function Person() { }
// Person.prototype.name = 'Nico'
// Person.prototype.sayName = function () {
// 	console.log(this.name);
// }
// let person1 = new Person()
// let person2 = new Person()
// person1.name = "Gery"
// console.log(person1.name); // Gery
// console.log(person2.name); // Nico

// 只要给对象实例添加一个属性，那么这个属性就会shadow原型对象上的同名属性。即使将这个属性设为null还是shadow状态。不过，使用delete操作，就可以在原型链上继续搜索，从而得到原型对象上的同名属性。
// function Person() { }
// Person.prototype.name = 'Nico'
// Person.prototype.sayName = function () {
// 	console.log(this.name);
// }
// let person1 = new Person()
// person1.name = 'Grey'
// console.log(person1.name); // Grey
// person1.name = null
// console.log(person1.name); // null
// delete person1.name
// console.log(person1.name); //Nico

// function Person() { }
// Person.prototype.name = "Nico";
// Person.prototype.sayName = function () {
// 	console.log(this.name);
// };
// let person1 = new Person();
// console.log(person1.hasOwnProperty("name")); // false
// person1.name = "Grey";
// console.log(person1.hasOwnProperty("name")); // true
// console.log(Person.prototype.hasOwnProperty("name")); // true
// delete person1.name
// console.log(person1.hasOwnProperty("name")); // false



// in操作符可以通过对象访问指定属性时返回true
// function Person() { }
// Person.prototype.name = "Nico";
// Person.prototype.age = 29;
// Person.prototype.sayName = function () {
// 	console.log(this.name);
// }
// let person1 = new Person()
// let person2 = new Person()
// console.log(person1.hasOwnProperty('name')); // flase
// console.log('name' in person1); // true
// person1.name = 'Gerg'
// console.log(person1.hasOwnProperty('name')); // true
// console.log('name' in person1); // true


// for-in 循环中使用in操作符，可以通过对象访问且可以被枚举的属性都会返回,包括实例属性和原型属性。遮蔽原型中不可枚举的属性的实例属性也会在for-in中返回，因为开发者定义的属性默认时可枚举的。
// Object.keys()获取所有可枚举的实例属性
// function Person() { }
// Person.prototype.name = "Nico";
// Person.prototype.age = 29;
// Person.prototype.sayName = function () {
// 	console.log(this.name);
// }
// let person1 = new Person()
// let keys = Object.keys(Person.prototype)
// console.log(keys);  // [ 'name', 'age', 'sayName' ]
// person1.name = "Jerry"
// person1.age = 32
// console.log(Object.keys(person1)); // [ 'name', 'age' ]
// for (const x in person1) {
// 	console.log(x);
// }
// // name
// // age
// // sayName

// // Object.getOwnPropertyNames()来获取所有属性
// console.log(Object.getOwnPropertyNames(Person.prototype)); // [ 'constructor', 'name', 'age', 'sayName' ]


// ES6 添加符号属性后，添加了Object.getOwnPropertySymbols()来获取以符号为键的属性
// let k1 = Symbol('k1'),
// 	k2 = Symbol('k2')
// let o = {
// 	[k1]: 'k1',
// 	[k2]: 'k2'
// }
// console.log(Object.getOwnPropertyNames(o)); // []
// console.log(Object.getOwnPropertySymbols(o)); // [ Symbol(k1), Symbol(k2) ]



// 属性枚举顺序
// for-in循环和Object.keys()的枚举顺序是不确定的。取决于JavaScript引擎。
// Object.getOwnPropertyNames()和Object.getOwnPropertySymbols()的枚举顺序是确定的。先升序枚举数值键，然后以插入顺序枚举字符串和符号键。在对象字面中定义的键以他们逗号分隔的顺序插入。
// let k1 = Symbol('k1'),
// 	k2 = Symbol('k2')
// let o = {
// 	1: 1,
// 	first: 'first',
// 	[k1]: 'k1',
// 	second: 'second',
// 	0: 0
// }
// o[k2] = 'k2'
// o[3] = 3
// o.third = 'third'
// o[2] = 2
// console.log(Object.getOwnPropertyNames(o));// [ '0', '1', '2', '3', 'first', 'second', 'third' ]
// console.log(Object.getOwnPropertySymbols(o));// [ Symbol(k1), Symbol(k2) ]



// Object.values() Object.entries()
// const o = {
// 	foo: 'bar',
// 	baz: 1,
// 	qux: {}
// }
// console.log(Object.values(o));// [ 'bar', 1, {} ]
// console.log(Object.entries(o));// [ [ 'foo', 'bar' ], [ 'baz', 1 ], [ 'qux', {} ] ]
// // 这两个方法都是浅复制
// console.log(Object.values(o)[2] === o.qux); // true
// console.log(Object.entries(o)[2][1] === o.qux); // true


// let sym = Symbol()
// let o = {
// 	[sym]: 'foo'
// }
// console.log(Object.values(o));// []
// console.log(Object.entries(o));// []



// 其他原型语法
// 对象字面量语法
// function Person() { }
// Person.prototype = {
// 	name: 'Nico',
// 	age: 20,
// 	sayName() {
// 		console.log(this.name);
// 	}
// }
// // 但上面的写法直接重写了默认的prototype属性，因此其constructor属性指向了完全不同的对象（Object构造函数）,不再指向原来的构造函数，虽然instanceof还是返回正确的结果。
// let person = new Person()
// console.log(person instanceof Person); // true
// console.log(person instanceof Object); // true
// console.log(person.constructor == Person); // false
// console.log(person.constructor == Object); // true


// function Person() { }
// Person.prototype = {
// 	constructor: Person
// 	// ...
// }
// const person = new Person()
// console.log(person.constructor === Person); //true 这个是原型上的constructor，并不是实例上的
// console.log(Object.getOwnPropertyDescriptors(Person.prototype));
// {
//   constructor: {
//     value: [Function: Person],
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }

// 但以上面的方法重写的constructor是[[Enumberable]]为true的属性。而默认的constructor属性是不可枚举的。因此需要使用Object.definedProperty()来定义
// function Person() { }
// Person.prototype = {}
// Object.defineProperty(Person.prototype, constructor, {
// 	enumerable: false,
// 	value: Person
// })



// // 原型的动态性
// function Person() { }
// let friends = new Person()
// Person.prototype.sayHi = function () {
// 	console.log('hi');
// }
// //虽然实例是在方法添加时创建的,但调用时回去原型链上查找因此会调用后面添加的sayHi。 因为实例和原型之间的链接时简单的指针，而不是保存的副本，所在会在原型上找到sayHi属性
// friends.sayHi()


// function Person() { }
// let friend = new Person()
// Person.prototype = {
// 	constructor: Person,
// 	sayHi() {
// 		console.log('Hi');
// 	}
// }
// let friend1 = new Person()
// friend1.sayHi() // Hi
// friend.sayHi() //TypeError



// console.log(typeof Array.prototype.sort); // function
// console.log(typeof String.prototype.substring); // function


// String.prototype.startsWith = function (text) {
// 	console.log('rewrite string.startsWidth');
// 	return this.indexOf(text) === 0
// }
// let msg = 'Hello World!'
// console.log(msg.startsWith('Hello'));
// // rewrite string.startsWidth
// // true



// 原型的问题
// function Person() { }
// Person.prototype = {
// 	constructor: Person,
// 	friends: ['Shely', 'Court']
// }
// const person1 = new Person()
// const person2 = new Person()
// person1.friends.push('vash')
// console.log(person1.friends);// [ 'Shely', 'Court', 'vash' ]
// console.log(person2.friends);// [ 'Shely', 'Court', 'vash' ]
// console.log(person1.friends === person2.friends);




// 继承
// function SuperType() {
// 	this.property = true
// }
// SuperType.prototype.getSuperValue = function () {
// 	return this.property
// }
// function SubType() {
// 	this.subproperty = false;
// }
// // 这里将SubType的原型重写为SuperType的实例,并且使用了SuperType的构造函数。
// SubType.prototype = new SuperType()
// SubType.prototype.getSubValue = function () {
// 	return this.subproperty
// }
// // instance使用了SubType构造函数，其原型指向SubType.prototype.
// let instance = new SubType()
// console.log(instance.getSuperValue()); // true

// console.log(SubType.prototype.constructor);// SuperType { property: true, getSubValue: [Function (anonymous)] }
// console.log(instance.__proto__);// SuperType { property: true, getSubValue: [Function (anonymous)] }
// console.log(instance);// SuperType { subproperty: false }


// console.log(instance instanceof SubType); // true
// console.log(instance instanceof SuperType); // true
// console.log(instance instanceof Object); // true

// console.log(Object.prototype.isPrototypeOf(instance)); // true
// console.log(SuperType.prototype.isPrototypeOf(instance)); // true
// console.log(SubType.prototype.isPrototypeOf(instance)); // true



// 子类若是要覆盖父类的方法，或增加父类没有的方法。必须在原型赋值之后再添加到原型上。
// function SuperType() {
// 	this.proterty = true
// }
// SuperType.prototype.getSuperValue = function () {
// 	return this.proterty
// }
// function SubType() {
// 	this.subproperty = false
// }
// // 继承
// SubType.prototype = new SuperType()
// // 增加新方法
// SubType.prototype.getSubValue = function () {
// 	return this.subproperty
// }
// // 覆盖已有同名方法
// SubType.prototype.getSuperValue = function () {
// 	return false
// }
// const instance = new SubType()
// console.log(instance.getSuperValue()); // false

// // 重写了SubType的原型，重写了原型链
// SubType.prototype = {
// 	sayhi() {
// 		console.log("hi");
// 	}
// }
// const instance1 = new SubType()
// console.log(instance1.__proto__); // { sayhi: [function: sayhi] }
// console.log(instance1.getsubvalue()); // typeerror



// 原型链的问题（引用值）
// function SuperType() {
// 	this.colors = ['red', 'green', 'blue']
// }
// function SubType() { }
// SubType.prototype = new SuperType()
// const instance1 = new SubType()
// const instance2 = new SubType()
// instance1.colors.push('yellow')
// console.log(instance1.colors);// [ 'red', 'green', 'blue', 'yellow' ]
// console.log(instance1.colors);// [ 'red', 'green', 'blue', 'yellow' ]




// 盗用构造函数
// function SuperType() {
// 	this.numbers = [0, 1, 2, 3]
// }
// function SubType() {
// 	// 在子类中调用父类的构造函数
// 	SuperType.call(this)
// }
// const instance1 = new SubType()
// const instance2 = new SubType()
// instance1.numbers.push(4, 5, 6)
// // 解决了引用值的问题
// console.log(instance1.numbers);// [  0, 1, 2, 3,  4, 5, 6]
// console.log(instance2.numbers);// [ 0, 1, 2, 3 ]



// 传递参数
// function SuperType(name) {
// 	this.name = name
// }
// function SubType() {
// 	SuperType.call(this, "Nico")
// 	this.age = 19
// }
// let instance = new SubType()
// console.log(instance.name); // Nico



// 组合继承
// function SuperType(name) {
// 	this.name = name;
// 	this.numbers = [0, 1, 2]
// }
// SuperType.prototype.sayName = function () {
// 	console.log(this.name);
// }
// function SubType(name, age) {
// 	this.age = age
// 	SuperType.call(this, name)
// }
// SubType.prototype = new SuperType();
// SubType.prototype.sayAge = function () {
// 	console.log(this.age);
// }
// const instance1 = new SubType('Nico', 19)
// const instance2 = new SubType('Gery', 40)
// instance1.numbers.push(3, 4, 5, 6)
// console.log(instance1.numbers);// [0, 1, 2, 3, 4, 5, 6]
// console.log(instance2.numbers);// [0, 1, 2]
// instance1.sayName()// Nico
// instance1.sayAge()// 19
// instance2.sayName()// Gery
// instance2.sayAge()// 40




// 原型式继承
// 这个函数目的是为了实现不需要自定义类型也可以通过原型实现对象之间的信息共享。
// object本质上会创建一个临时构造函数，将传入的对象作为这个构造函数的原型，然后返回这个原型的实例。
// function object(o) {
// 	function F() { }
// 	F.prototype = o
// 	return new F()
// }

// let person = {
// 	name: "Nico",
// 	friends: ['Gery', 'Court']
// }
// let anotherPerson = object(person)
// // 返回的实例的name被shadow了
// anotherPerson.name = "Greg"
// // friends是多个对象共享的，因为其在实例的原型上。
// anotherPerson.friends.push('Rob')

// let yetAanotherPerson = object(person)
// yetAanotherPerson.name = "Linda"
// yetAanotherPerson.friends.push('Baribie')
// console.log(person.friends);// [ 'Gery', 'Court', 'Rob', 'Baribie' ]



// Object.create()
// let person = {
// 	name: 'Nico',
// 	friends: ['Gery', 'Jerry']
// }
// let anotherPerson = Object.create(person)
// anotherPerson.name = "Court"
// anotherPerson.friends.push('Rob')
// let yetAnotherPerson = Object.create(person)
// yetAnotherPerson.name = "Linda"
// yetAnotherPerson.friends.push('Stevern')
// console.log(person.friends);// [ 'Gery', 'Jerry', 'Rob', 'Stevern' ]



// let person = {
// 	name: 'Nico',
// 	friends: ['Gery', 'Jerry']
// }
// let anotherPerson = Object.create(person, {
// 	name: {
// 		value: 'Court',
// 		enumerable: true
// 	}
// })
// console.log(anotherPerson);// { name: 'Court' }



// 寄生式继承
// function createAnother(original) {
// 	// 通过调用函数创建一个新对象,这里进行浅复制，不一定要Object.create()这个函数
// 	let clone = Object.create(original) 
// 	console.log(clone === original);
// 	clone.sayHi = function () { // 增强对象
// 		console.log('Hi');
// 	}
// 	return clone // 返回这个对象
// }

// let person = {
// 	name: "Nico",
// 	friends: ['Shely', 'Court']
// }
// let anotherPerson = createAnother(person)
// anotherPerson.sayHi() // Hi
// person.sayHi()



// 寄生组合继承
// function SuperType(name) {
// 	this.name = name
// 	this.numbers = [0, 1, 2]
// }
// SuperType.sayName = function () {
// 	console.log(this.name);
// }
// function SubType(name, age) {
// 	this.age = age
// 	SuperType.call(this, name) // 第二次调用SuperType()
// }
// SubType.prototype = new SuperType()// 第一次调用SuperType()
// SubType.prototype.constructor = SubType
// SubType.prototype.sayAge = function () {
// 	console.log(this.age);
// }
// // 第一次调用SuperType()时在SubType的原型上构造了name和numbers
// // 第二次生成实例的时候，再实例上有构造了name和numbers，以此遮蔽了其原型上的同名属性


function inheritPrototype(SubType, SuperType) {
	const prototype = Object.create(SuperType.prototype) // 获取SuperType原型的实例副本
	prototype.constructor = SubType
	return prototype
}
function SuperType(name) {
	this.name = name
	this.numbers = [0, 1, 2]
}
SuperType.sayName = function () {
	console.log(this.name);
}
function SubType(name, age) {
	this.age = age
	SuperType.call(this, name)
}
// 通过寄生式继承来处理父类原型,而不用执行构造函数
SubType.prototype = inheritPrototype(SubType, SuperType)
SubType.prototype.sayAge = function () {
	console.log(this.age);
}