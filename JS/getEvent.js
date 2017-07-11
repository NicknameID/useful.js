function getEvent(ev=ev) {
   let Event =  ev || window.event;
   return Event;
}

export default getEvent;
