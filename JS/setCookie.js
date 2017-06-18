function setCookie(name,value,day){
  let date = new Date();
  date.setDate(date.getDate()+day);
  document.cookie = '${name}=${value};expires=${date}';
}
export default setCookie;
