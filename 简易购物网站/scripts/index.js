
function picSlide() {
    //定义全局参数
    var flag = 0;
    var autoSlide = document.getElementById('main_c1_slide');//自动轮播参数
    var selectSlide = document.getElementById('main_c1_selectSlide');//获取手动轮播参数
    var lis = selectSlide.getElementsByTagName('li');//获取手动轮播li标签 


    lis[0].style.backgroundColor = '#f23d0c';//打开网页时，假定轮播第一张图片，设置lis[0]标签背景颜色

    var time = setInterval("slide();", 4000);

    //自动轮播：自动轮播时当有鼠标划入到轮播区域则停止轮播，鼠标移出区域时继续轮播
    autoSlide.onmouseover = function () {
        clearInterval(time);
    }
    autoSlide.onmouseout = function () {
        time = setInterval("slide();", 4000);
    }

    //手动轮播：鼠标放在某li标签上时，就显示某li标签对应的图片，并且停止轮播。鼠标离开时继续轮播
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function () {
            slide(this.innerHTML);
            clearInterval(time);
        }
        lis[i].onmouseout = function () {
            time = setInterval("slide();", 4000);
        }
    }
    //轮播函数
    slide = picSlide.slide = function (value) {

        if (value != null) flag = value - 2;
        if (flag < lis.length - 1)//要减1，循环时值为0,1,2,3,4
            flag++;
        else
            flag = 0;
        autoSlide.style.top = flag * (-330) + 'px';
        for (var j = 0; j < lis.length; j++) {
            lis[j].style.backgroundColor = "gray";
        }
        lis[flag].style.backgroundColor = "#f23d0c";
    }
}

function picSlide2() {
    //定义全局参数
    var flag2 = 0;
    var autoSlide2 = document.getElementById('main_c2_slide');//自动轮播参数
    var selectSlide2 = document.getElementById('main_c2_selectSlide');//获取手动轮播参数
    var lis2 = selectSlide2.getElementsByTagName('li');//获取手动轮播li标签 


    lis2[0].style.backgroundColor = '#f23d0c';//打开网页时，假定轮播第一张图片，设置lis[0]标签背景颜色

    var time2 = setInterval("slide2();", 3000);

    //自动轮播：自动轮播时当有鼠标划入到轮播区域则停止轮播，鼠标移出区域时继续轮播
    autoSlide2.onmouseover = function () {
        clearInterval(time2);
    }
    autoSlide2.onmouseout = function () {
        time2 = setInterval("slide2();", 3000);
    }

    //手动轮播：鼠标放在某li标签上时，就显示某li标签对应的图片，并且停止轮播。鼠标离开时继续轮播
    for (var i = 0; i < lis2.length; i++) {
        lis2[i].onmouseover = function () {
            slide2(this.innerHTML);
            clearInterval(time2);
        }
        lis2[i].onmouseout = function () {
            time2 = setInterval("slide2();", 3000);
        }
    }
    //轮播函数
    slide2 = picSlide2.slide2 = function (value) {

        if (value != null) flag2 = value - 2;
        if (flag2 < lis2.length - 1)//要减1，循环时值为0,1,2,3,4
            flag2++;
        else
            flag2 = 0;
        autoSlide2.style.top = flag2 * (-150) + 'px';
        for (var j = 0; j < lis2.length; j++) {
            lis2[j].style.backgroundColor = "gray";
        }
        lis2[flag2].style.backgroundColor = "#f23d0c";
    }
}

addLoadEvent(picSlide);
addLoadEvent(picSlide2);