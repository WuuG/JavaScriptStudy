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
const parentElement = document.getElementById('parent')
const currentChildNode = parentElement.firstElementChild
while (currentChildNode) {
	// 对元素节点进行相应处理
	if (currentChildNode === parentElement.lastElementChild) {
		break
	}
	currentChildNode = currentChildNode.nextElementSibling
}
