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



// // 操作方法
// let colors = ['green', 'red', 'blue']
// let colors2 = colors.concat('black', colors)
// console.log(colors2); // ['green', 'red', 'blue', 'black', 'green', 'red', 'blue']


// 重写concat的flat行为
// let nums = [1, 2, 3, 4]
// let newNums = [5, 6, 7]
// newNums[Symbol.isConcatSpreadable] = false // true则打平数组，false不打平
// console.log(nums.concat(newNums));  // [ 1, 2, 3, 4, [ 5, 6, 7 ] ]


// slice()
// let nums = [1, 2, 3, 4, 5, 6]
// let nums2 = nums.slice(1) // [2, 3, 4, 5, 6]
// let nums3 = nums.slice(1, 3) // [2, 3]


// // splice(),
// let nums = [0, 1, 2, 3, 4, 5]
// console.log(nums.splice(0, 2)); //[0,1]  返回被删除的值组成的数组
// console.log(nums); // [2,3,4,5]  

// nums = [0, 1, 2, 3, 4, 5]
// console.log(nums.splice(1, 0, 'fist', 'second'));  // []
// console.log(nums); // // [0,'first','second',1,2,3,4,5] 在指定位置前插入

// nums = [0, 1, 2, 3, 4, 5]
// console.log(nums.splice(1, 1, 'first', 'second')); // [1]
// console.log(nums);// [0,'first','second',2,3,4,5] // 删除同时指定位置前插入



// 搜索和位置方法
// 接受两个参数，要查找的元素和从一个起始位置
// let nums = [1, 2, 3, 4, 5, 4, 3, 2, 1]
// console.log(nums.indexOf(4)); // 3 返回4所在位置的索引
// console.log(nums.lastIndexOf(4)) // 5
// console.log(nums.includes(4)); // true
// console.log(nums.indexOf(4, 4)); // 5
// console.log(nums.lastIndexOf(4, 4)) // 3
// console.log(nums.includes(4, 7)); // false

// let person = { name: 'Nico' }
// let people = [{ name: 'Nico' }]
// let people2 = [person]
// console.log(people.indexOf(person));  // -1
// console.log(people2.indexOf(person)); // 0
// console.log(people.includes(person)); // false
// console.log(people2.includes(person)); // true


// 断言函数
// 断言函数接受三个参数：元素，索引和数组本身,断言返回针织。表示是否匹配
// find(),findIndex(),[断言函数[指定this值]]
// const people = [
//   { name: 'Nico', age: 17 },
//   { name: 'Gero', age: 20 }
// ]
// const judgeAge = (element, index, array) => element.age <= 18
// console.log(people.find(judgeAge)); // [{ name: 'Nico', age: '17' }]
// console.log(people.findIndex(judgeAge)); // 0

// const num = [0, 1, 2, 3, 4]
// const result = num.find((element, index, array) => {
//   console.log(element, index, array);
//   return element === 2
// })
// // 0 0 [ 0, 1, 2, 3, 4 ]
// // 1 1 [ 0, 1, 2, 3, 4 ]
// // 2 2 [ 0, 1, 2, 3, 4 ]
// console.log(result); // [2]



// 迭代方法
// let num = [1, 2, 3, 4, 5, 4, 3, 2, 1]
// let everyResult = num.every((item, index, array) => item > 2) // false
// let someResult = num.some((item, index, array) => item > 2) // true
// console.log(num.includes(2));// true,不能使用断言函数


// filter()
// let nums = [1, 2, 3, 4, 3, 2, 1]
// let filterResult = nums.filter((item, index, array) => item < 2)
// console.log(filterResult); //[1, 1]


// map()
// let nums = [1, 2, 3, 4, 5, 4, 3, 2, 1]
// let mapRes = nums.map((item, index, array) => item ** 2)
// console.log(mapRes);[1, 4, 9, 16] // [1, 4, 9, 16, 25, 16, 9, 4, 1]


// forEach()
let nums = [1, 2, 3, 4]
console.log(nums.forEach((item, index, array) => item > 2)); //undefined