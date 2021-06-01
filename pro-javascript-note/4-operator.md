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
