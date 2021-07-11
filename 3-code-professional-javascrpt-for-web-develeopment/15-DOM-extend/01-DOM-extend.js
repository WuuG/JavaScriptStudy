/**
 * Selector API
*/
// querySelector
// const body = document.querySelector('body')
// const myDiv = document.querySelector('#myDiv')
// const myClass = document.querySelector('myClass')
// const img = document.querySelector('img.button')



// // querySelectorAll()
// const divs = document.querySelectorAll('div')
// // 获取所有是<p>子元素的<strong>元素
// const strongs = document.querySelectorAll('p strong')


// 获取个别元素
// const lis = document.querySelectorAll('ul li')
// // 以下三个循环效果相同
// for (const li of lis) {
// 	li.className = 'important'
// }
// for (let i = 0; i < lis.length; i++) {
// 	lis.item(i).className = 'important'
// }
// for (let i = 0; i < lis.length; i++) {
// 	lis[i].className = 'important'
// }



// matches
// console.log(document.body.matches('body')); // true
// console.log(document.body.matches('ul')); // false



/**
 * 元素遍历
*/
// 过去以跨浏览器方式遍历元素的所有子元素
// const parentElement = document.getElementById('parent')
// const currentChildNode = parentElement.firstChild
// while (currentChildNode) {
// 	if (currentChildNode.nodeType === 1) {
// 		// 对元素节点进行相应处理
// 	}
// 	if (currentChildNode === parentElement.lastChild) {
// 		break
// 	}
// 	currentChildNode = currentChildNode.nextSibling
// }


// 使用Element Traversal属性后
// const parentElement = document.getElementById('parent')
// const currentChildNode = parentElement.firstElementChild
// while (currentChildNode) {
// 	// 对元素节点进行相应处理
// 	if (currentChildNode === parentElement.lastElementChild) {
// 		break
// 	}
// 	currentChildNode = currentChildNode.nextElementSibling
// }



/**
 * HTML5
*/
// getElementsByClassName()
// // 获取username和current匹配的所有元素,两个类名的顺序无关紧要
// const allCurrentUserNames = document.getElementsByClassName('username current')
// // 获取类名为current的元素子树中所有包含username的元素
// const username = document.getElementsByClassName('current').getElementsByClassName('username')


// classList
// 未使用classList时
// const div = document.querySelector('.bd')
// const targetClass = 'user'
// const className = div.className.split(/\s+/)
// const index = className.indexOf(targetClass)
// if (index !== -1) {
// 	className.splice(index, 1)
// }
// div.className = className.join(' ')


// 使用classList后
// const div = document.querySelector('.bd')
// div.classList.remove('user')



// 其他classList示例
// const div = document.querySelector('.bd')
// // 添加类名
// div.classList.add('newClass')
// // 切换类名
// div.classList.toggle('user')
// if (div.classList.contains('bd')) {
// 	console.log(1);
// }
// // 迭代类名
// for (const className of div.classList) {
// 	console.log(className);
// }



// 获得焦点
// let button = document.querySelector('.myButton')
// button.focus()
// console.log(document.activeElement === button); // true


// console.log(document.hasFocus()); // true



// HTMLDocument扩展
// readyState属性
// let count = 0
// const timer = setInterval(() => {
// 	count++
// 	console.log(`loading ${count}`);
// 	if (document.readyState) {
// 		console.log('complete');
// 		clearInterval(timer)
// 	}
// }, 1);


// compatMode
// if (document.compatMode == 'CSS1Compat') {
// 	console.log('Standards mode');
// } else {
// 	console.log('Quirks mode');
// }


// head
// const head = document.head
// console.log(head);



// 字符集属性,只读属性，无法修改。 可以修改<mata>元素来修改
// console.log(document.characterSet); // UTF-8
// document.charset = 'UTF-16'
// console.log(document.characterSet); // UTF-8



// 自定义属性
// const div = document.querySelector('#myDiv')
// logDataset(div.dataset) // myProto foo
// div.dataset.myName = 'bar'
// div.dataset.appId = '123'
// console.log(div.dataset); // DOMStringMap {myProto: "foo", myName: "bar", appId: "123"}

// function logDataset(dataset) {
// 	for (const i in dataset) {
// 		console.log(i, dataset[i]);
// 	}
// }



// 插入标记
// 读取innerHTML
// const div = document.querySelector('div#innerHTML')
// console.log(div.innerHTML);
//
// 		<ul>
// 			<li>1</li>
// 			<li>2</li>
// 			<li>3</li>
// 		</ul>
// 	


// 插入
// const div = document.querySelector('div#innerHTML')
// div.innerHTML = "Hello World!"
// console.log(div.innerHTML); // Hello World!
// div.innerHTML = "Hello & welcome, <b> 'render'</b>"
// console.log(div.innerHTML); // Hello &amp; welcome, <b> 'render'</b>



// 旧IE中的innerHTML
// var div = document.getElementById('innerHTML')
// div.innerHTML = "<script defer>console.log('在IE中使用scitp');</script>" // 无法打印,因为无前置受控元素
// div.innerHTML = "_< defer>console.log('在IE中使用scitp');</script>" // 打印
// div.innerHTML = "<div>&nbsp</div><script defer>console.log('在IE中使用scitp');</script>" // 打印
// div.innerHTML = "<input type=\"hidden\"><script defer>console.log('在IE中使用scitp');</script>" // 打印



// outerHTML
// const div = document.querySelector('div#innerHTML')
// console.log(div.outerHTML);
// //<div id="innerHTML">
// //		<ul>
// //			<li>1</li>
// //			<li>2</li>
// //			<li>3</li>
// //		</ul>
// //	</div>

// div.outerHTML = '<p>改变为p标签</p>'



// insertAdjacentHTML()和insertADjacentText()
// const div = document.querySelector('#innerHTML')
// const html = '<p>插入的p标签</p>'
// // 在div前作为同胞节点插入html
// div.insertAdjacentHTML('beforebegin', html)
// // 在div第一个元素前插入html
// div.insertAdjacentHTML('afterbegin', html)
// // 在div最后一个元素后插入html文本
// div.insertAdjacentText('beforeend', html)
// // 在div后作为同胞节点插入html文本
// div.insertAdjacentText('afterend', html)


// // 内存和性能问题
// for (let value of values) {
// 	// 效率很低，不要这样做,因为每次循环还要读取innerHTML
// 	ul.innerHTML += `<li>${value}</li>`
// }

// // 这样修改后，只要对innerHTML进行一次赋值
// const itemsHTML = ''
// for(let value of values) {
// 	itemsHTML += `<li>${value}</li>`
// }
// ul.innerHTML = itemsHTML



// scrollIntoView()
// const div = document.querySelector('#scroll')
// // 不要直接调用，因为未渲染就调用，会无效的。
// setTimeout(() => {
// 	// 下面两者相同
// 	div.scrollIntoView()
// 	div.scrollIntoView(true)
// 	// 与元素底部对齐
// 	div.scrollIntoView(false)
// 	div.scrollIntoView({
// 		behavior: "smooth",
// 		block: 'end',
// 		inline: 'start'
// 	})
// }, 100);



/**
 * 专有拓展
 */
// children
// console.log(document.body.children);// HTMLCollection(7)[]


// contains
// const bodyNode = document.body
// const div = document.querySelector('#myDiv')
// console.log(bodyNode.contains(div)); //true
// console.log(div.contains(bodyNode)); //false


// compareDocumentPosition
// const bodyNode = document.body
// const div = document.querySelector('#myDiv')
// const ul = document.querySelector('ul')
// console.log(bodyNode.compareDocumentPosition(div)); // 20 0x10 + 0x4
// console.log(div.compareDocumentPosition(bodyNode)); // 10 0x8 + 0x2
// console.log(div.compareDocumentPosition(ul)); // 2 0x2

// const result = bodyNode.compareDocumentPosition(div)
// console.log(!!(result & 0x10)); // true



// 插入标记
// innerText
// const ul = document.querySelector('body>ul')
// console.log(ul.innerText);
// // 1
// // 2
// // 3


// var div = document.querySelector('#innerHTML')
// div.innerText = '<p> hello & welcome <em>world!</em></p>'
// console.log(div.innerText); //<p> hello & welcome <em>world!</em></p>


// 滚动
// const div = document.querySelector('#scroll')
// setTimeout(() => {
// 	div.scrollIntoViewIfNeeded()
// }, 100);