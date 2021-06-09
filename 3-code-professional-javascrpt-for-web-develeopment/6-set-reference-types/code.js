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


