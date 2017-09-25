// 获取窗口距离屏幕边缘的距离的兼容写法
export default function(){
	var leftPos = (typeof window.screenLeft == 'number')?
								window.screenLeft : window.screenX;
	var topPos = (typeof window.screenTop == 'number')?
								window.screenTop : window.screenY;
	return {
		X:leftPos,
		Y:topPos,
	};
};