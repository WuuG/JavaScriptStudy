// const iteratorThins = [
// 	Array.of(1, 2),
// 	typeArr = Int16Array.of(3, 4),
// 	new Map([['key1', 6], ['key2', 8]]),
// 	new Set([8, 9])
// ]
// for (const iteratorThing of iteratorThins) {
// 	for (const x of iteratorThing) {
// 		console.log(x);
// 	}
// }
// 1
// 2
// 3
// 4
// [ 'key1', 6 ]
// [ 'key2', 8 ]
// 8
// 9


// let arr1 = [1, 2, 3]
// let arr2 = [...arr1]
// console.log(arr1 === arr2); // false

// let map1 = new Map([[1, 2], [3, 4]])
// let map2 = new Map(map1)
// console.log(map1);
// console.log(map2);


// let arr1 = [{}]
// let arr2 = [...arr1]
// arr1[0].foo = 'bar'
// console.log(arr2[0]); // { foo: 'bar' }


// 不同类型之间的相互转换
let arr1 = [1, 2, 3]
let typeArr1 = Int16Array.from(arr1)
let typeArr2 = Int8Array.of(...arr1)
console.log(typeArr1); // [1,2,3]
console.log(typeArr2); // [1,2,3]

let map = new Map(arr1.map(x => [x, 'val' + x]))
console.log(map); // Map(3) { 1 => 'val1', 2 => 'val2', 3 => 'val3' }

let set = new Set(typeArr2)
console.log(set); // Set(3) { 1, 2, 3 }
let arr2 = [...set]
console.log(arr2); // [1,2,3]