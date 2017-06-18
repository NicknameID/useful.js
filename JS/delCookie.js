import setCookie from './setCookie.js';
function delCookie(name){
  setCookie(name,null,-1);
}
export default delCookie;
