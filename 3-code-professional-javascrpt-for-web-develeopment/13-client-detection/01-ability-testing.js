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
// Geolocation API
// navigator.geolocation.getCurrentPosition((p) => {
// 	// 表示查询事件的时间戳和包含坐标信息的Coordinates
// 	console.log(p.timestamp);
// 	console.log(p.coords);
// 	// coords包含经度纬度，以及以米为单位的精度。
// 	console.log(p.coords.latitude, p.coords.longitude);
// 	console.log(p.coords.accuracy);
// 	// coords还有一些如altitude,altidudeAccuray,speed属性，需要硬件支持，否则为空。
// })


// positionError
// navigator.geolocation.getCurrentPosition(() => { }, (pError) => {
// 	console.log(pError);
// })


// navigator.geolocation.getCurrentPosition(() => { }, () => { }, {
// 	// 布尔值，true表示返回值应该尽量准确，默认值为false。默认情况下，设备通常会选择最快、最省电的方式返回坐标。
// 	enableHighAccuracy: false,
// 	// ms，表示调用错误回调函数之前等待的最长时间。以下为默认值
// 	timeout: 0xFFFFFFFF,
// 	// ms,表示返回坐标的最长有效期。因为查询设备位置会消耗资源，所以系统会缓存坐标并在下次返回缓存的值。Infinity会阻止系统重新查询,默认值为0
// 	maximumAge: 0
// })



// 网络连接状态API
// const connectStateChange = () => console.log(navigator.onLine);
// window.addEventListener('online', connectStateChange)
// window.addEventListener('offline', connectStateChange)



// Battery Status API
// navigator.getBattery().then((b) => console.log(b))
// {
// 	// Battery包含四个只读属性，提供了设备电池的相关信息。
// 	charging: false //布尔值，表示设备是否正接入电源充电。如果设备没有电池，则返回true
// 	chargingTime: Infinity //整数，表示距离电池充满还有多少秒
// 	dischargingTime: Infinity // 表示预计电量耗尽还有多少秒.
// 	level: 0.97 // 浮点数，表示电量百分比

// 	// 还提供4个事件属性,用于设置在在相应电池事件发生时调用的回调函数
// 	onchargingchange: null  // 充电状态变化
// 	onchargingtimechange: null // 充电时间变化
// 	ondischargingtimechange: null // 放电时间变化
// 	onlevelchange: null // 电量百分比变化
// }



// 硬件
console.log(navigator.hardwareConcurrency); // 4
console.log(navigator.deviceMemory); // 8
console.log(navigator.maxTouchPoints); // 0