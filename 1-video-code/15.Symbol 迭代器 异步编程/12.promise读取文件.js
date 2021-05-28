//1. 引入fs模块？
const fs = require('fs')

//2.调用方法读取文件
// fs.readFile('../笔记/ES6-11/1.ES6声明.md', (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// })

//3.使用promise封装
const p = new Promise((resolve, reject) => {
  fs.readFile('../笔记/ES6-11/3.ES6异步编程.md', (err, data) => {
    if (err) reject(err)
    resolve(data)
  })
})
p.then(function (value) {
  console.log(value.toString());
},
  function (reason) {
    console.log('读取失败');
  })