- [DOM的演进](#dom的演进)
	- [XML命名空间](#xml命名空间)
		- [Node的变化](#node的变化)
		- [Document的变化](#document的变化)
		- [Element的变化](#element的变化)
		- [NamedNodeMap](#namednodemap)
	- [其他变化](#其他变化)
		- [DocumentType的变化。](#documenttype的变化)
		- [Document变化](#document变化)
		- [Node的变化](#node的变化-1)
		- [内嵌窗格的变化](#内嵌窗格的变化)
- [样式](#样式)
	- [存取元素样式](#存取元素样式)
		- [DOM样式属性和方法](#dom样式属性和方法)
		- [计算样式](#计算样式)
		- [CSS规则](#css规则)
		- [创建规则](#创建规则)
		- [删除规则](#删除规则)
	- [元素尺寸](#元素尺寸)
		- [偏移尺寸(offset dimensions)](#偏移尺寸offset-dimensions)
		- [客户端尺寸](#客户端尺寸)
		- [滚动尺寸](#滚动尺寸)
		- [确定元素尺寸](#确定元素尺寸)
- [遍历](#遍历)
	- [NodeIterator](#nodeiterator)
	- [TreeWalker](#treewalker)
- [范围](#范围)
	- [DOM范围](#dom范围)
	- [简单选择](#简单选择)
	- [复杂选择](#复杂选择)
	- [操作范围](#操作范围)
	- [范围插入](#范围插入)
	- [范围折叠](#范围折叠)
	- [范围比较](#范围比较)
	- [复制范围](#复制范围)
	- [清理](#清理)
# DOM的演进
## XML命名空间
通过给html设置xmls命名空间.
``` js
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
```
通过设置命名空间，将其表示未当前文档的外来元素。这样一来，该元素及其苏醒，包括它的所有后代都会认为属于该命名空间。

对于包含不同命名空间的文档。DOM2 core为解决致谢问题，给大部分DOM1方法提供了特定于命名空间的版本。
### Node的变化
DOM2中，Node类型包含以下特定于命名空间的属性：
+ localName,不包括命名空间前缀的节点。
+ namesapceURI,节点的命名空间URL，如果未指定则为null
+ prefix,命名空间浅醉，如果未指定则为null

在节点使用命名空间前缀的情况下，nodeName等于prefix+":"+localName.

如下例，\<html>元素的localName和tagName都是"html",nameSpaceURL是"http://www.w3.org/1999/xhtml",prefix是null. 对\<s:svg>而言，localName是"svg",tagName是"s:svg",nameSpaceURI"http://www.w2.org/2000/svg",而prefix是"s"
``` js
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">

<head>
	<title>命名空间例子</title>
</head>

<body>
	<s:svg xmlns:s="http://www.w2.org/2000/svg" version="1.1" viewBox="00100100" style="width: 100%;height: 100%;">
		<s:rect x="0" y="0" width="100" height="100" style="fill:red"></s:rect>
	</s:svg>
</body>
```
DOM 3进一步增加如下命名空间相关的方法：
+ isDefaultNamespace(namespaceURI),返回布尔值，表示namespaceURI是否为节点的默认命名空间
+ lookupNamespaceURI(prefix), 返回给定prefix的命名空间URI
+ lookupPrefix(namespaceURI), 返回给定namespaceURI的前缀

对前面的例子，可以执行以下代码<-- 不知道为啥：
``` js
		console.log(document.body.isDefaultNamespace("http://www.w3.org/1999/xhtml")); // true
		const svg = document.querySelector('#svg')
		// 似乎对这个svg引用，无法直接通过querySeletor获取
		console.log(svg.isDefaultNamespace('http://www.w2.org/2000/svg')); // false
		console.log(svg.lookupPrefix("http://www.w2.org/2000/svg"));
		console.log(svg.lookupNamespaceURI('s'));
```
### Document的变化
DOM2在Document类型上新增了如下命名空间特定的方法：
+ createElementNS(namespaceURI,tagName), 以给定的标签名tagName创建指定命名空间namespaceURI的一个新元素。
+ createAttributeNS(namespaceURI,attributeName), 以给定的属性名attributeName创建指定命名空间namespaceURI的一个新属性。
+ getElementByTagNameNS(namespaceURI,tagName), 返回指定命名空间namespaceURI中所有标签名为tagName的元素的NodeList。

使用这些方法都需要传入相应的命名空间URI,如下面例子所示
``` js
			const htmls = document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', "*")
```
这些命名空间特定的方法只在文档中包含两个或两个以上命名空间时才有用。
### Element的变化
DOM2 core对Element类型的更新主要集中在对属性的操作上。
+ getAttributeNS(namespaceURI,localName), 取得指定命名空间namespaceURI中名为localName的属性。
+ getAttributeNodeNs(namespaceURI,localName), 取得指定命名空间namespaceURI中名为localName的属性节点。
+ getElementByTagNamesNS(namespaceURI,tagName), 取得指定命名空间namespaceURI中标签名为tagName的元素的NodeList
+ hasAttributeNS(namespaceURI,localName), 返回布尔值，表示元素中是否由命名空间namespaceURI下名为localName的属性(DOM2 core也添加不带命名空间的hasAttribute()方法)
+ removeAttributeNS(namespaceURI,localName), 删除指定命名空间namespaceURI中名为localName的属性。
+ setAttributeNS(namespaceURI, quailifiedName,value), 设置指定命名空间namespaceURI中名为quailifiedName的属性为value
+ setAttributeNodeNS(attNode),为元素设置命名空间信息的属性节点attNode。
### NamedNodeMap
NamedNodeMap添加了以下处理命名空间的方法。
+ getNamedItemNS(namespaceURI,localName), 取得指定命名空间namespaceURI中名为localName的项。
+ removeNamedItemNS(namespaceURI,localName), 删除指定命名空间namespaceURI中为localName的项。
+ setNamedItemNs(node), 为元素添加包含命名空间信息的节点。
## 其他变化 
除命名空间相关的变化，DOM2 Core还对DOM的其他部分做一些更新。
### DocumentType的变化。
DocumentType新增了3个属性：publicId,systemId和internalSubSet。 publicId、systemId属性表示文档类型声明中有效但无法使用DOM1 API访问的数据。
``` html
<!DOCTYPE html PUBLIC "-// W3C DTD HTML 4.01// EN" "http://www.w3.org/TR/html4/strict.dtd">
```
如上例其中，publicId是"-// W3C DTD HTML 4.01// EN",而systemId是"http://www.w3.org/TR/html4/strict.dtd"。
``` js
console.log(document.doctype.publicId);
console.log(document.doctype.systemId);
// -// W3C DTD HTML 4.01// EN
// http://www.w3.org/TR/html4/strict.dtd
```
internalSubset用于访问文档类型声明中可能包含的额外定义。如下例所示。
``` html
<!DOCTYPE html PUBLIC "-// W3C DTD HTML 4.01// EN" "http://www.w3.org/TR/html4/strict.dtd" [<! ELEMENT name (#PCDATA)>] >
```
### Document变化
Document类型的更新中唯一与命名空间无关的方法是importNode(). 这个方法的目的是从其他文档获取一个节点并导入到新文档，以便将其插入新文档。每个节点都有一个ownerDocument属性，表示所属文档。如果调用appendChild()方法时传入的ownerDocuemnt节点不是指向当前文档，则会发生错误。而调用importNode()导入其他文档的节点会返回一个新节点，这个新节点的ownerDocuemnt属性是正确的。

impoertNode()方法和cloneNode()方法类似，同样接受两个参数：要复制的节点和表示是否同时复制子树的布尔值，返回结果是适合在当前文档中使用的新节点。下面看一个例子：
``` js
const oldNode = document.querySelector('#div')
const newNode = document.importNode(oldNode,true) // 导入节点以所有后代
document.body.appendChild(newNode)
```
DOM2 View给Document类型增加了新属性defaultView，是一个指向当前文档的窗口(或窗格\<frame>)的指针。在IE8或者更早的浏览器存在等价的属性parentWindow属性。因此确定拥有文档的窗口，可以使用以下代码：
``` js
let parentWindow = document.defaultView || document.parentWindow
```
DOM2 Core还针对docuemnt.implementation对象添加了createDocumentType()和createDocument()方法。 前者用于创建DocumentType类型的新节点，接受3个参数：文档类型名称，publicId和systemId，如下：
``` js
let doctype = document.implementation.createDocumentType("html", "-// W3C// DTD 4.01// EN", "http://www.w3.org/TR/html4/strict.dtd")
```
已有文档的文档类型不可更改，因此createDocumentType()只在创建新文档时才会用到，而创建新文档需要使用createDocument()方法。该方法接受3个参数:文档元素的namespaceURI、文档元素的标签名和文档类型。 比如，，下列代码可以创建一个空的XML文档(该文档没有命名空间和文档类型，只是指定了root作为文档元素)。
``` js
let doc = document.implementation.createDocument('','root',null)
```
以下代码创建一个XHTML文档,这个文档只有一个文档元素\<html>,其他一切需另行添加。
``` js
let doctype = document.implementation.createDocumentType("html", "-// W3C// DTD 4.01// EN", "http://www.w3.org/TR/html4/strict.dtd")
const doc = document.implementation.createDocument("http://www.w3.org/1999/xhtml","html",doctype) 
```
DOM2 HTML模块也为document.implementation对象添加了createHTMLDocument()方法。使用该方法可创建一个完整的HTML文档，包含\<html>,\<head>,\<title>和\<body>元素。 这个方法只接受一个参数，即创建文档的标题，返回一个新的HTML文档。比如：
``` js
const htmldoc = document.implementation.createHTMLDocument('new Doc')
console.log(htmldoc.title);  // New Doc
console.log(htmldoc.body); // <body></body>
```

### Node的变化
DOM3新增了两个用于比较节点的方法：isSameNode()和isEquailNode()
``` js
const div1 = document.createElement('div')
const div2 = document.createElement('div')
div1.setAttribute('class', 'box')
div2.setAttribute('class', 'box')
console.log(div1.isSameNode(div1)); // true
console.log(div1.isSameNode(div2)); // false
console.log(div1.isEqualNode(div2)); // true
```
### 内嵌窗格的变化
DOM2 HTML给HTMLIFreamElement类型新增了一个属性，叫contentDocument。 这个属性包含代表子内嵌窗格中的内容的document对象的指针。
``` js
const iframe = docuemnt.getElementById('myIframe')
const iframDoc = iframe.contentDocument
```
contentDocument属性是Document实例，因此可以像使用其他HTML文档一样使用。 其还有一个属性contentWindow，但会对应窗格的window对象，这个对象有一个document属性。
# 样式
HTML中的样式由3中定义方式：外部样式表(link)，文档样式表(style元素)和元素特定样式表(style属性)
## 存取元素样式
任何支持style属性的HTML元素在JavaScript中都有一个style属性，但是不包含通过层叠机制从文档样式和外部样式中继承而来的样式。在css属性用连字符表示法，在JavaScript中使用驼峰大小写表示。

大多数属性名都是直接转换的，除了float外，因为float是JavaScript的保留字，在DOM2 Style中其对应属性为cssFloat
``` js
const myDiv = document.querySelector('#myDiv')
myDiv.style.backgroundColor = 'red'
myDiv.style.border = '1px solid #000'
```
> 在标准模式下，所有尺寸都必须包含单位。在混杂模式下，可以设置为'20',相当于'20px'
通过style属性设置的值也可以通过style对象获取。
``` js
	<div id="myDiv" style="color:red"></div>

	console.log(myDiv.style.color);
```
如果元素上没有style属性，则style对象包含所有可能的CSS属性的空值。
``` js
const emptyDiv = document.querySelector('#emptyDiv')
console.log(emptyDiv.style);
```
### DOM样式属性和方法
DOM2 Style规范也在style对象上定义一些属性和方法。这些属性和方法提供了元素style属性和信息并支持修改，列举如下。
+ cssText, 包含style属性中的CSS代码。
+ length, 应用给元素的CSS属性数量。
+ parentRule, 表示CSS信息的CSSRule对象(下一节会讨论CSSRule类型)。
+ getPropertyCSSValue(propertyName), 返回包含CSS属性propertyName值的CSSValue对象。(已废弃)
+ getPropertyPriority（propertyName），如果CSS属性propertyName使用了！important则返回"important"，否则返回空字符串。
+ getPropertyValue（propertyName），返回属性propertyName的字符串值。
+ item（index），返回索引为index的CSS属性名。
+ removeProperty（propertyName），从样式中删除CSS属性propertyName。
+ setProperty（propertyName, value, priority），设置CSS属性propertyName的值为value, priority是"important"或空字符串

通过CSS属性(也即是style属性)设置的样式，可以通过cssText获取,给cssText复制会重写整个style的值。
``` js
console.log(myDiv.style.cssText); // color: red; background-color: red; border: 1px solid rgb(0, 0, 0);
myDiv.style.cssText = "width:200px;background-color:green"
console.log(myDiv.style.cssText); // width: 200px; background-color: green;
```
通过length和item()方法可以迭代CSS属性名
``` js
for (let i = 0, len = myDiv.style.length; i < len; i++) {
	console.log(myDiv.style[i]);
	console.log(myDiv.style.item(i));
}
```
通过迭代获取的属性名，可以用于获取其对应属性的值，通过getPropertyValue()
``` js
for (let i = 0, len = myDiv.style.length; i < len; i++) {
	const prop = myDiv.style[i]
	const value = myDiv.style.getPropertyValue(prop)
}
```
removeProperty()方法用于从元素样式中删除指定的CSS属性。使用这个方法删除属性，意味着会应用该属性的默认样式(其他样式表层叠继承而来的).
``` js
myDiv.style.removeProperty('border')
```
### 计算样式
style对象只能获得行内样式表的设置的CSS信息。DOM2 Style在document.defaultView上增加了getComputedStyle()方法。该方法接受两个参数：要取得计算样式的元素和伪元素字符串。如果不需要查询伪元素，则第二个参数可以传null。返回一个CSSStyleDeclaration对象，包含元素的计算样式。
``` html
	<style>
		#myDiv {
			background-color: blue;
			width: 200px;
			height: 200px;
		}
	</style>

	<div id="myDiv" style="background-color: red;border: 1px solid black;"></div>
	<script>
		const div = document.querySelector('#myDiv')
		const computedStyle = document.defaultView.getComputedStyle(div, null)
		console.log(computedStyle.backgroundColor); // rgb(255, 0, 0)
		console.log(computedStyle.border); // 1px solid rgb(0, 0, 0)
		console.log(computedStyle.width); // 200px
		console.log(computedStyle.height); // 200px
	</script>
```	
> 浏览器虽然会返回样式值，但返回值的格式不一定相同。和浏览器相关。

计算样式在所有浏览器中都是只读的，不能修改getComputedStyle()方法返回的对象。计算样式还包含浏览器内部样式表中的信息。因此由默认值的CSS属性会出现在计算样式里。但因为默认值的实现不同，具体的值还跟浏览器相关。
## 操作样式表
CSSStyleSheet类型表示CSS样式表，即包括\<link\>和\<style\> 元素定义的样式表.CSSStyleSheet类型是一个通用样式表类型，可以表示以任何方式在HTML中定义的样式表。另外，可以通过style修改HTML属性，而CSSStyleSheet类型的实例则是一个只读对象(只有一个属性例外)。

CSSStyleSheet类型继承StyleSheet，后者可用作非CSS样式表的基类。以下是CSSStyleSheet从StyleSheet类型继承的属性。
+ disabled,布尔值，表示样式表是否被禁用了。(这个属性是可以读写的，因此将它设置为true会禁用样式表)
+ href,如果使用<link\>包含的样式表，则返回样式表的URL，否则返回null。
+ media,样式表支持的媒体类型集合，这个集合有一个length属性和一个item()方法，跟所有DOM集合一样。也可以用中括号访问集合中特定的项。如果样式表可以应用所有媒体，则会返回空列表。
+ ownerNode,指向拥有当前样式表的节点,在HTML中要么是<link\>要么是<style\>元素。如果当前样式是通过@import被包含在另一个样式表中，则这个属性值为null。
+ parentStyleSheet, 如果当前样式表是通过@import被包含在另一个样式表中，则这个属性指向导入它的样式表。
+ title, ownerNode的title属性
+ type, 字符串，表示样式表的类型。对CSS样式表来说，就是“text/css”

上面除了disabled，其他属性都是只读的。除了上面继承的属性，CSSStyleSheet类型还支持以下属性和方法。
+ cssRules, 当前样式表包含的样式规则的集合。
+ ownerRule, 如果样式表是使用@import导入的，则指向导入规则；否则为null。
+ deleteRule(index), 在指定位置删除cssRules中的规则。
+ inserRule(rule,index), 在指定位置项cssRules中插入规则。

document.styleSheets表示文档中可用的样式表集合。 这个集合中的length属性保存着文档中样式表的数量。而每个样式表都可以使用中括号或item()方法获取。
``` js
for (let i = 0; i < document.styleSheets.length; i++) {
	sheet = document.styleSheets[i]
	console.log(sheet.href);
}
// file:///D:/study-git/JavaScriptStudy/3-code-professional-javascrpt-for-web-develeopment/16-DOM2%E5%92%8CDOM3/06-css.css
// null  这个是指<style>标签
```
通过<link\>或<style\>属性也可以直接获取CSSStyleSheet对象。DOM在着两个元素上暴露了sheet属性，其中包含对应的CSSStyleSheet对象。
``` js
const link = document.querySelector('#link')
console.log(link.sheet);
```
### CSS规则
CSSRule类型表示样式表中的一条规则。这个类型是一个通用基类，很多类型都继承它，但其中最常用的是表示样式信息的CSSStyleRule(其他CSS规则还有@import,@font-face,@page和@chartset等,不过这些规则很少需要使用脚本来操作)以下是CSSStyleRule对象上可用的属性。
+ cssText, 返回整条规则的文本。这里的文本可能与样式表中实际的文本不相同。因为浏览器内部处理样式表的方式不一样。
+ parentRule，如果这条规则被其他规则包含，则指向包含规则(如@media)，否则就是null。
+ parentStyleSheet, 包含当前规则的样式表。
+ selectorText, 返回规则的选择符文本。 这里的文本可能与样式表中实际的文本不一样，因为浏览器内部处理样式表的方式也不一样。
+ style, 返回CSSStyleDeclaration对象，可以设置和获取当前规则中的样式。
+ type, 数值常量，表示规则类型。对于样式规则，它始终为1。

在这些属性中，使用最多的是cssText、selectorText和style。cssText属性与style.cssText类似。不过前者包含选择符文本和环绕式声明的大括号，而后者则只包含样式声明。此外cssText是只读的，而style.cssText可以被重写。

多数情况下，使用style属性就可以实现操作样式规则的任务了。这个对象可以像每个元素上的style对象一样，用来读取或修改规则的样式。
``` js
		const sheet = document.styleSheets[0]
		const rules = sheet.cssRules || sheet.rules // 看来和浏览器有关,获取可能报错和跨域有关。
		const rule = rules[0]
		console.log(rule.selectorText); // body
		console.log(rule.cssText); // body { background-color: rgb(238, 238, 238); }
		console.log(rule.style.cssText); // background-color: rgb(238, 238, 238);
		console.log(rule.style.backgroundColor); // rgb(238, 238, 238)
```
通过style属性可以修改规则中的样式。
``` js
rule.style.backgroundColor = 'black' // 页面背景变为黑色
```
### 创建规则
DOM规定，可以使用insertRule()方法向样式表中添加新规则。这个方法接受两个参数：规则的文本和表示插入位置的索引值。
``` js
sheet.insertRule(".box {width:200px;height:200px}", 0) // 出现红色盒子
```
通过这样添加规则，随着规则的增多，很快会变得很麻烦。这时候，更好的方式是通过14章介绍的动态样式加载技术。
### 删除规则
deleteRule(),该方法接受一个参数：要删除规则的索引。
``` js
sheet.deleteRule(0) // 红色盒子消失
```
## 元素尺寸
### 偏移尺寸(offset dimensions)
偏移尺寸相关属性，包含元素在屏幕上占用的所有视觉空间。 元素在页面上的视觉空间，由其高度和宽度决定，包括所有内边距、滚动条和边框(不包括外边距)。以下四个属性用于取得元素的便宜尺寸。
+ offsetHeight,元素在垂直方向上占用的像素尺寸，包括它的高度、水平滚动条高度和上下边框高度。
+ offsetLeft, 元素在左边框外侧距离包含元素左边框内测的像素数。
+ offsetTop, 元素上边框外侧距离包含元素上边框内测的像素数。
+ offsetWidth, 元素在水平方向上占用的像素尺寸，包括它的宽度、垂直滚动条宽度和左右边框的宽度。

其中,offsetLeft和offsetTop是相对于包含元素的，包含元素保存在offsetParent属性中。offsetParent不一定是parentNode。例如\<td\>元素的offsetParent是其祖先\<table\>，而不是\<tr>,因为table是节点层级中第一个提供尺寸的元素。

要确定一个元素在页面中的偏移量，可以将它的offsetLeft和offsetTop属性分别于offsetParent的相同属性相加，一直加到根元素。
``` js
function getElementLeft(element) {
	console.log(element);
	let actualLeft = element.offsetLeft
	let current = element.offsetParent
	while (current != null) {
		actualLeft += current.offsetLeft
		current = current.offsetParent
	}
	return actualLeft
}
const box = document.querySelector('.box')
console.log(getElementLeft(box)); // 108, body自带8px offsetleft(edge)
```
> 所有的偏移尺寸属性都是只读的，每次访问都会重新计算。因此，应该尽量减少查询它们的次数。例如将查询的值保存在局部变量中，就可以避免影响性能。
### 客户端尺寸
元素的客户端尺寸(client dimensions)包含元素内容及其内边距所占用的空间。客户端尺寸只有两个相关属性:clientWidht和clentHeight.

客户端尺寸实际就是元素内部空间，因此不会包含滚动条占用的空间。 这两个属性常用于确定浏览器视口尺寸。
``` js
// 实际上就是html的宽度和高度
console.log(document.documentElement.clientHeight);
console.log(document.documentElement.clientWidth);
```
> 与偏移尺寸一样，客户端尺寸也是只读的，每次访问都会重新计算。
### 滚动尺寸
最后一组尺寸是滚动尺寸，提供了元素内容滚动距离信息。有些元素，如\<html\>无需任何代码就可以自动滚动，而其他元素需要使用CSS的overflow属性令其滚动。
+ scrollHeight，没有滚动条出现时，元素内容的种高度。
+ scrollLeft, 内容区左侧隐藏的像素数，设置这个属性可以改变元素的滚动位置。
+ scrollTop, 内容顶部隐藏的像素数，设置这个属性可以改变元素的滚动位置。
+ scrollWidth, 没有滚动条出现时，元素内容的总宽度。

scrollWidth和scrollHeight可以用来确定给定元素内容的实际尺寸。
``` js
console.log(document.documentElement.scrollHeight);
console.log(document.documentElement.scrollWidth);
```
在scrollWidth和scrollHeight与clientWidth和clientHeigh在不需要滚动的文档上是分不清的。

scrollLeft和scrollTop属性可以用于确定元素滚动位置，或者用于设置它们的滚动位置。
``` html
<style>
	.box {
		width: 200px;
		height: 200px;
		background-color: red;
		overflow: scroll;
	}

	.box .kid-box {
		width: 2000px;
		height: 2000px;
	}
</style>

<body>
	<div class="box">
		<div class="kid-box"></div>
	</div>
	<button class="button">获取滚动距离</button>
	<button class="set-button">设置滚动距离</button>
	<script>
		const box = document.querySelector('.box')
		const btn = document.querySelector('.button')
		const setBtn = document.querySelector('.set-button')
		btn.addEventListener('click', () => {
			console.log(box.scrollLeft);
			console.log(box.scrollTop);
		})
		setBtn.addEventListener('click', () => {
			box.scrollLeft = '100px'
			box.scrollTop = '100px'
		})
	</script>
</body>
```
### 确定元素尺寸
浏览器在每个元素都暴露了getBoundingClientRect()方法，返回一个DOMRect对象，包含6个属性：left、top、right、bottom、height和width。可在[图](https://mdn.mozillademos.org/files/15087/rect.png)查看。
# 遍历
DOM2 Traversal and Range模块定义了两个类型用于辅助顺序遍历DOM结构。这两个类型:NodeIterator和TreeWalker————从某个起点开始执行对DOM结构的深度优先遍历。

如前所诉，DOM遍历是对DOM结构的深度优先遍历。至少允许朝两个方向移动(取决于类型)。遍历以给定节点为根，不能在DOM中向上超越这个根节点。

DOM中的任何节点都可以作为遍历的根节点。 遍历会从根节点开始进行深度遍历，在到达最后的节点后，遍历会在DOM树种反向回收。
## NodeIterator
NodeIterator类型是两种类型中比较简单的，可以通过document.createNodeIterator()方法创建实例，该方法接受四个参数：
+ root, 作为遍历的根节点。
+ whatToShow, 数值代码，表示应该访问那些节点。
+ filter, NodeFilter对象或函数，表示是否接受或跳过特定节点。
+ entityReferenceExpansion, 布尔值，表示是否扩展实体引用。这个参数在HTML文档中没有效果，因为实体引用永远不拓展。

whatToShow参数是一个位掩码，通过应用一个或多个过滤器来指定访问哪些节点。这个参数对应的常量在NodeFilter类型中进行的定义。
+ NodeFilter.SHOW_ALL，所有节点。
+ NodeFilter.SHOW_ELEMENT，元素节点。
+ NodeFilter.SHOW_ATTRIBUTE，属性节点。由于DOM的结构，因此实际上用不上。
+ NodeFilter.SHOW_TEXT，文本节点。
+ NodeFilter.SHOW_CDATA_SECTION, CData区块节点。不是在HTML页面中使用的。
+ NodeFilter.SHOW_ENTITY_REFERENCE，实体引用节点。不是在HTML页面中使用的。
+ NodeFilter.SHOW_ENTITY，实体节点。不是在HTML页面中使用的。
+ NodeFilter.SHOW_PROCESSING_INSTRUCTION，处理指令节点。不是在HTML页面中使用的。
+ NodeFilter.SHOW_DOCUMENT，文档节点。
+ NodeFilter.SHOW_DOCUMENT_TYPE，文档类型节点。
+ NodeFilter.SHOW_DOCUMENT_FRAGMENT，文档片段节点。不是在HTML页面中使用的。
+ NodeFilter.SHOW_NOTATION，记号节点。不是在HTML页面中使用的

上述这些值除了NodeFilter.SHOW_ALL之外，都可以组合使用。如下，可以通过按位或操作组合多个选项。
``` js
let whatToShow = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
```
filter参数可以用来指定自定义NodeFilter对象，或者作为一个节点过滤器函数。 NodeFilter对象只有一个acceptNode()，若应该返回节点就返回NodeFilter.FILTER_ACCEPT,否则返回NodeFilter.FILTER_SKIP。 因为NodeFilter是一个抽象类型，所以不可能创建它的实例。以下代码定义了只接受<p\>元素的节点过滤器对象：
``` js
let filter = {
	acceptNode(node) {
		return node.tagName.toLowerCase = "p" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
	}
}
let iterator = document.createNodeIterator(document.documentElement, NodeFilter.SHOW_ELEMENT, filter, false)

//  filter也可以是一个函数，直接作为acceptNode
let filter = function (node) {
	return node.tagName.toLowerCase = "p" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
}
let iterator = document.createNodeIterator(document.documentElement,NodeFilter.SHOW_ELEMENT,filter,false)
```
若是不需要过滤函数，可以给这个参数传入null

要创建一个简单的遍历所有节点的NodeIterator，可以使用以下代码
``` js
// 简单的遍历所有节点的NodeIterator
let iterator = document.createNodeIterator(document,NodeFilter.SHOW_ALL,null,false)
```
NodeIterator的两个主要方法是nextNode()和previoursNode().通过这两个函数可以在节点间通过深度遍历的顺序进行移动。当到达结尾或者开头时，会返回null. 第一次调用nextNode()时会返回根节点,看样子是NodeIterator内部维护了一个指针，下例
``` html
<body>
	<h1>hello world</h1>
	<div>
		<li>list item 1</li>
		<li>list itme 2</li>
		<li>list item 3</li>
	</div>
	<script>
		const iterator = document.createNodeIterator(
			document.body,
			NodeFilter.SHOW_ELEMENT,
			null,
			false
		);
		let node = iterator.nextNode();
		while (node != null) {
			console.log(node.tagName);
			node = iterator.nextNode()
		}
 		// BODY
 		// H1
 		// DIV
 		// LI
 		// SCRIPT
	</script>
</body>
```
通过传入filter，遍历只会输出<li\>元素的标签。
``` js
const filter = function (node) {
	return node.tagName.toLowerCase() === 'li' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
}
const iteratorNode = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, filter, false)
let filterNode = iteratorNode.nextNode()
while (filterNode != null) {
	console.log(filterNode.tagName);
	filterNode = iteratorNode.nextNode()
}
// 3个 LI 
```
## TreeWalker
TreeWalker除了包含同样的nextNode(),previousNode()方法，其还添加了DOM结构中向不同方向遍历的方法。<-- 突然发现这里有点像处理文件时的指针。
+ parentNode(),遍历到当前节点的父节点。
+ firstChild(),遍历到当前节点的第一个子节点。
+ lastChild(),遍历到当前节点的最后一个子节点。
+ nextSibling(),遍历到当前节点的下一个同胞节点。
+ previousSibiling(),遍历到当前节点的上一个同胞节点。

TreeWalker对象要调用document.createTreeWalker()方法来创建，这个方法于document.createNodeIterator()同样的参数。因为二者很类似，所以TreeWalker通常可以取代NodeIterator。
``` js
const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false)
let treeWalkerNode = treeWalker.nextNode()
while (treeWalkerNode != null) {
	console.log(treeWalkerNode.tagName);
	treeWalkerNode = treeWalker.nextNode()
}
// H1
// DIV
// LI * 3
// SCRIPT
```
不同的是，节点过滤器(filter)除了可以返回NodeFilter.FILTER_ACCEPT和NodeFilter.FILTER_SKIPm还可以返回NodeFilter.FILTER_REJECT。在使用NodeIterator时，SKIP和REJECT是相同的，但在TreeWalker时，SKIP表示跳过节点。而REJECT则是跳过整个子树。

当然TreeWalker增强的地方在于可以在DOM结构中游走。如下例
``` js
const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false)
let walkerNode = treeWalker.nextNode()
walkerNode = treeWalker.nextSibling()
walkerNode = treeWalker.firstChild()
while (walkerNode != null) {
	console.log(walkerNode.tagName);
	walkerNode = treeWalker.nextSibling()
}
// LI * 3
```
TreeWalker类型也有一个名为currentNode的属性，表示遍历过程中上一次返回的节点。可以通过修改这个属性来影响接下来遍历的起点。
``` js
// ...接上文代码
console.log(treeWalker.currentNode.tagName); // LI
treeWalker.currentNode = document.body
console.log(treeWalker.nextNode().tagName); // H1
```
# 范围
DOM2 Traversal and Range模块定义了范围接口。范围可用于在文档中选择内容，而不用考虑节点之间的界限。
## DOM范围
DOM2在document上定义了createRange()方法。该方法创建一个DOM范围对象。

与节点类似，这个范围对象是与创建它的文档相关的。 使用这个范围在后台选择文档中特定部分。创建并指定它的位置之后，可以对范围的内容执行一些操作，从而实现对底层DOM树更精细的控制。

每个范围范围都是Range类型的实例，拥有相应的属性和方法。下面的属性提供了与范围在文档中位置相关的信息。
+ startContainer, 范围起点所在节点(选取中第一个子节点的父节点)。
+ starOffset, 范围起点在startContainer中的偏移量。如果startCOntainer是文本节点、注释节点或CData区块节点，则startOffser指范围起点之前跳过的字符数。否则，表示范围中第一个节点的索引。
+ endContainer, 范围终点所在的节点(选区中最后一个子节点的父节点)
+ endOffset, 范围起点在startContainer中的偏移量
+ commonAncestorContainer,文档中以startContainer和endContainer为后代的最深的节点。

这些属性会在范围被放到文档中特定位置时获得相应的值。
## 简单选择
通过范围选择文档中某个部分的两个简单方法：selectNode()和selectNodeContents(),二者都接受一个节点作为参数。 前者选择整个节点，后者只选择后代节点。
``` html
<body>
	<p id="p1"><b>Hello</b>world !</p>
	<script>
		const range1 = document.createRange(),
			range2 = document.createRange(),
			p1 = document.getElementById('p1')
		range1.selectNode(p1)
		range2.selectNodeContents(p1)

		// 在调用selectNode()时，startContainer，endContainer,commonAncestorContainer都等于传入节点的父节点。
		console.log(range1.startContainer);// body节点
		console.log(range1.endContainer);// body节点
		console.log(range1.commonAncestorContainer);// body节点
		console.log(range1.startOffset); // 1 返回范围第一个节点在其父节点的索引  因为索引为0的节点是 文本节点
		console.log(range1.endOffset); // 2 因为只选择了一个节点，因此索引为 startOffset + 1, <--因为只有两个节点吧,一个文本节点+一个选择的节点

		// 调用selectNodeContents()时，前三个属性都为传入的节点。 startOffset属性值始终为0，因为范围是从传入节点的第一个子节点开始，而endOffset等于传入节点的子节点数量，在该例子中等于2
		console.log(range2.startContainer);// p节点
		console.log(range2.endContainer);// p节点
		console.log(range2.commonAncestorContainer);// p节点
		console.log(range2.startOffset); // 0
		console.log(range2.endOffset); // 2
	</script>
</body>
```
在选定节点或节点后代后，可以在范围上调用相应方法，实现对范围中选区更精细的控制。
+ setStartBefore（refNode），把范围的起点设置到refNode之前，从而让refNode成为选区的第一个子节点。startContainer属性被设置为refNode.parentNode，而startOffset属性被设置为refNode在其父节点childNodes集合中的索引。
+ setStartAfter（refNode），把范围的起点设置到refNode之后，从而将refNode排除在选区之外，让其下一个同胞节点成为选区的第一个子节点。startContainer属性被设置为refNode.parentNode, startOffset属性被设置为refNode在其父节点childNodes集合中的索引加1。
+ setEndBefore（refNode），把范围的终点设置到refNode之前，从而将refNode排除在选区之外、让其上一个同胞节点成为选区的最后一个子节点。endContainer属性被设置为refNode. parentNode, endOffset属性被设置为refNode在其父节点childNodes集合中的索引。
+ setEndAfter（refNode），把范围的终点设置到refNode之后，从而让refNode成为选区的最后一个子节点。endContainer属性被设置为refNode.parentNode, endOffset属性被设置为refNode在其父节点childNodes集合中的索引加1。

在调用这些方法时，所有属性都会被重新赋值。不给为了实现复杂选区，也可以直接修改这些属性的值。
## 复杂选择
要创建复杂的范围，需要使用setStart()和setEnd()方法。这两个方法接受两个参数:参照节点和偏移量。对setStart()来说，参照节点会称为startContainer，而偏移量会赋值给startOffset。对setEnd()而言，参照节点会称为endContainer，而偏移量会赋值给endOffset。

使用这两个方法，可以模拟selectNode()和selectNodeContents()的行为。比如：
``` html
<body>
	<p id="p1"><b>Hello</b>world !</p>
	<script>
		let range1 = document.createRange(),
			range2 = document.createRange(),
			p1 = document.getElementById('p1'),
			p1Index = -1,
			i,
			len;
		for (i = 0, len = p1.parentNode.childNodes.length; i < len; i++) {
			if (p1.parentNode.childNodes[i] == p1) {
				p1Index = i;
				break
			}
		}
		range1.setStart(p1.parentNode, p1Index)
		range1.setEnd(p1.parentNode, p1Index + 1)
		range2.setStart(p1, 0)
		range2.setEnd(p1, p1.childNodes.length)
	</script>
</body>
```
setStart()和setEnd()的真正用处在于选择节点中的某个部分。

如下例选择"Hello"中"llo"至"wrold !"中的"o"部分
``` html
<p id="p1"><b>Hello</b>world !</p>I
```
``` js
let p1 = document.getElementById('p1'),
	helloNode = p1.firstChild.firstChild,
	worldNode = p1.lastChild

console.log(helloNode);
console.log(worldNode);
const range = document.createRange()
range.setStart(helloNode, 2)
range.setEnd(worldNode, 3)
```
## 操作范围
创建范围后，浏览器会在内部创建一个文档片段节点(DocumentFragment)。为操作范围内的内容，选取中的内容的格式必须完好。在前面的例子中，因为范围的起点和终点都在文本节点内部，并不是完整的DOM结构，所以无法在DOM中表示。不过范围能够确定缺失的开始和结束标签，从而可以重构出有效的DOM结构，以便后续操作。

以前面的例子为例，可以发现范围选区中缺少一个开始的<b\>标签，因此会在**后台**动态的补上这个标签，同时还需要补上"He"的结束标签</b\>,之后获取的DOM结构如下,其中的world会被拆成两个文本节点一个"wo"一个"rld !"
``` js
<p><b>He</b><b>llo</b>world !</p>
```
在创建了范围后，就可以使用方法来操作范围的内容了。(值得注意的是，在documentFragment内的所有节点，都是对应文档中相应documentFragment节点的指针，也就是说修改了文档片段就会修改原DOM树的内容)

deleteContents(),该方法会从文档中删除范围包含的节点。
``` js
let p1 = document.getElementById('p1'),
	helloNode = p1.firstChild.firstChild,
	worldNode = p1.lastChild

console.log(helloNode);
console.log(worldNode);
const range = document.createRange()
range.setStart(helloNode, 2)
range.setEnd(worldNode, 3)
range.deleteContents() 
```
执行上面的代码后，页面中的HTML会变为如下
``` html
<p><b>He</b>rld !</p>
```
如前文所说，因为之前确定range的时候后台修改了DOM结构，因此即使删除range，剩下的DOM结构仍然是完整的。

extractContents()和deleteContents()很类似，也会从文档中移除选区，不给该方法会返回对应的文档片段。这样就可以将选中的内容插入文档中的其他地方了,如下代码(该代码之前的代码与前文类似)
``` js
// ...
const documentFragment = range.extractContents();
p1.parentNode.appendChild(documentFragment)
```
在上文代码执行后，页面DOM结构会变为如下
``` html
<p><b>He</b>rld !</p> <b>llo</b>wo
```
如果不想把range从代码中移除，也可以使用cloneContents()创建一个副本,然后将这个副本插入到文档其他地方。
``` js
const fragment = range.cloneContents()
p1.parentNode.appendChild(fragment)
```
``` html
<p><b>Hello</b>world !</p>
<b>llo</b>wo
```
> 需要注意的是，为保持结构完好而拆分节点的操作，只有在调用方法的时候才会发生。 DOM被修改之前，原始HTML会一直保持不变
## 范围插入
初始html
``` html
<p id="p1"><b>Hello</b>world !</p>
```
使用下例代码进行节点插入操作(insertNode()方法)
``` js
let p1 = document.getElementById('p1'),
	helloNode = p1.firstChild.firstChild,
	worldNode = p1.lastChild

const range = document.createRange()
range.setStart(helloNode, 2)
range.setEnd(worldNode, 3)

let span = document.createElement("span")
span.style.color = "red"
span.append(document.createTextNode('Inserted text'))
range.insertNode(span)
```
在运行以下代码后，html会变为
``` html
<p><b>He<span style="color:red">Inserted text</span>llo</b>world !</p>
```
> 在插入后，span元素插入到了"Hello"的"llo"之前，也就是range之前，但是原始的HTML并没有添加或删除<b\>元素(因为这里并没有使用之前提到的方法)。
除了向范围内插入内容，还可以使用surroundContents()方法包裹范围内容。该方法接受一个参数，即包含范围内容的节点。调用这个方法，后台会执行如下操作：
1. 提取出范围的内容。
2. 在原始文档中范围之前所在的位置插入给定节点。
3. 将范围对应文档片段的内容添加给定节点。
``` html
<p><span style="background-color:yellow"><b>Hello</b></span>world !</p>
```
为了插入<span\>元素，范围中必包含完整的DOM结构。如果范围中包含部分选择的非文本节点,这个操作会失败并报错。另外，如果给定的节点是Document、DocumentType或DocumentFragment类型，也会导致抛出错误。
``` js
const range = document.createRange()
range.setStart(helloNode, 2)
range.setEnd(worldNode, 3)

let span = document.createElement('span')
span.style.backgroundColor = "yellow"
range.surroundContents(span)
// Uncaught DOMException: Failed to execute 'surroundContents' on 'Range': The Range has partially selected a non-Text node.
```
## 范围折叠
如果范围没有下选择文档中的任何部分，则称为折叠(collapsed).折叠范围有点类似文本框：如果文本框中有文本，则可以用鼠标选中以高亮显示全部文本，这时候，如果在单击鼠标，则选区会被移除，光标会落在某两个字符中间。而在折叠范围时，位置会被设置为范围与文档交界的地方，可能是范围选区的开始处，也可能是结尾处。

折叠范围可以使用collapse()方法，这个方法接受一个参数：布尔值，表示折叠到哪一端。ture表示折叠到起点，false表示折叠到终点。要确定范围是否已经被折叠，可以检测范围是否已经被折叠，可以检测范围的collapsed属性：
``` js
console.log(range.collapsed); // false
range.collapse()
console.log(range.collapsed); // true
```
测试范围是否被折叠，能够帮助确定范围中的两个节点是否相邻。例如以下HTML代码:
``` html
<p id='p2'>Paragraph 1</p>
<p id='p3'>Paragraph 2</p>
<script>
	const p2 = document.querySelector('#p2'),
		p3 = document.querySelector('#p3'),
		range2 = document.createRange()
	range2.setStartBefore(p2)
	range2.setStartAfter(p3)
	console.log(range2.collapsed); // true
```
因为p2后面和p3前面没有内容，所以两个节点是相邻的。
## 范围比较
如果有多个范围，则可以使用compareBoundaryPoints()方法确定范围之间是否存在公共边界(起点或终点).这个方法接受两个参数:要比较的范围和一个常量值，表示比较的方式。这个常量参数包括：
+ Range.START_TO_START(0),比较两个范围的起点。
+ Range.START_TO_END(1)，比较一个范围的起点和第二个范围的终点。
+ Range.END_TO_END(2), 比较两个范围的终点。
+ Range.END_TO_START(3), 比较第一个范围的终点和第二个范围的起点。

compareBoundaryPoints()方法在第一个范围的边界点位于第二个范围的边界点之前返回-1，两个范围的边界点相等时返回0，在第一个范围的边界点位于第二个range的边界点之后返回1。 
``` js
	<p id="p1"><b>Hello</b>world !</p>
	<script>
		const range1 = document.createRange()
		const range2 = document.createRange()
		const p1 = document.getElementById("p1")
		range1.selectNodeContents(p1)
		range2.selectNodeContents(p1)
		range2.setEndBefore(p1.lastChild)
		console.log(range1.compareBoundaryPoints(Range.START_TO_START, range2)); // 0
		console.log(range2.compareBoundaryPoints(Range.END_TO_END, range1)); // -1
	</script>
```
## 复制范围
通过调用cloneRange()方法可以复制范围。
``` js
const newRange = range.cloneRange()
```
新范围包含与原始范围一样的属性，但修改其边界点不会影响其原始范围。
> cloneRange()和cloneContents()区别在于，前者返回的是range对象，后者返回的是documentFragment
## 清理
在使用完范围后，最好调用detach()方法将范围从创建它的文档中剥离。调用detach()之后，就可以放心解除范围的引用，以便垃圾回收程序释放其占用的内存。
``` js
range.detach() // 从文档中比例范围
range = null // 接触引用
```