var getEvent = (function(){
	var Event = null;
	return function(ev){
		Event = ev || window.event;
		return Event;
	}
})();

function getEvent(ev=ev) {
   let Event =  ev || window.event;
   return Event;
}

export default getEvent;