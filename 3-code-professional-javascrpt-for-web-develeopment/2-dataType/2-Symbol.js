// let fooSymbol = Symbol('foo')
// let otherfooSymbol = Symbol('foo')
// console.log(fooSymbol == otherfooSymbol); //false 

// let myBoolean = new Boolean() // 构造一个Boolean对象
// console.log(myBoolean);
// console.log(typeof myBoolean);
// // let mySymbol = new Symbol() //TypeError
// let mySymbol = Symbol()
// let myWrappedSymbol = Object(mySymbol)
// console.log(typeof myWrappedSymbol);


// let fooGlobalSymbol = Symbol.for('foo')
// let otherfooSymbol = Symbol.for('foo')  // 此时去检查注册表，查看是否有foo，若有返回实例
// let otherfooSymbol1 = Symbol('foo')
// console.log(fooGlobalSymbol == otherfooSymbol); //true
// console.log(otherfooSymbol1 == fooGlobalSymbol); //false,此时只是描述相同罢了,并不是一个实例

// // Symbol.for()会将描述转换为字符串
// let emptyGlobalSymbol = Symbol.for()
// let otheremptySymbol = Symbol.for(undefined)
// let otheremptySymbol1 = Symbol.for()
// console.log(emptyGlobalSymbol); //Symbol(undefined)
// console.log(emptyGlobalSymbol === otheremptySymbol); //true
// console.log(emptyGlobalSymbol === otheremptySymbol1); //true

// Symbol.keyFor()用来查询全局变量，接受符号参数，返回改全局符号对应的字符串键(Symbol描述)
// let s = Symbol.for('foo')
// console.log(Symbol.keyFor(s));  // foo
// let s2 = Symbol('foo')
// console.log(Symbol.keyFor(s2)); // undefined
// let s3 = Symbol.for()
// console.log(Symbol.keyFor(s3)); // undefined,其实从某方面来看还是很合理的，因为确实是undefined
// // console.log(Symbol.keyFor('foo')); // TypeError, 'foo'不是符号
// console.log(Symbol.keyFor()); // 传入undefined，不是Symbol


// let s1 = Symbol('foo'),
//   s2 = Symbol('bar'),
//   s3 = Symbol('buz'),
//   s4 = Symbol('qux'),
//   s5 = Symbol('foo')
// let o = {
//   [s1]: 'foo val',
//   username: 'wuug'
// }
// o[s2] = 'bar val'
// console.log(o[s1], o['username'], o[s2]); //foo val wuug bar val
// // 也可以用 Object.defineProperty()和 Object.defineProperties()
// Object.defineProperty(o, s3, { value: 'buz val', enumerable: true }); //node环境 默认不显示，需要加上 enumerable
// console.log(o);
// // {
// //   username: "wuug"
// //   Symbol(bar): "bar val"
// //   Symbol(buz): "buz val"
// //   Symbol(foo): "foo val"
// // }
// setTimeout(() => {
//   Object.defineProperties(o, {
//     [s4]: { value: 'qux val' },
//     [s5]: { value: 'second foo val' }
//   })
//   console.log(o);
//   // {
//   //   username: "wuug"
//   //   Symbol(bar): "bar val"
//   //   Symbol(buz): "buz val"
//   //   Symbol(foo): "foo val"
//   //   Symbol(foo): "second foo val"
//   //   Symbol(qux): "qux val"
//   // }
// }, 1000);



// Symbol.asyncInterator
// class Emitter {
//   constructor(max) {
//     this.max = max,
//       this.asyncId = 0
//   }

//   async *[Symbol.asyncIterator]() {
//     while (this.asyncId < this.max) {
//       // 产生 0 1 2 3 4 五个Promise对象，
//       yield new Promise((resolve, reject) => {
//         resolve(this.asyncId++)
//       });
//     }
//   }
// }

// (async function () {
//   let myEmitter = new Emitter(5)
//   for await (const value of myEmitter) {
//     console.log(value);
//     // 0 1 2 3 4
//   }
// })()



// Symbol.hasInstance
// 下面二者实现的效果相同，都是判断一个实例是否是一个类的对象,唯一的区别是语法不同 // 1. instanceof 操作符
// function Foo() { }
// let f = new Foo()
// console.log(f instanceof Foo); // true

// class Bar { }
// let b = new Bar()
// console.log(b instanceof Bar); // true


// 2. Symbol.hasInstace
// function Foo() { }
// let f = new Foo()
// console.log(Foo[Symbol.hasInstance](f)); // true

// class Bar { }
// let b = new Bar()
// console.log(Bar[Symbol.hasInstance](b)); // true


// 这个属性会在原型链上寻找属性的定义。所以是算作继承的类的实例对象的，同之前的属性，用此属性可以通过静态方法重新定义属性对应函数
// class Foo { }
// class Bar extends Foo {
//   // 注意这个属性对应方法是一个静态方法
//   static [Symbol.hasInstance]() { 
//     return false;
//   }
// }

// let baz = new Bar()
// console.log(baz instanceof Foo); //true
// console.log(baz instanceof Bar); //false 因为静态方法被修改了



// Symbol.isConcatSpreadable
// // 1. 数组
// let array = ['bar', 'buz']
// console.log(array[Symbol.isConcatSpreadable]); //undefined
// // 数组对象默认情况下，会flat到已有数组
// console.log(initial.concat(array)); // ['foo','bar','buz'] 
// array[Symbol.isConcatSpreadable] = false
// console.log(initial.concat(array)); // ['foo',array(2)] ,尽管array有[Symbol.isConcatSpreadable]属性，但是不会打印出来，且并不及计入数组本身

// 2.类数组对象
// let initial = ['foo']
// let arrayLikeObject = { length: 2, 0: 'bar', 1: 'buz' } //类数组对象
// console.log(initial.concat(arrayLikeObject)); // ['foo',{...}]
// arrayLikeObject[Symbol.isConcatSpreadable] = true
// console.log(initial.concat(arrayLikeObject)); // ['foo','bar','buz']

// 3.set 对象
let initial = ['foo']
let OtherObject = { username: 'wuug', age: 19 } //类数组对象
console.log(initial.concat(OtherObject)); // ['foo',{...}]
OtherObject[Symbol.isConcatSpreadable] = true
// 不是类数组对象的对象，在concat时直接被忽略了
console.log(initial.concat(OtherObject)); // ['foo'] 