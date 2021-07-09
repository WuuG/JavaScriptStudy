// // 获取元素的能力检测
// function getElement(id) {
// 	if (document.getElementById) {
// 		return document.getElementById(id)
// 	} else if (document.all) { // IE没有getElementById()这个方法
// 		return document.all[id]
// 	} else {
// 		throw new Error("No way to retrieve element!")
// 	}
// }


// 安全能力检测
// 错误的能力检测,因为只能检测其是否有这个属性。而无法检测其是否可排序
// function isSortable(object) {
// 	return !!object.sort 
// }


// 更好的方式是检测sort是不是函数
// function isSortable(object) {
// 	return typeof object.sort == 'function'
// }



// 基于能力检测进行浏览器分析
// // 检测浏览器是否支持Netscape式的插件
// let hasNSPlugins = !!(navigator.plugins && navigator.plugins.length)
// // 检测浏览器是否具有DOM Level 1 能力
// let hasDOM1 = !!(document.getElementById && document.createElement && document.getElementsByTagName)


// 检测浏览器
// 只读属性，无法简单的修改
// console.log(window.navigator.userAgent);
// window.navigator.userAgent = '123'
// console.log(window.navigator.userAgent);

// 篡改用户代理
// console.log(window.navigator.userAgent);
// window.navigator.__defineGetter__('userAgent', () => 'foobar')
// console.log(window.navigator.userAgent);  // foobar



/**
 * 软件与硬件检测
*/
// console.log(navigator.oscpu); // undefined



// 浏览器元数据
