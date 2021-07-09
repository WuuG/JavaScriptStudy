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


document.write('<span>' + (new Date()).toString() + '</span>')
document.writeln('<strong>' + (new Date()).toString() + '</strong>')