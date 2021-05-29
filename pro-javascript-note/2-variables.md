全局变量：没有关键字，视作全局变量.严格模式下报错
# var关键字
+ var定义的变量会称为包含它的函数的局部变量
+ 变量提升：定义时提升到函数作用域的顶部
+ 可反复声明
# Let声明
+ 块作用域
+ 冗余声明报错,混用let和var也是会报错的
  ``` js
  var age = 10
  let age = 10 //syntaxError
  ```
+ 允许嵌套声明
+ 不会在作用域内提升，造成暂时性死区 
  ``` js
  console.log(age);  //暂时性锁区,ReferenceError
  let age = 10
  ```
+ 全局声明问题：let在全局作用域中的声明变量不会称为window对象的属性，var是会的
  ``` js
  var name = 'wuug'
  console.log(window.name); //wuug
  let age = 10
  console.log(window.age); //undefind
  ```
+ 条件声明：let作用域是块，所以无法判断前面是否申明过变量,所以重复声明需要报错。否则浏览器无法处理。有条件的声明？
# const 声明
+ 必须初始化
+ 无法修改const变量,修改对象内部属性值没影响。
+ 适合v of 和 v in,二者每次迭代都是创建一个新变量，所以可以用。
# 声明风格和最佳实践
+ 不适用var
+ const优先，let次之
# 数据类型
+ 六种简单数据类型，一种Object
+ typeof null --> object
## Undefind
表示