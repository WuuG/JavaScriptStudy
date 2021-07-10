/**
 * Node
*/
const bodyNode = document.body
// someNode = document.body
// if (someNode.nodeType == Node.ELEMENT_NODE) {
// 	console.log("Node is an element");
// }


// nodeName和nodeValue
// someNode = document.body
// if (someNode.nodeType == 1) {
// 	value = someNode.nodeName
// 	console.log(value); // Body
// 	console.log(someNode.nodeValue); // null
// }


// const body = document.body
// const firstChild = body.childNodes[0]
// const secondChild = body.childNodes.item(1)
// const count = body.childNodes.length
// console.log(firstChild, secondChild, count); //#text div 4


// 转换为数组
// const arrayOfNodes = Array.prototype.slice.call(bodyNode.childNodes, 0)
// console.log(arrayOfNodes); // [text, div, text, script]

// const arrayOfNodes = Array.from(bodyNode.childNodes)
// console.log(arrayOfNodes); // [text, div, text, script]


// Sibiling
// if (bodyNode.nextSibling === null) {
// 	console.log('last node in list'); // last node in list
// }
// if (bodyNode.previousSibling === null) { // #text
// 	console.log('fist node in list');
// }


// 一些方便的方法
// // 查询是否有子节点
// bodyNode.hasChildNodes() // true
// // 所有节点节点都共享的关系。ownerDocument属性是一个指向代表整个文档节点的指针。
// console.log(bodyNode.ownerDocument); // #document



// 操纵节点
// append
// let newNode = document.createElement('p')
// newNode.innerHTML = '测试'
// bodyNode.appendChild(newNode)


// append() 已存在节点
// let test = document.querySelector('#test')
// console.log(bodyNode.lastChild === test); // false
// bodyNode.appendChild(test)
// console.log(bodyNode.lastChild === test); // true


// insertbefore()
// let newNode = document.createElement('div')
// newNode.innerHTML = '测试'
// let test = document.querySelector('#test')
// bodyNode.insertBefore(newNode, test) // 插入到test节点之前了


// appendChild() 
// let newNode = document.createElement('div')
// newNode.innerHTML = '测试'
// let test = document.querySelector('#test')
// let returnNode = bodyNode.replaceChild(newNode, test)  // test被newNode替换，且返回test节点
// console.log(returnNode === test); // true


// removeChild()
// let firstChild = bodyNode.firstElementChild
// const returnNode = bodyNode.removeChild(firstChild) // 删除第一个元素节点
// console.log(firstChild === returnNode); // true



// 其他方法
// const ul = document.querySelector('ul')
// const deepList = ul.cloneNode(true)
// console.log(deepList.childNodes.length); // 7
// const shallowList = ul.cloneNode()
// console.log(shallowList.childNodes.length); // 0


// normalize



/**
 * Document节点
 */
// 文档子节点
// console.log(document.documentElement); // 指向html节点
// console.log(document.childNodes[1] === document.documentElement); // true

// doctype
// console.log(document.doctype); // <!DOCTYPE html>

// console.log(document.childNodes);



// 文档信息
// title
// let originalTitle = document.title
// // 修改文档标题
// document.title = 'title test'


// URL,domain,referrer
// let url = document.URL
// let domain = document.domian
// let referrer = document.referrer



// 获取元素
// let test = document.getElementById('test')
// console.log(test); // <div id="test">测试节点</div>
// let test_1 = document.getElementById('Test')
// console.log(test_1); // null


// getElementsByTagName()
// const lis = document.getElementsByTagName('li')
// console.log([...lis]);//  HTMLCollection(3) [li, li, li]
// const li = lis[0].cloneNode()
// lis[0].parentNode.appendChild(li)
// console.log([...lis]);//  (4) [li, li, li, li] 是动态的


// 通过name可以获取某个元素,对HTMLCollection对象而言，中括号即可以接受数值索引，也可以接受字符串索引，在后台数值索引会调用item()，字符串索引会调用namedItem()
// const lis = document.getElementsByTagName('li')
// const li = lis.namedItem('second-li')
// console.log(li); // <li name="second-li">2</li>
// console.log(lis['second-li'] === li); // true


// *
// const allElements = document.getElementsByTagName('*')
// console.log(allElements); // 包含页面内所有元素的THMLCollection对象,顺序为在页面中出现的顺序



// 特殊集合
// document.anchors  // 带name的<a》元素
// document.applets
// document.forms
// document.images
// document.links // 带href的<a》元素



// DOM兼容性测试
// document.implementation属性是一个对象，其中提供了与浏览器DOM实现相关的信息和能力。DOM Level 1在document.implementation上只定义了一个方法，hasFeature().接受两个参数：特性名称和DOM版本。若浏览器支持的特性和版本，则返回ture。
// let hasXmlDom = document.implementation.hasFeature('XML', '1.0') // true 废弃



// 文档写入


// document.write('<span>' + (new Date()).toString() + '</span>')
// document.writeln('<strong>' + (new Date()).toString() + '</strong>')



/**
 * Element节点
*/
// const test = document.querySelector('#test')
// console.log(test.tagName); // DIV
// console.log(test.tagName === test.nodeName); // true


// const test = document.querySelector('#test')
// if (test.tagName.toLowerCase() === 'div') {
// 	console.log('XML文档也可识别');
// }



// HTML均有的属性
// const div = document.getElementById('myDiv')
// console.log(div.id); // myDiv
// console.log(div.className); // bd
// console.log(div.title); // body Text
// console.log(div.lang); // en
// console.log(div.dir); // ltr

// div.id = 'otherId'
// div.className = 'test'
// div.title = 'some other title'
// div.lang = 'zh_cn'
// div.dir = 'rtl'

// console.log(div.id); // otherId
// console.log(div.className); // test
// console.log(div.title); // some other title
// console.log(div.lang); // zh_cn
// console.log(div.dir); // rtl



// 取得属性
// const div = document.getElementById('myDiv')
// console.log(div.getAttribute('id')); // myDiv
// console.log(div.getAttribute('class')); // bd
// console.log(div.getAttribute('dir')); // ltr

// console.log(div.getAttribute('my_spical_attribute')); // hello!


// 差异属性,style
// console.log(div.getAttribute('style'));  // text-align: center;
// console.log(div.style); // CSSStyleDeclaration {...}


// 事件属性
// const div = document.getElementById('myDiv')
// div.onclick = function (e) {
// 	console.log(e);
// }
// console.log(div.onclick); // 函数代码
// console.log(div.getAttribute("onclick")); // null ?
// console.log(div.attributes); // 内部确实时没有onclick属性



// 设置属性
// const div = document.getElementById('myDiv')
// div.setAttribute('id', 'someOtherId')
// div.setAttribute('class', 'test')


// DOM对象赋值
// const div = document.getElementById('myDiv')
// div.align = 'center'


// div.mycolor = 'red'
// console.log(div.getAttribute('mycolor')); // null


// console.log(...div.attributes);
// div.removeAttribute('align')
// console.log(...div.attributes); // align属性被删去



// Attributes属性
// const div = document.querySelector('#myDiv')
// console.log(div.attributes);
// console.log(div.attributes.getNamedItem('id').nodeValue); // myDiv
// console.log(div.attributes['id'].nodeValue); // myDiv
// console.log(div.attributes[0]); // myDiv


// 设置属性
// const div = document.querySelector('#myDiv')
// div.attributes.getNamedItem('class').nodeValue = 'test'

// // 删除属性
// let oldAttr = div.attributes.removeNamedItem('class')
// console.log(oldAttr); // class="test"

// // 设置属性
// div.attributes.setNamedItem(oldAttr)


// 生成结构化字符串
// function outputAtteributes(element) {
// 	let pair = []
// 	for (const attribute of element.attributes) {
// 		pair.push(`${attribute.nodeName}=${attribute.nodeValue}`)
// 	}
// 	return pair.join(" ")
// }
// const div = document.querySelector('#myDiv')
// console.log(outputAtteributes(div)); // id=myDiv class=bd title=body Text lang=en dir=ltr my_spical_attribute=hello! style=text-align: center;



// 创建元素
// const div = document.createElement('div')
// console.log(div.ownerDocument); // 新建新元素的同时，会将其ownerDocument属性设置为document
// div.id = 'myNewDiv'
// div.className = "test"
// div.innerHTML = '测试元素'
// bodyNode.appendChild(div)



// 元素后代
// const ul = document.querySelector('ul')
// console.log(ul.childNodes); // NodeList(7) [text, li, text, li, text, li, text]

// // 只对元素节点进行操作
// for (const li of ul.childNodes) {
// 	if (li.nodeType == 1) {
// 		console.log(li);
// 	}
// }



/**
 * 文本节点
*/
// const text = bodyNode.childNodes[0]
// console.log(text.length); // 2
// console.log(text.nodeValue.indexOf('\n\t')); // 0
// console.log(text.nodeValue); // \n\t



// 文本转义
// const test = document.querySelector('#test')
// console.log(test.childNodes);
// test.firstChild.nodeValue = "中间是 <strong>加粗字体</strong> 哦"



// 创建文本
// document.createTextNode()，接受一个参数，即要插入节点的文本。
// let textNode = document.createTextNode("<strong>Hello</strong> world! ")
// bodyNode.append(textNode)

// let another = document.createTextNode('Yippee!')
// bodyNode.append(another)
// console.log(bodyNode.childNodes); // NodeList

// // 规范化文本节点
// console.log(bodyNode.childNodes); // NodeList(12)
// bodyNode.normalize()
// console.log(bodyNode.childNodes); // NodeList(11) 合并了同胞文本节点

// //拆分文本节点
// console.log(bodyNode.childNodes[10].splitText(22)); // 拆分了文本节点



/**
 * Comment类型
*/
// const myDiv = document.querySelector('#myDiv')
// const comment = myDiv.childNodes[1]
// console.log(comment.data); // "注释节点"

// // 创建注释节点
// const newComment = document.createComment('新创建的注释节点')
// myDiv.appendChild(newComment)



/**
 * DocumentType类型
*/
// console.log(document.doctype.name); //html



/**
 * 文档片段
*/
// const fragment = document.createDocumentFragment()

// const content = document.querySelector('#docFramentContent')
// const ul = document.createElement('ul')
// for (let i = 0; i < 3; i++) {
// 	const li = document.createElement('li')
// 	li.appendChild(document.createTextNode(`第${i}个li`))
// 	ul.appendChild(li)
// }
// fragment.appendChild(ul)
// content.appendChild(fragment)



/**
 * 属性节点
*/
// let attr = document.createAttribute('align')
// attr.value = "center"
// bodyNode.setAttributeNode(attr)
// console.log(bodyNode.getAttribute('align')); // center
// console.log(bodyNode.getAttributeNode('align').value); // center
// console.log(bodyNode.attributes.align.value); // center



/**
 * DOM编程
*/
// const scipt = document.createElement('script')
// scipt.src = './04-test.js'
// bodyNode.appendChild(scipt)


// // 函数
// function loadScript(src) {
// 	const scipt = document.createElement('script')
// 	scipt.src = src
// 	bodyNode.appendChild(scipt)
// }


// 嵌入源代码DOM操作
// const srcipt = document.createElement('script')
// srcipt.appendChild(document.createTextNode("console.log('动态嵌入源代码')"))
// bodyNode.appendChild(srcipt)


// IE中添加
// const script = document.createElement('script')
// script.text = "console.log('动态嵌入源代码');"
// bodyNode.appendChild(script)


// 早期Safari
// const script = document.createElement('script')
// const code = "console.log('动态嵌入源代码');"

// try {
// 	script.appendChild(document.createTextNode(code))
// } catch (error) {
// 	script.text = code
// }
// bodyNode.appendChild(script)


// 跨浏览器的函数
// function loadScriptString(code) {
// 	const script = document.createElement('script')
// 	script.type = "text/javascript"
// 	try {
// 		script.appendChild(document.createTextNode(code))
// 	} catch (error) {
// 		script.text = code
// 	}
// 	bodyNode.appendChild(script)
// }

// loadScriptString("console.log('动态显示代码')")



// 动态样式
// const link = document.createElement('link')
// link.rel = 'stylesheet'
// link.type = 'text/css'
// link.href = './05-styles.css'
// const headNode = document.querySelector('head')
// headNode.appendChild(link)


// 抽象为函数
// function loadStyles(url) {
// 	const link = document.createElement('link')
// 	link.rel = 'stylesheet'
// 	link.type = 'text/css'
// 	link.href = url
// 	const head = document.getElementsByTagName('head')[0]
// 	headNode.appendChild(link)
// }
// loadStyles('./05-styles.css')


// 通过style动态添加CSS规则
// function loadStyleString(css) {
// 	const style = document.createElement("style")
// 	style.type = "text/css"
// 	try {
// 		style.appendChild(document.createTextNode(css))
// 	} catch (error) {
// 		style.styleSheet.cssText = css
// 	}
// 	const head = document.getElementsByTagName('head')[0]
// 	head.appendChild(style)
// }
// const css = 'body {background-color: seagreen;}'
// loadStyleString(css)



// DOM编程修新建表格
// 创建表格
// const table = document.createElement('table')
// table.border = 1
// table.width = "100%"
// // 创建tbody
// const tbody = document.createElement('tbody')
// table.appendChild(tbody)
// // 第一行
// const row1 = document.createElement('tr')
// const cell1_1 = document.createElement('td')
// cell1_1.appendChild(document.createTextNode('cell1_1'))
// const cell1_2 = document.createElement('td')
// cell1_2.appendChild(document.createTextNode('cell1_2'))
// row1.appendChild(cell1_1)
// row1.appendChild(cell1_2)
// tbody.appendChild(row1)
// // 第二行
// const row2 = document.createElement('tr')
// const cell2_1 = document.createElement('td')
// cell2_1.appendChild(document.createTextNode('cell2_1'))
// const cell2_2 = document.createElement('td')
// cell2_2.appendChild(document.createTextNode('cell2_2'))
// row2.appendChild(cell2_1)
// row2.appendChild(cell2_2)
// tbody.appendChild(row2)
// bodyNode.appendChild(table)



// 使用table的特性和方法创建table
// const table = document.createElement('table')
// table.border = 1
// table.width = "100%"
// // 创建标题
// const tbody = document.createElement('tbody')
// table.appendChild(tbody)
// // 创建第一行
// const row1 = tbody.insertRow(0)
// row1.insertCell(0)
// row1.cells[0].appendChild(document.createTextNode('Cell1_1'))
// row1.insertCell(1)
// row1.cells[1].appendChild(document.createTextNode('Cell1_1'))
// // 创建第二行
// const row2 = tbody.insertRow(1)
// row2.insertCell(0)
// row2.cells[0].appendChild(document.createTextNode('Cell2_1'))
// row2.insertCell(1)
// row2.cells[1].appendChild(document.createTextNode('Cell2_1'))
// bodyNode.append(table)



// NodeList
// 无限循环，但是通过querySelectorAll不会无限循环。
// for (let div of document.getElementsByTagName('div')) {
// 	console.log(div);
// 	let newDiv = document.createElement('div')
// 	bodyNode.appendChild(newDiv)
// }


// 反向迭代
// const divs = document.getElementsByTagName('div')
// for (let i = divs.length - 1; i >= 0; i--) {
// 	let newDiv = document.createElement('div')
// 	bodyNode.appendChild(newDiv)
// }



/**
 * MutaionObserver接口
*/
// 基本用法
// const observer = new MutationObserver(()=> {
// 	console.log('DOM was mutated!');
// })


// observer()
// const observer = new MutationObserver(() => console.log('<body> attributes changed'))
// observer.observe(bodyNode, { attributes: true })
// document.body.className = 'test'
// console.log("change body class");
// // change body class
// // attributes changed  后执行，所以是异步的


// MutationRecord
// const observer = new MutationObserver((mutationRecord) => console.log(mutationRecord))
// observer.observe(bodyNode, { attributes: true })
// bodyNode.className = "test"
// // [
// // 	{
// // 		addedNodes: NodeList[],
// // 		attributeName: "class",
// // 		attributeNamespace: null,
// // 		nextSibling: null,
// // 		oldValue: null,
// // 		previousSibling: null,
// // 		removedNodes: NodeList[],
// // 		target: body.test,
// // 		type: "attributes"
// // 	}
// // ]


// const obsever = new MutationObserver((mutationRecord) => console.log(mutationRecord))
// obsever.observe(bodyNode, { attributes: true })
// bodyNode.setAttribute('foo', 'bar')
// [
// 	{
// 		addedNodes: NodeList[],
// 		attributeName: "foo",
// 		attributeNamespace: null,
// 		nextSibling: null,
// 		oldValue: null,
// 		previousSibling: null,
// 		removedNodes: NodeList[],
// 		target: body,
// 		type: "attributes"
// 	}
// ]


// 连续修改时
// const obsever = new MutationObserver((mutationRecord) => console.log(mutationRecord))
// obsever.observe(bodyNode, { attributes: true })
// bodyNode.setAttribute('foo', 'bar')
// bodyNode.setAttribute('foo', 'bar')
// bodyNode.setAttribute('foo', 'bar')
// //  [MutationRecord, MutationRecord, MutationRecord]


// 第二个参数
// const obsever = new MutationObserver((mutationRecord, mutationObserver) => console.log(mutationRecord, mutationObserver))
// obsever.observe(bodyNode, { attributes: true })
// bodyNode.setAttribute('foo', 'bar')
// [MutationRecord] MutationObserver {}


// disconnect
// const obsever = new MutationObserver((mutationRecord, mutationObserver) => console.log(mutationRecord, mutationObserver))
// obsever.observe(bodyNode, { attributes: true })
// bodyNode.setAttribute('foo', 'bar')
// obsever.disconnect()
// bodyNode.setAttribute('foo', 'bar')
// 无日志输出


// 执行已加入任务队列的回调
// const obsever = new MutationObserver((mutationRecord, mutationObserver) => console.log(mutationRecord, mutationObserver))
// obsever.observe(bodyNode, { attributes: true })
// bodyNode.setAttribute('foo', 'bar')
// setTimeout(() => {
// 	obsever.disconnect()
// 	bodyNode.setAttribute('foo', 'bar')
// }, 0);
// // [MutationRecord] MutationObserver {}



// 复用MutationObserver
// const obsever = new MutationObserver((mutationRecord) => mutationRecord.map(x => console.log(x.target)))
// obsever.observe(bodyNode, { attributes: true })
// const trs = document.querySelectorAll('tr')
// obsever.observe(trs[0], { attributes: true })
// obsever.observe(trs[1], { attributes: true })
// trs[0].setAttribute('class', 'tr0')
// trs[1].setAttribute('class', 'tr1')
// [<tr>,</tr>]


// disconnect()
// const obsever = new MutationObserver((mutationRecord) => mutationRecord.map(x => console.log(x.target)))
// obsever.observe(bodyNode, { attributes: true })
// const trs = document.querySelectorAll('tr')
// obsever.observe(trs[0], { attributes: true })
// obsever.observe(trs[1], { attributes: true })
// obsever.disconnect()
// trs[0].setAttribute('class', 'tr0')
// trs[1].setAttribute('class', 'tr1')
// 无日志输出



// 重用MutationObserver
// const obsever = new MutationObserver((mutationRecord) => console.log(mutationRecord))
// obsever.observe(bodyNode, { attributes: true })
// bodyNode.setAttribute('foo', 'bar')
// setTimeout(() => {
// 	obsever.disconnect()
// 	bodyNode.setAttribute('baz', 'qux')
// }, 0);
// setTimeout(() => {
// 	obsever.observe(bodyNode, { attributes: true })
// 	bodyNode.setAttribute('quz', 'qoo')
// }, 0);
// [MutationRecord](foo)
// [MutationRecord](quz)



/** 
 * 观察属性
*/
// const obsever = new MutationObserver((mutationRecord) => console.log(mutationRecord))
// obsever.observe(bodyNode, { attributes: true })
// bodyNode.setAttribute('foo', 'bar')
// bodyNode.setAttribute('foo', 'bar')
// bodyNode.removeAttribute('foo', 'bar')
// [MutationRecord, MutationRecord, MutationRecord]


// attributeFilter
// const obsever = new MutationObserver((mutationRecord) => console.log(mutationRecord))
// obsever.observe(bodyNode, { attributeFilter: ['foo', 'class'] })
// bodyNode.setAttribute('foo', 'bar')
// bodyNode.setAttribute('qux', 'bar')
// [MutationRecord] 是foo的


// attributeOldValue
// const obsever = new MutationObserver((mutationRecord) => mutationRecord.map(x => console.log(x.oldValue)))
// obsever.observe(bodyNode, { attributes: true })
// bodyNode.setAttribute('foo', 'baz')
// bodyNode.setAttribute('foo', 'qux')
// // null
// // null
// setTimeout(() => {
// 	obsever.observe(bodyNode, { attributeOldValue: true })
// 	bodyNode.setAttribute('foo', 'fuz')
// 	bodyNode.setAttribute('foo', 'yxx')
// 	// qux
// 	// fuz
// }, 0);



// 观察字符数据
// const observer = new MutationObserver((mutationRecord) => console.log(mutationRecord))
// const text = bodyNode.firstChild
// text.textContent = 'foo'
// observer.observe(text, { characterData: true })
// // 赋值为相同字符串
// text.textContent = 'foo'
// // 赋值为新字符串
// text.textContent = 'bar'
// // 通过节点设置赋值
// text.nodeValue = 'qux'
// // [MutationRecord, MutationRecord, MutationRecord] 记录了后三个变化


// oldValue
// const observer = new MutationObserver((mutationRecord) => mutationRecord.map(x => console.log(x.oldValue)))
// const text = bodyNode.firstChild
// text.textContent = 'a'
// observer.observe(text, { characterDataOldValue: true })
// text.textContent = 'foo'
// text.textContent = 'bar'
// text.nodeValue = 'qux'
// // a
// // foo
// // bar



// 添加子节点
// bodyNode.innerHTML = ''
// const observer = new MutationObserver((mutationRecord) => console.log(mutationRecord))
// observer.observe(bodyNode, { childList: true })
// bodyNode.appendChild(document.createElement('div'))
// // [MutationRecord] // 添加的div节点
// // (2) [MutationRecord, MutationRecord] //将最后的注释和文本都添加进body了

// 删除子节点
// const div = bodyNode.querySelector('div')
// bodyNode.removeChild(div)
// [{
// 	addedNodes: NodeList []
// 	attributeName: null
// 	attributeNamespace: null
// 	nextSibling: null
// 	oldValue: null
// 	previousSibling: null
// 	removedNodes: NodeList [div]
// 	target: body
// 	type: "childList"
// }]


// 子节点重新排序
// bodyNode.innerHTML = ''
// const observer = new MutationObserver((mutationRecord) => console.log(mutationRecord))
// const span = bodyNode.appendChild(document.createElement('span'))
// const div = bodyNode.appendChild(document.createElement('div'))
// observer.observe(bodyNode, { childList: true })
// bodyNode.replaceChild(div, span)
// [
// 	{
// 		addedNodes: NodeList[],
// 		attributeName: null,
// 		attributeNamespace: null,
// 		nextSibling: null,
// 		oldValue: null,
// 		previousSibling: span,
// 		removedNodes: NodeList[div],
// 		target: body,
// 		type: "childList"
// 	},
// 	{
// 		addedNodes: NodeList[div],
// 		attributeName: null,
// 		attributeNamespace: null,
// 		nextSibling: null,
// 		oldValue: null,
// 		previousSibling: null,
// 		removedNodes: NodeList[span],
// 		target: body,
// 		type: "childList"
// 	}
// ]



// 观察子树
// bodyNode.innerHTML = ''
// const observer = new MutationObserver((mutationRecord) => console.log(mutationRecord))
// observer.observe(bodyNode, { attributes: true, subtree: true, attributeOldValue: true })
// const div = bodyNode.appendChild(document.createElement('div'))
// div.setAttribute('foo', 'bar')
// [{
// 		addedNodes: NodeList[],
// 		attributeName: "foo",
// 		attributeNamespace: null,
// 		nextSibling: null,
// 		oldValue: null,
// 		previousSibling: null,
// 		removedNodes: NodeList[],
// 		target: div,
// 		type: "attributes"
// }]

// 移除子树后
// bodyNode.removeChild(div)
// div.setAttribute('foo', 'qux')
// [{
// 		addedNodes: NodeList[],
// 		attributeName: "foo",
// 		attributeNamespace: null,
// 		nextSibling: null,
// 		oldValue: "bar",
// 		previousSibling: null,
// 		removedNodes: NodeList[],
// 		target: div,
// 		type: "attributes"
// }]



// takeRecords()方法
const observer = new MutationObserver((mutationRecord) => console.log(mutationRecord))
observer.observe(bodyNode, { attributes: true })
bodyNode.className = 'foo'
bodyNode.className = 'foo'

console.log(observer.takeRecords()); // (2) [MutationRecord, MutationRecord]
console.log(observer.takeRecords()); // []
