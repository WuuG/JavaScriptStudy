(function flexible(window, document) {
    //获取 html的根元素
    var docEl = document.documentElement
    //dpr 物理像素比
    var dpr = window.devicePixelRatio || 1

    // adjust body font size
    function setBodyFontSize() {
        //设置body的字体大小
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            //页面中没有body元素。待DOM元素加载完，再设置body字体大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10    设置HTML元素的文字大小
    function setRemUnit() {
        //十等分页面的宽度，一份作为rem的大小
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize    大小发生变化，重新设置rem大小
    window.addEventListener('resize', setRemUnit)
    //pageshoow 是页面重新加载事件。
    window.addEventListener('pageshow', function (e) {
        //若是e.persisted 返回的是true 则说明这个页面是缓存取过来的页面，并重新计算rem大小
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports    有些移动端浏览器不支持0.5像素的写法（这啥意思）
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))