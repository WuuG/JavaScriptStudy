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