// let s1 = '2'
// let s2 = 'a'
// let b = false
// let f = 1.1
// let o = {
//   valueOf() {
//     return -1
//   }
// }

// console.log(++s1); // 3
// console.log(++s2); // NaN
// console.log(++b);  // 1
// console.log(--f);  // 0.10000000000000009 浮点数不精准
// console.log(++o);  // 0  对对象使用时，回去调用valueOf()


// 一元+ 
// 对数值变量，没有任何影响
// let num = 20
// num = +num
// console.log(num); 

//应用到非数值时，会调用Number()一样的类型转换，对象会调用ValueOf()和/或toString()
// let s1 = '0'
// let s2 = '1.1'
// let s3 = 'foo'
// let f = 1.1
// let b = false
// let o = {
//   valueOf() {
//     return -1
//   }
// }

// console.log(+s1); //0
// console.log(+s2); //1.1
// console.log(+s3); //NaN
// console.log(+f); //1.1
// console.log(+b); // 0
// console.log(+o); // -1


// 一元减
// 主要用于将数值变成负值，作用与非数值时，会遵循与一元加相同的转换操作，然后再取负值



// 位操作
// let num = 18
// console.log(num.toString(2)); // 10010
// // js中的负值存储，是按照二补数的二进制编码存储的。 正数取反加一得到
// console.log(~num + 1); // -18


// 按位非
// let num = 25
// let num2 = ~num
// console.log(num2);

// let num3 = 25
// let num4 = -num3 - 1
// console.log(num4);  //二者效果相同，但位操作的速度更快


// 按位与
// let result = 25 & 3
// console.log(result); //1


// 按位异
// let res = 25 | 3
// console.log(res); //27


// 按位异或
// let res = 25 ^ 3
// console.log(res); //26


// 左移,右移
// let num = 2
// console.log(num << 5); //64
// console.log(num >> 5); //0


// 无符号右移
// 并没有无符号左移，因为和普通右移结果时一样的
// let num = 64
// console.log(num >>> 5); //无符号右移空位补0，对正数没有影响
// let num1 = -64
// console.log(num1 >>> 5); //134217726  右移后开头补0



// 布尔操作符
// 逻辑非
// console.log(! false); // true
// console.log(!'bulu'); // false
// console.log(!0); // true
// console.log(!123); // false
// console.log(!{}); //flase
// console.log(!NaN); // true
// console.log(!''); // true
// console.log(![]); // false


// 逻辑与
// 逻辑与并不一定会返回布尔值
// console.log({} && false); // false 第一个是对象，返回第二个
// console.log(true && {}); // {}  第二个是对象，第一个为true，返回第二个对象
// console.log({ pos: 1 } && { pos: 2 });// {pos:2}  两个都是对象，返回第二个
// console.log(null && other); // null
// console.log(NaN && other); // NaN
// console.log(undefined && ohter); //undefined


// 逻辑或
// let a = true || b
// console.log(a); //true 



// 乘性操作符
// 乘法操作符
// let res = Number.POSITIVE_INFINITY * 0
// console.log(res); // NaN
// res = Number.POSITIVE_INFINITY * 1
// console.log(res); // Infinity


// 除法操作符
// const infinity = Number.POSITIVE_INFINITY
// console.log(infinity / infinity); // NaN
// console.log(0 / 0); // NaN
// console.log(2 / 0); // Infinity


// 取模运算符
// console.log(26 % 5); //1
// const infinity = Number.POSITIVE_INFINITY
// console.log(infinity % 4); // NaN
// console.log(infinity % 0); // NaN
// console.log(infinity % infinity); // NaN
// console.log(0 % infinity); // 0
// console.log(4 % infinity); // 4



// 指数操作符
// console.log(Math.pow(2, 3)); // 8
// console.log(2 ** 3); // 8
// console.log(Math.pow(4, .5)); //2
// console.log(4 ** .5); //2

// let res = 2
// res **= 3
// console.log(res); // 8



// 加性操作符
// 数值
// const infinity = Number.POSITIVE_INFINITY
// console.log(infinity + -infinity); // NaN
// console.log(-0 + 0); //0
// console.log(0 + 0); //0
// console.log(-0 + -0); -0
// let randomNum = Math.random() * 1000
// console.log(NaN + randomNum); // NaN


// 字符串
// console.log(5 + '5'); //55
// const num1 = 5
// const num2 = 10
// let message = 'the sum of num1 and num2 = ' + num1 + num2
// console.log(message); //the sum of num1 and num2 = 510


// 减法操作符
// const infinity = Number.POSITIVE_INFINITY
// console.log(infinity - infinity);  //NaN
// console.log(-infinity - -infinity);  //NaN
// console.log(-infinity - infinity);  //-infinity
// console.log(0 - 0); //0
// console.log(0 + 0); //-0
// console.log(-0 - -0); //0



// 关系操作符
// let res = "Brick" < "alphabet" // true
// // 因为小写字符编码大于大写字符编码
// res = "Brick".toLowerCase() < "alphabet".toLowerCase() //false

// let res = '23' < '3' // true
// res = '23' < 3  // false

//任何NaN进行比较均返回NaN
// let res = 'a' < 3 //false
// let res1 = NaN < 3 //false



// 条件操作符
// let max = (5 > 3) ? 5 : 3 //5



// 逗号操作符
let num = 1, num2 = 2, num3 = 3
let lastNum = (5, 1, 2, 3, 1, 0)
console.log(lastNum); //0,赋值最后一个