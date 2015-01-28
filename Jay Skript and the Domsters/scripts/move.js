 function movement() {
    //模块类，选取节点
    function MoveDiv(id) {
        this.id = document.getElementById(id);//获取漂浮的div
        this.span = this.id.getElementsByTagName('span')[0];
        this.posX = this.id.offsetLeft;//X轴的位置
        this.posY = this.id.offsetTop;//Y轴的位置
        this.setH = document.documentElement.clientHeight;//窗口高度
        this.setW = document.documentElement.clientWidth;//窗口宽度
    }
    //接口方法
    MoveDiv.prototype.move = function () {
        var this_ = this;
        this_.maxH = this.setH;//预设最大高度
        this_.maxW = this.setW;//预设最大宽度
        this_.windowH = 0;
        this_.windowW = 0;
        this_.delay = 29;//漂浮的速度
        this_.limitedX = true;//预设X轴正向
        this_.limitedY = true;//限定Y轴正向

        //漂浮DIV跟随可视窗口
        window.onscroll = function () {
            this_.maxH = this_.setH;
            this_.maxW = this_.setW;
            this_.windowH = document.body.scrollTop || document.documentElement.scrollTop;
            this_.windowW = document.body.scrollLeft || document.documentElement.scrollLeft;
            this_.maxH += this_.windowH;
            this_.maxW += this_.windowW;
        }

        //漂浮运动函数
        function addMove() {
            if (this_.posX + this_.windowW <= this_.windowW) {
                this_.limitedX = true;
            }
            if (this_.posX + this_.windowW >= this_.maxW - this_.id.clientWidth - 3) {
                this_.limitedX = false;
            }
            if (this_.posY + this_.windowH <= this_.windowH) {
                this_.limitedY = true;
            }
            if (this_.posY + this_.windowH >= this_.maxH - this_.id.clientHeight - 3) {
                this_.limitedY = false;
            }
            if (this_.limitedX) {
                this_.posX += 1;//x轴正向运动
            } else {
                this_.posX -= 1;//x轴反向运动
            } if (this_.limitedY) {
                this_.posY += 1;//Y轴正向运动
            } else {
                this_.posY -= 1;//Y轴反向运动
            }

            this_.id.style.left = this_.posX + this_.windowW + 'px';
            this_.id.style.top = this_.posY + this_.windowH + 'px';
        }
        //执行漂浮函数
        this.repeat = setInterval(addMove, this_.delay);
        //鼠标悬停
        this.id.onmouseover = function () {
            clearInterval(this_.repeat);
        }
        this.id.onmouseout = function () {
            this_.repeat = setInterval(addMove, this_.delay);
        }
        this.id.onclick = function () {
            location.href = "Photos.html"
        }

        //点击关闭
        this.span.onclick = function () {
            this_.id.style.display = 'none';
            this_ = null;       //销毁对象，阻止冒泡运动
        }
    }
    //实例化
    var gomove = new MoveDiv('MoveFloat');

    //启动对象方法，开始漂浮
    gomove.move();
 }
 addLoadEvent(movement);