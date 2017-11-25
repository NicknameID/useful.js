/* exported M */
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

	// 获取窗口尺寸 例子: M.getWindowSize.width();
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

	//判断类数组的函数返回值为boolear;
	M.isArrayLike = function(collection){
		var length = collection !== null && collection.length;
		return typeof length == 'number' && length>=0;
	};

	// 1.封装DOM获取函数，通过className来获取元素。
	// 2.返回值为数组
	M.getByClass = function(Parent,sClass){
		var aEle = Parent.getElementsByTagName('*');
		var arr = [];
		for(var i=0;i<aEle.length;i++){
			if( aEle[i].className.indexOf(sClass) !== -1 ) arr.push(aEle[i]);
		}
		return arr;
	};

	//获取浏览器的事件，使用时必须传入一个参数
	M.getEvent = function(ev){
		var oEv = ev || window.event; //后者为兼容IE浏览器
		return oEv;
	};

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

	// ajax方法
	M.AjaxPromise = function(url){
    let promise =  new Promise(function(resolve, reject) {
      let client = new XMLHttpRequest();
      client.open('GET', url+'?t='+new Date().getTime(), true);
      client.send();
      client.onreadystatechange = handler;
      function handler(){
        if(this.readyState !== 4){
          return;
        }
				if(this.readyState === 4){
					if( this.status === 200 ){
						resolve(this.response);
					}else{
						reject(new Error(this.statusText));
					}
				}
      }
    });
    return promise;
  };

	M.Ajax = function Ajax(url,fnS,fnF){
		let client = new XMLHttpRequest();
		client.open('GET', url+'?t='+new Date().getTime(), true);
		client.send();
		client.readystatechange = function(){
			if( client.readyState === 4 ){
				if( client.status === 200 ){
					fnS(client.response);
				}else{
					fnF(client.status);
				}
			}
		};
	};

	// OO继承函数
	M.inherit = function(child, parent){
		var F = function(){};
		F.prototype = parent.prototype;
		child.prototype = new F();
		child.prototype.constructor = child;
	};

	// cookie设置
	M.setCookie = function (name, value, day) {
		var date = new Date();
		date.setDate(date.getDate() + day);
		document.cookie = '${name}=${value};expires=${date}';
	};
	M.getCookie = function (name) {
		var arr = document.cookie.split('; ');
		for (let i = 0; i < arr.length; i++) {
			let arrs = arr[i].split('=');
			if (arrs[0] == name) return arrs[1];
		}
		return '';
	};
	M.delCookie = function delCookie(name) {
		M.setCookie(name, null, -1);
	};

	// 获取浏览器窗口距离屏幕的距离的值（兼容）
	M.getScreenXY = function(){
		var leftPos = (typeof window.screenLeft == 'number')?
								window.screenLeft : window.screenX;
		var topPos = (typeof window.screenTop == 'number')?
								window.screenTop : window.screenY;
		return {
			X:leftPos,
			Y:topPos,
		};
	};

	// DOM节点的迭代器，只要传入一个根节点，和可选的过滤器就可以循环出所有该根节点下的后代节点
	M.NodeWalker = function(root,filter=null){
		var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, filter, false);
		var node = walker.nextNode();
		var result = [];
		while (node !== null) {
			result.push(node);
			node = walker.nextNode();
		}
		return result;
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
				};
			};
			// 抬起鼠标左键，停下移动对象
			window.onmouseup = function(){
				window.onmousemove = false;
			};
		};
	})();

	//运动框架,参1为要运动的对象，参2位json类型的样式和值的键值对，参3为尾调函数
	M.startMove = function(obj,json,endFunc){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bStop = true;  //每一调用一次开始假设，所有的值都已经到了
			function Move(obj,json,endFunc){
				var cur = 0;
				for(let attr in json){
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
	};

	// 自定义鼠标滚动页面兼容方法
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
			};
		}
	};

	// 轮播图插件
	M.Slider = function(){
		class Slider {
			constructor(aImgs, slider, step) {
				if (typeof aImgs.length !== 'number' && length < 0) { //保证输入的是一个类数组格式参数
					console.error('first parameter is not a array');
					return;
				}
				if (!$) { //因为插件依赖jQuery，防止没有依赖引起的报错问题
					console.error('No jQuery dependency');
					return;
				}
				this.aImgs = aImgs;
				this.slider = slider;
				this.step = step;
				this.now = 0;
				this.imgsLength = this.aImgs.length;
			}

			pre(jStyleNew, jStyleOld) {
				if (!$(this.slider).is(':animated')) {
					this.now--;
					if (this.now < 0) this.now = this.imgsLength - 1;
					$(this.aImgs).eq(this.now).css(jStyleNew)
						.siblings().css(jStyleOld);
					$(this.slider).animate({ 'left': -this.now * this.step + 'px' }, 500);
				}
			}

			next(jStyleNew, jStyleOld) {
				if (!$(this.slider).is(':animated')) {
					this.now++;
					if (this.now > this.imgsLength - 1) this.now = 0;
					$(this.aImgs).css(jStyleNew)
						.siblings().css(jStyleOld);
					$(this.aImgs).eq(this.now).css(jStyleNew);
					$(this.slider).animate({ 'left': -this.now * this.step + 'px' }, 500);
				}
			}

			point(ev, jStyleNew, jStyleOld) {
				// var ev = ev || window.event;
				if (!$(this.slider).is(':animated')) {
					var which = $(ev.target).index();
					$(ev.target).css(jStyleNew).siblings().css(jStyleOld);
					$(this.slider).animate({ 'left': -which * this.step + 'px' }, 500);
				}
			}
		}
		return Slider;
	}
// ------------------全局自定义事件机制-----------------------------------
	M.EventPool = /** @class */ (function () {
		function EventPool() {
			this.clientList = {};
		}
		EventPool.prototype.register = function (eventName, callback, scope) {
			if (scope === void 0) { scope = this.clientList; }
			var kinds = eventName.split(" ");
			kinds.map(function (itemEvent) {
				if (itemEvent !== "") {
					if (!(itemEvent in scope)) {
						scope[itemEvent] = [];
					}
					scope[itemEvent].push(callback);
				}
			});
		};
		EventPool.prototype.dispatch = function (eventName, callbackParms, scope) {
			var _this = this;
			if (callbackParms === void 0) { callbackParms = []; }
			if (scope === void 0) { scope = this.clientList; }
			var events = eventName.split(" ").filter(function (item) { return item !== "" ? true : false; });
			var callbacks = [];
			events.map(function (item) {
				if (!(item in scope)) {
					throw new Error(item + ":\u8BE5\u4E8B\u4EF6\u540D\u5728\u5DF2\u6CE8\u518C\u7684\u4E8B\u4EF6\u5217\u8868\u4E2D\u4E0D\u5B58\u5728");
				}
				else {
					callbacks = callbacks.concat(scope[item]);
				}
			});
			callbacks.map(function (itemFunc) {
				itemFunc.call.apply(itemFunc, [_this].concat(callbackParms));
			});
		};
		EventPool.prototype.removeEvent = function (eventName, callback, scope) {
			if (scope === void 0) { scope = this.clientList; }
			var cbs = scope[eventName];
			if (!(eventName in scope)) {
				throw new Error(eventName + "-->\u8FD9\u4E2A\u4E8B\u4EF6\u540D\u5728\u4E8B\u4EF6\u5217\u8868\u4E2D\u4E0D\u5B58\u5728");
			}
			else {
				if (!cbs || cbs.length === 0)
					return false; //没有订阅过，或者没有传入过回调函数
				else {
					cbs.forEach(function (itemFunc, index) {
						if (itemFunc === callback) {
							scope[eventName].splice(index, 1);
						}
					});
				}
			}
		};
		EventPool.prototype.namespace = function (namespace) {
			var _this = this;
			var list = this.clientList;
			if (!(namespace in list)) {
				list[namespace] = {};
			}
			if (!(list[namespace] instanceof Array)) {
				return {
					register: function (eventName, callback, scope) {
						if (scope === void 0) { scope = _this.clientList[namespace]; }
						_this.register(eventName, callback, scope);
					},
					dispatch: function (eventName, callbackParms, scope) {
						if (callbackParms === void 0) { callbackParms = []; }
						if (scope === void 0) { scope = _this.clientList[namespace]; }
						_this.dispatch(eventName, callbackParms, scope);
					},
					removeEvent: function (eventName, callback, scope) {
						if (scope === void 0) { scope = _this.clientList[namespace]; }
						_this.removeEvent(eventName, callback, scope);
					}
				};
			}
		};
		return EventPool;
	}());
//-----------------返回方法对象给全局----------------------------------
	return M;
})();
