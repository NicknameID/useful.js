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


const M = (function () {
  let M = {};
  //封装方法
  M.getStyle = getStyle;
  M.getWindow = getWindow;
  M.isArrayLike = isArrayLike;
  M.getByClass = getByClass;
  M.getEvent = getEvent;
  M.addListener = addListener;
  M.removeListener = removeListener;
  M.drag = drag;
  M.startMove = startMove;
  M.rollMouse = rollMouse;
  M.Ajax = Ajax;
  M.AjaxPromise = AjaxPromise;
  M.setCookie = setCookie;
  M.getCookie = getCookie;
  M.delCookie = delCookie;
  M.Slider = Slider;
  M.inherit = inherit;

//---------------------
  return M;
})();
window.M = M;
