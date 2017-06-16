/*
两个入口：两种功能 1.返回样式。2.修改样式。
	获取非行间样式，返回字符串，并且当传入第3个参数(要修改的值)，可以修改对象的
	样式。
 */
function getStyle(obj,name,value){
	if(arguments>2){
		obj.style[name] = value;
	}else{
		if(obj.currentStyle){
			return obj.currentStyle[name]; //IE6~8兼容
		}else{
			return getComputedStyle(obj,false)[name]; //Firefox & chrome兼容
		}
	}
}

export default getStyle;

