window.addEventListener('load', function () {
    //取得的一些变量。
    var focus = document.querySelector('.focus')
    var mainImgs = document.querySelector('.focus_imgs')
    var imgs = mainImgs.children;
    var bar = document.querySelector('.content')
    var lis = bar.children;
    console.log(focus);
    var btnR = focus.querySelector('.btn_r')
    var btnL = focus.querySelector('.btn_l')
    //实现索引栏控制轮播图。
    for (var i = 0; i < imgs.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i)
        li.addEventListener('click', function () {
            if (flag) {
                flag = false;
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = ''
                }
                this.className = 'current'
                var index = this.getAttribute('index')
                num = index;
                animate(mainImgs, -index * focus.offsetWidth, function () {
                    flag = true;
                })
            }
        })
        bar.appendChild(li)
    }
    //pink是如何实现点点的初始化的
    if (lis.length > 0) {
        lis[0].className = 'current'
    }
    //clone一个图片到结尾。
    var img = imgs[0].cloneNode(true)
    mainImgs.appendChild(img)
    //一个节流阀变量，一个用于同步索引栏和图片按钮的变量
    var num = 0;
    // var circle = 0;
    var flag = true;
    //右侧按钮功能
    btnR.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == imgs.length - 1) {
                // console.log(num);
                num = 0;
                mainImgs.style.left = '0px'
            }
            num++;
            // circle = num
            // circle = num > imgs.length - 2 ? 0 : num;
            onInitiLis()
            //因为这里一共需要经过5个图，5个动画效果
            if (num == imgs.length - 1) {
                lis[0].className = 'current'
            } else[
                lis[num].className = 'current'
            ]
            animate(mainImgs, -num * focus.offsetWidth, function () {
                flag = true;
            })
        }
    })
    //左侧按钮功能
    btnL.addEventListener('click', function () {
        if (flag) {
            flag = false
            if (num == 0) {
                num = imgs.length - 1;
                // console.log(num);
                mainImgs.style.left = -focus.offsetWidth * num + 'px'
            }
            num--;
            // circle = num
            // circle = num < 0 ? 0 : num;
            onInitiLis()
            lis[num].className = 'current'
            animate(mainImgs, -num * focus.offsetWidth, function () {
                flag = true;
            })
        }
    })
    //图片的索引栏的排他思想实现
    function onInitiLis() {
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = ''
        }
    }
    //让轮播图自动轮转，在鼠标进入focus后停止，并显示两个按钮
    var timer = setInterval(() => {
        btnR.click()
    }, 2000);
    focus.addEventListener('mouseenter', function () {
        btnR.style.display = 'block'
        btnL.style.display = 'block'
        clearInterval(timer)
        timer = null; //这里清除定时变量，差点忘记了
    })
    focus.addEventListener('mouseleave', function () {
        timer = setInterval(() => {
            btnR.click()
        }, 2000);
    })

})