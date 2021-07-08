- [window对象](#window对象)
	- [Global作用域](#global作用域)
	- [窗口关系](#窗口关系)
	- [窗口位置和像素比 moveTo() moveBy()](#窗口位置和像素比-moveto-moveby)
		- [像素比](#像素比)
	- [窗口大小 resizeTo() resizeBy()](#窗口大小-resizeto-resizeby)
	- [视口位置 scroll() scrollTo() scrollBy()](#视口位置-scroll-scrollto-scrollby)
	- [导航与打开新窗口](#导航与打开新窗口)
		- [弹出窗口](#弹出窗口)
		- [安全限制](#安全限制)
		- [弹窗屏蔽程序](#弹窗屏蔽程序)
		- [定时器 setTimeout() setInterval()](#定时器-settimeout-setinterval)
		- [系统对话框](#系统对话框)
- [location对象](#location对象)
	- [查询字符串](#查询字符串)
	- [操作地址](#操作地址)
- [navigator对象](#navigator对象)
	- [检测插件](#检测插件)
	- [注册处理程序](#注册处理程序)
# window对象
window对象，表示浏览器实例。其有两重身份一个为ES中的Global对象，另一个就是浏览器窗口的Javascript接口。
## Global作用域
如前言，window作为Global对象，通过var声明的所有全局变量和函数都会变成window对象的属性和方法。
``` js
var age = 29;
var sayAge = () => {
  console.log(age);
};
console.log(window.age); // 29
sayAge(); // 29
window.sayAge(); // 29
```
若是let或const替代var，则不会变量添加全局对象,这里有意思的是，在最外层声明，并不是添加至全局作用域。
``` js
const age = 29;
let sayAge = () => {
  console.log(age);
};
console.log(window.age); // undefined
sayAge(); // 29
window.sayAge(); // TypeError
```
访问未声明变量会抛出错误，但是可以在window对象上查询是否存在可能未声明的变量。
``` js
// 报错，因为未声明oldValue
var newValue_1 = oldValue // ReferrenceError
// 不报错，因为是查询window上是否有oldValue属性
var newValue_2 = window.oldValue; // undefined
```
## 窗口关系
+ top对象始终指向最上层窗口，即浏览器窗口本身。 parent对象则始终指向当前窗口的父窗口。若当前窗口是最上层窗口，则parent等于top(均为window).
+ self对象，它是终极window属性(?),始终指向window。
## 窗口位置和像素比 moveTo() moveBy()
moveTo() moveBy()两个方法移动窗口。两个方法接受x,y. To绝对坐标。By相对坐标。
> 这个方法在许多浏览器中都是被禁用的。
``` js
	// 窗口移动至(0,0)
	window.moveTo(0, 0)
	// 窗口向下移动100 px
	window.moveBy(0,100)
```
### 像素比
物理像素与逻辑像素的不同。 
## 窗口大小 resizeTo() resizeBy()
四个属性：innerWidth,innerHeight,outerWidth,outerHeight. outer返回浏览器窗口自身的大小。inner则返回浏览器窗口中页面视口的大小。

获取视口宽度和高度
``` js
const innerWidth = document.documentElement.clientWidth
const innerHeight = document.documentElement.clientHeight
```
获取视口宽度和高度  <--兼容性做法？,因为卓面浏览器的差异，布局视口存储时不太相同的
``` js
let pageWidth = window.innerWidth
let pageHeight = window.innerHeight
if(typeof pageWidth != 'number') {
	if(document.compatMode == 'CSS1Compat') {
		pageWidth = document.documentElement.clientWidth
		pageHeight = document.documentElement.clientHeight
	}else {
		pageWidth = document.body.clientWidth
		pageHeight = document.body.clientHeight
	}
}
```
通过resizeTo()和resizeBy()方法调整窗口大小。resizeTo参数为x,y. resizeBy()接受宽度和高度各要缩放多少,也是x,y
``` js
	// 缩放到100x100
	window.resizeTo(100, 100)
	// 缩放到200x150
	window.resizeBy(100,50)
```
## 视口位置 scroll() scrollTo() scrollBy()
浏览器窗口通常无法完全显示整个页面，因为此用户可在有限的视口中查看文档。因此存在两队相对于视口滚动距离的属性。

window.pageXoffset/window.scrollX 和window.pageYoffset/window.scrollY

scroll() scrollTo() scrollBy()方法可以滚动页面。三个方法均接受表示相对视口距离的x和y坐标
``` js
	// 相对向下100px
	window.scrollBy(0, 100)
	// 移动到页面左上角
	window.scrollTo(0, 0)
```
这几个方法也几首ScrollOptions字典。出偏移值外，还可以通过behavior属性告诉浏览器是否平滑滚动。
``` js
	// 似乎没有right和bottom，是通过负数来实现上和左滚动的
	window.scrollTo({
		left: -100,
		top: -100,
		behavior: 'smooth'
	})
```
## 导航与打开新窗口
window.open()方法可以用于导航到指定URL，也可以用于打开新浏览器窗口。这个方法接受四个参数
+ URL
+ 目标窗口
+ 特性字符串
+ 表示新窗口在流浪器历史记录中是否替代当前加载页面的布尔值

通常调用这个方法只传前3个参数，最后一个参数只有在不打开新窗口时才会使用。

如果window.open()的第二个参数是一个已经存在的窗口或者窗格(frame)的名字，则会对应的窗口或frame中打开URL.如下例，若是存在一个窗口名为"topFrame"，则会在这个窗口中打开此url；否则就会打开新窗口并将其命名为"topFrame". 第二个参数，也可以是一个特殊的窗口名，比如_self,_parent,_top,_blank.
``` js
window.open('http://www.baidu.com', "topFrame")
```
### 弹出窗口
若是第二个参数不是已有窗口，则会打开一个新窗口或标签页。第三个参数，特性字符串，用于指定新窗口的配置。如果没有传第三个参数，则新窗口(或标签页)会带有默认浏览器特性。如果打开的不是新窗口，则忽略第三个参数。

特性字符串是一个逗号分割的设置字符串，用于指定新窗口包含的特性。下表列出了一些选项。

![](index_files/15-1.png)

浏览器不允许缩放和移动主窗口，但可能允许缩放或移动window.open()创建的窗口。跟使用任何window对象一样，可以使用这个对象操纵新打开的窗口
``` js
let topFrame = window.open('http://www.baidu.com', "topFrame", 'Menubar=no,width=400,height=400')
topFrame.resizeTo(1000, 1000)
topFrame.moveTo(100, 100)
```
还可以使用close()方法 关闭新打开的窗口
``` js
topFrame.close()
```
这个方法只能用于window.open()创建的弹出窗口。虽然不可能不经过用户确认就关闭窗口，但弹出窗口可以用top.close()来关闭自己。 关闭后窗口的引用还在，但只能用于检查closed属性
``` js
alert(topFrame.closed)
```
新创建的窗口的window对象有一个属性opener,指向打开它的窗口。这个属性只在弹出窗口的最上层window对象(top)有定义，是指向调用window.open()打开它的窗口或窗格的指针。
``` js
console.log(topFrame.opener);
```
新建的窗口会有指向打开它的窗口的指针，窗口不会追踪自己打开的窗口。如果一个标签打开另一个，而window对象需要跟另一个标签页通信，那么标签便不能运行在独立的进程中。 可以将新打开的标签页的opener属性指向null，就表示新打开的标签页可以运行在独立进程中。
> 将opener设置为null后，便切断了与打开的标签页的联系(也因此可以在独立的进程中运行)，联系一旦切断就无法恢复了。 
### 安全限制
因为弹出窗口的滥用。 浏览器对弹出窗口进行了限制。比如在网页加载中调用window.open()没有效果，可能导致错误。弹窗通常需要用户点击或按下键盘中的某个键才能打开。 或者地址栏状态栏之类的无法关闭等。
### 弹窗屏蔽程序
现代浏览器都内置了屏蔽弹窗的程序,因此大多数意料之外的弹窗都会被屏蔽。如果内置浏览器内置的弹窗屏蔽程序阻止了弹窗，那么window.open()很可能会返回null.通过查返回值可以知道弹窗是否被屏蔽了。
``` js
let workWin = window.open('https://baidu.com', 'workWin', "width=400,height=400")
if (workWin == null) {
	alert("the popup was blocked!")
}
```
在浏览器扩展或其他程序屏蔽弹窗的程序，window.open()通常会抛出错误。因此要准确检测弹窗是否被频闭，除了检测window.open()的返回值，还要将它用try/catch包装起来。
``` js
let blocked = false
try {
	let wroxWin = window.open('https://www.baidu.com', '_blank')
	if (wroxWin == null) {
		blocked = true
	}
} catch (error) {
	blocked = true
}
if (blocked) {
	alert('the popup was blocked')
}
```
### 定时器 setTimeout() setInterval()
Javascript在浏览器中是单线程执行的。但允许使用定时器指定在某个时刻之后或每个一段时间就执行相应的代码。

setTimeout()方法接受两个参数：一个回调函数和执行回调函数前等待的时间(ms)。
``` js
setTimeout(() => { console.log('hello world!'); }, 1000);
```
调用setTimeout()，会返回一个表示改超时排期的数值ID。这个超时ID是被排期执行代码的唯一标识符，可用于取消该任务。 通过调用clearTimeout()方法传入超时ID
``` js
let timeoutId = setTimeout(() => { console.log('hello world'); }, 1000);
clearTimeout(timeoutId)
```
只要在指定时间之前调用clearTimeout()才有效果。在任务执行后再调用clearTimeout()没有效果。
> 所有超时执行的代码都会在全局作用域中的一个匿名函数中进行，因此函数中的this再非严格模式下始终指向window,而在严格模式下是undefined.如果给setTimeOut()提供一个箭头函数，那么this会保留未定义它时所在的词汇作用域。

setInterval()与setTimeout()使用方法类似。只是每隔一段时间执行一次,直到取消循环定时或页面卸载。setInterval()同样可以接受两个参数。
``` js
setInterval(() => console.log('hello world'), 1000)
```
> 这里需要注意的是，间隔时间值得是向队列添加新任务之前的等待时间。浏览器并不关心这个任务什么时候执行或者执行要花多长时间。因此执行时间端，非阻塞的回调函数较为适合setInterval()

setInterval()方法也会传入一个循环定时ID，用于取消循环。取消循环对于setInterval()来说更加重要。因为若未取消，其会一直执行至页面卸载。
``` js
let num = 0, intervalId = null
let max = 10;
let incrementNumber = function () {
	num++
	console.log(num);
	if (num === max) {
		clearInterval(intervalId)
		console.log('done');
	}
}
intervalId = setInterval(incrementNumber, 500);
```
上面的例子也可以用setTimeout()实现,但在使用setTimeout()的时候不一定要记录超时ID，因为其会自动停止。使用setTimeout()实现循环任务，是推荐做法。而setInterval()在实践中很少会在生成环境下使用，因为一个任务结束和下一个任务开始之间的时间间隔是无法保证的(若定时器的回调函数很花时间,可能会连续执行,因为前一个执行中，就插入队列，等到前一个执行结束后，直接就执行第二个代码了)，有些循环定时任务可能因此被跳过(因为只会保存一个setInterval的实例)。而setTimeout()能保证在前一个任务结束后再执行后一个任务。
``` js
let num = 0, intervalId = null
let max = 10;
let incrementNumber = function () {
	num++
	console.log(num);
	if (num < max) {
		intervalId = setTimeout(incrementNumber, 300);
		return
	}
	console.log('done');
}
intervalId = setTimeout(incrementNumber, 300);
```
### 系统对话框
使用alert(),comfirm(),和prompt()方法，可以让浏览器调用系统对话框向用户显示消息。这些对话框与网页和HTML无关。其外观由操作系统或者浏览器决定，无法使用CSS设置。此外这些对话框都是同步的模态对话框，他们显示时候代码会停止执行，消失后代码才会恢复执行。
alert()，接受字符串。 若不是原始字符串，会调用这个值的toString方法
``` js
wo = 'world'
alert(`hello ${wo}`) // hello world
```
确认框，同上类似，只不过多了个取消按钮,通过返回值(boolean)来确定其点击的按钮
``` js
if (confirm("Are you sure")) {
	alert("it's good")
} else {
	alert("fine,get out")
}
```
提示框
``` js
let result = prompt('what is your name ?')
if (result !== null) {
	alert(`welcom ${result}`)
}
```
很多浏览器针对系统对话框添加了特殊功能--复选框。若用户选中则会禁用后续的弹框。

JavaScript还可以显示另外两种对话框：find()和print().这两种对话是异步显示的，即控制权会立即返回给脚本。
``` js
// 打印的对话框。
window.print()
// 查找
window.find('butt')
```
这两个方法不会返回任何有关用户在对话框中执行了什么操作的信息，因此很难加以利用。且二者异步，所以浏览器对话框计数器不会涉及他们，且用户选择禁用对话框对这二者也没有影响。
# location对象
location提供了当前窗口中加载文档的信息，以及通常的导航功能。这个对象独特地方在于，其既是window的属性，也是document的属性。location不仅保存着当前加载文档的信息，也保存着把URL解析为离散片段后通过属性访问的信息。

以下是URL：http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents
![](index_files/15-2.png)
## 查询字符串
location的多数信息都很容易获取，但是search的查询字符串，需要进行处理才可以逐个访问查询参数。
``` js
let getQueryString = function () {
	let qs = (location.search.length > 0 ? location.search.substring(1) : ''),
		args = {};
	for (let item of qs.split("&").map(kv => kv.split("="))) {
		let name = decodeURIComponent(item[0]),
			value = decodeURIComponent(item[1]);
		if (name.length) {
			arg[name] = value
		}
	}
	return args
}
```
URLSearchParams提供了一组标准API方法，通过他们可以检查和修改查询字符串。给URLSearchParams构造函数传入一个查询字符串，就可以创建一个实例。在这个实例上暴露了get(),set()和delete等方法，可以对查询字符串执行相应操作。
``` js
let qs = "?q=javascript&num=10"
let searchParams = new URLSearchParams(qs)
console.log(searchParams.toString()); // q=javascript&num=10
console.log(searchParams.has('num')); // true
searchParams.set('page', '3')
console.log(searchParams.toString()); // q=javascript&num=10&page=3
searchParams.delete('q')
console.log(searchParams.toString());// num=10&page=3
```
大多数支持URLSearchParams的浏览器也支持将其实例作为可迭代对象
``` js
let qs = "?q=javascript&num=10"
let searchParams = new URLSearchParams(qs)
for (let param of searchParams) {
	console.log(param);
}
// [ 'q', 'javascript' ]
// [ 'num', '10' ]
```
## 操作地址
可以通过修改location对象，修改浏览器的地址(会进行跳转)。 跳转至新URL的同时，会在浏览器历史记录中增加一条记录。
``` js
location.assign("http://www.baidu.com")
```
如果给location.herf或window.location设置一个URL，也会以同一个URL值调用assign()方法。
``` js
window.location = 'http://www.baidu.com'
location.href = "http://www.baidu.com"
window.location.href = "http://www.baidu.com"
```
修改location对象的属性也会修改当前加载的页面。其中,hash,search,hostname,pathname,和port属性被设为新值后都会修改当前URL
``` js
location.hash = "#aaa"
location.search = "?num=10"
location.hostname = 'www.baidu.com'
location.pathname = "mydir"
location.port = "8000"
```
除了hash外，只要修改location的一个属性，就会导致页面重新加载新URL

> 修改hash的值会在浏览器历史中增加一个新纪录。老IE中hash属性在"前进","后退"时不会更新hash属性。

前面的方法，修改URL之后浏览器记录中会增加相应记录。当用户点击"后退"时，就可以导航至前一个页面。若是不希望增加历史记录，可以使用replace()方法。
``` js
location.replace('http://www.baidu.com')
```
最后一个修改地址的方法是reload()
``` js
location.reload() // 重新加载，可能从缓存加载
location.reload(true) // 重新加载，从服务器加载
```
脚本中位于reload()调用之后的代码可能执行也可能不执行。因此最好将作为最后一行代码。
# navigator对象
下面列出了navigator的这些接口定义的属性和方法,navigator对象的属性通常用于确定浏览器的类型
![](index_files/15-3.png)
![](index_files/15-4.png)
## 检测插件
通过plugins数组来确定浏览器是否安装了某个插件。
+ name:插件名称
+ description:插件介绍
+ filename:插件的文件名
+ length:由但钱插件处理的MIME类型数量。
``` js
// 查找是否存在插件，模糊搜索
let hasPlugin = function (name) {
	name = name.toLowerCase()
	for (let plugin of window.navigator.plugins) {
		if (plugin.name.toLowerCase().indexOf(name) > -1) {
			return true
		}
	}
	return false
}
console.log(hasPlugin('PDF')); // true
```
> plugins数组中的每个插件还有个MimeType对象，可通过中括号访问。每个Mime对象有4个属性：description,enablePlugin(指向插件对象指针),suffixes是该MIME类型对应扩展名的逗号分割的字符，type是完整的MIME类型字符串。

旧版本IE可以通过ActiveXObject构造函数实例化特定插件来判断。

因为涉及两种方式，所以一般要针对特定插件写一个函数。 先调用非IE检测方法，然后在调用IE检测方法。
## 注册处理程序
现代浏览器支持navigator上的registerProtocalHandler()方法。这个方法可以将网站注册为处理某种特定类型信息应用程序。

要使用registerProtocalHandler()方法，必须传入3个参数：要处理的协议、处理该协议的URL、以及应用名称。
``` js
navigator.registerProtocolHandler('mailto', 'https://mail.qq.com?cmd=%s', "some Mail content")
```
