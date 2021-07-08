/**
 * window对象
 */
// var age = 29;
// var sayAge = () => {
//   console.log(age);
// };
// console.log(window.age); // 29
// sayAge(); // 29
// window.sayAge(); // 29


// const age = 29;
// let sayAge = () => {
//   console.log(age);
// };
// console.log(window.age); // undefined
// sayAge(); // 29
// window.sayAge(); // TypeError


// 报错，因为未声明oldValue
// var newValue_1 = oldValue // ReferrenceError
// // 不报错，因为是查询window上是否有oldValue属性
// var newValue_2 = window.oldValue; // undefined



// 窗口位置和像素比
// // 窗口移动至(0,0)
// window.moveTo(0, 0)
// // 窗口向下移动100 px
// window.moveBy(0, 100)



// const innerWidth = document.documentElement.clientWidth
// const innerHeight = document.documentElement.clientHeight


// let pageWidth = window.innerWidth
// let pageHeight = window.innerHeight
// if(typeof pageWidth != 'number') {
// 	if(document.compatMode == 'CSS1Compat') {
// 		pageWidth = document.documentElement.clientWidth
// 		pageHeight = document.documentElement.clientHeight
// 	}else {
// 		pageWidth = document.body.clientWidth
// 		pageHeight = document.body.clientHeight
// 	}
// }


// resizeBy = () => {
// 	// 缩放到100x100
// 	window.resizeTo(100, 100)
// 	// 缩放到200x150
// 	window.resizeBy(100,50)
// }



// 视口距离
// const scrollMyView = () => {
// 	// // 相对向下100px
// 	// window.scrollBy(0, 100)
// 	// // 移动到页面左上角
// 	// window.scrollTo(0, 0)

// 	// 这几个方法也几首ScrollOptions字典。出偏移值外，还可以通过behavior属性告诉浏览器是否平滑滚动。
// 	// 似乎没有right和bottom，是通过负数来实现上和左滚动的
// 	window.scrollTo({
// 		left: -100,
// 		top: -100,
// 		behavior: 'smooth'
// 	})
// }



// 导航与打开新窗口
// let topFrame = window.open('http://www.baidu.com', "topFrame", 'Menubar=no,width=400,height=400')
// topFrame.resizeTo(1000, 1000)
// topFrame.moveTo(100, 100)
// topFrame.close()
// console.log(topFrame.closed);
// console.log(topFrame.opener);


// let workWin = window.open('https://baidu.com', 'workWin', "width=400,height=400")
// if (workWin == null) {
// 	alert("the popup was blocked!")
// }


// let blocked = false
// try {
// 	let wroxWin = window.open('https://www.baidu.com', '_blank')
// 	if (wroxWin == null) {
// 		blocked = true
// 	}
// } catch (error) {
// 	blocked = true
// }
// if (blocked) {
// 	alert('the popup was blocked')
// }



// 定时器
// setTimeout(() => { console.log('hello world!'); }, 1000);


// let timeoutId = setTimeout(() => { console.log('hello world'); }, 1000);
// clearTimeout(timeoutId)


// setInterval(() => console.log('hello world'), 1000)


// 例子
// let num = 0, intervalId = null
// let max = 10;
// let incrementNumber = function () {
// 	num++
// 	console.log(num);
// 	if (num === max) {
// 		clearInterval(intervalId)
// 		console.log('done');
// 	}
// }
// intervalId = setInterval(incrementNumber, 500);


// setTimeout()的例子
// let num = 0, intervalId = null
// let max = 10;
// let incrementNumber = function () {
// 	num++
// 	console.log(num);
// 	if (num < max) {
// 		intervalId = setTimeout(incrementNumber, 300);
// 		return
// 	}
// 	console.log('done');
// }
// intervalId = setTimeout(incrementNumber, 300);



// 系统对话框
// wo = 'world'
// alert(`hello ${wo}`)


// if (confirm("Are you sure")) {
// 	alert("it's good")
// } else {
// 	alert("fine,get out")
// }


// let result = prompt('what is your name ?')
// if (result !== null) {
// 	alert(`welcom ${result}`)
// }


// // 打印的对话框。
// window.print()
// // 查找
// window.find('butt')



/**
 * location对象
*/
// location.search的处理
// let getQueryString = function () {
// 	let qs = (location.search.length > 0 ? location.search.substring(1) : ''),
// 		args = {};
// 	for (let item of qs.split("&").map(kv => kv.split("="))) {
// 		let name = decodeURIComponent(item[0]),
// 			value = decodeURIComponent(item[1]);
// 		if (name.length) {
// 			arg[name] = value
// 		}
// 	}
// 	return args
// }


// URLSearchParams
// let qs = "?q=javascript&num=10"
// let searchParams = new URLSearchParams(qs)
// console.log(searchParams.toString()); // q=javascript&num=10
// console.log(searchParams.has('num')); // true
// searchParams.set('page', '3')
// console.log(searchParams.toString()); // q=javascript&num=10&page=3
// searchParams.delete('q')
// console.log(searchParams.toString());// num=10&page=3


// URLSearchParams可迭代
// let qs = "?q=javascript&num=10"
// let searchParams = new URLSearchParams(qs)
// for (let param of searchParams) {
// 	console.log(param);
// }
// // [ 'q', 'javascript' ]
// // [ 'num', '10' ]



// 操作地址
// location.assign("http://www.baidu.com")


// href location
// window.location = 'http://www.baidu.com'
// location.href = "http://www.baidu.com"
// window.location.href = "http://www.baidu.com"


// location.hash = "#aaa"
// location.search = "?num=10"
// location.hostname = 'www.baidu.com'
// location.pathname = "mydir"
// location.port = "8000"


// setTimeout(() => {
// 	location.replace('http://www.baidu.com')
// }, 1000);


// 查找是否存在插件，模糊搜索
// let hasPlugin = function (name) {
// 	name = name.toLowerCase()
// 	for (let plugin of window.navigator.plugins) {
// 		if (plugin.name.toLowerCase().indexOf(name) > -1) {
// 			return true
// 		}
// 	}
// 	return false
// }
// console.log(hasPlugin('PDF')); // true



// 注册处理程序
navigator.registerProtocolHandler('mailto', 'https://mail.qq.com/cgi-bin/frame_html?sid=K0IPJUJ21KlPOHIS&r=d9683e3f93ebab1371d62fa7c71554cb&cmd=%s', "some Mail content")