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
// let nums = [1, 2, 3, 4]
// console.log(nums.forEach((item, index, array) => item > 2)); //undefined



// reduce()
// let values = [1, 2, 3, 4, 5]
// let sum = values.reduce((pre, cur, index, array) => pre + cur) // 15


// redueceRight()
// let values = [1, 2, 3, 4, 5]
// let sum = values.reduceRight((pre, cur, index, array) => {  // 15
// 	console.log(index); // 3,2,1,0
// 	return pre + cur
// })




// 定型数组
// const buf = new ArrayBuffer(16)  // 在内存中分配16字节
// console.log(buf.byteLength); //16
// // ArrayBuffer一经创建就不能再调整大小了，但可以调整大小
// const buf2 = buf.slice(4, 12)
// console.log(buf2.byteLength); //8


// const buf = new ArrayBuffer(16)
// const fullDataView = new DataView(buf)
// console.log(fullDataView.byteLength)  //16
// console.log(fullDataView.byteOffset); //0
// console.log(fullDataView.buffer === buf); //true
// const firstDataView = new DataView(buf, 0, 8)
// console.log(firstDataView.byteOffset); // 0 
// console.log(firstDataView.byteLength); // 8
// console.log(firstDataView.buffer === buf); // true
// const secondDataView = new DataView(buf, 8)
// console.log(secondDataView.byteLength); // 8
// console.log(secondDataView.byteOffset); // 8
// console.log(secondDataView.buffer === buf); // true 



// const buf = new ArrayBuffer(2)
// const view = new DataView(buf)
// console.log(view.getInt8(0)); // 0
// console.log(view.getInt8(1)); // 0
// console.log(view.getInt16(0)); // 0
// view.setUint8(0, 255)
// console.log(view.getInt8(0)); // -1,   减一后取反，得到1，添负号
// console.log(view.getInt16(0)); // -256	 11111111 00000000 -(减1取反)->0000000 100000000 (256)
// view.setUint8(1, 0xFF)
// console.log(view.getInt16(0)); // -1


// 字节序
// 将第二个参数设为true则使用小端字节序
// const buf = new ArrayBuffer(2)
// const view = new DataView(buf)
// view.setUint16(0, 0x8001) // 1000 0000 0000 0001
// console.log(view.getUint16(0)); // 32769  
// console.log(view.getUint16(0, true)); //384

// // 写入
// view.setUint16(0, 0X0004) //大端写入
// console.log(view.getInt8(0)); // 0
// console.log(view.getInt8(1)); // 4
// view.setUint16(0, 0X0004, true) // 小端写入
// console.log(view.getInt8(0)); // 4
// console.log(view.getInt8(1)); // 0


// 边界
// const buf = new ArrayBuffer(6)
// const view = new DataView(buf)
// console.log(view.getInt32(4)); // RangeError
// view.getInt32(-1) // RangeErro
// view.setInt32(4, 123) // RangeError

// const buf = new ArrayBuffer(6)
// const view = new DataView(buf)
// console.log(view.getInt32(3)); // 需要32位可以读取，offset=3时，只有3*8=24位了


// const buf = new ArrayBuffer(1)
// const view = new DataView(buf)
// view.setInt8(0, 1.5)
// console.log(view.getInt8(0)); // 1
// view.setInt8(0, [4])
// console.log(view.getInt8(0)); // 4
// view.setInt8(0, 'f')
// console.log(view.getInt8(0)); // 0
// view.setInt8(0, 'string')
// console.log(view.getInt8(0)); // 0
// view.setInt8(0, Symbol()) // TypeError



// 定型数组
// const buf = new ArrayBuffer(12)
// const ints = new Int32Array(buf)
// console.log(ints.length); //3,因为指定Int32Type，所以四字节为一个元素
// const int2 = new Int32Array(6)
// console.log(int2.buffer.byteLength); //24  6个4字节，共24字节
// const int3 = new Int32Array([2, 4, 6, 8])
// console.log(int3.length); // 4
// console.log(int3.buffer.byteLength); // 16
// console.log(int3[2]); // 6

// const ints4 = new Int16Array(int3)
// // ints会分配自己的缓冲，int3中每个值会相应转换为新格式（如果超过了表示怎么办呢？）
// console.log(ints4.length); // 4
// console.log(ints4.buffer.byteLength); // 8
// console.log(ints4[2]); //6

// // 也可以使用 <ElementType>.from() <ElementType>.of()创建定型数组
// const ints5 = Int16Array.from([2, 4, 6, 8]) // ArrayLike
// console.log(ints5.length);
// console.log(ints5.buffer.byteLength);
// console.log(ints5[2]);
// const floats = Float32Array.of(3.14, 2.928, 1.92)  // [...items]
// console.log(floats.length); // 3
// console.log(floats.buffer.byteLength); // 12


// console.log(Int16Array.BYTES_PER_ELEMENT); // 2
// console.log(Int32Array.BYTES_PER_ELEMENT); // 4
// const ints = new Int32Array(1),
// 	float = new Float64Array(1)
// console.log(ints.BYTES_PER_ELEMENT); //4
// console.log(float.BYTES_PER_ELEMENT); // 8


// const ints = new Int16Array([1, 2, 3])
// const doubleInts = ints.map(x => 2 * x)
// console.log(doubleInts instanceof Int16Array); // true

// // 定型数组有一个Symbol.iterator符号属性
// for (const value of ints) {
// 	console.log(value);
// }



// set
// const container = new Int16Array(8)
// container.set([1, 2, 3, 4])
// console.log(container);  // Int16Array(8)[1, 2, 3, 4, 0, 0, 0, 0]
// container.set(Int8Array.of(4, 5, 6, 7), 4)
// console.log(container); // Int16Array(8)[1, 2, 3, 4, 4, 5, 6, 7]


// subarray()
// const container = new Int16Array([1, 2, 3, 4])
// // const fullCopy = container.subarray() //[1,2,3,4]
// const halfCopy = container.subarray(1) // [2,3,4]
// const partCopy = container.subarray(1, 3) // [2,3]


// 拼接方法
// function typeArrayConcat(typeArrayContructor, ...typeArrays) {
// 	const typeArrayLength = typeArrays.reduce((pre, cur) => (pre.length || pre) + cur.length)
// 	const resultArray = new typeArrayContructor(typeArrayLength)
// 	let offset = 0
// 	typeArrays.forEach(x => {
// 		resultArray.set(x, offset)
// 		offset += x.length
// 	})
// 	return resultArray
// }

// const typeArray = typeArrayConcat(Int16Array,
// 	Int8Array.from([1, 2, 3, 4]),
// 	Int16Array.from([5, 6, 7, 8]),
// 	Int32Array.of(9, 10, 11)
// )
// console.log(typeArray);// Int16Array(11)[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


// 上溢和下溢
// const ints = new Int8Array(2)

// const unsignedInts = new Uint8Array(2)
// // 索引只取最低有效位的8位，不会影响到相邻索引
// unsignedInts[0] = 256 // 0001 0000 0000 
// unsignedInts[1] = 511 // 0001 1111 1111	
// console.log(unsignedInts); // [0,255]
// unsignedInts[0] = -1
// console.log(unsignedInts); // [255,255]
// ints[0] = 128  // 1000 0000
// ints[1] = 255 // 1111 1111 
// console.log(ints); // [-128,-1]  负数补码

// const clampedInts = new Uint8ClampedArray([-1, 0, 255, 256])
// console.log(clampedInts); // [0,0,255,255]




// Map
// const m1 = new Map([ //初始化
// 	['key1', 'val1'],
// 	['key2', 'val2'],
// 	['key3', 'val3'],
// ])
// console.log(m1.size); // 3
// const m2 = new Map({ // 这算是初始化的第二种方式嘛
// 	[Symbol.iterator]: function* () { 
// 		yield ["key1", 'val1']
// 		yield ["key2", 'val2']
// 		yield ["key3", 'val3']
// 	}
// })
// console.log(m2.size); //3
// const m3 = new Map([[]]) // [] 为空undefined
// console.log(m3.has(undefined)); // true
// console.log(m3.get(undefined)); // undefined


// API
// const m = new Map()
// console.log(m.has(undefined)); // false 
// console.log(m.get('firstName')); // undefined
// console.log(m.size); //0

// m.set('firstName', 'Matt').set('firstName', 'Niko').set('lastName', 'jerry')
// console.log(m.has('firstName'));
// console.log(m.get('firstName')); // 覆盖啦
// console.log(m.size); // 2

// m.delete('firstName')
// console.log(m.has('fistName')); // false
// console.log(m.has('lastName')); // true
// console.log(m.size); // 1
// m.clear() // 删除所有键值对
// console.log(m.size); // 0


// set()返回的是映射实例，所以可以连缀使用
// const m = new Map().set('key1', 'val1')
// m.set('key2', 'val2').set('key3', 'key3')
// console.log(m); // Map(3) { 'key1' => 'val1', 'key2' => 'val2', 'key3' => 'key3' }


// const m = new Map()
// const functionKey = function () { }
// const symbolKey = Symbol()
// const objectKey = new Object()
// m.set(functionKey, 'functionKey').set(symbolKey, 'symbolKey').set(objectKey, 'objectKey')
// console.log(m.get(functionKey)); // 'functionKey'
// console.log(m.get(symbolKey)); // 'symbolKey'
// console.log(m.get(objectKey)); // 'objectKey'
// // SameValueZero比较  实例不同
// console.log(m.has(function () { })); // false


// const m = new Map()
// const objKey = {}, objVal = {}, arrKey = [], arrVal = []
// m.set(objKey, objVal).set(arrKey, arrVal)
// objKey.bar = 'bar'
// objVal.foo = 'foo'
// arrKey.push('buz')
// arrVal.push('qux')
// console.log(m.get(objKey)); // {foo:'foo'}
// console.log(m.get(arrKey)); // ['qux']


// const m = new Map()
// const a = 0 / "", b = 0 / 'a', pz = +0, nz = -0
// console.log(a === b); // flase
// console.log(pz === nz); // true
// m.set(a, 'foo').set(pz, 'bar')
// console.log(m.get(b)); // foo NaN等于NaN？ ☺
// console.log(m.get(nz)); // bar 



// const m = new Map([
// 	['key1', 'value1'],
// 	['key2', 'value2'],
// 	['key3', 'value3'],
// ])
// // 以下三者是一样的
// console.log(m.entries === m[Symbol.iterator]); // true
// for (const pair of m) {
// 	console.log(pair);
// }
// // [ 'key1', 'value1' ]
// // [ 'key2', 'value2' ]
// // [ 'key3', 'value3' ]
// for (const pair of m.entries()) {
// 	console.log(pair);
// }
// for (const pair of m[Symbol.iterator]()) {
// 	console.log(pair);
// }


// const m = new Map([
// 	['key1', 'value1'],
// 	['key2', 'value2'],
// 	['key3', 'value3'],
// ])
// m.forEach((key, value) => console.log(`${key}--> ${value}`))
// // value1--> key1
// // value2--> key2
// // value3--> key3

// for (const key of m.keys()) {
// 	console.log(key);
// }
// // key1
// // key2
// // key3
// for (const value of m.values()) {
// 	console.log(value);
// }
// // value1
// // value2
// // value3


// const m1 = new Map([
// 	['key1', 'value1']
// ])
// for (let key of m1.keys()) {
// 	key = 'newKey';
// 	console.log(key);// 'newKey'
// 	// 作为键的字符串的原始值是不能修改的
// 	console.log(m1.get('key1')) // value1
// 	console.log(m1.get(key)) //undefined
// 	console.log(m1.get('newKey')); // undefined
// }
// // 当然对象内部的属性是可以修改的
// const keyObj = { id: 1 }
// const m2 = new Map([
// 	[keyObj, 'value2']
// ])
// for (let key of m2.keys()) {
// 	key.id = 2
// 	console.log(key);
// 	console.log(m2.get(key)); // value2
// }
// console.log(m2.get(keyObj)); // value2




// WeakMap
// const wm = new WeakMap()
// // 弱映射中的键只能是Object或者继承自Object的类型,使用非对象设置键会抛出TypeError错误
// const key1 = { id: 1 }
// const key2 = { id: 2 }
// const key3 = { id: 3 }
// const wm1 = new WeakMap([
// 	[key1, 'val1'],
// 	[key2, 'val2'],
// 	[key3, 'val3']
// ])
// console.log(wm1.get(key1)); // val1
// console.log(wm1.get(key2)); // val2
// console.log(wm1.get(key3)); // val3

// const wm2 = new WeakMap([ // TypeError
// 	[key1, 'val1']
// 	['badKey', 'val2']
// ])

// const strKey = new String('key1')
// const wm3 = new WeakMap([
// 	[strKey, 'value1']
// ])
// console.log(wm3.get(strKey));


// set
// const key1 = { id: 1 }
// const key2 = { id: 2 }
// const key3 = { id: 3 }
// const wm = new WeakMap().set(key1, 'value1').set(key2, 'value2').set(key3, 'value3')
// console.log(wm.get(key1)); // value1
// console.log(wm.get(key2)); // value2
// console.log(wm.get(key3)); // value3




// 弱键
// weak表示，这些键不属于正式的引用，不会阻止垃圾回收.但若是这些键被引用，就不会被当作垃圾回收
// 初始化了一个新对象作为一个字符串的键。因为没有指向这个对象的其他引用,所以这行代码执行后，这个对象就会被当作垃圾回收。之后这个键值对就从弱映射中消失了，称为一个空映射。又因为值没有被引用，所以值本身也会称为垃圾回收的目标
// const wm = new WeakMap()
// wm.set({}, 'val')


// 这个例子中container维持着key的引用，因此对象键不会称为垃圾回收的目标。但若是调用removeReference则会摧毁键对象的最后一个引用，垃圾回收程序就会把这个键值对清理掉。
// const wm = new WeakMap()
// const container = {
// 	key: {}
// }
// wm.set(container.key, 'val')
// function removeReference() {
// 	container.key = null
// }
// // 其实若是没有引用的化，你也无法调用其内部的value，因此被回收是很正常的做法



// 私有变量
// 弱映射实现了JavaScript中实现私有变量的一种新方式。前提很明确：私有变量存储在弱映射中，以对象实例为键，以私有成员的字段为值。
// const wm = new WeakMap()
// class User {
// 	constructor(id) {
// 		this.idProperty = Symbol('id')
// 		this.setId(id)
// 	}
// 	setPrivate(property, value) {
// 		const privateMember = wm.get(this) || {}
// 		privateMember[property] = value
// 		wm.set(this, privateMember)
// 	}
// 	getPrivate(property) {
// 		return wm.get(this)[property]
// 	}
// 	setId(id) {
// 		this.setPrivate(this.idProperty, id)
// 	}
// 	getId() {
// 		return this.getPrivate(this.idProperty)
// 	}
// }
// const user = new User(123)
// console.log(user.getId());
// user.setId(456)
// console.log(user.getId());
// // 不是真正的私有，外部也能访问。
// console.log(wm.get(user[user.idProperty])); //456


// const User = (() => {
// 	const wm = new WeakMap()
// 	class User {
// 		constructor(id) {
// 			this.idProperty = Symbol('id')
// 			this.setId(id)
// 		}
// 		setPrivate(property, value) {
// 			const privateMember = wm.get(this) || {}
// 			privateMember[property] = value
// 			wm.set(this, privateMember)
// 		}
// 		getPrivate(property) {
// 			return wm.get(this)[property]
// 		}
// 		setId(id) {
// 			this.setPrivate(this.idProperty, id)
// 		}
// 		getId() {
// 			return this.getPrivate(this.idProperty)
// 		}
// 	}
// 	return User
// })()
// const user = new User(123)
// console.log(user.getId());
// user.setId(456)
// console.log(user.getId());
// console.log(wm.get(user[user.idProperty])); // ReferenceError


// DOM
// // #login按钮移除后，由于映射中保存按钮的引用，所以除非明确冲map中移除，否则不会被回收程序处理
// const m = new Map()
// const btn = document.querySelector('#login')
// m.set(btn, { disable: true })

// // 若是使用WeakMap。当节点从DOM树中移除后，若是这个btn没有被其他东西引用的话,垃圾回收程序就可以对其进行回收。
// const wm = new WeakMap()
// const loginBtn = document.querySelector('#login')
// wm.set(loginBtn,{disable:true})




// Map
// const s1 = new Set(['val1', 'val2', 'val3'])
// console.log(s1.size); // 3

// const s2 = new Set({
// 	[Symbol.iterator]: function* () {
// 		yield 'val1',
// 			yield 'val2',
// 			yield 'val3'
// 	}
// })
// console.log(s2.size); // 3


// const s = new Set()
// console.log(s.has('Matt'));
// console.log(s.size); // 0
// s.add('Matt').add('firstAdd')
// console.log(s.size); // 2
// console.log(s.has('firstAdd')); // true
// s.clear()
// console.log(s.has('Matee')); // false 
// console.log(s.has('firstAdd')); // false 
// console.log(s.size); // 0


// const s = new Set()
// const functionVal = function () { }
// const symbolVal = Symbol()
// const objectVal = new Object()
// s.add(functionVal).add(symbolVal).add(objectVal)
// console.log(s.has(functionVal)); // true
// console.log(s.has(symbolVal)); // true
// console.log(s.has(objectVal)); // true
// const anotherObj = new Object()
// console.log(s.has(anotherObj)); // false
// console.log(s.has(function () { })); // false



const s = new Set()
s.add('foo')
console.log(s.size); // 1
// delete()返回一个bool值，表示集合中是否存在要删除的值。
console.log(s.delete('bar')); // false
console.log(s.delete('foo')); // true