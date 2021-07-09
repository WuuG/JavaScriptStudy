- [节点层级](#节点层级)
	- [Node类型](#node类型)
		- [nodeName和nodeValue](#nodename和nodevalue)
		- [节点关系](#节点关系)
		- [操纵节点](#操纵节点)
		- [其他方法](#其他方法)
	- [Document类型](#document类型)
		- [文档子节点](#文档子节点)
		- [文档信息](#文档信息)
		- [定位元素](#定位元素)
		- [特殊集合](#特殊集合)
		- [DOM兼容性测试](#dom兼容性测试)
		- [文档写入](#文档写入)
	- [Element类型](#element类型)
# 节点层级
任何HTML或XML都可以用DOM表示为一个节点构成的层级结构。

其中document节点表示每个文档的根节点。根节点的唯一子节点是\<html>元素，称之为文档元素(documentElement).文档元素是文档最外层的元素，所有其他元素都存在于这个元素之内。

HTML中的每段标记都可以表示为这个属性结构的一个节点。元素节点表示HTML元素，属性节点表示属性<--还有属性节点？>,文档类型节点表示文档类型，注释节点表示注释。DOM中总共有12种节点类型，这些类型都继承一种基本类型。
## Node类型
DOM Level1描述了名为Node的接口，这个接口是所有DOM节点类型都必须实现的。Node接口在Javascript中被实现为Node类型。在Javascript中，所有节点类型都继承Node类型，因此所有类型都共享相同的基本属性和方法。

每个节点都有nodeType属性，表示该节点的类型。节点类型由定义在Node类型上的12个数值常数表示
+ Node.ELEMENT_NODE（1）
+ Node.ATTRIBUTE_NODE（2）
+ Node.TEXT_NODE（3）
+ Node.CDATA_SECTION_NODE（4）
+ Node.ENTITY_REFERENCE_NODE（5）
+ Node.ENTITY_NODE（6）
+ Node.PROCESSING_INSTRUCTION_NODE（7）
+ Node.COMMENT_NODE（8）
+ Node.DOCUMENT_NODE（9）
+ Node.DOCUMENT_TYPE_NODE（10）
+ Node.DOCUMENT_FRAGMENT_NODE（11）
+ Node.NOTATION_NODE（12）

节点类型可以通过与这些常量(也可以直接用整数)比较来确定
``` js
someNode = document.body
if (someNode.nodeType == Node.ELEMENT_NODE) {
	console.log("Node is an element");
}
```
浏览器并不支持所有节点类型。开发者最常用到的是元素节点和文本节点
### nodeName和nodeValue
nodeName与nodeValue保存着有关节点的信息。这两个属性的值完全取决于节点类型。在使用这两个属性前，最好先检测节点类型。
``` js
// 先检查元素是不是元素，如果是则进行赋值。 对元素而言，nodeName始终等于元素的标签名，而nodeValue则始终为null
someNode = document.body
if (someNode.nodeType == 1) {
	value = someNode.nodeName
	console.log(value); // Body
	console.log(someNode.nodeValue); // null
}
```
### 节点关系
文档中的所有节点都与其他节点有关系。这些关系可以形容为家族关系。

每个节点都有一个childNodes属性，其中包含一个NodeList的实例。NodeList是一个类数组对象，用于存储可以按位置存取的有序节点。NodeList对象独特的地方在于，它其实是一个对DOM结构的查询，因此DOM结构的变化会自动的在NodeList中反映出来。

可以使用中括号和item()方法访问NodeList中的元素
``` js
const body = document.body
const firstChild = body.childNodes[0]
const secondChild = body.childNodes.item(1)
const count = body.childNodes.length
console.log(firstChild, secondChild, count); //#text div 4
```
因为其是一个类数组对象，所以可以通过Array.prototype.slice()将NodeList对象转换为数组。
``` js
const arrayOfNodes = Array.prototype.slice.call(bodyNode.childNodes, 0)
console.log(arrayOfNodes); // [text, div, text, script]
```
当然ES6的Array.from()静态方法，会比上面的方法更简洁。
``` js
const arrayOfNodes = Array.from(bodyNode.childNodes)
console.log(arrayOfNodes); // [text, div, text, script]
```
每个节点都有一个parentNode属性，指向其DOM树的父元素。childNodes中的所有节点都有同一个父元素。使用previousSibling和nextSibling可以在这个列表的节点间导航。 这个列表中第一个节点的previousSibling和最后一个节点的nextSibling属性也是null.
``` js
if (bodyNode.nextSibling === null) {
	console.log('last node in list'); // last node in list
}
if (bodyNode.previousSibling === null) { // #text
	console.log('fist node in list');
}
```
父节点和它的第一个最后一个节点也有专门属性：firstChild和lastChild分别指向childNodes中的第一个和最后一个子节点。如果只有一个节点，则这两者是指向同一个节点的。 若没有子节点则二者为null。 需要注意的是someNode.firstChild的值始终等于someNode.childNodes[0]<--因为是动态获取的吧。

通过前面的一些方法，几乎可以访问到文档树中的任何节点。

hasChildNodes()和ownerDocuments
``` js
// 查询是否有子节点
bodyNode.hasChildNodes() // true
// 所有节点节点都共享的关系。ownerDocument属性是一个指向代表整个文档节点的指针。
console.log(bodyNode.ownerDocument); // #document
```
### 操纵节点
因为所有关系指针都是只读的，所以DOM提供了一些操纵节点的方法。最常用的方法是appenChild(),用于在childNodes列表末尾添加节点。添加新节点相关的关系指针，包括父节点和之前的最后一个子节点。
``` js
let newNode = document.createElement('p')
newNode.innerHTML = '测试'
bodyNode.appendChild(newNode)
```
如果把文档中已经存在的节点传给
``` js
let test = document.querySelector('#test')
console.log(bodyNode.lastChild === test); // false
bodyNode.appendChild(test)
console.log(bodyNode.lastChild === test); // true
```
如果要把节点放到childNodes中的特定位置而不是末尾，则可以使用insertBefor()方法。这个方法接受两个参数：要插入的节点和参照节点。调用这个方法后，要插入的节点会变成参照节点的前一个同胞节点,并被返回。如果参照节点是null,则insertBefore()于appendChild()效果相同。
``` js
let newNode = document.createElement('div')
newNode.innerHTML = '测试'
let test = document.querySelector('#test')
bodyNode.insertBefore(newNode, test) // 插入到test节点之前了
```
appendChild()和insertBefore()在出入节点时不会删除任何已有节点。相对的，replaceChild()方法接受两个参数：要插入的节点和替换的节点。要替换的节点会被返回并从文档书中完全移除。

replaceChild()插入一个节点后，所有关系指针都会从替换的节点复制过来。虽然被替换的节点从技术上来说仍被同一个文档所拥有，但文档中已经没有它的位置。
``` js
let newNode = document.createElement('div')
newNode.innerHTML = '测试'
let test = document.querySelector('#test')
let returnNode = bodyNode.replaceChild(newNode, test)  // test被newNode替换，且返回test节点
console.log(returnNode === test); // true
```
removeChild()移除节点。该方法接受一个参数：要移除的节点

同replaceChild()相同，通过removeChild()被移除的节点从技术上说仍被一个文档所拥有，但文档中已经没有它的位置了<--这啥意思,删除和替换后此节点还存在文档中吗？
``` js
let firstChild = bodyNode.firstElementChild
const returnNode = bodyNode.removeChild(firstChild) // 删除第一个元素节点
console.log(firstChild === returnNode); // true
```
> 上面的4个方法都用于操纵某个节点的子元素，因此必须先取得父节点。并非节点类型都有子节点，若是在不支持子节点的节点上调用方法，则会抛出错误。
### 其他方法
所有节点类型还共享了两个方法。第一个cloneNode(),会返回与调用它的节点一模一样的节点。cloneNode()方法接受boolean，表示是否进行深复制。复制返回的文档所在，但未指定父节点，所以称为孤儿节点(orphan)
+ true: 进行深复制，即复制节点及其整个子DOM树
+ false：浅复制，只会复制调用该方法的节点。
``` js
const ul = document.querySelector('ul')
const deepList = ul.cloneNode(true)
console.log(deepList.childNodes.length); // 7
const shallowList = ul.cloneNode()
console.log(shallowList.childNodes.length); // 0
```
> cloneNode()方法不会复制添加到DOM节点的Javascript属性，比如时间处理程序。这个方法只复制HTML属性，以及可选地复制子节点。

normalize()。这个方法处理文档子树中的文本节点。 由于解析器实现的差异，或DOM操作等原因，可能出现并不包含文本的文本节点，或文本节点之间互为同胞关系。在节点上调用normalize()方法会检测这个节点所有后代。会删除空文本节点，合并同胞文本节点。
## Document类型
Document类型是JavaScript中表示文档节点的类型。在浏览器中，文档对象docuemnt是HTMLDocument的实例，表示整个HTML页面。document是window对象的属性，因此是一个全局对象。Document类型的节点有以下特征：
+ nodeType等于9
+ nodeName值为"#document"
+ nodeValue值为null
+ parentNode值为null
+ ownerDocument值为null
+ 子节点可以是DocumentType(最多一个)、Element(最多一个)、ProcessingInstruction或Comment类型

Document类型可以标识HTML页面或其他XML文档，但最常用的还是通过HTMLDocument的实例获取document对象。document对象可用于获取获取关于页面的信息以及操纵器外观和底层结构。
### 文档子节点
document.Element属性，始终指向HTML页面中的\<html>元素,也可以直接用childNodes获取（但是不太方便）
``` js
console.log(document.documentElement); // 指向html节点
console.log(document.childNodes[1] === document.documentElement); // true
```
document还有一个body元素，因为body是开发者常用的元素。

Document类型另一种可能节点是DocumentType。<! doctype>标签是文档中独立的部分，其信息可以通过doctype属性来访问。
``` js
console.log(document.doctype); // <!DOCTYPE html>
```
另外，\<html>元素外的注释也是文档的子节点。他们的类型是Comment.不过由于浏览器实现不同，这些注释不一定能被识别，或者表现可能不一致。

一般来说appendChild()、removeChild()和replaceChild()方法不会用在document对象上。因为文档类型是只读的，而且只能由一个Element类型的子节点(即\<html>)。
### 文档信息
document作为HTMLDocument的实例，还有一些标准Document对象上没有的属性。这些属性提供浏览器所加载页面的信息。其中第一个属性是title，包含\<title>元素中的文本，通常显示在浏览器窗口和标签页的标题栏。 通过这个属性可以读写页面的标题，修改后的标题也会反映在浏览器标题上。不过修改title属性并不会改变\<title>属性
``` js
let originalTitle = document.title
// 修改文档标题
document.title = 'title test'
```
三个属性URL，domain和referre.其中URL包含当前页面完整的URL，domian包含页面的域名，而referrer包含连接到当前页面的那个页面URL，若是无页面来源，则referrer属性包含空字符串。所有这些信息都可以在请求的HTTP头部信息中获取，只是JavaScript中通过这几个属性暴露出来。

加入是百度的首页 www.baidu.com
``` js
let url = document.URL // "https://www.baidu.com/"
let domain = document.domian  // "www.baidu.com"
let referrer = document.referrer // ""
```
在这些属性中只有domain属性是可以设置的。处于安全考虑，给domain属性设置的值是由限制的。如果URL包含子域名如'p2p.wrox.com'则可以设置为'wrox.com'。不能给这个属性设置URL中不包含的值。
``` js
document.domain = 'baidu.com' // 成功
document.domain = 'www.zhihu.com' // 报错
```
当页面中包含来自某个不同自于的窗格(\<frame>)或内嵌窗格(\<iframe>)时，设置document.domain是有用的。因为跨源通信存在安全隐患，所以不同子域的页面间不发通过Javascript通信。此时，在每个页面上把docuemnt.domain设为相同的值，这些页面就可以访问对方的Javascript对象了。

浏览器对domian属性还有一个限制，就是这个属性一旦放松就不能再收紧。可以详细域名向范围更大的域名改变，不能反过来。<--有待验证
### 定位元素
getElementById(),getElementsByTagNames()用来获取某个或某组元素的引用。

getElementById()接受一个参数，即要获取元素的ID。找到返回元素，没找到返回null。 区分大小写

如果页面中出现多个具有相同ID的元素，则会返回在文档中第一个出现的元素。
``` js
let test = document.getElementById('test')
console.log(test); // <div id="test">测试节点</div>
let test_1 = document.getElementById('Test')
console.log(test_1); // null
```
getElementByTagName()接受一个元素标签名，返回包含零个或多个元素的NodeList(也是实时的列表)。
``` js
const lis = document.getElementsByTagName('li')
console.log([...lis]);//  HTMLCollection(3) [li, li, li]
const li = lis[0].cloneNode()
lis[0].parentNode.appendChild(li)
console.log([...lis]);//  (4) [li, li, li, li] 是动态的
```
通过name可以获取某个元素。对HTMLCollection对象而言，中括号即可以接受数值索引，也可以接受字符串索引，在后台数值索引会调用item()，字符串索引会调用namedItem()
``` js
const lis = document.getElementsByTagName('li')
const li = lis.namedItem('second-li')
console.log(li); // <li name="second-li">2</li>
console.log(lis['second-li'] === li); // true
```
要取得文档中的所有元素，可以给getElementByTagNames()传入*(通配符)。
``` js
const allElements = document.getElementsByTagName('*')
console.log(allElements); // 包含页面内所有元素的THMLCollection对象,顺序为在页面中出现的顺序
```
> 对于document.getElementsByTagName()方法，规范要求区分标签大小写。实际上是不区分的（为了兼容性）。但如果是在XML页面则区分大小写。

getElementsByName() 返回具有给定name属性的所有元素。常用于单选按钮，因为同一字段的单选按钮必须具有相同的name属性。
### 特殊集合
document对象上还暴露了几个特殊集合，这些集合也都是HTMLCollection的实例。这些集合是访问文档中公共部分的快捷方式
``` js
document.anchors  // 带name的<a》元素 废弃
document.applets // 废弃 
document.forms
document.images
document.links // 带href的<a》元素
```
这些特殊集合始终存在于HTMLDocum对象上，与所有HTMLCollection对象一样，会实时更新。
### DOM兼容性测试
由于DOM有多个level和多个部分，因此确定浏览器实现了DOM的那些部分是有必要的。document.implementation属性是一个对象，其中提供了与浏览器DOM实现相关的信息和能力。DOM Level 1在document.implementation上只定义了一个方法，hasFeature().接受两个参数：特性名称和DOM版本。若浏览器支持的特性和版本，则返回ture。
``` js
let hasXmlDom = document.implementation.hasFeature('XML', '1.0') // true 废弃
```
> 该方法以废弃，返回值不可靠。因为实现不一致。虽然主流浏览器仍支持这个方法，但无论检测什么都一律返回true
### 文档写入
document对象有一个古老的能力，即向网页输出流中写入内容。write(),writeln(),open(),close().其中write()和writeln()接受字符串参数，然后将字符串写入网页中。其中writeln()会在末尾追加一个换行符
``` js
document.write('<span>' + (new Date()).toString() + '</span>')
document.writeln('<strong>' + (new Date()).toString() + '</strong>')
```
为了避免错误，不要在写入时直接使用\<script>标签
``` js
<script>
	document.write("<script>" + "</script>") // 错误 ")
</script>
```
修改为下式就不会错误了
``` js
<script>
	document.write("<script>" + "<\/script>")
</script>
```
前面都是在页面渲染期间通过document.write()写入内容,若是在页面加载后再调用，则会重写整个内容。

open()和close()方法分别用于打开和关闭网页输出流。再调用write()和writeln()时，这两个方法都不是必须的。
> 严格的XHTML文档不支持文档写入。对于内容类型为application/xml+xhtml的页面，这些方法无法使用。
## Element类型