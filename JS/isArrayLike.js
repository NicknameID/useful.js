// 类数组判断函数
/*
返回一个布尔值
 */
function isArrayLike(collection){	
	var length = collection !== null && collection.length;
	return typeof length == 'number' && length>=0;
}

export default isArrayLike;