
//用法 getWindow('width'|'height');
function getWindow(agr) {
	let h,w = null;
	if(agr === 'height'){
    	h = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
			return h;
	}

	if(agr === 'width'){
    	w = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    return w;
	}
}

export default getWindow;

