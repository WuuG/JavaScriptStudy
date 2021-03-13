window.addEventListener('load', function () {
    var preview_img = document.querySelector('.preview_img')
    var mask = document.querySelector('.mask')
    var big = document.querySelector('.big')
    var big_img = big.firstElementChild;
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block'
        big.style.display = 'block'
        preview_img.addEventListener('mousemove', function (e) {
            var maskTop = e.pageY - preview_img.offsetTop - mask.offsetHeight / 2;
            var maskLeft = e.pageX - preview_img.offsetLeft - mask.offsetWidth / 2;
            // console.log(maskTop, maskLeft);
            var maskBoundary = preview_img.offsetHeight - mask.offsetHeight - 1
            maskTop = maskTop < 0 ? 0 : maskTop;
            maskTop = maskTop > maskBoundary ? maskBoundary : maskTop
            maskLeft = maskLeft < 0 ? 0 : maskLeft;
            maskLeft = maskLeft > maskBoundary ? maskBoundary : maskLeft
            var bigImgBoundary = big.offsetHeight - big_img.offsetHeight;
            var bigImgTop = maskTop * bigImgBoundary / maskBoundary
            var bigImgLeft = maskLeft * bigImgBoundary / maskBoundary
            // console.log(bigImgTop);
            mask.style.top = maskTop + 'px'
            mask.style.left = maskLeft + 'px'
            big_img.style.top = bigImgTop + 'px';
            big_img.style.left = bigImgLeft + 'px'
        })

    })
    preview_img.addEventListener('mouseout', function (e) {
        mask.style.display = 'none'
        big.style.display = 'none'

    })
})