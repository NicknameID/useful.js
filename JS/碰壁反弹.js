/*
碰壁反弹的一个函数,wrap是它的包裹层,self是里面的小球
 */ 
function Ball(wrap,self){
	this.wrap = wrap;
	this.self = self;
	this.timer = null;
	this.maxX = function(){return this.wrap.clientWidth - this.self.offsetWidth;};
	this.maxY = function(){return this.wrap.clientHeight - this.self.offsetHeight;}
	this.posX = function(){return this.self.offsetLeft;};
	this.posY = function(){return this.self.offsetTop;};
	this.flagX = true;
	this.flagY = true;
	this.active = function(){
		var maxX,maxY,posX,posY;
		maxX = this.maxX();
		maxY = this.maxY();
		posX = this.posX();
		posY = this.posY();
		// 水平方向
		if (this.flagX){
			if (posX < maxX){
				posX++;
				this.self.style.left = posX + 'px';
			}else this.flagX = false;
		}
		if (!this.flagX){
			if(posX > 0){
				posX--;
				this.self.style.left = posX + 'px';
			}else this.flagX = true;
		} 
		// 垂直方向 
		if (this.flagY){
			if (posY < maxY){
				posY++;
				this.self.style.top = posY + 'px';
			}else this.flagY = false;
		}
		if (!this.flagY){
			if(posY > 0){
				posY--;
				this.self.style.top = posY + 'px';
			}else this.flagY = true;
		}
	}
}