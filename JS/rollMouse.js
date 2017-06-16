function rollMouse(obj,funcUP,funcDown){
	var str = window.navigator.userAgent.toLowerCase();
	if( str.indexOf('firefox')!== -1 ){
		obj.addEventListener('DOMMouseScroll',function(ev){
			if(ev.detail == 3){
				funcUP();
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
				funcUP();
				// console.log('up');
			}else if(oEv.wheelDelta == -120){
				funcDown();
				// console.log('down');
			}
		}
	}
}

export default rollMouse;