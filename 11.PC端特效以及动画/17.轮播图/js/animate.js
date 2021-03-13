function animate(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        //不断点击按钮，速度会越来越快，因为开启太多定时器。
        //解决方案：清除以前的定时器就好，仅保留一个定时器。
        var step = (target - obj.offsetLeft) / 10
        //首先需要知道的是，用上面那个公式，不会存在一步跳过目标值的问题，因为setp的绝对值一定小与目标与目前位置的差值。
        //步长存在一个上下取整的问题，若是取整不对的话，会使得step取整取到0，导致没有办法移动，并且也无法清除计时器，导致不断循环。
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // console.log(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)
            //回调函数写到定时器结束后使用，记得判断是否有这个函数
            if (callback) {
                callback();
            }
        }
        //步长公式 （目标值-现在的位置）/10
        obj.style.left = obj.offsetLeft + step + 'px'
    }, 15)
}