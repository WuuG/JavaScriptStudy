- [使用requestAnimationFrame](#使用requestanimationframe)
	- [早期定时动画](#早期定时动画)
		- [事件间隔的问题](#事件间隔的问题)
		- [requestAnimationFrame](#requestanimationframe)
		- [cancelAnimationFrame](#cancelanimationframe)
		- [通过requestAnimationFrame节流](#通过requestanimationframe节流)
- [基本的canvas](#基本的canvas)
# 使用requestAnimationFrame
## 早期定时动画
早期是使用setInterval()来控制动画的执行。 下面的例子展示了使用setInterval()的基本模式。
``` js
(function () {
	function updateanimations() {
		doAnimation1()
		doAnimation2()
		// ... 其他任务
	}
	setInterval(updateanimations, 100);
})()
```
这种定时动画的问题在于无法准确知晓循环之间的延时。定时间隔必须足够短，这样才能让不同的动画类型都能平滑顺畅，但又要足够长，以便产生浏览器可以渲染出来的变化。

因此，实现平滑动画最佳的重绘间隔为1000毫秒/60(因为计算机显示器的屏幕刷新率一般都是60Hz),大约是17秒。以这个速度重绘可以实现最平滑的动画。这个速度重绘可以实现最为平滑的动画。 如果同时运行多个动画，可能需要加以限流。

虽然使用setInterval()的定时动画比使用多个setTimeout()实现循环效率更高，但也不是没有问题。因为这两个方法都是不能保证事件精度的。
### 事件间隔的问题
随着canvas的流行和HTML5游戏的兴起，开发者发现setInterval()和setTimeout()的不精确是个大问题。

浏览器自身计时器的精度让这个问题雪上加霜。浏览器的计时器精度不足毫秒。每个浏览器的计时器精度都不相同。
### requestAnimationFrame
requestAnimationFrame()方法接受一个参数，此参数是一个要在重绘屏幕前调用的函数。这个函数就是修改DOM样式以反映下一次重绘有什么变化的地方。为了实现多个requestAnimationFrame()调用串联起来，就像以前使用setTimeout()时一样。
``` html
	<style>
		#status {
			width: 10px;
			height: 100px;
			background-color: red;
		}
	</style>
	<div id="status"></div>

	<script>
		function updateProgress() {
			const div = document.getElementById('status')
			const divRule = document.styleSheets[0].cssRules[0]
			divRule.style.width = (parseInt(divRule.style.width, 10) + 5) + '%'
			console.log(divRule.style.width);
			if (divRule.style.width != '100%') {
				requestAnimationFrame(updateProgress)
			}
		}
		requestAnimationFrame(updateProgress)
	</script>
```
通过requestAnimationFrame()只会调用一次传入的函数，所以每次更新用户界面时需要再手动调用一次。同时也需要控制动画何时停止。 结果就会得到非常平滑的动画。

目前为止，requestAnimationFrame()已经解决了浏览器不知道Javascript动画何时开始的问题(手动调用就开始，运行结束就会继续??是这样吗?)，以及最佳间隔是多少的问题。但是，不知道自己的代码何时实际执行的问题呢？这个方案同样也给出了解决方案。

传给requestAnimationFrame()的函数实际上可以接受一个参数，此参数是一个DOMHighRes-TimeStamp的实例(比如performance.now()返回的值),表示下次重绘的时间。这一点非常重要：requestAnimationFrame()实际上已经把重绘任务安排在一个未来一致的时间点上，而且通过这个参数告诉了开发者。基于这个参数就可以更好的决定如何调优动画了。
### cancelAnimationFrame
与setTimeout()类似，requestAnimationFrame()也返回一个请求ID，可以用于通过另一个方法cancelAnimationFrame()来取消重绘任务。下面的例子展示了刚把一个任务加入队列又立即将其取消
``` js
let requestID = window.requestAnimationFrame(() => {
	console.log('Repaint !');
})
window.cancelAnimationFrame(requestID)
```
### 通过requestAnimationFrame节流
在支持该方法的浏览器中会暴露出作为钩子的回调队列。钩子，hook也就是浏览器执行下一次重绘之前的一个点。这个回调队列是一个可修改的函数列表，包含应该在重绘之前调用的函数。每次调用requestAnimationFrame()都会在队列上推入一个回调函数，队列的长度没有限制。

这个回调队列的行为不一定和动画有关。 不过，通过requestAnimationFrame()递归地向队列中加入回调函数，可以保证每次重绘最多只调用一次回调函数。这是一个非常好的节流工具。 在频繁执行影响页面外观的代码时(比如滚动事件监听器),可以利用这个回调队列进行节流。

如下，在滚动时事件会不断被触发：
``` js
function expensiveOperation() {
	console.log('Invoked at', Date.now());
}
window.addEventListener('scroll', () => {
	expensiveOperation()
})
```
因为重绘是非常频繁的操作，所以配合一个计时器可以来限制操作执行的频率，如下：
``` js
let enqueued = true;
function expensiveOperation() {
	console.log('Invoked at', Date.now());
}
window.addEventListener('scroll', () => {
	if (enqueued) {
		enqueued = false
		window.requestAnimationFrame(expensiveOperation)
		window.setTimeout(() => enqueued = true, 50)
	}
})
```
# 基本的canvas
创建canvas元素至少要设置width和height属性，这样才能告诉浏览器在多大面积上绘图。 在标签之间的内容会在浏览器不支持canvas时显示。比如：
``` js
<canvas id="drawing" width="200" height="200">A drawing of something.</canvas>
```
与其他元素一样，width和height属性也可以在DOM节点上设置，因此可以随时修改。整个元素还可以通过CSS添加样式，并且元素在添加样式或实际绘制内容前是可不见的。

要在画布上绘制图形，首先要取得绘图上下文。使用getContext()方法可以获取对绘图上下文的引用。 对于平面图形，需要给这个方法参数"2d",表示要获得2D上下文对象：
``` js
const drawing = document.getElementById('drawing')
if (drawing.getContext) {
	let context = drawing.getContext('2d')
}
```
可以使用toDataURL()方法导出<canvas\>元素上的图像。 这个方法接受一个参数：要生成图形的MIME类型(与用来创建图形的上下文无关)。例如，要从画布上导出一张PNG格式的图片，可以这样做：
``` js
const drawing = document.getElementById('drawing')
if (drawing.getContext) {
	const imgURI = drawing.toDataURL("image/png")
	const image = document.createElement("img")
	image.src = imgURI
	document.body.appendChild(image)
}
```
浏览器默认将图形编码为PNG格式，除非另外指定。Firefox和Opera还支持"image/jpeg"进行JEPG编码。
> 如果画布中的图像是其他域绘制过来的，toDataURL()方法就会抛出错误。