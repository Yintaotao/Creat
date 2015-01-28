function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function highlightPage(href) {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName("header");
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        //接下来要比较当前连接的URL与当前页面的URL。
        //要取得连接的URL使用gerAttribute("href")
        //取得当前页面URL使用window.location.href
        var linkurl = links[i].getAttribute("href");
        //indexOf方法用于在字符串中寻找子字符，返回子字符串第一次出现的位置。串
        //如果没有匹配到，返回-1,否则此时连接一定指向当前页面连接
        var currenturl = window.location.href;
        if (currenturl.indexOf(linkurl) != -1) {
            links[i].className = "here";
            //取得当前连接最后一个子元素值，就是连接的文本，然后把他转换成小写。
            //如果文本链接中是“Home”，那么linktext变量中保存的值就是“home”，通过下面的语句就可以把这个变量值设置为body元素的ID属性。
            //那么index.html文件的body元素就会有一个值为“home”的ID，about.html文件中的ID就是“about”，以此类推
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktext);
        }
    }
}

addLoadEvent(highlightPage);