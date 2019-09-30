var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * @hushanjing
 */
var EventManage = (function (_super) {
    __extends(EventManage, _super);
    function EventManage(type, data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this, type) || this;
        _this.data = data;
        return _this;
    }
    return EventManage;
}(egret.Event));
__reflect(EventManage.prototype, "EventManage");
//# sourceMappingURL=EventManage.js.map