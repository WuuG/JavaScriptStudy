// let obj = new Object()
// obj.name = 'wuug'
// console.log(obj); // {name:'wuug'}

// let userName = "Nico"
// userName.name = "steve" //不能添加，为什么不报错呢？
// console.log(userName.name); //undefined

// 原始类型可以使用字面量形式初始化，也可以使用new进行初始化。但是new初始化会创建一个object类型的实例
// let name1 = 'Nico'
// let name2 = new String('Steve')
// name1.age = 15
// name2.age = 18
// console.log(name1); // Nico
// console.log(name2); // [String: 'Steve']{ age: 18 }
// name2 = name2 + 'blues'
// console.log(typeof name1); //string
// console.log(typeof name2); // object


// 复制值
// 原始值，进行赋值时，原始值会赋值到新变量的位置。 因此两个变量是独立的
// let num1 = 5
// let num2 = num1
// num1 = 10
// console.log(num1, num2); // 10 5

// 引用值，进行赋值时，实际上复制的是指针，指向堆内存的对象，因此二者是同一个变量
// const obj1 = {
//   name: 'wuug'
// }
// let obj2 = obj1
// obj1.name = 'steve'
// console.log(obj1, obj2); // { name: 'steve' } { name: 'steve' }
// obj2 = {
//   name: "Nico"
// }
// console.log(obj1, obj2); // { name: 'steve' } { name: 'Nico' }


// 传递参数
// 函数的参数都是按值传递的。 引用值变量也是按值传递的(传递的是指针)
// 原始值
// function add(num) {
//   return num += 10
// }
// let num = 10
// let result = add(num)
// console.log(num); //10
// console.log(result); // 20

// 引用值
// 直接修改变量，引用值发生改变
// function changeName(obj) {
//   obj.name = 'steve'
// }
// const obj = {
//   name: 'Nico'
// }
// changeName(obj)
// console.log(obj.name);  //steve
// 但这个obj仍是按值传参的
// function changeObj(obj) {
//   obj.name = 'Nico'
//   obj = new Object()
//   obj.name = "Steve"
//   return obj
// }
// const obj = {}
// const result = changeObj(obj)
// console.log(obj); // {name:'Nico'}
// console.log(result);// {name:'Steve}


// 确定类型
// const array = [2, 2, 2, 2, 1]
// console.log(typeof array); // object，是对象，但无法确定是什么对象
// console.log(array instanceof Array); //true, 判断其是不是Array对象
// const pattern = /ks/
// console.log(typeof pattern); // object
// console.log(pattern instanceof RegExp); //true



// 上下文 作用域
(function buildUrl() {
  let qs = 'url='
  //with在作用域前端临时添加了一个上下文，所以外部是无法访问其内部设置的变量的。可是if也是这样啊，为什么if不算在上面的语句当中呢？
  with (location) {
    let url = qs + href
  }
  return url  //ReferenceError: url is not defind
})()