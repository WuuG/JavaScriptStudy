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