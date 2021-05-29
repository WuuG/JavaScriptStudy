// let age = 30
// if (true) {
//   let age = 20
//   console.log(age);
// }


// var age = 10
// let age = 10 //syntaxError


// console.log(age);  //暂时性锁区,ReferenceError
// let age = 10

var name = 'wuug'
console.log(window.name); //wuug
let age = 10
console.log(window.age); //undefind