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