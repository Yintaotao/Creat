/*
*查询窗口滚动条的位置
*/
//以一个对象的x和y属性的方法返回滚动条的偏移量
function getScrollOffsets(w){
	//使用指定窗口，如果不带参数则使用当前窗口
	w = w || window;
	//除了IE 8及更早版本以外，其他浏览器都能使用
	if(w.pageXOffset != null) 
		return {x:w.pageXOffset,y:w.pageYOffset};
	//对标准模式下的IE（或任何浏览器）
	var d= w.document;
	if(document.compatMode == "CSS1Compat")
		return {x:d.documentElement.scrollLeft,y:d.documentElement.scrollTop};
	//对怪异模式下的浏览器
	return {x:d.body.scrollLeft,y:d.body.scrollTop};
}
/*
*Drag.js：拖动绝对定位的HTML元素
*这个模块定义了一个drag()函数，他用于mousedown时间处理程序的调用
*随后的mousemove时间将移动指定元素，mouseup时间将终止拖动
*这些实现能同标准和IE两种时间模型一起工作
*它需要用到本书其他地方的方法，getScollOffsers()方法
*
*参数：
*
*elementToDrag：接收mousedown时间的元素或某些包含元素
*它必须是绝对定位的元素
*它的style.left和style.top值将随着用户的拖动而改变
*
*event：mousedown事件对象
*/
function drag(elementToDrag,event){
	//初始鼠标位置，转换为文档坐标
	var scroll = getScrollOffsets();//来自其他地方的工具函数
	var startX = event.clientX + scroll.x;
	var startY = event.clientY + scroll.y;

	//在文档坐标下，待拖动元素的初始位置
	//因为elementToDrag是绝对定位的，
	//所以我们可以假设它的offsetParent就是文档的body元素
	var oriX = elementToDrag.offsetLeft;
	var oriY = elementToDrag.offsetTop;

	//计算mousedown事件和元素左上角之间的距离
	//我们将它另存为鼠标移动的距离
	var deltaX = startX - oriX;
	var deltaY = startY - oriY;

	//注册用于响应接着mousedown事件发生的mousemove和mouseup事件的时间处理程序
	if(document.addEventListener){//标准事件模型
		//在document对象上注册捕获时间处理程序
		document.addEventListener('mousemove',moveHandler,true);
		document.addEventListener('mouseup',upHandler,true);
	}
	else if(document.attachEvent){//用于IE5~8的IE事件模型
		//在IE事件模型中
		//捕获事件时通过调用元素上的setCapture()捕获他们
		elementToDrag.setCapture();
		elementToDrag.attachEvent('onmousemove',moveHandler);
		elementToDrag.attachEvent('onmouseup',upHandler);
		//作为mouseup事件看待鼠标捕获的丢失
		elementToDrag.attachEvent('onlosecapture',upHandler);
	}

	//我们处理了这个事件，不让任何其他事件看到它
	if(event.stropPropagation) event.stropPropagation();//标准模型
	else event.cancelBubble = true; //IE

	//现在阻止任何默认行为
	if (event.preventDefault) event.preventDefault();//标准模型
	else event.returnValue = false; //IE

	/**
	*当元素正在被拖动时，这就是捕获mousemove时间的处理程序
	*它用于移动这个元素
	*
	*/
	function moveHandler(e){
		if(!e) e = window.event;//IE事件模型

		//移动这个元素到当前鼠标位置
		//通过滚动条的位置和初始单击的偏移量来调整
		var scroll = getScrollOffsets();
		elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + 'px';
		elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + 'px';
		//同时不让任何其他元素看到这个事件
		if (e.stropPropagation)  e.stropPropagation(); //标准};
		else e.cancelBubble = true; //IE
	}
	/**
	*这是捕获在拖动结束时发生的最终mouseup事件的处理程序
	*/
	function upHandler(e){
		if (!e) e = window.event;//IE事件模型

		//注销捕获事件处理程序
		if(document.removeEventListener){//DOM事件模型
			document.removeEventListener('mouseup',upHandler,true);
			document.removeEventListener('mousemove',moveHandler,true);
		}
		else if(document.attachEvent){//IE5+事件模型
			elementToDrag.detachEvent('onlosecapture',upHandler);
			elementToDrag.detachEvent('onmouseup',upHandler);
			elementToDrag.detachEvent('onmousemove',moveHandler);
			elementToDrag.releaseCapture();
		}

		//并且不让事件进一步传播
		if(e.stropPropagation) e.stropPropagation();//标注事件
		else e.cancelBubble = true;
	}
}