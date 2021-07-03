// function foo() { }
// let bar = function () { }
// let baz = () => { }
// console.log(foo.name); // foo
// console.log(bar.name); // bar
// console.log(baz.name); // baz
// console.log((() => { }).name); // (空字符串)
// console.log(new Function().name); // anonymou



// 若函数是获取函数，设置函数，或者使用bind()实例化，那么标识符前会加上一个前缀。
// function foo() { }
// console.log(foo.bind(null).name); // bound foo
// let dog = {
// 	years: 1,
// 	get age() {
// 		return this.years
// 	},
// 	set age(newValue) {
// 		this.years = newValue
// 	}
// }
// let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, 'age')
// console.log(propertyDescriptor);
// console.log(propertyDescriptor.get.name); // get age 
// console.log(propertyDescriptor.set.name); // set age




// 参数
// 下面二个函数的调用时是相同的。ES6中的命名参数不会创建让之后的调用必须匹配的函数签名，因为根本不存在验证命名参数的机制。
// function sayHi(name, message) {
// 	console.log("hello" + name + ',' + message);
// }
// function sayHi() {
// 	console.log("hello" + arguments[0] + ',' + arguments[1]);
// }


// 可通过length属性检查传入的参数个数。
// function howManyArgs() {
// 	console.log(arguments.length);
// }
// howManyArgs('string', 35) // 2
// howManyArgs() // 0
// howManyArgs(12) // 1


// arguments对象可以和命名参数一起使用
// function doAdd(num1, num2) {
// 	if (arguments.length === 1) {
// 		console.log(num1 + 10);
// 	} else if (arguments.length === 2) {
// 		console.log(arguments[0] + num2);
// 	}
// }
// doAdd(1) // 11
// doAdd(1, 1) // 2


// argumens对象的值会始终与对应的命名参数同步。 当并不意味着二者是访问同一个内存地址，它们在内存中的位置还是分开的，只不过会保持同步。
// function doAdd(num1, num2) {
// 	arguments[1] = 10
// 	console.log(num1 + num2);
// }
// doAdd(1, 1) // 11
// doAdd(1) // NaN


// function doAdd(num1, num2) {
// 	arguments[1] = 10
// 	console.log(num2);
// }
// doAdd(1) // undefined



// 箭头函数中的参数
// function foo() {
// 	console.log(arguments[0]);
// }
// foo(5) // 5

// let bar = () => {
// 	console.log(arguments[0]);
// }
// bar(5) // ReferenceError:arguments is not defined  node环境下为空对象


// 包装箭头函数
// function foo() {
// 	let bar = () => {
// 		console.log(arguments[0]);
// 	}
// 	bar()
// }
// foo(5) // 5




// function addSomeNumber(num) {
// 	return num + 100
// }
// function addSomeNumber(num) {
// 	return num + 200
// }
// console.log(addSomeNumber(10)); // 210



/**
 * 默认参数值
*/
// function makeKing(name = "Niko") {
// 	console.log(name);
// }
// makeKing('Richard') // Richard
// makeKing() // Niko


// 给函数传undefined相当于没有传值，因此可以利用多个独立的默认值
// function age(name = "Nico", age = "18") {
// 	console.log(`${name} is ${age} years old`);
// }
// age('Richard') // Richard is 18 years old
// age(undefined, 40) // Nico is 40 years ol


// 在使用默认参数时，arguments对象不反映参数的默认值，只反映传给函数的参数。
// function makeking(name = "henry") {
// 	name = "louis";
// 	console.log(`king ${arguments[0]}`);
// }
// makeking() // king undefined
// makeking('louis') // king loui


// 默认参数值并不限于原始值或对象类型，也可以使用调用函数返回的值。
// let ages = [11, 12, 13, 14, 15, 16, 17]
// let ageIndex = 0
// function genAge() {
// 	return ages[ageIndex++]
// }
// function getAge(name = "Nico", age = genAge()) {
// 	return `${name} is ${age} years old`
// }
// console.log(getAge()); // Nico is 11 years old
// console.log(getAge('Richard', 40)); // Richard is 40 years old
// console.log(getAge()); // Nico is 12 years old
// console.log(getAge()); // Nico is 13 years old



// 多个参数默认值作用域
// function makeKing(name = "Henry", numberals = "Ⅶ") {
// 	return `king ${name} ${numberals}`
// }
// // 上面默认参数的构造过程可以看成下式
// function makeKing() {
// 	let name = 'Henry'
// 	let numberals = 'Ⅶ'
// 	return `king ${name} ${numberals}`
// }


// 因为是按照顺序初始化的，因此后面定义的参数可以引用前面的参数。
// function makeKing(name = "Henry", numberal = name) {
// 	return `king ${name} ${numberal}`
// }
// console.log(makeKing()); // king Henry Henry


// 参数初始化顺序遵循“暂时性死区”规则（类似let声明变量）,因此前面定义的参数无法应用后面定义的参数。
// function makeKing(name = numberal, numberal = "Ⅶ") {
// 	return `king ${name} ${numberal}`
// }
// console.log(makeKing()); // ReferenceError


// 参数存在自己的作用域中，因此不能引用函数体的作用域
// function makeKing(name = "Henry", numerals = defaultNumerals) {
// 	let defaultNumerals = "Ⅶ"
// 	return `king ${name} ${numerals}`
// }
// console.log(makeKing()); // ReferenceError



/**
 * 参数扩展与收集
*/
// ES6新增扩展操作符，即可用于定义函数参数， 也可以用于调用函数时传参(因为弱类型和参数长度可变的特点)。
// 扩展参数
// let values = [1, 2, 3]
// function getSum() {
// 	let sum = 0
// 	for (let i = 0; i < arguments.length; ++i) {
// 		sum += arguments[i]
// 	}
// 	return sum
// }
// // 若是不是扩展操作符，需要使用apply()方法
// console.log(getSum.apply(null, values)) // 6
// // 使用扩展操作符
// console.log(getSum(...values)); // 6

// // 因为数组长度已知，所以使用扩展操作符传参的时候，并不妨碍在其前后传其他参数。包括使用扩展操作符传其他参数。
// console.log(getSum(-1, ...values)); // 5
// console.log(getSum(...values, -1)); // 5
// console.log(getSum(...values, ...[-1, -2, -3])); // 0


// 对函数中的arguments对象而言，并不知晓扩展操作符的存在，其还是获取传入参数的每一个值的
// let values = [1, 2, 3]
// function countArg() {
// 	console.log(arguments.length);
// }
// countArg(...values) // 3
// countArg(...values, -1) // 4
// countArg(...values, ...[2, 3, 4]) // 6


// let getSum = (a, b, c = 1) => {
// 	return a + b + c
// }
// console.log(getSum(...[1, 2])); // 4
// console.log(getSum(...[1, 2, 3])); // 6



// 收集参数
// function getSum(...values) {
// 	return values.reduce((pre, cur) => pre + cur, 0)
// }
// console.log(getSum(1, 2, 3)); // 6


// 收集参数的前面如果还有命名参数，则只会收集其余参数。若没有则会得到空数组。因为收集参数的结果可变，所以只能作为最后一个参数
// function getProdcut(...values, lastValue) { } // SyntaxError
// function getProduct(firstValue, ...values) {
// 	console.log(values);
// }
// getProduct() // []
// getProduct(1) // []
// getProduct(1, 2) // [ 2 ]
// getProduct(1, 2, 3) // [ 2, 3 ]


// 箭头函数虽不支持arguments,但支持收集参数的定义方式,因此可以实现与arguments一样的逻辑。
// let getSum = (...values) => {
// 	return values.reduce((x, y) => x + y, 0)
// }
// console.log(getSum(1, 2, 3)); //  6


// 另外，使用收集参数并不影响arguments对象，它仍然反映调用时传给函数的参数。
// function getSum(fistValue, ...values) {
// 	console.log(arguments.length); // 3
// 	console.log(arguments);  // [Arguments] { '0': 1, '1': 2, '2': 3 }
// 	console.log(values); // [ 2, 3 ]
// }
// getSum(1, 2, 3)



/**
 * 函数声明与函数定义
*/
// 函数声明,其会在任何代码执行之前先被读取并添加到执行上下文(函数声明提升)。在执行代码前，JavaScript会先执行一遍扫描，将发现的函数声明提升到源代码树的顶部。
// console.log(sum(10, 10)); // 20
// function sum(num1, num2) {
// 	return num1 + num2
// }


// 若是将函数声明改为等价的函数表达式，那么执行时就会出错。因为函数定义包含在一个变量初始化语句中，而不是函数声明中，也就是说并没有运行到函数声明那行。
// console.log(sum(10, 10)); // ReferenceError
// let sum = function (num1, num2) {
// 	return num1 + num2
// }
// var 声明同样会遇到问题
// console.log(sum(10, 10)); // ReferenceError
// var sum = function (num1, num2) {
// 	return num1 + num2
// }



/**
 * 函数作为值
*/
// 参数传递
// function callSOmeFunction(someFunction, someArgument) {
// 	return someFunction(someArgument)
// }

// function add10(num) {
// 	return num + 10
// }
// let result = callSOmeFunction(add10, 10)
// console.log(result1); // 20


// 返回函数也可以，并且十分有用。比如创建一个sort()的比较函数。
// function createComparisonFunction(propertyName) {
// 	return function (object1, objcect2) {
// 		let value1 = object1[propertyName]
// 		let value2 = objcect2[propertyName]
// 		if (value1 < value2) {
// 			return -1
// 		} else if (value1 > 1) {
// 			return 1
// 		} else {
// 			return 0
// 		}
// 	}
// }
// let data = [
// 	{ name: 'Nico', age: 40 },
// 	{ name: 'Richard', age: 18 }
// ]
// data.sort(createComparisonFunction('Nico'))
// console.log(data[0].name); // Nico
// data.sort(createComparisonFunction('age'))
// console.log(data[0].name); // Richard


/**
 * 函数内部
*/
// arguments对象的callee属性
// 阶乘函数
// function factorial(num) {
// 	if (num <= 1) {
// 		return 1
// 	} else {
// 		return num * factorial(num - 1)
// 	}
// }
// console.log(factorial(3));
// let factorial1 = factorial
// factorial = 1
// console.log(factorial1(3)); // TypeError factorial is not a function


// 上面例子定义没什么问题，但是这个函数若要正确执行就必须保证函数名时factorial，从而导致紧密耦合。使用callee属性，就看可以像函数逻辑与函数名解耦。
// function factorial(num) {
// 	if (num <= 1) {
// 		return 1
// 	} else {
// 		return num * arguments.callee(num - 1)
// 	}
// }
// console.log(factorial(3)); // 6
// let factorial1 = factorial
// factorial = 1
// console.log(factorial1(3)); // 6



// this对象在标准函数和箭头函数中有不同的行为。
// 在标准函数中，this引用的时将函数作为方法调用的上下文对象。
// global.color = 'red'
// let o = {
// 	color: 'blue'
// }
// function sayColor() {
// 	console.log(this.color);
// }
// sayColor() // red
// o.sayColor = sayColor
// o.sayColor() // blue
// 定义在全局上下文中的函数sayColor()引用了this对象。这个this到底应用哪个对象必须到函数被调用才能被确定。


// 在箭头函数中，this引用的是箭头函数的上下文。
// window.color = 'red'
// let o = {
// 	color: 'blue'
// }
// let sayColor = () => console.log(this.color);
// sayColor() // red
// o.sayColor = sayColor
// o.sayColor() // red


// 若是在事件回调或定时回调中调用某个函数，this指向并非想要的对象。此时很适合使用箭头函数
// function King() {
// 	this.royaltyName = "Henry"
// 	setTimeout(() => {
// 		console.log(this.royaltyName);
// 	}, 100);
// }
// function Queen() {
// 	this.royaltyName = "Nico"
// 	setTimeout(function () { console.log(this.royaltyName); }, 100);
// }
// new King() // Henry
// new Queen() // undefined



//caller 这个属性调用当前函数的函数，若在全局作用域中调用的则为null
// function outer() {
// 	inner()
// }
// function inner() {
// 	console.log(arguments.callee.caller);
// }
// outer() // [Function: outer]


// new.target
// function King() {
// 	if (!new.target) {
// 		throw `king must be instantiated using 'new'`
// 	}
// 	console.log(new.target); // [Function:King]
// 	console.log(`king instantiated using 'new'`);
// }
// new King() // king instantiated using 'new'
// King() // king must be instantiated using 'new'



/**
 * 函数属性与方法
*/
// function sayName(name) {
// 	console.log(name);
// }
// function sum(num1, num2) {
// 	return num1 + num2
// }
// function sumMul(...values) {
// 	return values
// }
// console.log(sayName.length); // 1
// console.log(sum.length); // 2
// console.log(sumMul.length); // 0


// apply()接受两个参数:函数内this的值和一个参数数组.第二个参数可以是Array的实例,也可以是arguments对象(类数组对象).
// function sum(num1, num2) {
// 	return num1 + num2
// }
// function callSum1(num1, num2) {
// 	return sum.apply(this, arguments)
// }
// function callSum2(num1, num2) {
// 	return sum.apply(this, [num1, num2])
// }
// console.log(callSum1(10, 10)); // 20
// console.log(callSum2(10, 10)); // 20


// call()
// function sum(num1, num2) {
// 	return num1 + num2
// }
// function callSum(num1, num2) {
// 	return sum.call(this, num1, num2)
// }
// console.log(callSum(10, 10)); // 20


// apply() call()控制上下文
// window.color = 'red'
// let o = {
// 	color: 'blue'
// }
// function sayColor() {
// 	console.log(this.color);
// }
// sayColor() // red
// sayColor.call(this) // red
// sayColor.call(window) // red
// sayColor.call(o) // blue


// window.color = 'red'
// var o = {
// 	color: 'blue'
// }
// const sayColor = function () {
// 	console.log(this.color);
// }
// let objectSayColor = sayColor.bind(o)
// objectSayColor() // blue

// // 对函数而言继承的方法toLocaleString()和toString()始终返回函数的代码(具体格式因浏览器格式而异).valueOf()则返回函数本身
// console.log(sayColor.toString());
// console.log(sayColor.toLocaleString());
// console.log(sayColor.valueOf());



/**
 * 函数表达式
*/
// 一个危险的写法
// let condition = true
// if (condition) {
// 	function sayHi() {
// 		console.log('Hi!');
// 	}
// } else {
// 	function sayHi() {
// 		console.log('Hello!');
// 	}
// }
// sayHi()



/**
 * 递归
*/
// 如之前的阶乘中使用的递归相同
// function factorial(num) {
// 	if (num <= 1) {
// 		return 1
// 	} else {
// 		return num * arguments.callee(num - 1)
// 	}
// }
// console.log(factorial(3)); // 6

// 由于严格模式下无法访问arguments.callee.因此可以使用命名函数表达式达到目的
// let factorial = function f(num) {
// 	if (num <= 1) {
// 		return 1
// 	} else {
// 		return num * f(num - 1)
// 	}
// }
// let anotherFactorital = factorial
// factorial = null
// console.log(anotherFactorital(3)); // 6



/**
 * 尾调用优化
*/
// function outerFunction() {
// 	return innerFunction() // 尾调用
// }


// 不符合尾调用优化的例子
// "use strict"
// // 尾调用没有返回
// function outerFunction() {
// 	innerFunction()
// }
// // 尾调用没有直接返回
// function outerFuncion() {
// 	let innerFunctionResult = innerFunction()
// 	return innerFunctionResult
// }
// // 尾调用返回后必须转型为字符串,多了一步额外逻辑
// function outerFunction() {
// 	return innerFunction().toString()
// }
// // 尾调用是一个闭包
// function outerFunction() {
// 	let foo = 'bar'
// 	function innerFunction() { return foo }
// 	return innerFunction()
// }


// 符合尾调用优化的例子
// "use strict"
// // 栈帧销毁前执行参数计算
// function outerFunction(a, b) {
// 	return innerFunction(a + b)
// }
// // 初始返回值不涉及栈帧
// function outerFunction(a, b) {
// 	if (a < b) {
// 		return a;
// 	}
// 	return innerFunction(a + b)
// }
// // 两个内部函数都在尾部
// function outerFunction() {
// 	return condition ? innerFunctionA() : innerFunctionB()
// }



// 尾调用例子
// 显然不符合尾调用调条件。因为返回语句中有相加操作
// function fib(n) {
// 	if (n < 2) {
// 		return n;
// 	}
// 	return fib(n - 1) + fib(n - 2)
// }


// 一种优化的方法,满足尾调用的所有条件
// "use strict"
// function fib(n) {
// 	return fibImpl(0, 1, n)
// }
// function fibImpl(a, b, n) {
// 	if (n === 0) {
// 		return a
// 	}
// 	return fibImpl(b, a + b, n - 1)
// }



/**
 * 闭包
*/
// function compare(value1, value2) {
// 	if (value1 < value2) {
// 		return -1
// 	} else if (value1 > value2) {
// 		return 1
// 	} else {
// 		return 0
// 	}
// }
// 在定义compare函数时，会为其创建作用域链，预装载全局变量对象，保存在内部的[[scope]]中。在调用这个函数时，会创建相应执行上下文，然后通过复制函数内部的[[scope]]来创建其作用域。接着会创建函数的活动对象并将其推入作用域前端(在这个例子中，就是全局作用域前面)。


// 销毁函数
// let compareNames = createCompareFunction('name')
// let result = compareNames({name:'Nico',name:'Matt'})
// compareNames = null // 此时才接触对函数的引用，原先的create...函数才会销毁



// 闭包中的this
// window.identity = 'The window'
// let o = {
// 	identity: 'My Object',
// 	getIdentyFunc() {
// 		return function () {
// 			return this.identity
// 		}
// 	}
// }
// console.log(o.getIdentyFunc()()); // The window

// window.identity = 'The window'
// let o = {
// 	identity: 'My Object',
// 	getIdentyFunc() {
// 		const that = this
// 		return function () {
// 			return that.identity
// 		}
// 	}
// }
// console.log(o.getIdentyFunc()()); // My Object


// this的变化
// global.identity = 'The window'
// let o = {
// 	identity: 'My Object',
// 	getIdentyFunc() {
// 		console.log(this.identity);
// 	}
// }
// o.getIdentyFunc(); // My Object
// (o.getIdentyFunc)(); // My Object
// (o.getIdentyFunc = o.getIdentyFunc)(); // The window


// 闭包 内存泄露
// function assignHandler() {
// 	let element = document.querySelector('div')
// 	element.onclick = () => console.log(element.id);
// }


// 修改代码,将闭包内的element.id改为id消除循环引用。又因为闭包包含着函数的活动对象（其中存在element）所以还要将element置为null
// function assignHandler() {
// 	let element = document.querySelector('div')
// 	let id = element.id
// 	element.onclick = () => console.log(id);
// 	element = null
// }



/**
 * IIFE
*/
// (function () {
// 	for (var i = 0; i < 10; i++) {
// 		console.log(i);
// 	}
// })()
// console.log(i); // ReferenceError


// IIFE锁定参数值。
// let divs = document.querySelectorAll('div')
// // 无法达到目的
// for (var i = 0; i < divs.length; i++) {
// 	divs[i].addEventListener('click', function () {
// 		console.log(i); // 打印出来都是2
// 	})
// }

// // 使用IIFE
// for (var i = 0; i < divs.length; i++) {
// 	divs[i].addEventListener('click', (function (frozenCounter) {
// 		return function () {
// 			console.log(frozenCounter);
// 		}
// 	})(i))
// }



/** 
 * 特权方法
*/
// function MyObject() {
// 	let privateVariable = 10
// 	function privateFunction() { // 这个是闭包耶
// 		return false
// 	}
// 	this.publicMethod = function () {
// 		privateVariable++
// 		return privateFunction()
// 	}
// }
// let myObject = new MyObject()
// console.log(myObject.privateVariable); // undefined
// console.log(myObject.publicMethod()); // false


// 例子
// 在构造函数中定义私有变量和特权方法
// function Person(name) {
// 	this.getName = function () {
// 		return name
// 	}
// 	this.setName = function (newValue) {
// 		name = newValue
// 	}
// }
// let person = new Person("Nico")
// console.log(person.getName()); // Nico
// person.setName('John')
// console.log(person.getName()); // John


// 静态私有变量
// (function () {
// 	// 私有变量和私有函数
// 	let privateVariable = 10;
// 	function privateFunction() {
// 		return false
// 	}
// 	// 构造函数
// 	MyObject = function () { }  // 无关键字，全局变量,且使用函数表达式（因为函数声明并不是必须的，在此处）
// 	// 公有和特权方法
// 	MyObject.prototype.publicMethod = function () {
// 		privateVariable++
// 		return privateFunction()
// 	}
// })()
// const myObject = new MyObject()
// console.log(myObject.publicMethod()); // false


// 私有作用域定义私有变量和函数
// (function () {
// 	let name = ''
// 	Person = function (value) {
// 		name = value
// 	}
// 	Person.prototype.getName = function () {
// 		return name
// 	}
// 	Person.prototype.setName = function (newValue) {
// 		name = newValue
// 	}
// })()
// let person1 = new Person("Nico")
// console.log(person1.getName()); // Nico
// person1.setName('John')
// console.log(person1.getName()); // John

// let person2 = new Person('Matt')
// console.log(person2.getName()); // Matt
// console.log(person1.getName()); // Matt



// 模块模式
// 单例对象。
// let singleton = {
// 	name: value,
// 	method() {
// 		// ...方法的代码
// 	}
// }


// 模块模式样板代码
/* let singleton = function () {
	// 私有变量和私有函数
	let privateVariable = 10;
	function privateFunction() {
		return false
	}
	// 特权/公有方法和属性
	return {
		publicProperty: true,
		publicMethod() {
			privateVariable++
			return privateFunction()
		}
	}
}()


// 创建一个application对象用于管理组件
let application = function () {
	// 私有变量和私有函数
	let components = new Array()
	// 初始化
	components.push(new BaseComponent())
	// 公共接口
	return {
		getComponentCount() {
			return components.length
		},
		registerComponent(component) {
			if (typeof component == 'object') {
				components.push(component)
			}
		}
	}
} */



// 模块增强模式
let singleton = function () {
	let privateVariable = 20
	function privateFunction() {
		return false
	}
	let object = new CustonType()
	object.publicProperty = true
	object.publicMethod = function () {
		privateVariable++
		return privateFunction()
	}
	return object
}


// 若application对象必须是BaseComponent的实例则可以用对象增强模式，将要返回的对象进行new个构造函数
let application = function () {
	// 私有变量的私有函数
	let components = new Array()
	// 初始化
	components.push(new BaseComponent())
	// 创建局部变量保存实例
	let app = new BaseComponent()
	// 公共接口
	app.getComponents = function () {
		return components.length
	}
	app.registerComponents = function (component) {
		if (typeof component === 'object') {
			components.push(component)
		}
	}
	return app
}