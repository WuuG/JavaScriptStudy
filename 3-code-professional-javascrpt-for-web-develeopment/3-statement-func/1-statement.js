// for
// for (; ;) { // 无限循环
//   console.log(1);
// }

// // 实际上的while循环
// let i = 0
// for (; i < 10;) {
//   console.log(1);
//   i++
// }



// for -in
// 用于枚举对象中的非符号键属性
// for (const propName in window) {
//   document.write(propName)
// }

// const obj = {
//   name: 'wuug',
//   location: 'singapo',
//   null: null
// }

// for (const propName in obj) {
//   console.log(propName);
// }



// for-of
// for-of循环按照可迭代对象的next()方法产生值的顺序迭代元素。所以对象的for-of需要自己通过[Symbol.iterator]定义
// for (const el of [2, 3, 2, 3, 5]) {
//   console.log(el);
// }



// label 
// start: for (let i = 0; i < 10; i++) {
//   if (i == 5) {
//     console.log(i);
//     break start
//   }
// }



// break&continue
// let num = 0
// outFor:
// for (let i = 0; i < 10; i++) {
//   for (let j = 0; j < 10; j++) {
//     if (i == 5 && j == 5) {
//       continue outFor
//     }
//     num++
//   }
// }
// console.log(num); //95



// with语句
// 主要针对一个对象反复操作 
// obj = {
//   name: 'wug',
//   location: 'sss'
// }
// with (obj) {
//   console.log(name); // wug
//   console.log(location); // sss
// }



//switch
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