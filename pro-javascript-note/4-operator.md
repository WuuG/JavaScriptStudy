# 一元操作符
## 递增/递减操作符
递增递减操作符用于非整数时
``` js
let s1 = '2'
let s2 = 'a'
let b = false
let f = 1.1
let o = {
  valueOf() {
    return -1
  }
}

console.log(++s1); // 3
console.log(++s2); // NaN
console.log(++b);  // 1
console.log(--f);  // 0.10000000000000009 浮点数不精准
console.log(++o);  // 0  对对象使用时，回去调用valueOf()
```
## 一元加和减
对数值变量，没有任何影响
``` js
let num = 20
num = +num
console.log(num); 
```
应用到非数值时，会调用Number()一样的类型转换，对象会调用ValueOf()和/或toString()
``` js
let s1 = '0'
let s2 = '1.1'
let s3 = 'foo'
let f = 1.1
let b = false
let o = {
  valueOf() {
    return -1
  }
}

console.log(+s1); //0
console.log(+s2); //1.1
console.log(+s3); //NaN
console.log(+f); //1.1
console.log(+b); // 0
console.log(+o); // -1
```
一元减主要用于将数值变成负值，作用与非数值时，会遵循与一元加相同的转换操作，然后再取负值
## 位操作符
ECMAscript,应用位操作符时，64位数值会转换位32位数值,然后执行位操作。为什么要这样处理呢？
> NaN和Infinity在位操作中会被当成0处理

负数存储
``` js
let num = 18
console.log(num.toString(2)); // 10010
// js中的负值存储，是按照二补数的二进制编码存储的。 正数取反加一得到
console.log(~num + 1); // -18
```
### 按位非
``` js
let num = 25
let num2 = ~num
console.log(num2);

let num3 = 25
let num4 = -num3 - 1
console.log(num4);  //二者效果相同，但位操作的速度更快
```
### 按位与
``` js
let result = 25 & 3
console.log(result); //1
```
### 按位异
``` js
let res = 25 | 3
console.log(res); //27
```
### 按位异或
``` js
let res = 25 ^ 3
console.log(res); //26
```
### 左移,右移
会保留符号位
``` js
let num = 2
console.log(num << 5); //64
console.log(num >> 5); //0
```
### 无符号右移
并没有无符号左移，因为和普通右移结果时一样的
``` js
let num = 64
console.log(num >>> 5); //无符号右移空位补0，对正数没有影响
let num1 = -64
console.log(num1 >>> 5); //134217726  右移后开头补0
```
# 布尔操作符
在布尔操作符中，对象是当作true的
## 逻辑非
``` js
console.log(! false); // true
console.log(!'bulu'); // false
console.log(!0); // true
console.log(!123); // false
console.log(!{}); //flase
console.log(!NaN); // true
console.log(!''); // true
console.log(![]); // false
```
两个 !! 就相当于Boolean()
## 逻辑与
逻辑与并不一定会返回布尔值,若第一个操作数决定了结果，就不会对第二个操作符求职
``` js
console.log({} && false); // false 第一个是对象，返回第二个
console.log(true && {}); // {}  第二个是对象，第一个为true，返回第二个对象
console.log({ pos: 1 } && { pos: 2 });// {pos:2}  两个都是对象，返回第二个
console.log(null && other); // null
console.log(NaN && other); // NaN
console.log(undefined && ohter); //undefined
```
## 逻辑或
短路：遇到true 就不会继续执行后面的了，与逻辑与有一定的相似性
``` js
let a = true || b
console.log(a); //true 
```
# 乘性操作符
乘法，除法，取模。 在进行运算时，在后台使用Number()转换函数进行转换。
## 乘法操作符
``` js
let res = Number.POSITIVE_INFINITY * 0
console.log(res); // NaN
res = Number.POSITIVE_INFINITY * 1
console.log(res); // Infinity
console.log(infinity * infinity); // Infinity
```
## 除法操作符
``` js
const infinity = Number.POSITIVE_INFINITY
console.log(infinity / infinity); // NaN
console.log(0 / 0); // NaN
console.log(2 / 0); // Infinity
```
## 取模运算符
``` js
console.log(26 % 5); //1
const infinity = Number.POSITIVE_INFINITY
console.log(infinity % 4); // NaN
console.log(infinity % 0); // NaN
console.log(infinity % infinity); // NaN
console.log(0 % infinity); // 0
console.log(4 % infinity); // 4
```
# 指数操作符
``` js
console.log(Math.pow(2, 3)); // 8
console.log(2 ** 3); // 8
console.log(Math.pow(4, .5)); //2
console.log(4 ** .5); //2

let res = 2
res **= 3
console.log(res); // 8
```
# 加性操作符
## 加法操作符
两个操作数都是数值时
``` js
const infinity = Number.POSITIVE_INFINITY
console.log(infinity + -infinity); // NaN
console.log(-0 + 0); //0
console.log(0 + 0); //0
console.log(-0 + -0); -0
let randomNum = Math.random() * 1000
console.log(NaN + randomNum); // NaN
```
若是一个操作符是字符串
``` js
console.log(5 + '5'); //55
const num1 = 5
const num2 = 10
let message = 'the sum of num1 and num2 = ' + num1 + num2
console.log(message); //the sum of num1 and num2 = 510
```
如果任意操作数是对象，数值或者布尔值，则调用toString()后进行操作
## 减法操作符
``` js
const infinity = Number.POSITIVE_INFINITY
console.log(infinity - infinity);  //NaN
console.log(-infinity - -infinity);  //NaN
console.log(-infinity - infinity);  //-infinity
console.log(0 - 0); //0
console.log(0 + 0); //-0
console.log(-0 - -0); //0
```
其他数据类型（除对象外）,调用Numbe().对象优先调用ValueOf(),若无ValueOf(),则调用toString()
# 关系操作符
``` js
let res = "Brick" < "alphabet" // true
// 因为小写字符编码大于大写字符编码
res = "Brick".toLowerCase() < "alphabet".toLowerCase() //false

let res = '23' < '3' // true
res = '23' < 3  // false

//任何NaN进行比较均返回NaN
let res = 'a' < 3 //false
let res1 = NaN < 3 //false
```
若是对象优先调用valueOf()进行比较，然后调用toString()
# 相等操作符
## 等于不等于
== !=,类型转换时遵循:
1. 布尔值，转换为数值再比较
2. 字符串，数值。字符串转换为数值再比较
3. 对象，另一个不是对象。调用ValueOf()进行比较

遵循以下规则：
1. null与undefined相等
2. null和undefined比较时，不进行转换
3. NaN不与任何东西相等，包括NaN本身
4. 都是对象，则比较是不是同一个对象。
## 全等和不全等
不转换的前提下相等才返回true,推荐使用全等
``` js
null === undefined // false,数据类型不同
```
# 条件操作符
``` js
let max = (5 > 3) ? 5 : 3 //5
```
# 赋值操作符
+ *=
+ /=
+ %=
+ +=
+ -=
+ <<=
+ >>=
+ >>>=
# 逗号操作符
``` js
let num = 1, num2 = 2, num3 = 3
let lastNum = (5, 1, 2, 3, 1, 0)
console.log(lastNum); //0,赋值最后一个
```