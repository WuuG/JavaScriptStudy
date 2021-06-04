# 语句
## 无需加以说明的语句
+ if
+ do-while,后测试循环语句
+ while 先测试循环语句
## for 先测
js中for循环时封装好的while循环
``` js
for (; ;) { // 无限循环
  console.log(1);
}

// 实际上的while循环
let i = 0
for (; i < 10;) {
  console.log(1);
  i++
}
```
## for-in
用于枚举对象中的非符号键属性
``` js
for (const propName in window) { 
  document.write(propName)
}
```
若对象是null或undefined则不执行循环体
## for-of
for-of循环按照可迭代对象的next()方法产生值的顺序迭代元素。所以对象的for-of需要自己通过[Symbol.iterator]定义
``` js
for (const el of [2, 3, 2, 3, 5]) {
  console.log(el);
}
```
> ES2018增加了for-await-of 以支持pormise
## 标签语句
给语句加标签，可与break和continue结合使用
``` js
start: for (let i = 0; i < 10; i++) {
  if (i == 5) {
    console.log(i);
    break start
  }
}
```
## break&continue
``` js
let num = 0
outFor:
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      continue outFor
    }
    num++
  }
}
console.log(num); //95
```
## with
主要针对一个对象反复操作 
``` js
obj = {
  name: 'wug',
  location: 'sss'
}
with (obj) {
  console.log(name); // wug
  console.log(location); // sss
}
```
> 如前文所提不推荐with语句，因为影响性能且难以调试
## case
switch比较条件时使用全等操作符，不会进行类型转换
``` js
const num = 25
switch (num) {
  case '25':
    console.log(`num = '25'`);
    break
  case 25:
    console.log(`num = 25`);
  /*跳过*/ //若是不在case语句后break，最好添加注释告知继续进行
  default:
    console.log(`default`);
}
// num = 25 ; default
```
> switch语句也可以在条件判断中使用表达式，也就是类似if-else的形式
# 函数
> 最佳实践是，函数要么返回值，要么不返回值。而不是在某个条件下返回值,另一个条件不返回值。
严格模式的一些限制
+ 函数名不能是eval和arguments
+ 参数名不能是eval和arguments
+ 两个命名参数不能拥有同一个名称