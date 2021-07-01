- [Symbol](#symbol)
- [Symbol.for() 全局符号注册表](#symbolfor-全局符号注册表)
- [使用符号作为属性](#使用符号作为属性)
- [常用内置符号](#常用内置符号)
- [Symbol.asyncIterator](#symbolasynciterator)
- [Symbol.hasInstance](#symbolhasinstance)
- [Symbol.isConcatSpreadable](#symbolisconcatspreadable)
- [Symbol.iterator](#symboliterator)
- [Symbol.match](#symbolmatch)
- [Symbol.replace](#symbolreplace)
- [Symbol.search](#symbolsearch)
- [Symbol.species](#symbolspecies)
- [Symbol.split](#symbolsplit)
- [Symbol.toPrimitive](#symboltoprimitive)
- [Symbol.toStringTag](#symboltostringtag)
- [Symbol.unscopables](#symbolunscopables)
# Symbol
符号实例是唯一的，不可变的。可用来确保对象属性使用唯一标识符。符号就是用来创建唯一记号，进而用作非字符串形式的对象属性。
``` js
let fooSymbol = Symbol('foo')
let otherfooSymbol = Symbol('foo')
console.log(fooSymbol == otherfooSymbol); //false 
```
Symbol() 不能与new关键字一起作为构造函数使用。
> 为了避免创建符号包装对象 ？？
``` js
let myBoolean = new Boolean() // 构造一个Boolean对象
console.log(myBoolean);
console.log(typeof myBoolean);
// let mySymbol = new Symbol() //TypeError
```
可以借用Object()函数来创建符号包装对象
``` js
let mySymbol = Symbol()
let myWrappedSymbol = Object(mySymbol)
console.log(typeof myWrappedSymbol);
```
# Symbol.for() 全局符号注册表
共享和重用符号实例
``` js
let fooGlobalSymbol = Symbol.for('foo')
let otherfooSymbol = Symbol.for('foo')  // 此时去检查注册表，查看是否有foo，若有返回实例
let otherfooSymbol1 = Symbol('foo')
console.log(fooGlobalSymbol == otherfooSymbol); //true
console.log(otherfooSymbol1 == fooGlobalSymbol); //false,此时只是描述相同罢了,并不是一个实例
```
Symbol.for()会将描述转换为字符串
``` js
let emptyGlobalSymbol = Symbol.for()
let otheremptySymbol = Symbol.for(undefined)
let otheremptySymbol1 = Symbol.for()
console.log(emptyGlobalSymbol); //Symbol(undefined)
console.log(emptyGlobalSymbol === otheremptySymbol); //true
console.log(emptyGlobalSymbol === otheremptySymbol1); //true
```
Symbol.keyFor()用来查询全局变量，接受符号参数，返回改全局符号对应的字符串键(Symbol描述)
``` js
let s = Symbol.for('foo')
console.log(Symbol.keyFor(s));  // foo
let s2 = Symbol('foo')
console.log(Symbol.keyFor(s2)); // undefined
let s3 = Symbol.for()
console.log(Symbol.keyFor(s3)); // undefined,其实从某方面来看还是很合理的，因为确实是undefined
console.log(Symbol.keyFor('foo')); // TypeError, 'foo'不是符号
console.log(Symbol.keyFor()); // 传入undefined，不是Symbol
```
# 使用符号作为属性
在浏览器环境下的代码
``` js
let s1 = Symbol('foo'),
  s2 = Symbol('bar'),
  s3 = Symbol('buz'),
  s4 = Symbol('qux'),
  s5 = Symbol('foo')
let o = {
  [s1]: 'foo val',
  username: 'wuug'
}
o[s2] = 'bar val'
console.log(o[s1], o['username'], o[s2]); //foo val wuug bar val
// 也可以用 Object.defineProperty()和 Object.defineProperties()
Object.defineProperty(o, s3, { value: 'buz val', enumerable: true }); //node环境 默认不显示，需要加上 enumerable
console.log(o);
// {
//   username: "wuug"
//   Symbol(bar): "bar val"
//   Symbol(buz): "buz val"
//   Symbol(foo): "foo val"
// }
setTimeout(() => {
  Object.defineProperties(o, {
    [s4]: { value: 'qux val' },
    [s5]: { value: 'second foo val' }
  })
  console.log(o);
  // {
  //   username: "wuug"
  //   Symbol(bar): "bar val"
  //   Symbol(buz): "buz val"
  //   Symbol(foo): "foo val"
  //   Symbol(foo): "second foo val"
  //   Symbol(qux): "qux val"
  // }
}, 1000);
```
# 常用内置符号
ECMAScript6引入一批常用内置符号，用于暴露语言内部行为。之后可以访问、重写或模拟这些行为。例如Symbol.iteratro能够修改for-of在迭代对象时的行为
> 在规范中表示 @@可以表示Symbol,如@@iterator表示Symbol.iterator
# Symbol.asyncIterator
> function* 表示生成器函数
``` js
class Emitter {
  constructor(max) {
    this.max = max,
      this.asyncId = 0
  }

  async *[Symbol.asyncIterator]() {
    while (this.asyncId < this.max) {
      // 产生 0 1 2 3 4 五个Promise对象，
      yield new Promise((resolve, reject) => {
        resolve(this.asyncId++)
      });
    }
  }
}

(async function () {
  let myEmitter = new Emitter(5)
  for await (const value of myEmitter) {
    console.log(value);
    // 0 1 2 3 4
  }
})()
```
# Symbol.hasInstance
下面二者实现的效果相同，都是判断一个实例是否是一个类的对象,唯一的区别是语法不同 // 1. instanceof 操作符
``` js
// function Foo() { }
// let f = new Foo()
// console.log(f instanceof Foo); // true

// class Bar { }
// let b = new Bar()
// console.log(b instanceof Bar); // true

// 2. Symbol.hasInstace
function Foo() { }
let f = new Foo()
console.log(Foo[Symbol.hasInstance](f)); // true

class Bar { }
let b = new Bar()
console.log(Bar[Symbol.hasInstance](b)); // true
```
这个属性会在原型链上寻找属性的定义。所以是算作继承的类的实例对象的，同之前的属性，用此属性可以通过静态方法重新定义属性对应函数
``` js
class Foo { }
class Bar extends Foo {
  // 注意这个属性对应方法是一个静态方法
  static [Symbol.hasInstance]() { 
    return false;
  }
}

let baz = new Bar()
console.log(baz instanceof Foo); //true
console.log(baz instanceof Bar); //false 因为静态方法被修改了
```
# Symbol.isConcatSpreadable
Symbol.isConcatSpreadable,用来说明concat(x)时，x是否要flat，对不同的x类型，会采取不同的模型,数组默认flat。属性为false时，都是直接concat。类数组对象在属性值为true时，会flat。若是不是数组对象，在true会直接过滤掉，不进行concat。
``` js
// // 1. 数组
let array = ['bar', 'buz']
console.log(array[Symbol.isConcatSpreadable]); //undefined
// 数组对象默认情况下，会flat到已有数组
console.log(initial.concat(array)); // ['foo','bar','buz'] 
array[Symbol.isConcatSpreadable] = false
console.log(initial.concat(array)); // ['foo',array(2)] ,尽管array有[Symbol.isConcatSpreadable]属性，但是不会打印出来，且并不及计入数组本身

// 2.类数组对象
let initial = ['foo']
let arrayLikeObject = { length: 2, 0: 'bar', 1: 'buz' } //类数组对象
console.log(initial.concat(arrayLikeObject)); // ['foo',{...}]
arrayLikeObject[Symbol.isConcatSpreadable] = true
console.log(initial.concat(arrayLikeObject)); // ['foo','bar','buz']

// 3.set 对象
let initial = ['foo']
let OtherObject = { username: 'wuug', age: 19 } //类数组对象
console.log(initial.concat(OtherObject)); // ['foo',{...}]
OtherObject[Symbol.isConcatSpreadable] = true
// 不是类数组对象的对象，在concat时直接被忽略了
console.log(initial.concat(OtherObject)); // ['foo'] 
```
# Symbol.iterator
该属性，表示一个方法，该方法返回对象默认迭代器，由for-of语句调用
``` js
class Foo {
  *[Symbol.iterator]() { }
}
let f = new Foo()
console.log(f[Symbol.iterator]); // [GeneratorFunction: [Symbol.iterator]]
```
与Symbol.asyncIterator十分相似
``` js
class Emiter {
  constructor(max) {
    this.max = max
    this.idx = 0
  }

  *[Symbol.iterator]() {
    while (this.idx < this.max) {
      yield this.idx++
    }
  }
}

let myEmiter = new Emiter(5)
for (const x of myEmiter) {
  console.log(x); // 0 1 2 3 4
```
# Symbol.match
该属性，表示一个正则表达式方法，该方法用正则表达式去匹配字符串，由String.prototype.match()方法使用。
``` js
console.log(RegExp.prototype[Symbol.match]); //[Function: [Symbol.match]
console.log('footbar'.match('foo')); //方法传入的非正则表达式，会被转换成RegExp对象
// ['foo', index: 0, input: 'footbar', groups: undefined]
```
取代默认行为
``` js
class FooMatch {
  static [Symbol.match](target) {
    return target.includes('foo')
  }
}

console.log('foobar'.match(FooMatch)); //true


class StringMatch {
  constructor(str) {
    this.str = str
  }
  [Symbol.match](target) {
    return target.includes(this.str)
  }
}

console.log('foobar'.match(new StringMatch('bar'))); // true
console.log('barbar'.match(new StringMatch('foo'))); // false
```
# Symbol.replace
该属性表示一个正则表达式方法，该方法替换一个字符串中匹配的子串,由string.prototype.replace调用
``` js
console.log(RegExp.prototype[Symbol.replace]); //[Function: [Symbol.replace]
console.log('foobar foobar'.replace('bar', 'foo')); // foofoo foobar
```
改变行为
``` js
class FooReplace {
  static [Symbol.replace](target) {
    return target.split('foo').join('bar')
  }
}
console.log('foobar foobar'.replace(FooReplace)); //barbar barbar)


class RegReplace {
  constructor(reg) {
    this.reg = reg
  }
  [Symbol.replace](target, replacement) {
    return target.split(this.reg).join(replacement)
  }
}
console.log('buzfoo buzfoo'.replace(new RegReplace('buz'), 'bar')); //barfoo barfoo
```
# Symbol.search
作为一个属性表示，一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引
``` js
console.log(RegExp.prototype[Symbol.search]); // [Function: [Symbol.search]]
console.log('foobar bar'.search(/bar/)); // 3
console.log('foobar'.search(/buz/)); // -1
```
默认转换为RegRex对象，可改变行为，直接使用传入的参数
``` js
class FooSearch {
  static [Symbol.search](target) {
    return target.indexOf('foo')
  }
}

console.log('foobar'.search(FooSearch)); // 0
console.log('barfoo'.search(FooSearch)); // 3
console.log('barbuz'.search(FooSearch)); // -1


class StringSearch {
  constructor(str) {
    this.str = str
  }
  [Symbol.search](target) {
    return target.indexOf(this.str)
  }
}

console.log('foobar'.search(new StringSearch('bar'))); // 3
console.log('foobar'.search(new StringSearch('foo'))); // 0
console.log('foobar'.search(new StringSearch('buz'))); // -1
```
# Symbol.species
这个符号作为属性表示，一个函数值，该函数作为创建派生对象的构造函数。返回值表示其所属的类。
> ??????????????
``` js
class Bar extends Array { }
class Buz extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

let bar = new Bar()
console.log(bar instanceof Array);  // true                              
console.log(bar instanceof Bar);    // true                            
console.log(bar instanceof Array);  // true                              
console.log(bar instanceof Bar);    // true                            

let buz = new Buz()
console.log(buz);                   // Buz(0) []
console.log(buz instanceof Array);  // true                              
console.log(buz instanceof Buz);    // true                            
//concat调用时，就会去调用上面的getter方法,但到底时什么呢？
// 这里调用了之后，foo成为了buz的派生对象，就回去调用[Symbol.species]对应函数，进行构造。在构造过程中通过return的改变，来使其所属的类发生了变化。
let foo = buz.concat([1])
console.log(foo instanceof Array);  // true                              
console.log(foo instanceof Buz);    // false                            
```
# Symbol.split
该符号作为属性时表示一个正则表示方法，在匹配正则表示的索引位置拆分字符串.通过String.prototype.split调用
``` js
console.log(RegExp.prototype[Symbol.split]); // [Function: [Symbol.split]
console.log('foobarbuz'.split('bar')); // ['foo','buz']
```
修改默认行为
``` js
class spliteByFoo {
  static [Symbol.split](target) {
    return target.split('foo')
  }
}
console.log('barfoobuz'.split(spliteByFoo)); //['bar','buz']

class spliteByStr {
  constructor(str) {
    this.str = str
  }
  [Symbol.split](target) {
    return target.split(this.str)
  }
}
console.log('barfoobuz'.split('foo')); // ['bar','buz']
```
# Symbol.toPrimitive
该符号作为一个属性表示：一个方法，该方法将对象转换为响应原始值,有ToPrimitive抽象操作使用。 其实就是类型转换时会进行调用。
``` js
class Foo { }
let foo = new Foo()

console.log(3 + foo); // '3[object object]'
console.log(3 - foo); //NaN
console.log(String(foo)); //[object object]
```
修改默认行为
``` js
class Bar {
  constructor() {
    this[Symbol.toPrimitive] = function (hint) {
      switch (hint) {
        case 'number':
          return 2
        case 'String':
          return '转换成字符串啦'
        default:
          return '转换成其他东西'
      }
    }
  }
}

const bar = new Bar()
console.log(3 + bar); //'3转换成其他东西'
console.log(3 - bar); // 1
console.log(String(bar)); // '转换成字符串啦'
```
# Symbol.toStringTag
该符号作为属性表示：一个字符串，该字符串用于创建对象的默认字符串描述。也就是说表明其toString()后该对象(其实是实例对象)的描述
``` js
let s = new Set()
console.log(s); // Set(0) {}
console.log(s.toString()); // [object Set] 
console.log(s[Symbol.toStringTag]); // Set

class Foo { }
let foo = new Foo()
console.log(foo); // Foo {}
console.log(foo.toString()); // [object object]  默认描述为object
console.log(foo[Symbol.toStringTag]); // undefined 

class Bar {
  constructor() {
    this[Symbol.toStringTag] = 'BarTag'
  }
}
let bar = new Bar()
console.log(bar); // Bar {...}
console.log(bar.toString()); // [object BarTag]  
console.log(bar[Symbol.toStringTag]); // BarTag
```
# Symbol.unscopables
该符号作为属性表示：一个对象，该对象所有的以及继承的属性，都会从关联对象的with环境绑定中解除。 也就是说，如果设置这个对象，并将某个对象内属性设为true，当用with是，就无法访问该属性
``` js
let o = { foo: 'bar' }
with (o) {
  console.log(foo); //bar
}

o[Symbol.unscopables] = { //with语句中排除foo属性
  foo: true
}

with (o) {
  console.log(foo); // ReferenceError
}
```
> 不推荐使用with？ 为什么呢？