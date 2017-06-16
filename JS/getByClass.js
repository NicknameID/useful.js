/*
1.封装DOM获取函数，通过className来获取元素。
2.返回值为数组
*/
function getByClass(Parent,sClass){
	var aEle = Parent.getElementsByTagName('*');
	var arr = [];
	for(let i=0;i<aEle.length;i++){
		if( aEle[i].className.indexOf(sClass) !== -1 ) arr.push(aEle[i]);
	}
	return arr;
}

export default getByClass;