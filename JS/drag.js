/*
鼠标拖动事件函数,只需要传入被拖拽的对象
 */
let drag = function(obj,width,height,fnEnd){
	// 获取事件
	function getEvent(ev){
		let Event = null;
		return Event = ev || window.event; //后者为兼容IE浏览器
	}
	// 获取被拖动的obj的位置
	function getPosition(obj){
		let objX = obj.offsetLeft;
		let objY = obj.offsetTop;
		return [objX,objY];
	}
	// 获取鼠标的位置
	function getMouse(ev){
		let mX = getEvent(ev).clientX;
		let mY = getEvent(ev).clientY;
		return [mX,mY];
	}
	// 算出当前要移动对象与鼠标的相对位置
	function relative(objCoor,mouseCoor){
		let relX = objCoor[0] - mouseCoor[0];
		let relY = objCoor[1] - mouseCoor[1];
		return [relX,relY];
	}



	// 运动函数
		let startL = obj.offsetLeft;
		let startT = obj.offsetTop;
		// 添加鼠标按下事件
		obj.onmousedown = function(ev){
			// 获取当前对象的[x,y]坐标
			let oCoor = getPosition(this);
			// 获取当前鼠标的[x,y]坐标
			let mCoor = getMouse(ev);
			// 算出当前要移动对象与鼠标的相对位置
			let relCoor = relative(oCoor,mCoor);
			// 触发等待移动函数
			window.onmousemove = function(ev){
				//算出移动对象的坐标值,运行移动函数
					let l = getMouse(ev)[0]+relCoor[0];
					let t = getMouse(ev)[1]+relCoor[1];
					if(l<startL) l = startL;
					if(l>(width-obj.offsetWidth)) l = width - obj.offsetWidth;
					if(t<startT) t = startT;
					if(t>(height-obj.offsetHeight)) t = height - obj.offsetHeight;
					obj.style.left = l + 'px';
					obj.style.top = t + 'px';
					if(fnEnd) fnEnd();
			};
		};
		// 抬起鼠标左键，停下移动对象
		window.onmouseup = function(){
			window.onmousemove = false;
		};
};

export default drag;
