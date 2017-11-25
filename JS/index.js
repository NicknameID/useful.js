/**
 * Created by TianYu on 2017/6/16.
 */
import getStyle from './getStyle.js';
import getWindow from './getWindow';
import isArrayLike from './isArrayLike.js';
import getByClass from './getByClass.js';
import getEvent from './getEvent.js';
import {addListener,removeListener} from './EventListener.js';
import drag from './drag.js';
import startMove from './startMove.js';
import rollMouse from './startMove.js';
import Ajax from './ajax.js';
import AjaxPromise from './ajaxPromise.js';
import setCookie from './setCookie.js';
import getCookie from './getCookie.js';
import delCookie from './delCookie.js';
import {Slider} from './slider-plugin.js';
import inherit from './inherit.js';
import getScreenXY from './getScreenXY.js';
import walker from "./DOM_Iterator.js";
import EventPool from "./EventPool";


const M = (function () {
  let M = {};
  //封装方法
  M.getStyle = getStyle; //通过DOM节点获取该节点处的CSS计算后的样式，当传入参3时，是设置新的样式
  M.getWindow = getWindow; //兼容性的获取窗口（可视窗口）的宽高
  M.isArrayLike = isArrayLike; //判断是不是数组
  M.getByClass = getByClass; //通过类名来获取DOM节点，主要是兼容IE
  M.getEvent = getEvent; //没啥作用，就一句话  "oEv = ev || window.event"
  M.addListener = addListener;  //参考下者
  M.removeListener = removeListener;  //具有IE兼容性的移除事件监听，参数与原生是一样的
  M.drag = drag; //基于下面那个运动函数的自定义鼠标的拖拽事件
  M.startMove = startMove; //比较基础的运动框架函数，类似jQuery的animate，不过推荐使用jquery的运动比较好
  M.rollMouse = rollMouse; //鼠标滚动事件
  M.Ajax = Ajax; //普通的ajax函数封装
  M.AjaxPromise = AjaxPromise; //基于Promise的ajax，没啥用低版本浏览器不兼容
  M.setCookie = setCookie; //设置cookie
  M.getCookie = getCookie; //获取cookie
  M.delCookie = delCookie; //删除cookie
  M.Slider = Slider; //没啥用的轮播图插件
  M.inherit = inherit; //面向对象编程时，用于两个构造函数之间的继承
  M.getScreenXY = getScreenXY; //
  M.NodeWalker = walker;   //DOM节点遍历器
  M.EventPool = EventPool; //全局自定义事件机制，有register、dispatch、remove、namespace方法

//---------------------
  return M;
})(window, document);
window.M = M;
