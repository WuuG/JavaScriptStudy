# 交互
+ alert
+ prompt
  >需要注意的是如果用户取消输入，会返回null
+ confirm
# 类型转换
+ to String
``` js
console.log(String(null)); //null
```
+ to Number
``` js
console.log(Number(null)); //0
console.log(Number(undefined)); //NaN
console.log(Number('')); //0
```
+ to Boolean
> null,undefined,0,'',NaN --> false 其他都是转换为true
``` js
console.log(Boolean(' '))// whiteSpace --> true 
```
# 基础操作符
## type
+ unary 一元运算符
+ binary 二元运算符
+ operand 运算元
## Maths
+ 加法 +,
+ 减法 -,
+ 乘法 *,
+ 除法 /,
+ 取余 %,
+ 求幂 **.
## 字符串与+
``` js
console.log(2 + '1'); //21
console.log(2 + 2 + '1'); //41
console.log('1' + 2 + 2); //122
```
> 只有+对字符串有连接的操作，其他运算符是隐式转换为数字再运算的。
## +
一元运算符+，与Number()是相同的，相当于语法糖
``` js
console.log('2' + '3'); //23
console.log(+'2' + +'3'); //5
```