/**
 * Created by TianYu on 2017/6/16.
 */
 function addListener(obj,ev,fn){
  if( obj.addEventListener) {
    obj.addEventListener(ev,fn,false);
  }else{
    obj.attachEvent('on'+ev,fn);
  }
}

function removeListener(obj,ev,fn){
  if( obj.removeEventListener ){
    obj.removeEventListener(ev,fn,false);
  }else{
    obj.detachEvent('on'+ev,fn);
  }
}

export {addListener,removeListener};
