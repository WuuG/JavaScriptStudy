- [Selector API](#selector-api)
	- [querySelector()](#queryselector)
	- [querySelectorAll()](#queryselectorall)
	- [matches()](#matches)
- [元素遍历](#元素遍历)
- [HTML5](#html5)
	- [CSS类扩展](#css类扩展)
		- [getElementByClassName()](#getelementbyclassname)
		- [classList属性](#classlist属性)
	- [焦点管理](#焦点管理)
	- [HTMLDocument扩展](#htmldocument扩展)
		- [readyState属性](#readystate属性)
		- [compatMode属性](#compatmode属性)
		- [head属性](#head属性)
	- [字符集属性](#字符集属性)
	- [自定义数据属性](#自定义数据属性)
	- [插入标记](#插入标记)
		- [innerHTML属性](#innerhtml属性)
		- [旧IE中的innerHTML](#旧ie中的innerhtml)
		- [outerHTML属性](#outerhtml属性)
		- [insertAdjacentHTML()和insertADjacentText()](#insertadjacenthtml和insertadjacenttext)
		- [内存与性能问题](#内存与性能问题)
		- [跨站脚本](#跨站脚本)
	- [scrollIntoView()](#scrollintoview)
- [专有扩展](#专有扩展)
	- [children属性](#children属性)
	- [contains()方法](#contains方法)
	- [插入标记](#插入标记-1)
		- [innerText属性](#innertext属性)
		- [outerText属性](#outertext属性)
	- [滚动](#滚动)
# Selector API
通过CSS选择符对DOM进行获取。

Selector API level 1核心方法：querySelector()和querySelectorAll()

Selector API level 2方法：matches(),find(),findAll()。不过目前没有浏览器实现或宣称实现find()和findAll()
## querySelector()
querySelector()方法接受CSS选择符参数，返回匹配该模式的第一个后代元素，如果没有匹配则返回null.
``` js
const body = document.querySelector('body')
const myDiv = document.querySelector('#myDiv')
const myClass = document.querySelector('myClass')
const img = document.querySelector('img.button')
```
在Document上使用该方法会从文档元素开始搜索；在Element上使用则会从当前元素的后代中查询。若是选择符有语法错误或遇到不支持的选择符，则querySelector()会抛出错误。
## querySelectorAll()
querySelectorAll()和querySelector()类似，只不过会其会返回所有匹配的节点，而不止一个。该方法返回的是NodeList的实例。

querySelectorAll()返回的NodeList实例属性和方法都不缺，但是它是一个**静态快照**,而非实时的查询。这样的底层实现避免了使用NodeList对象可能造成的性能问题。

返回值为NodeList，若是无匹配项则返回空的NodeList实例。

与querySelector()一样，querySelectorAll()也可在Document，DocumentFragment,和element类型上使用。
``` js
const divs = document.querySelectorAll('div')
// 获取所有是<p>子元素的<strong>元素
const strongs = document.querySelectorAll('p strong')
```
返回的NodeList对象可以通过for-of循环、item()方法，或中括号语法取得个别元素。
``` js
const lis = document.querySelectorAll('ul li')
// 以下三个循环效果相同
for (const li of lis) {
	li.className = 'important'
}
for (let i = 0; i < lis.length; i++) {
	lis.item(i).className = 'important'
}
for (let i = 0; i < lis.length; i++) {
	lis[i].className = 'important'
}
```
与querySelector()方法类似，遇到不支持的选择符，或者语法错误。会抛出错误。
## matches()
该方法接受一个CSS选择符参数，若是元素匹配该选择符则返回true，否则返回false. 使用该方法可以方便的检测某个元素会不会被querySelector()或querSelectorAll()方法返回。
``` js
console.log(document.body.matches('body')); // true
console.log(document.body.matches('ul')); // false
```
# 元素遍历
IE9之前IE不会把元素间的空格当作空白节点，而其他浏览器会。这使得childNodes和firstChild等属性的差异。因此为了弥补这个差异，又不影响DOM规范，W3C通过了新的Element Traversal规范定义一组新属性。
+ childElementCount，返回子元素数量。
+ firstElementChild，指向第一个Element类型的子元素。
+ lastElementChild，指向最后一个Element类型的子元素。
+ previousElementSibiling，指向前一个Element类型的同胞元素
+ nextElementSibilng，指向后一个Element类型的同胞元素。

过去以跨浏览器方式遍历元素的所有子元素
``` js
const parentElement = document.getElementById('parent')
const currentChildNode = parentElement.firstChild
while (currentChildNode) {
	if (currentChildNode.nodeType === 1) {
		// 对元素节点进行相应处理
	}
	if (currentChildNode === parentElement.lastChild) {
		break
	}
	currentChildNode = currentChildNode.nextSibling
}
```
使用Element Traversal属性后
``` js
const parentElement = document.getElementById('parent')
const currentChildNode = parentElement.firstElementChild
while (currentChildNode) {
	// 对元素节点进行相应处理
	if (currentChildNode === parentElement.lastElementChild) {
		break
	}
	currentChildNode = currentChildNode.nextElementSibling
}
```
IE9以上，以及所有现代浏览器都支持Element Traversal属性。
# HTML5
HTML5规范中包含了与标记相关的大量Javascript API定义。其中有的API与DOM重合，定义了浏览器应该提供的DOM扩展。
## CSS类扩展
HTML5增加了一些特性以更加方便的使用类。
### getElementByClassName()
该方法暴露在document和所有HTML元素上。接受一个参数，即包含一个或多个类名的字符串，返回类名中包含相应类的元素的NodeList。如果提供了多个类名，则顺序无关紧要。
``` js
// 获取username和current匹配的所有元素,两个类名的顺序无关紧要
const allCurrentUserNames = document.getElementsByClassName('username current')
// 获取类名为current的元素子树中所有包含username的元素
const username = document.getElementsByClassName('current').getElementsByClassName('username')
```
需要注意的是，返回的是Noldelist实例，**是实时的**，而不是快照。

IE9及以上版本，以及所有现代浏览器都支持getElementByClassName()方法
### classList属性
通过className属性可以实现类名的增删改。但className是一个字符串，所以每次操作之后都需要重新设置这个值才会生效，即使之改动了部分字符串也一样。
``` js
const div = document.querySelector('.bd')
const targetClass = 'user'
const className = div.className.split(/\s+/)
const index = className.indexOf(targetClass)
if (index !== -1) {
	className.splice(index, 1)
}
div.className = className.join(' ')
```
HTML5通过给所有元素增加classList属性为这些操作提供了更简单也更安全的实现方式。classList是一个新的集合类型DOMTokenList的实例。与其他DOM类似可以通过length,中括号，item()等。此外DOMTokenList还添加了以下方法。
+ add(value)，向类名列表添加指定的字符串值value。如果这个值已经存在，则什么都不做。
+ contains(value)，返回布尔值，表明value是否存在。
+ remove(value)，从类名列表中删除指定字符串value
+ toggle(value)，如果类名列表中已经存在指定的value，则删除；如果不存在，则添加。

因此，前文中的例子可以简化成下面的代码。
``` js
const div = document.querySelector('.bd')
div.classList.remove('user')
```
其他示例
``` js
const div = document.querySelector('.bd')
// 添加类名
div.classList.add('newClass')
// 切换类名
div.classList.toggle('user')
if (div.classList.contains('bd')) {
	console.log(1);
}
// 迭代类名
for (const className of div.classList) {
	console.log(className);
}
```
## 焦点管理
HTML5增加了辅助DOM焦点管理功能。首先是document.activeElement,始终包含当前拥有焦点的DOM元素。页面加载时，可以通过用户输入让某个元素自动获得焦点。例如
``` js
let button = document.querySelector('.myButton')
button.focus()
console.log(document.activeElement === button); // true
```
默认情况下，document.activeElement在页面刚加载完成时为body。在页面完全加载前为null

其次是document.hasFocus()方法，该方法返回布尔值，表示文档是否拥有焦点。
``` js
console.log(document.hasFocus()); // true
```
确定文档是否获得了焦点，就可以帮助确定用户是否在操作页面。

第一个方法用于查询文档，确定哪个元素拥有焦点。第二个方法可以查询文档是否获得了焦点，而这对于Web引用程序的无障碍使用是非常重要的。
## HTMLDocument扩展
HTML5扩展了HTMLDocument类型，增加了更多功能,这些变化基于事实标准。
### readyState属性
document.readyState属性有两种可能的值：
+ loading，表示文档正在加载
+ complete， 表示文档加载完成

实际开发中，最好把该属性当成一个指示器，已判断文档是否加载完毕。在这个属性广泛支持以前，通常要依赖onload事件处理程序设计一个标记,表示文档加载完了。
``` js
let count = 0
const timer = setInterval(() => {
	count++
	console.log(`loading ${count}`);
	if (document.readyState) {
		console.log('complete');
		clearInterval(timer)
	}
}, 1);
```
### compatMode属性
自从IE6提供了标准和混杂模式渲染页面,检测页面渲染模式就成为了一个必要的需求。HTML5也把compatMode属性用来指示浏览器当前处于什么渲染模式。 如下面例子所示，标准模式下值为"CSS1Compat",混杂模式下值为"BackCompat"
``` js
if (document.compatMode == 'CSS1Compat') {
	console.log('Standards mode');
} else {
	console.log('Quirks mode');
}
```
### head属性
作为对document.body的补充
``` js
const head = document.head
```
## 字符集属性
``` js
// 只读属性，无法修改。 可以修改<mata>元素来修改
console.log(document.characterSet); // UTF-8
document.charset = 'UTF-16'
console.log(document.characterSet); // UTF-8
```
## 自定义数据属性
HTML5允许给元素指定非标准的属性，但要使用前缀data-以便告诉浏览器。
``` html
<div class="bd user disabled" data-my-proto='foo'></div>
```
定义了自定义数据属性后，可以通过元素的dataset属性来访问。dataSet属性是一个DOMStringMap的实例，包含一组键值对映射。元素的米噶data-name属性都是通过data-后的字符串作为键访问的。

> data-myname,data-myName可以通过myame访问，而data-my-name，data-My-Name则需要通过myName来访问

下面是一个使用自定义数据属性的例子：
``` js
const div = document.querySelector('#myDiv')
logDataset(div.dataset) // myProto foo
div.dataset.myName = 'bar'
div.dataset.appId = '123'
console.log(div.dataset); // DOMStringMap {myProto: "foo", myName: "bar", appId: "123"}

function logDataset(dataset) {
	for (const i in dataset) {
		console.log(i, dataset[i]);
	}
}
```
自定义数据属性非常适合需要给元素添加某些数据的场景。比如连接追踪和在聚合应用程序中标识页面的不同部分。另外，单页面应用程序框架也非常多的使用了自定义数据结构。
## 插入标记
DOM虽然为操纵节点提供了很多API，但一次性注入大量HTML还是比较麻烦。HTML5将直接插入HTML字符串的能力标准化了。
### innerHTML属性
在读取innetHTMl属性时，会返回所有后代HTML字符串，包括元素、注释和文本节点。而在写入innerHTML时，则会更根据提供的字符串值以新的DOM子树替代元素中包含的所有节点。
``` js
	<div id="innetHtml">
		<ul>
			<li>1</li>
			<li>2</li>
			<li>3</li>
		</ul>
	</div>
```
对于上例的div元素而言，其innerHTML会返回以下字符串：

但是不同浏览器返回的文本内容时不相同的。
``` js
const div = document.querySelector('div#innerHTML')
console.log(div.innerHTML);
//
// 		<ul>
// 			<li>1</li>
// 			<li>2</li>
// 			<li>3</li>
// 		</ul>
// 	
```
在写入模式下，赋值给innerHTML属性的值会解析为DOM子树，并替代元素之前的所有节点。所赋的值默认为HTML，所以其中的所有标签都会以浏览器处理HTML的方式转换为元素（同样，转换结构也会因浏览器不同而不同）。如果赋不包含任何HTML标签，则直接生成一个文本节点。
``` js
const div = document.querySelector('div#innerHTML')
div.innerHTML = "Hello World!"
console.log(div.innerHTML); // Hello World!
div.innerHTML = "Hello & welcome, <b> 'render'</b>"
console.log(div.innerHTML); // Hello &amp; welcome, <b> 'render'</b>
```
> 设置innerHTML后再立刻读取，大部分时候不是相同的字符串，因为其已经经过了DOM解析
### 旧IE中的innerHTML
在所有现代浏览器中，通过innerHTML插入\<scirpt>标签是不会执行。而在IE8之前可以通过给\<scirpt>指定defer元素，且该scipt标签前是"受控元素"(scoped element),就可以执行。 非受控元素是指在页面上看不到的元素，如scirpt,style,注释。IE会把innerHTML中非受控元素开始的内容都删掉。因此在使用innerHTMl插入scirpt元素时需要在前面插入受控元素。
``` js
var div = document.getElementById('innerHTML')
div.innerHTML = "<script defer>console.log('在IE中使用scitp');</script>" // 无法打印,因为无前置受控元素
div.innerHTML = "_< defer>console.log('在IE中使用scitp');</script>" // 打印
div.innerHTML = "<div>&nbsp</div><script defer>console.log('在IE中使用scitp');</script>" // 打印
div.innerHTML = "<input type=\"hidden\"><script defer>console.log('在IE中使用scitp');</script>" // 打印
```
同样在使用innerHTML插入style时也会有类似的问题。
### outerHTML属性
读取outerHTML属性时，会调用它的元素及其所有后代元素的HTML字符串。写入时会整个代替。与innerHTML的区别就是多了一个本身元素。同样因为浏览器的不同，返回的字符串也会不同。
``` js
const div = document.querySelector('div#innerHTML')
console.log(div.outerHTML);
//<div id="innerHTML">
//		<ul>
//			<li>1</li>
//			<li>2</li>
//			<li>3</li>
//		</ul>
//	</div>
```
设置时，会将整个HTML修改掉。
``` js
div.outerHTML = '<p>改变为p标签</p>'
```
### insertAdjacentHTML()和insertADjacentText()
这两个方法最早源自IE,它们接受两个参数：要插入标记的位置和要插入的HTML或文本。第一个参数必须时下列值中的一个：
+ beforbegin，插入但钱元素的前面，作为前一个同胞节点。
+ afterbegin，插入当前元素内部，作为新的子节点或放在第一个子节点前面。
+ beforeend，插入当前元素内部，作为新的子节点或放在最后一子节点后面。
+ afterend，插入当前元素后面，作为下一个同胞节点。

这几个值不区分大小写。第二个参数会作为HTML字符串或文本解析。
``` js
const div = document.querySelector('#innerHTML')
const html = '<p>插入的p标签</p>'
// 在div前作为同胞节点插入html
div.insertAdjacentHTML('beforebegin', html)
// 在div第一个元素前插入html
div.insertAdjacentHTML('afterbegin', html)
// 在div最后一个元素后插入html文本
div.insertAdjacentText('beforeend', html)
// 在div后作为同胞节点插入html文本
div.insertAdjacentText('afterend', html)
```
### 内存与性能问题
使用本节的方法替换子节点可能会在浏览器中导致内存问题。比如被移除的子树元素中有相关联的事件处理程序或其他Javascript对象（作为元素的属性），那它们之间的绑定关系会滞留在内存中。如果替换的操作频繁发生，则页面的内存占用就会持续攀升。在使用innerHTML、outerHTML和insertAdjacentHTML()之前，最好手动删除被提花内元素上关联的事件处理程序和Javascript对象。

在插入大量插入HTML时，使用这些属性，特别是innerHTML，比使用DOM操作节点再插入来的便捷(也更快),因为HTML解析器会解析设置给innerHTML的值。而解析器在浏览器中是是底层代码(通常是C++)，比Javascript快的多. 不过，HTML解析器的构建与结构也需要代价，因此最好限制使用innerHTMl和outerHTMl的次数。如下例：
``` js
// 内存和性能问题
for (let value of values) {
	// 效率很低，不要这样做,因为每次循环还要读取innerHTML
	ul.innerHTML += `<li>${value}</li>`
}

// 这样修改后，只要对innerHTML进行一次赋值
const itemsHTML = ''
for(let value of values) {
	itemsHTML += `<li>${value}</li>`
}
ul.innerHTML = itemsHTML
```
### 跨站脚本
尽管innerHTML不会执行自己创建的\<script>标签。但仍然向而已用户暴露了很大的哦那估计面，因为通过它可以毫不费力的创建元素并执行onclick之类的属性。

如果页面中要使用用户提供的信息，则不建议使用innerHTML。与使用innerHTML获得的方便相比，阻止XSS攻击更让人头疼。此时一定要隔离要插入的数据，在插入页面前必须毫不犹豫地使用相关的库对它们进行转义。
## scrollIntoView()
DOM规范中没有涉及的一个问题是如果和滚动页面中的某个区域。为了填充这方面的缺失，不同浏览器实现了不同控制滚动方式。HTML5选择了标准化scrollIntoView()

该方法存在于所有HTML元素上，可以滚动浏览器窗口或容器元素，以便包含元素进入视口。这个方法的参数如下：
+ alignToTop是一个布尔值：
   + true:窗口滚动后元素的顶部与视口顶部对齐。
   + false：窗口滚动后元素的底部与视口底部对齐
+ scrollIntoViewOptions是一个选项对象：
   + behavior：定义过度动画，可取的值为"smooth"和"auto",默认为"auto"
	+ block：定义垂直方向的对齐,可取的值为"start","center","end","nearest",默认为"start"
	+ inline: 定义水平方向的对象，可取的值为"start","center","end","nearest",默认为"nearest"
+ 不传参数等于alignToTop为true

例子：
``` js
const div = document.querySelector('#scroll')
// 不要直接调用，因为未渲染就调用，会无效的。
setTimeout(() => {
	// 下面两者相同
	div.scrollIntoView()
	div.scrollIntoView(true)
	// 与元素底部对齐
	div.scrollIntoView(false)
	div.scrollIntoView({
		behavior: "smooth",
		block: 'end',
		inline: 'start'
	})
}, 100);
```
# 专有扩展
除了已经标准化的，各家浏览器很多未被标准化的专有拓展。它们在将来有可能会被纳入标准。
## children属性
IE9之间的版本与其他浏览器在处理空白文本的差异导致了该属性的出现。该属性是一个HTMLCollection，只包含元素的Element类型的节点。
``` js
console.log(document.body.children);// HTMLCollection(7)[]
```
## contains()方法
该方法可以用于确定一个元素是否是另一个元素的后代。
``` js
const bodyNode = document.body
const div = document.querySelector('#myDiv')
console.log(bodyNode.contains(div)); //true
console.log(div.contains(bodyNode)); //false
```
另外使用DOM Level 3的compareDocumentPosition()方法也可以确定节点间的关系。该方法会返回两个节点关系的位掩码
+ 0x1 断开 传入节点不在文档中
+ 0x2 领先 在参考节点之前
+ 0X4 随后 在参考节点之后
+ 0x8 包含 参考节点的祖先
+ 0x10 被包含 参考节点的后代
```js
const bodyNode = document.body
const div = document.querySelector('#myDiv')
const ul = document.querySelector('ul')
console.log(bodyNode.compareDocumentPosition(div)); // 20 0x10 + 0x4
console.log(div.compareDocumentPosition(bodyNode)); // 10 0x8 + 0x2
console.log(div.compareDocumentPosition(ul)); // 2 0x2
```
也可以通过按位与来判断其是否包含,这样只是进行包含判断，其他(0x1,0x2...)无法这样使用
``` js
const result = bodyNode.compareDocumentPosition(div)
console.log(!!(result & 0x10)); // true
```
> IE9及之后，以及现代所有浏览器都支持container()和compareDocumentPosition()方法
## 插入标记
### innerText属性
该属性返回对应元素包含的所有文本内容,无论在文本在子树的哪个层级。在用于读取值时，innerText会按照深度优先的顺序将子树所有文本节点的值拼接起来。在用于写入值的时候，innerText会移除元素所有后代并插入一个包含该值的文本节点。

因为不同浏览器对待空格的方式不同，因此格式化之后的字符串可能包含也可能不包含原始HTML代码中的缩进。
``` js
const ul = document.querySelector('body>ul')
console.log(ul.innerText);
// 1
// 2
// 3
```
通过innerText修改文本 <--似乎与书上结果不相同，不会对字符串中的HTML字符进行编码，而是会直接输出字符串
``` js
var div = document.querySelector('#innerHTML')
div.innerText = '<p> hello & welcome <em>world!</em></p>'
console.log(div.innerText); //<p> hello & welcome <em>world!</em></p>
```
### outerText属性
outerText与innerText雷士，只不过作用范围包含调用它的节点。在读取文本时，outerText和innerText返回相同的内容。但写入会替换整个元素。

outerText是一个非标准元素，也没有被标准化的前提，因此不推荐依赖这个属性实现重要操作。除了FireFox之外所有主流浏览器都支持outerText。
## 滚动
除之间已经标准化的scrollIntoView()外，不同浏览器中仍有其他专有方法。如scrollIntoViewIfNeeded()会在元素不可见的情况进行滚动，否则什么都不做。其接受参数alingCenter为boolean,若设置为true会尝试将其放在视口中央（垂直方向）。
``` js
const div = document.querySelector('#scroll')
setTimeout(() => {
	div.scrollIntoViewIfNeeded()
}, 100);
```
考虑到scrollIntoView()是唯一一个所有浏览器都支持的方法，所以只用它就好了