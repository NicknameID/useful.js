function getCookie(name){
  let arr = document.cookie.split('; ');
  for( let i=0;i<arr.length;i++ ){
    let arrs = arr[i].split('=');
    if( arrs[0]==name ) return arrs[1];
  }
  return '';
}
export default getCookie;
