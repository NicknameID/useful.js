var M = (function(){
	var M = {};
	// ------------------方法封装----------------------------------
	
	// 获取非行间样式，返回字符串，并且当传入第3个参数(要修改的值)，可以修改对象的样式。
	M.getStyle = function getStyle(obj,name,value){
		if(arguments>2){
			obj.style[name] = value;
		}else{
			if(obj.currentStyle){
				return obj.currentStyle[name]; //IE6~8兼容
			}else{
				return getComputedStyle(obj,false)[name]; //Firefox & chrome兼容
			}
		}
	};

	// 获取窗口尺寸
	M.getWindowSize = (function(){
		var w, h;
		function width(){
			w = window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth;
			return w;
		}
		function height(){
			h = window.innerHeight ||
			document.documentElement.clientHeight || 
			document.body.clientHeight;
			return h;
		}
		//返回调用对象
		return {
			height:height,
			width:width
		};
	})();
	
	//判断类数组的函数返回值为boolear
	M.isArrayLike = function(collection){
		var length = collection !== null && collection.length;
		return typeof length == 'number' && length>=0;
	}

	// 1.封装DOM获取函数，通过className来获取元素。
	// 2.返回值为数组
	M.getByClass = function(Parent,sClass){
		var aEle = Parent.getElementsByTagName('*');
		var arr = [];
		for(var i=0;i<aEle.length;i++){
			if( aEle[i].className.indexOf(sClass) !== -1 ) arr.push(aEle[i]);
		}
		return arr;
	}

	//获取浏览器的事件，使用时必须传入一个参数
	M.getEvent = function(ev){
		var oEv = ev || window.event; //后者为兼容IE浏览器
			return oEv;
	}

	//添加监听事件的兼容方法addEvent
	//兼容FF Chrome IE; 
	M.addListener = function(obj,ev,fn){
		if( obj.addEventListener) {
			obj.addEventListener(ev,fn,false);
		}else{
			obj.attachEvent('on'+ev,fn);
		}
	};

	// 移除事件监听的兼容方法removeEvent
	M.removeListener = function(obj,ev,fn){
		if( obj.removeEventListener ){
			obj.removeEventListener(ev,fn,false);
		}else{
			obj.detachEvent('on'+ev,fn);
		}
	};

// ------------------运动函数封装-----------------------------------

	//鼠标拖动事件函数,只需要传入被拖拽的对象
	M.drag = (function(){
		// 获取被拖动的obj的位置
		function getPosition(obj){
			var objX = obj.offsetLeft;
			var objY = obj.offsetTop;
			return [objX,objY];
		}
		// 获取鼠标的位置
		function getMouse(ev){
			var mX = M.getEvent(ev).clientX;
			var mY = M.getEvent(ev).clientY;
			return [mX,mY];
		}
		// 算出当前要移动对象与鼠标的相对位置
		function relative(objCoor,mouseCoor){
			var relX = objCoor[0] - mouseCoor[0];
			var relY = objCoor[1] - mouseCoor[1];
			return [relX,relY];
		}
		// 运动函数Move()
		return function(obj,width,height,fnEnd){
			var startL = obj.offsetLeft;
	 		var startT = obj.offsetTop;
			// 添加鼠标按下事件
			obj.onmousedown = function(ev){
				// 获取当前对象的[x,y]坐标
				var oCoor = getPosition(this);
				// 获取当前鼠标的[x,y]坐标
				var mCoor = getMouse(ev);
				// 算出当前要移动对象与鼠标的相对位置
				var relCoor = relative(oCoor,mCoor);
				// 触发等待移动函数
				window.onmousemove = function(ev){
					//算出移动对象的坐标值,运行移动函数
					var l = getMouse(ev)[0]+relCoor[0];
					var t = getMouse(ev)[1]+relCoor[1];
					if(l<startL) l = startL;
					if(l>(width-obj.offsetWidth)) l = width - obj.offsetWidth;
					if(t<startT) t = startT;
					if(t>(height-obj.offsetHeight)) t = height - obj.offsetHeight;
					obj.style.left = l + 'px';
					obj.style.top = t + 'px';
					if(fnEnd) fnEnd();
				}
			}
			// 抬起鼠标左键，停下移动对象
			window.onmouseup = function(){
				window.onmousemove = false;
			};
		}
	})();

	//运动框架,参1为要运动的对象，参2位json类型的样式和值的键值对，参3为尾调函数
	M.startMove = function(obj,json,endFunc){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bStop = true;  //每一调用一次开始假设，所有的值都已经到了
			function Move(obj,json,endFunc){
				var cur = 0;
				for(attr in json){
					if(attr==='opacity'){
						cur = Math.round(parseFloat(M.getStyle(obj,attr))*100);
					}else{
						cur = parseInt(M.getStyle(obj,attr));
					}
					var speed = (json[attr] - cur)/10;
					//速度取整，保证在到达目标点时停下
					speed = speed>0? Math.ceil(speed):Math.floor(speed);
					//判断是否到达目标点
					if(cur!==json[attr]){
						bStop = false;
					}
					if(attr==='opacity'){ //判断要运动的属性是否是透明度
							obj.style.filter = 'alpha(opacity:'+(cur+speed)+')';//IE兼容写法
							obj.style.opacity = (cur+speed)/100;//FF&Chrome兼容
						}else{
							obj.style[attr] = cur + speed + 'px';//单步运动，调用一次改变一次位置
						}
				}
				if(bStop===true){		//判断如果没有不到的
					clearInterval(obj.timer);		//清除计时器
					if(endFunc) {endFunc();}		//执行链式运动函数endFUnc
				}
			}
			Move(obj,json,endFunc);//运行方法
		},16);
	}
	
	M.rollMouse = function(obj,funcUp,funcDown){
		var str = window.navigator.userAgent.toLowerCase();
		if( str.indexOf('firefox')!== -1 ){
			obj.addEventListener('DOMMouseScroll',function(ev){
				if(ev.detail == 3){
					funcUp();
					// console.log('up');
				}else if(ev.detail == -3){
					funcDown();
					// console.log('down');
				}
			},false);
		}else{
			obj.onmousewheel = function(ev){
				var oEv = ev || window.event;
				if( oEv.wheelDelta == 120 ){
					funcUp();
				}else if(oEv.wheelDelta == -120){
					funcDown();
				}
			}
		}
	}
//-----------------返回方法对象给全局----------------------------------
	return M;
})();
