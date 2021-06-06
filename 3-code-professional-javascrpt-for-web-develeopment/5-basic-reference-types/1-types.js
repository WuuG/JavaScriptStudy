// let now = new Date()
// console.log(now);


// 转换为毫秒数,Date.parse,接受格式
// let date = Date.parse('5 / 23 / 2019')
// let date1 = Date.parse('May 23,2019')
// let date2 = Date.parse('Tue May 23,2019 00:00:00 GMT-0700')
// let date3 = Date.parse('2019-5-23 00:00:00')
// console.log(date, date1, date2, date3);


// new Date(),会自动调用Date.parse()
// 下面两段代码是等价的
// let date = new Date('2020-6-5 ')
// let date = new Date(Date.parse('2020-6-5'))


// Date.UTC()
// 类似parse，但是参数表示方法是不不同的
// let date = new Date(Date.UTC(2020, 6, 5, 10, 10, 30))
// console.log(date); //2020-07-05T10:10:30.000


// Date.now()
// let s = Date.now()
// for (let i = 0; i < 19; i++) {
//   console.log(i);
// }
// let e = Date.now()
// console.log(e - s); //6ms


// 继承
// let date = new Date('2019-2-1')
// console.log(date.toLocaleString()); //2019/2/1 上午12:00:00 本地环境一致的日期和时间,不带时区信息
// console.log(date.toString());//Fri Feb 01 2019 00:00:00 GMT+0800 (中国标准时间)  带时区信息
// console.log(date.valueOf()); //1548950400000 返回日期的毫秒数
// console.log(date.toDateString());
// console.log(date.toUTCString());
// ...


// 正则表达式
// let expresion = /pattern/flags


// property
// let pattern = /\[bc\]at/gi
// console.log(pattern.global);  //true 是全局模式
// console.log(pattern.ignoreCase); // true 忽略大小写匹配
// console.log(pattern.multiline); // false 不是多行模式
// console.log(pattern.lastIndex); // 0 下一次搜索的开始位置是0
// console.log(pattern.source); // \[bc\]at 正则表达式的字面量字符串
// console.log(pattern.flags); // gi 


// RegExp的实例方法
// let text = 'mon and dad and baby'
// let pattern = /mon (and dad (and baby)?)?/gi
// let matches = pattern.exec(text)
// console.log(matches.index); //0 字符串中匹配模式的起始位置
// console.log(matches.input); //'mon and dad and baby'
// console.log(matches[0]); // 'mon and dad and baby'
// console.log(matches[1]); // 'and dad and baby'
// console.log(matches[2]); // 'and baby'


// exec()
// let text = 'cat,bat,sat,fat'
// let pattern = /.at/g
// let matches = pattern.exec(text)
// console.log(matches.index); //0
// console.log(matches[0]); // cat
// matches = pattern.exec(text)
// console.log(matches.index); // 4  bat中的b的索引
// console.log(matches[0]); // bat
// matches = pattern.exec(text)
// console.log(matches.index); //8
// console.log(matches[0]); //sat
// console.log(pattern.lastIndex); // 11 最后匹配到的字符串的末尾的index


// test()
// 只测试模式是否匹配
// let text = "000-00-0000"
// let pattern = /\d{3}-\d{2}-\d{4}/
// console.log(pattern.test(text)); //true


// 继承
// let pattern = new RegExp('\\[dat\\]', 'gi')
// // 下面三者都是返回   /\[dat\]/gi
// console.log(pattern.toString()); // 返回正则字面量形式
// console.log(pattern.toLocaleString()); //字面量形式
// console.log(pattern.valueOf()); //返回正则表达式本身,和字面量形式有什么区别嘛


// RegExp构造函数属性
// let text = 'this has been a short summer'
// let pattern = /(.)een/
// if (pattern.test(text)) {
//   // 输入，左边文本，右边文本，最后匹配，最后匹配的捕获组
//   console.log(RegExp.input, RegExp['$_']); // this has been a short summer
//   console.log(RegExp.leftContext, RegExp['$`']); // this has 
//   console.log(RegExp.rightContext, RegExp["$'"]); //  a short summer
//   console.log(RegExp.lastMatch, RegExp["$&"]); // been
//   console.log(RegExp.lastParen, RegExp["$+"]); // b
// }



// 原始值包装类型
// let s1 = 'some text'
// let s2 = s1.substring(2)

// let s1 = new String('some text')
// let s2 = s1.substring(2)
// s1 = null

// s1 = 'some text'
// console.log(s1 instanceof String); // false

// 存在混淆问题
// let s1 = 'some text'
// let s2 = new String('some text')
// console.log(typeof s1); // string
// console.log(typeof s2); // object

// 与转型函数的区别
// let value = '25'
// let number = Number(value)
// console.log(typeof number); // number
// let obj = new Number(value)
// console.log(typeof obj); // object

// Object构造函数，会根据传入值的类型返回相应原始包装的实例
// let obj = new Object('29')
// console.log(obj instanceof String); // true
// console.log(obj instanceof Number); // flase


// Boolean
// let falseObj = new Boolean(false)
// let res = falseObj && true
// console.log(res); // true



// Number
// let num = 31
// console.log(num.toString()) // 31
// console.log(num.toString(2)); // 11111
// console.log(num.toString(8)); // 37
// console.log(num.toString(10)); // 31
// console.log(num.toString(16)); // 1f
// console.log(num.toString(32)); // v


// toFixed
// let num = 10
// console.log(num.toFixed(2));

// let num = 0.1 + 0.2 // 0.30000000000000004
// console.log(num.toFixed(2)); // 0.3


// toExponential(),科学计数法表示，参数为结果中的小数位数
// let num = 10
// console.log(num.toExponential(2)); //1.00e+1


// toPrecision
// let num = 99
// console.log(num.toPrecision(1)); // 1e+2
// console.log(num.toPrecision(2)); // 99
// console.log(num.toPrecision(3)); // 99.0


// isInterger() ES6新增
// console.log(Number.isInteger(1)); //true
// console.log(Number.isInteger(1.00)); //true
// console.log(Number.isInteger(1.01)); //fasle
// console.log(Number.isInteger(1.01e+2)); //fasle


// isSafeInterger()
let num = (2 ** 53)
console.log(Number.isSafeInteger(-num)); //false
console.log(Number.isSafeInteger(-num + 1)); // true
console.log(Number.isSafeInteger(num)); //fasle
console.log(Number.isSafeInteger(num - 1)); //true