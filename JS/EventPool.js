var EventPool = /** @class */ (function () {
    function EventPool() {
        this.clientList = {};
    }
    EventPool.prototype.register = function (eventName, callback, scope) {
        if (scope === void 0) { scope = this.clientList; }
        var kinds = eventName.split(" ");
        kinds.map(function (itemEvent) {
            if (itemEvent !== "") {
                if (!(itemEvent in scope)) {
                    scope[itemEvent] = [];
                }
                scope[itemEvent].push(callback);
            }
        });
    };
    EventPool.prototype.dispatch = function (eventName, callbackParms, scope) {
        var _this = this;
        if (callbackParms === void 0) { callbackParms = []; }
        if (scope === void 0) { scope = this.clientList; }
        var events = eventName.split(" ").filter(function (item) { return item !== "" ? true : false; });
        var callbacks = [];
        events.map(function (item) {
            if (!(item in scope)) {
                throw new Error(item + ":\u8BE5\u4E8B\u4EF6\u540D\u5728\u5DF2\u6CE8\u518C\u7684\u4E8B\u4EF6\u5217\u8868\u4E2D\u4E0D\u5B58\u5728");
            }
            else {
                callbacks = callbacks.concat(scope[item]);
            }
        });
        callbacks.map(function (itemFunc) {
            itemFunc.call.apply(itemFunc, [_this].concat(callbackParms));
        });
    };
    EventPool.prototype.removeEvent = function (eventName, callback, scope) {
        if (scope === void 0) { scope = this.clientList; }
        var cbs = scope[eventName];
        if (!(eventName in scope)) {
            throw new Error(eventName + "-->\u8FD9\u4E2A\u4E8B\u4EF6\u540D\u5728\u4E8B\u4EF6\u5217\u8868\u4E2D\u4E0D\u5B58\u5728");
        }
        else {
            if (!cbs || cbs.length === 0)
                return false; //没有订阅过，或者没有传入过回调函数
            else {
                cbs.forEach(function (itemFunc, index) {
                    if (itemFunc === callback) {
                        scope[eventName].splice(index, 1);
                    }
                });
            }
        }
    };
    EventPool.prototype.namespace = function (namespace) {
        var _this = this;
        var list = this.clientList;
        if (!(namespace in list)) {
            list[namespace] = {};
        }
        if (!(list[namespace] instanceof Array)) {
            return {
                register: function (eventName, callback, scope) {
                    if (scope === void 0) { scope = _this.clientList[namespace]; }
                    _this.register(eventName, callback, scope);
                },
                dispatch: function (eventName, callbackParms, scope) {
                    if (callbackParms === void 0) { callbackParms = []; }
                    if (scope === void 0) { scope = _this.clientList[namespace]; }
                    _this.dispatch(eventName, callbackParms, scope);
                },
                removeEvent: function (eventName, callback, scope) {
                    if (scope === void 0) { scope = _this.clientList[namespace]; }
                    _this.removeEvent(eventName, callback, scope);
                }
            };
        }
    };
    return EventPool;
}());

export default EventPool;