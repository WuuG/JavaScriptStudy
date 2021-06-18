// 类定义
// class Person {}
// const Animal = class {}


// console.log(Animal); // undefined
// var Animal = class { }
// console.log(Animal); // [class Animal]

// console.log(Person); // ReferenceError
// class Person { }


// {
// 	function Fn(params) { }
// 	class Person { }
// }
// console.log(Fn); // [Function: Fn]
// console.log(Person); // ReferenceError



// class Foo{	}
// class Bar {
// 	constructor() {}
// }
// class Baz {
// 	get myBaz(){}
// }
// class Qux {
// 	static myQux() {}
// }


// let Person = class PersonName {
// 	identify() {
// 		console.log(Person.name, PersonName.name);
// 	}
// }
// let p = new Person()
// p.identify() //  PersonName PersonName
// console.log(Person.name, PersonName.name); // 




// 构造函数
// class Anima { }
// class Perosn {
// 	constructor() {
// 		console.log('person ctor');
// 	}
// }
// class Vegetable {
// 	constructor() {
// 		this.color = 'orange'
// 	}
// }
// let a = new Anima()
// let p = new Perosn() // person cotr
// let v = new Vegetable()
// console.log(v.color); // orange


// class Person {
// 	constructor(name) {
// 		console.log(arguments.length);
// 		this.name = name
// 	}
// }
// let p1 = new Person// 0
// console.log(p1.name);// undefined
// let p2 = new Person()// 0
// console.log(p2.name);// undefined
// let p3 = new Person('Nico')// 1
// console.log(p3.name);// Nico


// 默认情况下，类构造函数会在执行之后返回this对象。构造函数返回的对象会被用作实例化的对象，如果没有什么引用这个this对象，那么这个对象就会被销毁。如果返回的不是this对象，那么这个对象不会通过instanceof操作符检测出与类有关联，因为这个对象的原型指针并没有修改。
// class Person {
// 	constructor(override) {
// 		this.foo = 'foo';
// 		if (override) {
// 			return {
// 				bar: 'bar'
// 			}
// 		}
// 	}
// }
// let p1 = new Person(),
// 	p2 = new Person(true)
// console.log(p1); // Person { foo: 'foo' }
// console.log(p1 instanceof Person); // true
// console.log(p2); // { bar: 'bar' }
// console.log(p2 instanceof Person); // false



// function Person() { }
// class Animal { }
// let p = Person() // 将Global对象作为this对象关键实例
// let a = Animal() // TypeError


// class Person { }
// let p1 = new Person()
// // p1.constructor() // TypeError 需要new
// let p2 = new p1.constructor()




// 把类当成特殊函数
// class Person { }
// console.log(Person); // [class Person]
// console.log(typeof Person); // function


// class Person { }
// console.log(Person.prototype); // { }
// console.log(Person === Person.prototype.constructor); // true


// class Person { }
// let p = new Person()
// console.log(p instanceof Person); // true
// console.log(Person.prototype.isPrototypeOf(p)); // true



// class Person {
// 	constructor() {
// 		console.log(1);
// 		this.check = 'Person'
// 	}
// }
// let p1 = new Person()
// console.log(p1.constructor === Person); // true
// console.log(p1 instanceof Person); // true
// console.log(p1 instanceof Person.constructor); // false
// let p2 = new Person.constructor()
// console.log(p2.constructor === Person); // false
// console.log(p2 instanceof Person); // false
// console.log(p2 instanceof Person.constructor); // true

// console.log(p2 instanceof Function); // true
// console.log(p2 instanceof Object); // true

// console.log(p2.__proto__ === Function.prototype); //true p2的[[prototype]]指向Function的原型
// console.log(Person.constructor.prototype === Function.prototype); // true Person.constructor指向Function的原型。



// let classList = [
// 	class {
// 		constructor(id) {
// 			this.id_ = id
// 			console.log(`instance ${this.id_}`);
// 		}
// 	}
// ]
// function createInstance(classDefinition, id) {
// 	return new classDefinition(id)
// }
// let foo = createInstance(classList[0], 3000)//instance 3000


// let p = new class Person {
// 	constructor(x) {
// 		console.log(x);// Nico
// 	}
// }('Nico')



// class Person {
// 	constructor() {
// 		this.name = new String('Jack')
// 		// 有点意思的是在类构造函数中的箭头函数是指向类实例的
// 		this.sayName = () => console.log(this.name)
// 		this.nickNames = ['jack', 'Jerry']
// 	}
// }
// let p1 = new Person(),
// 	p2 = new Person()
// p1.sayName()//[String: 'Jack']
// p2.sayName()//[String: 'Jack']
// console.log(p1.name === p2.name); // false
// console.log(p1.sayName === p2.sayName); // false
// console.log(p1.nickNames === p2.nickNames); // false

// // 在构造函数执行完毕后，仍可以给实例继续添加新成员
// p1.name = p1.nickNames[0]
// p1.sayName() // jack
// p1.age = 19
// console.log(p1.age);// 19



// class Person {
// 	constructor() {
// 		this.locate = () => console.log(`instance`);
// 	}
// 	locate() {
// 		console.log(`prototype`);
// 	}
// }
// let p = new Person()
// p.locate() // instance
// p.__proto__.locate() // prototype


// 方法可以定义在类构造函数或者类块中，不可以在类块中给原型添加原始值或对象作为成员数据。
// class Person { 
// 	name: 'jack' // SyntaxError
// }


// // 类方法等同于对象属性，因此可以使用字符串、符号或计算的值作为键。
// const symbolKey = Symbol()
// class Person {
// 	stringKey() {
// 		console.log('invoked stringKey');
// 	}
// 	[symbolKey]() {
// 		console.log('invoked symbolKey');
// 	}
// 	['computed' + 'Key']() {
// 		console.log('invoked computedKey');
// 	}
// }
// let p = new Person()
// p.stringKey() // invoked stringKey
// p[symbolKey]() //invoked symbolKey
// p.computedKey() // invoked computedKey



// class Person {
// 	set name(newName) {
// 		this.name_ = newName
// 	}
// 	get name() {
// 		return this.name_
// 	}
// }
// let p = new Person()
// p.name = 'Jack'
// console.log(p.name);



// 与原型成员类似，静态成员每个类上只有一个。在静态成员中,this引用类自身。
// class Person {
// 	constructor() {
// 		this.locate = () => console.log(`instance`, this);
// 	}
// 	locate() {
// 		console.log(`prototype`, this);
// 	}
// 	static locate() {
// 		console.log('class', this);
// 	}
// }
// let p = new Person()
// p.locate()// instance Person { locate: [Function (anonymous)] }
// p.__proto__.locate()//prototype {}
// Person.locate()// class [class Person]


// 静态类方法非常适合作为实例工厂
// class Person {
// 	constructor(age) {
// 		this.age_ = age
// 	}
// 	sayAge() {
// 		console.log(this.age_);
// 	}
// 	static create() {
// 		return new Person(Math.floor(Math.random() * 100))
// 	}
// }
// console.log(Person.create());//Person { age_: 95 }



// 非函数原型和类成员
// 类定义并不只是在原型或者类上添加数据成员，但在类定义外部，可以手动添加
// class Person {
// 	sayName() {
// 		console.log(`${Person.greeting} ${this.name}`);
// 	}
// }
// // 在类上定义数据成员
// Person.greeting = "my name is"
// // 在原型上定义数据成员
// Person.prototype.name = "Jake"
// let p = new Person()
// p.sayName()



// class Person {
// 	*createNicknameIterator() {
// 		yield 'Jack';
// 		yield 'Jake';
// 		yield 'J-Dog';
// 	}
// 	static *createJobIterator() {
// 		yield 'Butcher'
// 		yield 'Baker'
// 		yield "candlesitc manker"
// 	}
// }
// let jobIter = Person.createJobIterator()
// console.log(jobIter.next()); // { value: 'Butcher', done: false }
// console.log(jobIter.next()); // { value: 'Baker', done: false }
// console.log(jobIter.next()); // { value: 'candlesitc manker', done: false }
// let p = new Person()
// let nicknameIter = p.createNicknameIterator()
// console.log(nicknameIter.next()); // { value: 'Jack', done: false }
// console.log(nicknameIter.next()); // { value: 'Jake', done: false }
// console.log(nicknameIter.next()); // { value: 'J-Dog', done: false }


// 默认迭代器
// class Person {
// 	constructor() {
// 		this.nickname = ['jack', 'jake', 'j-dog']
// 	}
// 	*[Symbol.iterator]() {
// 		yield* this.nickname
// 	}
// }
// let p = new Person()
// for (let x of p) {
// 	console.log(x); //jack  jake  j-dog
// }



// 继承
// class Vehicle { }
// class Bus extends Vehicle { }
// let b = new Bus()
// console.log(b instanceof Bus); // true
// console.log(b instanceof Vehicle); // true
// function Person() { }
// class Engineer extends Person { }
// let e = new Engineer()
// console.log(e instanceof Engineer); // true
// console.log(e instanceof Person); // true


// 派生类可以通过原型链访问到类和原型上定义的方法,this的值会反映调用相应方法的实例或者类
// class Vehicle {
// 	identifyPrototype(id) {
// 		console.log(id, this);
// 	}
// 	static identifyClass(id) {
// 		console.log(id, this);
// 	}
// }
// class Bus extends Vehicle { }
// let v = new Vehicle()
// let b = new Bus()
// b.identifyPrototype('bus')//bus Bus {}
// v.identifyPrototype('vehicle')//vehicle Vehicle {}
// Bus.identifyClass('bus')//bus [class Bus extends Vehicle] 是如何访问类上的方法的
// Vehicle.identifyClass('vehicle')//vehicle [class Vehicle]



// 构造函数、HomeObject和super()
// 在构造函数中可以引用它们的原型
// class Vehicle {
// 	constructor() {
// 		this.hasEngine = true;
// 	}
// }
// class Bus extends Vehicle {
// 	constructor() {
// 		// console.log(this); // 在super之前引用this，不会抛出ReferenceError
// 		super()
// 		console.log(this instanceof Vehicle);//true
// 		console.log(this);//Bus { hasEngine: true }
// 	}
// }
// new Bus()


// 在静态方法中可以通过super调用继承的类上定义的静态方法
// class Vehicle {
// 	static identify() {
// 		console.log('vehicle');
// 	}
// }
// class Bus extends Vehicle {
// 	static identify() {
// 		super.identify() // 调用继承的类上定义的静态方法
// 	}
// }
// Bus.identify() // vehicle



// class Vehicle {
// 	constructor() {
// 		super()
// 		//SyntaxError: 'super' keyword unexpected here
// 	}
// }



// class Vehicle { }
// class Bus extends Vehicle {
// 	constructor() {
// 		console.log(super);////SyntaxError: 'super' keyword unexpected here
// 	}
// }



// 调用super()会调用父类的构造函数，并将返回的实例赋值给this
// class Vehicle { }
// class Bus extends Vehicle {
// 	constructor() {
// 		super()
// 		console.log(this instanceof Vehicle); //  true
// 	}
// }
// new Bus()



// class Vehicle {
// 	constructor(licensePlate) {
// 		this.licensePlate = licensePlate
// 	}
// }
// class Bus extends Vehicle {
// 	constructor(licensePlate) {
// 		super(licensePlate)
// 	}
// }
// console.log(new Bus('1929HxH')); // Bus { licensePlate: '1929HxH' }


// 如果没有类构造函数，在实例化派生类调用super(),而且会传入所有传给派生类的参数。
// class Vehicle {
// 	constructor(licensePlate) {
// 		this.licensePlate = licensePlate
// 	}
// }
// class Bus extends Vehicle { }
// console.log(new Bus('1929HxH')); // Bus { licensePlate: '1929HxH' }


// 在类构造函数中，不能在调用super()之前引用this
// class Vehicle { }
// class Bus extends Vehicle {
// 	constructor() {
// 		console.log(this);
// 	}
// }
// new Bus() // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor


// class Vehicle { }
// class Car extends Vehicle { }
// class Bus extends Vehicle {
// 	constructor() {
// 		super()
// 	}
// }
// class Van extends Vehicle {
// 	constructor() {
// 		return {}
// 	}
// }
// console.log(new Car());
// console.log(new Bus());
// console.log(new Van());


// 定义一个类，可供其他类继承，当本身不会被实例化。 通过new.target来实现。 new.target保存通过new关键字调用的类或者函数,通过new.target可以在实例化时判断其是不是抽象基类，来阻止对抽象基类的实例化。
// class Vehicle {
// 	constructor() {
// 		console.log(new.target);
// 		if (new.target === Vehicle) {
// 			throw new Error('Vehicle cannot be instantiated')
// 		}
// 	}
// }
// class Bus extends Vehicle { }
// new Bus()//[class Bus extends Vehicle]
// new Vehicle()//[class Vehicle]
// // Error: Vehicle cannot be instantiated


// 若是要求派生类一定要定义某个方法,可以通过this关键字来检查相应方法(因为原型方法在调用类构造函数之前就已经存在了)
// class Vehicle {
// 	constructor() {
// 		if (new.target === Vehicle) {
// 			throw new Error('Vehicle cannot be instantiated')
// 		}
// 		if (!this.foo) {
// 			throw new Error('Inheriting class must define foo()')
// 		}
// 		console.log('success');
// 	}
// }
// class Bus extends Vehicle {
// 	foo() { }
// }
// class Van extends Vehicle { }
// new Bus()// success
// new Van()// Error: Inheriting class must define foo()



// class SuperArray extends Array {
// 	shuffle() {
// 		for (let i = this.length - 1; i > 0; i--) {
// 			const j = Math.floor(Math.random() * (i + 1));
// 			[this[i], this[j]] = [this[j], this[i]]
// 		}
// 	}
// }
// let a = new SuperArray(1, 2, 3, 4, 5)
// console.log(a instanceof Array); // true
// console.log(a instanceof SuperArray); // true
// console.log(a); // SuperArray(5) [ 1, 2, 3, 4, 5 ]
// a.shuffle()
// console.log(a); // SuperArray(5) [ 1, 5, 4, 3, 2 ] 


// 有些内置方法会返回新实例。默认情况下，返回实例的类型和原始的类型是一致的。
// class SuperArray extends Array { }
// let a1 = new SuperArray(1, 2, 3, 4, 5)
// let a2 = a1.filter(x => (x % 2))
// console.log(a1); // SuperArray(5) [ 1, 2, 3, 4, 5 ]
// console.log(a2); // SuperArray(3) [ 1, 3, 5 ]
// console.log(a1 instanceof SuperArray); // true
// console.log(a2 instanceof SuperArray); // true


// 如果想覆盖这个默认行为,则可以覆盖Symbol.species访问器，这个访问器决定在创建返回的实例时使用的类(其实就是prototype的指向)。
// class SuperArray extends Array {
// 	static get [Symbol.species]() {
// 		return Array
// 	}
// }
// let a1 = new SuperArray(1, 2, 3, 4, 5)
// let a2 = a1.filter(x => (x % 2))
// console.log(a1);//SuperArray(5) [ 1, 2, 3, 4, 5 ]
// console.log(a2);//[ 1, 3, 5 ]
// console.log(a1 instanceof SuperArray); // true
// console.log(a2 instanceof SuperArray); // false



// class Vehicle { }
// function getParentClass() {
// 	console.log('evaluated expression');
// 	return Vehicle
// }
// class Bus extends getParentClass() { }
// let bus = new Bus()
// console.log(bus instanceof Vehicle); // true


// 混入模式可以通过在一个表达式中连缀多个混入实现，这个表达式最终会解析为一个可以被继承的类。实现这种模式有不同的策略。
// 其中一个策略就是定义一组“可嵌套”的函数，每个函数分别接受一个超类作为参数，从而将混入类定义为这个参数的子类，并返回这个类。
class Vehicle { }
let FooMixin = (Superclass) => class Foo extends Superclass {
	foo() {
		console.log('foo');
	}
}
let BarMixin = (Superclass) => class Bar extends Superclass {
	bar() {
		console.log('bar');
	}
}
let BazMixin = (Superclass) => class Baz extends Superclass {
	baz() {
		console.log('baz');
	}
}
class Bus extends FooMixin(BarMixin(BazMixin(Vehicle))) { }
let bus = new Bus()
console.log(bus.__proto__);
console.log(bus.__proto__.__proto__);
console.log(bus.__proto__.__proto__.__proto__);
console.log(bus.__proto__.__proto__.__proto__.__proto__);

