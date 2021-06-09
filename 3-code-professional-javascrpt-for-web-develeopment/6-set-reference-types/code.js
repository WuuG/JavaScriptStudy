// 构造函数
// let person = new Object()
// person.name = 'Niko'
// // 字面量
// const person = {
//   name: 'Nico',
//   age: 18
// }


// let person = {
//   name: 'Noki',
//   5: '五'
// }
// console.log(person[5]);




// let colors = new Array() //空数组
// let keys = new Array(20) //建立初始length20的空数组

// let colors = new Array('green', 'blue', 'shift') // [ 'green', 'blue', 'shift' ]


// 字面量
// let colors = ['red','blue','green']


// console.log(Array.from('Matt')); // [ 'M', 'a', 't', 't' ]

// const m = new Map().set(1, 2).set(3, 4)
// const s = new Set().add(1).add(2).add(3).add(4)
// console.log(Array.from(m)); // [ [ 1, 2 ], [ 3, 4 ] 
// console.log(Array.from(s)); // [ 1, 2, 3, 4 ]

// // 数组浅复制
// const a1 = [1, 2, 3, 4, 5]
// const a2 = Array.from(a1)
// console.log(a2); // [1,2,3,4,5]
// console.log(a1 == a2); // false

// // 可迭代对象
// const iter = {
//   *[Symbol.iterator]() {
//     for (let i = 0; i < 5; i++) {
//       yield i
//     }
//   }
// }
// console.log(Array.from(iter)); // [0, 1, 2, 3, 4]

// 存在必要属性的自定义对象
// const arrayLikeObj = {
//   0: 1,
//   1: 2,
//   2: 3,
//   length: 3
// }
// console.log(Array.from(arrayLikeObj)); // [1, 2, 3]


// Array.from的第二个参数
// const a1 = [1, 2, 3, 4]
// const a2 = Array.from(a1, x => x ** 2) // [1, 4, 9, 16]
// const a3 = Array.from(a1, function (x) {
//   return x ** 2
// })

// const a3 = Array.from(a1, function (x) {
//   console.log(this); //[1,2,3,4]
//   return x ** 2
// }, a1)


// console.log(Array.of(2, 3, 4));
// console.log(Array(undefined));
// console.log(Array.of(undefined));



// 数组空位
// const options = [1, , , , 5]
// console.log(options.length); //5
// for (const value of options) {
//   console.log(value);
// }
// // 1
// // undefined
// // undefined
// // undefined
// // 5
// for (const value in options) {
//   console.log(value);
// }
// // 5
// // 0
// // 4




// 数组索引
// let colors = ['blue', 'red', 'yellow']
// // 超过最大索引，会自动扩张到该索引,中间补空
// colors[4] = 'pink'
// console.log(colors); //[ 'blue', 'red', 'yellow', <1 empty item>, 'pink' ]



// let value = [1]
// console.log(value instanceof Array); // true
// console.log(Array.isArray(value)); // true



// 迭代器方法
// const a = ['foo', 'bar', 'buz', 'qux']
// const aKeys = Array.from(a.keys())
// const aValues = Array.from(a.values())
// const aEntries = Array.from(a.entries())
// console.log(aKeys); // [0, 1, 2, 3]
// console.log(aValues);// ['foo', 'bar', 'buz', 'qux']
// console.log(aEntries); // [[0, 'foo'], [1, 'bar'], [2, 'buz'], [3, 'qux']]


// const a = ['foo', 'bar', 'buz', 'qux']
// for (const [index, value] of a.entries()) {
//   console.log(index, value);
// }
// // 0 foo
// // 1 bar
// // 2 buz
// // 3 qux



// const zeroes = [0, 0, 0, 0, 0]
// zeroes.fill(5)
// console.log(zeroes); // [ 5, 5, 5, 5, 5 ]

// zeroes.fill(0)
// zeroes.fill(6, 3) // >=3
// console.log(zeroes); //[ 0, 0, 0, 6, 6 ]

// zeroes.fill(0)
// zeroes.fill(7, 1, 3) // >=1 && <3
// console.log(zeroes); // [ 0, 7, 7, 0, 0 ]


// zeroes.fill(0)
// zeroes.fill(8, -4, -1) // --> -4+length   -1+length
// console.log(zeroes); // [ 0, 8, 8, 8, 0 ] 


// const zeroes = [0, 0, 0, 0, 0]
// zeroes.fill(8, 3, 2) //忽略
// zeroes.fill(8, 5, 10) //忽略
// zeroes.fill(8, -10, -6) //忽略



// let ints = [],
//   reset = () => { ints = [0, 1, 2, 3, 4, 5, 6, 7, 8] }

// reset()
// // 复制0开始，从索引5插入
// ints.copyWithin(5)
// console.log(ints);// [0, 1, 2, 3, 4, 0, 1, 2, 3]

// reset()
// // 从5开始复制，从索引0位置插入
// ints.copyWithin(0, 5)
// console.log(ints);// [5, 6, 7, 8, 4, 5, 6, 7, 8]

// reset()
// // 从0开始复制至2(3不包括和fill一样)，在4位置插入
// ints.copyWithin(4, 0, 3)
// console.log(ints); // [0, 1, 2, 3, 0, 1, 2, 7, 8]

// reset()
// // JavaScript在查之前，会完整复制，不存在重写的问题
// ints.copyWithin(2, 0, 6)
// console.log(ints); // [0, 1, 0, 1, 2, 3, 4, 5, 8]

// //对负索引的处理和fill是一样的
// reset()
// ints.copyWithin(2, -8, -3)
// console.log(ints); // [0, 1, 1, 2, 3, 5, 6, 7, 8]



// 转换方法
// let color = ['green', 'blue', 'yellow']
// console.log(color.toString()); //green,blue,yellow
// console.log(color.valueOf()); //[ 'green', 'blue', 'yellow' ]


// let person1 = {
//   toString() {
//     return 'Niko'
//   },
//   toLocaleString() {
//     return 'NNNNNN'
//   }
// }
// let person2 = {
//   toString() {
//     return 'Gero'
//   },
//   toLocaleString() {
//     return 'GGGG'
//   }
// }
// let persons = [person1, person2]
// alert(persons) // Niko,Gero
// console.log(persons.toString());
// console.log(persons.toLocaleString());


// let colors = ['green', 'red', undefined, 'yellow'] 
// let colorsStr = colors.join('|')// 若是没参数，则默认使用','
// console.log(colorsStr);// green|red||yellow  undefined被当作空字符处理了



// // push() pop()
// let names = ['wu', 'nico']
// console.log(names.push('gero', 'sks')); //4 返回数组长度
// console.log(names.pop()); // sks


// // shift() unshift()
// let names = ['wu', 'nico']
// console.log(names.shift()); //wu
// console.log(names.unshift('gero')); //2,返回数组长度




// sort() reverse()
// let values = [0, 1, 5, 10, 15]
// values.reverse()
// console.log(values); // [15, 10, 5, 1, 0]
// values.sort()
// console.log(values); // [0, 1, 10, 15, 5] 转换为string，由字符串来决定顺序


// // 比较函数接受两个参数,value1需要排在value2之前，就返回-1 反之返回1 .相等返回0
// function compare(value1, value2) {
//   if (value1 > value2) {
//     return 1
//   } else if (value1 < value2) {
//     return -1
//   } else {
//     return 0
//   }
// }
// let values = [0, 1, 5, 10, 15]
// values.sort(compare)
// console.log(values);