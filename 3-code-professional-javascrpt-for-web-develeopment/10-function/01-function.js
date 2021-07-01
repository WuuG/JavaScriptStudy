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


window.color = 'red'
var o = {
	color: 'blue'
}
const sayColor = function () {
	console.log(this.color);
}
let objectSayColor = sayColor.bind(o)
objectSayColor() // blue

// 对函数而言继承的方法toLocaleString()和toString()始终返回函数的代码(具体格式因浏览器格式而异).valueOf()则返回函数本身
console.log(sayColor.toString());
console.log(sayColor.toLocaleString());
console.log(sayColor.valueOf());
