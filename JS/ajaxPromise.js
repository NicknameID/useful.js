function AjaxPromise(url){
  let promise =  new Promise(function(resolve, reject) {
    let client = new XMLHttpRequest();
    client.open('GET', url+'?t='+new Date().getTime(), true);
    client.send();
    client.onreadystatechange = handler;
    function handler(){
      if(this.readyState !== 4){
        return;
      }
      if(this.readyState === 4){
        if( this.status === 200 ){
          resolve(this.response);
        }else{
          reject(new Error(this.statusText));
        }
      }
    }
  });
  return promise;
}
export default AjaxPromise;
