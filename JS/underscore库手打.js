(function(){
	// 创建root对象
	var root = this;
	// 保存一个预先的变量值 `_`
	var previousUnderscore = root._;
	// 将内置对象的原型链缓存到局部变量中
	var ArrayProto = Array.prototype,
			objProto   = Object.prototype,
			FuncProto  = Function.prototype;
	// 为能够快速使用内置的方法，将内置方法存到一个变量上
	var push					 = ArrayProto.push,
			slice 				 = ArrayProto.slice,
			toString			 = objProto.toString,
			hasOwnProperty = objProto.hasOwnProperty;//用来遍历一个对象是否有对应的key
	// 声明所有我们希望要用的ES5的原生的函数
	var nativeIsArray = Array.isArray,
			nativeKeys		= Object.keys,
			nativebind		= Function.bind,
			nativeCreat		= Object.creat;
	//用于替换原型的裸函数
	var Ctor = function(){};
	// 创建对象式的调用方法，返回一个underscore的包装器,(类似jQuery的包装方法),通过`_`调用
	var _ = function(obj) {
		if (obj instancof _) return obj;
		if (!(this instancof _)) return new _(obj);
		this._wrapped = obj;
	}

	if(typeof exports !== 'undefined'){
		if(typeof moudle !== 'undefined' && module.exports){
			exports = module.exports = _;
		}
		exports._ = _;
	}else{
		root._ = _;
	}

	// 当前的版本
	_.VERSION = '1.8.2';

	// 优化回调
	var optimizeCb = function(func, context, argCount) {
		if (context === void 0) return func;
		switch (argCount == null ? 3: argCount){
			case 1: return function(value) {
				return func.call(context,value);
			};
			case 2: return function(value, other) {
				return func.call(context,value,other);
			}
			case 3: return function(value, index, collection){
				return func.call(context,value,index,collection);
			}
			case 4: return function(accumulator, value, index, collection){
				return func.call(context, accumulator, value, index, collection);
			};
		}
		return function(){
			return func.apply(context, arguments);
		};
	};




















})();