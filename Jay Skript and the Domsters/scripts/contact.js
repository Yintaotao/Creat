
function focusLabels() {
    if (!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function () {
            var id = this.getAttribute("for");
            if (!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}

function resetFields(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        if (!element.defaultValue) continue;
        element.onfocus = function () {
            if (this.value == this.defaultValue) {
                this.value = "";
            }
        }
        element.onblur = function () {
            if (this.value == "") {
                this.value = this.defaultValue;
            }
        }
    }
}

function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.className.indexOf("required") != -1) {
            if (!isFilled(element)) {
                alert("Please fill in the " + element.name + " field.");
                return false;
            }
        }
        if (element.className.indexOf("email") != -1) {
            if (!isEmail(element)) {
                alert("The " + element.name + " field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}

function isFilled(field) {
    if (field.value.length < 1 || field.value == field.defaultValue) {
        return false;
    } else {
        return true;
    }
}

function isEmail(field) {
    if (field.value.indexOf("@") == -1 || field.value.indexOf(".") == -1) {
        return false;
    } else {
        return true;
    }
}

function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function () {
            return validateForm(this);
        }
    }
}

addLoadEvent(focusLabels);
addLoadEvent(prepareForms);

/*
 **
//focusLabels函数实现功能：
//当label中的文本被单击时，关联的表单字段就会获得焦点
//1.取得文档中的label元素
//2.如果label有for属性，添加一个事件处理函数
//3.在label被单击时，提取for属性的值。这个值就是相应表单字段的ID值
//4.确保存在相应的表单字段
//5.让相应表单字段获得焦点
function focusLabels() {
    if (!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function () {
            var id = this.getAttribute("for");
            if (!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}



//form对象
//文档中每个表单元素都是一个form对象，每个form对象都有一个elements.length属性
//form.elements.length返回的是表单元素的个数,如input，textarea
//与childNodes不同，childNodes返回元素中 包含的所有节点的个数
//elements数组中每个表单元素都有自己的一组属性。
//如，value属性中保存的就是表单元素的当前值，element.value等价于：element.getAttribute('value')


//我们发现每个表单字段都有一个初始placeholder属性
//取这些占位符的值并将它们作为相应表单字段的value
//在该字段获得焦点时，再删除字段value值
//若用户在字段中没在字段中输入文本且离开了当前字段，那么重新应用占位符值即可
//
//
//resetFields函数只接受一个form对象
//1.检查浏览器是否支持placeholder属性，支持，继续
//2.循环遍历表单的每个元素
//3.如果当前元素是提交按钮，跳过
//4.为元素获得焦点的事件添加一个处理函数，如果字段的值等于占位符文本，则将字段的值设置为空
//5.再为元素失去焦点的事件添加一个处理函数，如果字段值为空，则为其添加占位符
//6.为应用样式，在字段显示占位符值的时候添加placeholder类
function resetFields(whichform) {
    if (Modernizr.input.placeholder) return;
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        var check = element.placeholder || element.getAttribute('placeholder');
        if (!check) continue;
        element.onfocus = function () {//会在用户使用Tab 或单击表单字段时被触发       
            if (this.value == this.defaultValue) {               
                this.value = '';
            }
        }
        element.onblur = function () {//把焦点移出表单字段时触发
            if (this.value == '') {
                this.value = this.defaultValue;               
            }
        }
        element.onblur();//在onblur事件定以后，直接调用它，一遍字啊必要时应用占位符
    }
}
function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thhisform.onsubmint = function () {
            return validateForm(this);
        }
    }
}


//通过检查去掉空格之后的value属性的length属性，就知道value中是否没有任何字符。
//如果确实不包含任何字符，函数返回false，否则继续比较
//通过比较value属性与placeholder属性，就知道用户是否对占位符文本一字未动，若相同，返回false
//若两个测试都通过，说明用户已经在字段填写了内容，isFilled函数就会返回true
function isFilled(field) {
    if (field.value.replace(' ', '').length == 0) return false;
    var placeholder = field.placeholder || field.getAttribute('placeholder');
    return (field.value != placeholder);
}
function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);//如果要检索的字符串值没有出现，则该方法返回 -1,且对大小写敏感
}


//循环遍历表单的elements数组
//如发现required属性，将相应的元素传递给isFilled函数
//如isFilled函数返回false，显示警告，validateForm函数也返回false
//如找到了Email类型字段，把相应的元素传递给isEmail函数
//如isEmail函数返回false，型按时警告，validateForm函数也返回false
//否则，validateForm函数返回true
function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.required == 'required') {
            if (!isFilled(element)) {
                alert('Please fill in the "+element.name+" field.');
                return false;
            }
        }
        if (element.type == 'email') {
            if (!isEmail(element)) {
                alert('The "+element.name+" field must be a valid email address.');
                return false;
            }
        }
    }
    return true;
}
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);

*/