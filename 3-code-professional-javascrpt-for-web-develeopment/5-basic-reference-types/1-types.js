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
// let num = (2 ** 53)
// console.log(Number.isSafeInteger(-num)); //false
// console.log(Number.isSafeInteger(-num + 1)); // true
// console.log(Number.isSafeInteger(num)); //fasle
// console.log(Number.isSafeInteger(num - 1)); //true

// String()
// 对多数字符来说，16位表示一个码元
// let message = 'abcde'
// // 根据索引获取char
// console.log(message.charAt(2)); //c
// // 根据索引获取指定码元的字符编码
// console.log(message.charCodeAt(2)); //99
// // 根据字符编码返回字符串
// console.log(String.fromCharCode(0x61, 0x62, 0x63, 0x64, 0x65)); //abcde
// console.log(String.fromCharCode(97, 98, 99, 100, 101)); //abcde

// 32位码元的字符
// let message = 'ab😊de'
// console.log(message.charAt(1)); // b
// console.log(message.charAt(2)); // �
// console.log(message.charAt(3)); // �
// console.log(message.charCodeAt(1)); //98
// console.log(message.charCodeAt(2)); // 55357  
// console.log(message.charCodeAt(3)); // 56842
// console.log(String.fromCodePoint(0x1f60a)); // 😊
// console.log(String.fromCharCode(98, 55357, 56842)); //b😊

// codePointAt(),
// let message = 'ab😊de'
// console.log(message.codePointAt(1));
// console.log(message.codePointAt(2)); //128522  --> 0x1f60a 也就是笑脸的32位编码,说明其可以识别完整的码点
// // 虽然可以识别完整码点，当若索引不是代理对开头就会返回错误的码点
// console.log(message.codePointAt(3)); // 56842
// console.log(String.fromCharCode(28522)); //  

// // formCodePoint(),可以接受任意数量的码点，返回字符串
// console.log(String.fromCharCode(128522)); // 
// console.log(String.fromCodePoint(128522)); // 😊



// normalize()
// let a1 = String.fromCharCode(0x00c5),
//   a2 = String.fromCharCode(0x212b),
//   a3 = String.fromCharCode(0x0041, 0x030a)
// console.log(a1, a2, a3); // Å Å Å
// console.log(a1 == a2); // false
// console.log(a1 == a3); // false
// console.log(a2 == a3); // false
// // 尽管字符是一样的，但是编码不同，所以互不相等，需要进行表转化处理
// // 四种规范化形式 NFD,NFC,NFKD,NFKC
// console.log(a1 === a1.normalize('NFD')); //false
// console.log(a1 === a1.normalize('NFC')); //true
// console.log(a1 === a1.normalize('NFKD')); //true
// console.log(a1 === a1.normalize('NFKC')); //true
// // 通过同一种规范化形式，可以使比较操作符返回正确的结果
// console.log(a1.normalize("NFC") === a2.normalize('NFC')); // true
// console.log(a1.normalize("NFC") === a3.normalize('NFC')); // true
// console.log(a2.normalize("NFC") === a3.normalize('NFC')); // true



// 字符串操作方法
// concat()
// let message = 'hello'
// let result = message.concat(' ', 'world ', '!')
// console.log(result); // hello world ！


// 提取子字符串
let str = "hello world"
// console.log(str.slice(3)); // lo world
// console.log(str.substring(3));// lo world
// console.log(str.substr(3));// lo world
// console.log(str.slice(3, 7)); // lo w
// console.log(str.substring(3, 7));// lo w
// console.log(str.substr(3, 7));// lo worl 这里不同是因为，第二个参数，表示截取7个字符串

console.log(str.slice(-3)); // rld  -3 --> 8
console.log(str.substring(-3));// hello world  -3 --> 0
console.log(str.substr(-3));// rld  -3 --> 8
console.log(str.slice(3, -4)); // lo w  -4 --> 7  -4+长度=7
console.log(str.substring(3, -4));// hel -4 --> 0  (3,0) -->(0,3)
console.log(str.substr(3, -4));// '' -4 --> 0

console.log(str.slice(3, -1)); // lo worl
console.log(str.substring(3, -1));// hel
console.log(str.substr(3, -1));// ''

console.log(str.slice(-3, -1)); // rl
console.log(str.substring(-3, -1));// ''  (0,0)
console.log(str.substr(-3, -1));// ''  (0,0)
// 总结 后两个遇到负数都会转成0