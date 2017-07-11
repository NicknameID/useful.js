/*
添加监听事件的兼容方法addEvent 和 移除事件监听的兼容方法removeEvent
兼容FF Chrome IE;
 */

function addEvent(obj,ev,fn){
	if( obj.addEventListener) {
		obj.addEventListener(ev,fn,false);
	}else{
		obj.attachEvent('on'+ev,fn);
	}
}

function removeEvent(obj,ev,fn){
	if( obj.removeEventListener ){
		obj.removeEventListener(ev,fn,false);
	}else{
		obj.detachEvent('on'+ev,fn);
	}
}
