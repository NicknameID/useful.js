/*
starMove(obj,json,fn)
这是一个json参数的多物体运动框架
 */

import getStyle from './getStyle';


//执行函数
function Move(obj,json,endFunc){
	var cur = 0;
	// console.log(cur);				//测试1
	for(attr in json){
		if(attr==='opacity'){
			cur = Math.round(parseFloat(getStyle(obj,attr))*100);
		}else{
			cur = parseInt(getStyle(obj,attr));
		}
		var speed = (json[attr] - cur)/10;
		// console.log(speed);					//测试2
		//速度取整，保证在到达目标点时停下
		speed = speed>0? Math.ceil(speed):Math.floor(speed);
		//判断是否到达目标点
		if(cur!==json[attr]){
			bStop = false;
			// clearInterval(obj.timer);//达到目标点，停下清除浮动
			// if (endFunc) {endFunc();}
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
		if(endFunc){endFunc();}		//执行链式运动函数endFUnc
	}
}
//调用者函数,负责调用上面的Move()
function startMove(obj,json,endFunc){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true;  //假设：所有的值都已经到了
		Move(obj,json,endFunc);
	},16);
}

export default startMove;

/* *********************** */
// @Tianyu Huang 仿写自完美运动框架
/***************************/ 
