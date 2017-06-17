function Ajax(url,fnS,fnF){
  let client = new XMLHttpRequest();
  client.open('GET', url+'?t='+new Date().getTime(), true);
  client.send();
  client.readystatechange = ()=>{
    if( client.readyState === 4 ){
      if( client.status === 200 ){
        fnS(client.response);
      }else{
        fnF(client.status);
      }
    }
  };
}
export default Ajax;
