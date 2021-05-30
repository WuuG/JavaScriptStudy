// let age = 30
// if (true) {
//   let age = 20
//   console.log(age);
// }


// var age = 10
// let age = 10 //syntaxError


// console.log(age);  //暂时性锁区,ReferenceError
// let age = 10

// var name = 'wuug'
// console.log(window.name); //wuug
// let age = 10
// console.log(window.age); //undefind


// let message
// console.log(typeof message); //undefined
// console.log(typeof age); //undefined


// console.log(typeof null); //object
// console.log(null == undefined); //true,因为undefined是由null派生而来的


// let octalNum1 = 010
// console.log(octalNum1); //8
// let octalNum2 = 08 // 视作8，因为超过了八进制的表示范围
// "user strict"
// let octalNum3 = 0o07
// console.log(octalNum3); //7

// let hexNum1 = 0xA
// console.log(hexNum1); //10


// let floatNum = 1. // 转换为整数
// let floatNum1 = 2.32e10 //科学计数法
// console.log(floatNum1); //2320000000


// console.log(Number.MIN_VALUE); //5e-324
// console.log(Number.MAX_VALUE); //1.7976931348623157e+30
// console.log(Number.POSITIVE_INFINITY); //  Infinity
// console.log(Number.NEGATIVE_INFINITY); // -Infinity


// console.log(0 / 0); //NaN
// console.log(5 / 0); //Infinity
// console.log(NaN == NaN); //false,NaN与任何值都不相等

// console.log(isNaN(NaN)); //true
// console.log(isNaN("10")); //false
// console.log(isNaN("true")); //true
// console.log(isNaN(true)); //false


// console.log(Number(null));     //0   
// console.log(Number(undefined));//NaN        
// console.log(Number(true));     //1   
// console.log(Number('true'));   //NaN     
// console.log(Number("2"));      //2
// console.log(Number("+2"));     //2    
// console.log(Number("0xf"));    //15     
// console.log(Number("011"));    //11  前面的0会省略
// console.log(Number(""));       //0  
// console.log(Number(" "));      //0   
// console.log(Number({}));       //NaN  对象好像和的valueOf()方法相关,不是这么简单的


// console.log(parseInt('123abv')); //123
// console.log(parseInt(''));     // NaN
// console.log(parseInt('0xA'));  // 10
// console.log(parseInt(0xA));    // 10
// console.log(parseInt(22.72));  // 22
// console.log(parseInt('70'));   // 70
// console.log(parseInt("011"));  // 11
// console.log(parseInt(3.123e17));  // 3312300000000000000
// console.log(parseInt(3.12e-17));  // 3

// console.log(parseInt(10, 2));     // 2  10按照二进制解析
// console.log(parseInt(10, 8));     // 8
// console.log(parseInt(10, 10));    // 10
// console.log(parseInt(10, 16));    // 16
// console.log(parseInt(10, 32));    // 32
// console.log(parseInt(10, 64));    // NaN



// console.log(parseFloat('123.23blue'));  // 123.23
// console.log(parseFloat('0xA'));         // 0 十六进制均转换为0
// console.log(parseFloat('22.6'));        // 22.6
// console.log(parseFloat('000928.29'));   // 928.29 忽略第一个数字前的0
// console.log(parseFloat('2.32e19'));     // 2.32e19
// console.log(parseFloat(''));            // NaN



// String 
// let username = 'wuug'
// //先分配一个足够容纳8字符的空间，填充上wuugjerry,然后销毁原始字符串,所以早期拼接字符串很慢，后来有针对性的解决这个问题
// username = username + 'jeey' 

// let age = 11
// let ageStr = age.toString()   // '11'
// let bool = true
// let boolStr = bool.toString() // 'true'
//数值调用toString()时可以传入参数,表示转换为对应进制的Str
// let num = 10
// console.log(num.toString(2));   // 1010
// console.log(num.toString(8));   // 12
// console.log(num.toString(10));  // 10
// console.log(num.toString(16));  // a
// console.log(num.toString(32));  // a


// let value = 10
// let value1 = true
// let value2 = null
// let value3
// console.log(String(value));   //10  
// console.log(String(value1));  //true
// console.log(String(value2));  //null
// console.log(String(value3));  //undefined


// let myTemplateStr = `fistline
//                      secondline`
// console.log(myTemplateStr.length); //40,因为21个空格都保留着
// let myTemplateStr2 = `fistline

//                      secondline`
// console.log(myTemplateStr2.length); //41,此时多了个换行符

// let a = 1, b = 2
// console.log(`${a == b}`); //false
// 转换为字符串时，会调用toString()方法
// let foo = { toString: () => 'world' }
// console.log(`hello ${foo}`);
// 调用函数和方法
// function capitaliza(word) {
//   return `${word[0].toUpperCase()}${word.slice(1)} ` //首字母大写，是我愚钝了
// }
// console.log(`${capitaliza('hello')} ${capitaliza('world')}`); //Hello World


// let a = 1
// let b = 2
// function tagFunction(strings, value1, value2, value3, value4) {
//   console.log(strings);
//   console.log(value1);
//   console.log(value2);
//   console.log(value3);
//   console.log(value4);
//   return 'tagfunciton over'
// }

// let untaggedResult = `${a} + ${b} = ${a + b}`
// let taggedResult = tagFunction`${a} + ${b} = ${a + b} a ${'heihei'}`
// // [ '', ' + ', ' = ', ' a ', '' ]
// // 1
// // 2
// // 3
// // heihei
// console.log(untaggedResult);// 1 + 2 = 3
// console.log(taggedResult); //tagfunciton over

//rest operator 剩余操作符版本
// let a = 1
// let b = 2
// function tagFunction(strings, ...values) {
//   console.log(strings);
//   for (const value of values) {
//     console.log(value);
//   }
//   return 'tagfunciton over'
// }
// let untaggedResult = `${a} + ${b} = ${a + b}`
// let taggedResult = tagFunction`${a} + ${b} = ${a + b} a ${'heihei'}`
// // [ '', ' + ', ' = ', ' a ', '' ]
// // 1
// // 2
// // 3
// // heihei
// console.log(untaggedResult);// 1 + 2 = 3
// console.log(taggedResult); //tagfunciton over

// 模板字符串的拼接
// let a = 1
// let b = 2
// function zipTag(strings, ...expressions) {
//   return strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join('')
// }
// let untaggedResult = `${a} + ${b} = ${a + b}`
// let taggedResult = zipTag`${a} + ${b} = ${a + b}`
// console.log(untaggedResult);// 1 + 2 = 3
// console.log(taggedResult);  // 1 + 2 = 3

// console.log(`\u00a9`);  // ©
// console.log(String.raw`\u00a9`); // \u00a9

// console.log(`first line\nsecond line`);
// console.log(String.raw`fist line\nsecond line`);

// console.log(`first line
// second line`);
// first line
// second line
// function printRaw(strings) {
//   console.log(`字符字面量:`);
//   for (const string of strings) {
//     console.log(string);
//   }
//   console.log(`原始值:`);
//   for (const string of strings.raw) {
//     console.log(string);
//   }
// }
// printRaw`\u009a${'ok'}\n`
// 字符字面量:
//  
// (换行符) 
// 原始值:
// \u009a 
//  \n