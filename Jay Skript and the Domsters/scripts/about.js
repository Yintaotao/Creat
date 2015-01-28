function showSection(id) {
    //修改每个部分的display样式属性，只有传入的ID显示为block，其他均隐藏
    var sections = document.getElementsByTagName("section");
    for(var i = 0; i < sections.length; i++){
        if(sections[i].getAttribute("id")!= id){
            sections[i].style.display = "none";       
        }else{
            sections[i].style.display = "block";
        }
    }
}
function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        //使用split方法把字符串分成两或多个部分array = string.split(character)
        //以#为分隔符，得到数组中包含两个元素，第一个是‘#’前面的所有字符，第二个是后面的（这里为空字符串）
        //数字第一个索引为0，故我们想要的第二个元素索引为1
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionId)) continue;//如果不存在进行下一次循环
        document.getElementById(sectionId).style.display = "none";
        //sectionId是一个局部变量，只在这个函数执行期间存在，
        //事件处理函数执行时不存在，所以给每个连接创建一个自定义的属性，比如把这个属性命名为destination，然后把sectionId赋给他，这时的作用域是持久存在的
        links[i].destination = sectionId;
        links[i].onclick = function () {
            //连接被单击后把sectionId传给showSection函数
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);