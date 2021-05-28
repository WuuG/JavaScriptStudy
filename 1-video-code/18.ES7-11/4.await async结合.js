const fs = require('fs')
function read1() {
  return new Promise((resolve, reject) => {
    fs.readFile('./file/text1.md', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  });
}
function read2() {
  return new Promise((resolve, reject) => {
    fs.readFile('./file/text2.md', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  });
}
function read3() {
  return new Promise((resolve, reject) => {
    fs.readFile('./file/text3.md', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  });
}

async function main() {
  let text1 = await read1()
  let text2 = await read2()
  let text3 = await read3()
  let text = text1 + text2 + text3
  console.log(text);
}
main()