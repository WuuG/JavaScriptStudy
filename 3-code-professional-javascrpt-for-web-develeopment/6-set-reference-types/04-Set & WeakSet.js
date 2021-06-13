// Set
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



// const s = new Set()
// s.add('foo')
// console.log(s.size); // 1
// // delete()返回一个bool值，表示集合中是否存在要删除的值。
// console.log(s.delete('bar')); // false
// console.log(s.delete('foo')); // true



// const s = new Set(['val1', 'val2', 'val3'])
// console.log(s.values === s[Symbol.iterator]); // true
// console.log(s.keys === s[Symbol.iterator]); // true
// for (let value of s.values()) {
// 	console.log(value);
// }
// // val1
// // val2
// // val3
// for (let value of s[Symbol.iterator]()) {
// 	console.log(value);
// }
// // val1
// // val2
// // val3
// console.log([...s]); // [ 'val1', 'val2', 'val3' ]


// const s = new set(['val1', 'val2', 'val3'])
// for (let pair of s.entries()) {
// 	console.log(pair);
// }
// [ 'val1', 'val1' ]
// [ 'val2', 'val2' ]
// [ 'val3', 'val3' ]


// const s = new Set(['val1', 'val2', 'val3'])
// s.forEach((val, dupVal) => {
// 	console.log(`${val} --> ${dupVal}`);
// });
// val1 --> val1
// val2 --> val2
// val3 --> val3



// const s1 = new Set(['val1'])
// // 原始值作为值不会被修改
// for (let value of s1.values()) {
// 	value = 'newValue'
// 	console.log(value);
// 	console.log(s1.has('val1')); // true
// 	console.log(s1.has('newValue')); // false
// }

// // 修改值对象的属性，对象仍然存在于集合中
// const valObj = { id: 1 }
// const s2 = new Set([valObj])
// for (let value of s2.values()) {
// 	value.id = 'newValue'
// 	console.log(value); // {id:'newVal'}
// 	console.log(s2.has(valObj)); // true
// }



// 定义正式集合操作 
// class XSet extends Set {
// 	union(...sets) {
// 		return XSet.union(this, ...sets)
// 	}
// 	intersection(...sets) {
// 		return XSet.intersection(this, ...sets)
// 	}
// 	different(set) {
// 		return XSet.different(this, set)
// 	}
// 	symmertricDifference(set) {
// 		return XSet.symmertricDifference(this, set)
// 	}
// 	cartesianProduct(set) {
// 		return XSet.cartesianProduct(this, set)
// 	}
// 	powerSet() {
// 		return XSet.powerSet(this)
// 	}
// 	// 返回多个集合的并集
// 	static union(a, ...bSets) {
// 		const unionSet = new XSet(a)
// 		for (const b of bSets) {
// 			for (const bValue of b) {
// 				unionSet.add(bValue)
// 			}
// 		}
// 		return unionSet
// 	}
// 	// 返回两个或更多集合的交集
// 	static intersection(a, ...bSets) {
// 		const intersectionSet = new Set(a)
// 		for (const aValue of intersectionSet) {
// 			for (const b of bSets) {
// 				if (!b.has(aValue)) {
// 					intersectionSet.delete(aValue)
// 				}
// 			}
// 		}
// 		return intersectionSet
// 	}
// 	// 返回两个集合的差集
// 	static different(a, b) {
// 		const differentSet = new Set(a)
// 		for (const bValue of b) {
// 			if (a.has(bValue)) {
// 				differentSet.delete(bValue)
// 			}
// 		}
// 		return differentSet
// 	}
// 	// 返回两个集合的对称差集
// 	static symmertricDifference(a, b) {
// 		return a.union(b).different(a.intersection(b))
// 	}
// 	// 返回两个集合的笛卡尔积
// 	// 必须返回数组集合，因为笛卡尔积可能包含相同值的对。
// 	static cartesianProduct(a, b) {
// 		const cartesianProductSet = new XSet()
// 		for (const aValue of a) {
// 			for (const bValue of b) {
// 				cartesianProductSet.add([aValue, bValue])
// 			}
// 		}
// 	}
// 	// 返回一个集合的幂集 --> 一个集合的全部子集构成的集合
// 	static powerSet(a) {
// 		const powerSet = new XSet().add(new XSet()) // 这是一个空集
// 		for (const aValue of a) {
// 			for (const set of new XSet(powerSet)) { // powerSet的每一个set都进行一次添加，然后再添加到powerSet中。
// 				powerSet.add(new Set(set).add(aValue))
// 			}
// 		}
// 		return powerSet
// 	}
// }




// WeakSet
// const val1 = { id: 1 }
// const val2 = { id: 2 }
// const val3 = { id: 3 }
// const ws1 = new WeakSet([val1, val2, val3])
// // const ws2 = new WeakSet([val1, 'badValue']) // TypeError
// const str = new String('valu1')
// const ws3 = new WeakSet([str])
// console.log(ws3.has(str)); // true


// const ws = new WeakSet()
// const val1 = { id: 1 }
// const val2 = { id: 2 }
// // add操作可以连缀使用。
// ws.add(val1).add(val2)
// console.log(ws.has(val1)); // true
// console.log(ws.has(val2)); // false
// ws.delete(val1)
// console.log(ws.has(val1)); // false



// 类似WeakMap，但不存在引用时，会被垃圾回收程序回收
// const ws = new WeakSet()
// ws.add({})


// // 当存在引用时，不会称为垃圾回收程序标记。若是执行removeReference则引用消失，那么垃圾回收程序就会清理WeakSet里的值了
// const ws = new WeakSet()
// const container = {
// 	val : {}
// }
// ws.add(container.val)
// function removeReference() {
// 	container.val = null
// }



// WeakSet的作用
// DOM的处理,其实WeakMap也可以做到
// 加入Set后，通过has可以判断btn是否被禁用了,但若btn被移除，仍然保持着引用。
// const diableElement = new Set()
// const btn = document.querySelector('#btn')
// diableElement.add(btn)
// // WeakSet则可以在移除后，交给垃圾回收程序直接处理
// const disableElement = new WeakSet()
// const btn = document.querySelector('#btn')
// disableElement.add(btn)