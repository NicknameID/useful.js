function inherit(child, parent) {
  var F = function (){};
  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
}

export default inherit;