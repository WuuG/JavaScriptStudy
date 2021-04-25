//引入 fs模块
const fs = require('fs')

//回调地狱写法
// fs.readFile('../笔记/ES5/1.移动端.md', (err, data) => {
//   fs.readFile('../笔记/ES5/2.本地存储.md', (err, data2) => {
//     fs.readFile('../笔记/ES6-11/2.Symbol.md', (err, data3) => {
//       let result = `${data} 

//       + ${data2}+ 

//       ${data3}`
//       console.log(result);
//     })
//   })
// })
// const p = new Promise((res) => {
//   fs.readFile('../笔记/ES5/1.移动端.md', (err, data) => {
//     res(data)
//   })
// })
// const p1 = p.then(res => {
//   return new Promise(resolve => {
//     fs.readFile('../笔记/ES5/2.本地存储.md', (err, data2) => {
//       resolve(res + data2)
//     })
//   })
// })
// p1.then(res => {
//   fs.readFile('../笔记/ES6-11/2.Symbol.md', (err, data3) => {
//     console.log(res + data3);
//   })
// })
// 老师的写法
new Promise((res) => {
  fs.readFile('../笔记/ES5/1.移动端.md', (err, data) => {
    res(data)
  })
}).then(res => {
  return new Promise(resolve => {
    fs.readFile('../笔记/ES5/2.本地存储.md', (err, data2) => {
      resolve(res + data2)
    })
  })
}).then(res => {
  return new Promise(resolve => {
    fs.readFile('../笔记/ES6-11/2.Symbol.md', (err, data3) => {
      resolve(res + data3)
    })
  })
}).then(res => {
  console.log(res);
}
)