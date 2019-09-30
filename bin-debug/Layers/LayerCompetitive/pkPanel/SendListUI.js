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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var SendListUI = (function (_super) {
    __extends(SendListUI, _super);
    function SendListUI(w, h) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this._listUI = new ListUI(w, h);
        _this._scrollerUI = new ScrollerUI(w, h, _this._listUI);
        _this._datas = [];
        _this.addChild(_this._scrollerUI);
        return _this;
    }
    SendListUI.prototype.setDatas = function (datas) {
        var _this = this;
        this._datas = datas;
        this.addOrder();
        var list = [];
        for (var i = 0; i < this._datas.length; i++) {
            var item = new SendItemUI(this._width, 100, this._datas[i]);
            item.addEventListener("ok", function (e) {
                _this.dispatchEvent(new egret.Event("ok", false, false, { userData: e.data.userData }));
            }, this);
            list.push(item);
        }
        this._listUI.setList(list);
        this._scrollerUI.updateListHeight();
    };
    SendListUI.prototype.getListLength = function () {
        return this._datas.length;
    };
    SendListUI.prototype.removeItemBy = function (id) {
        this._listUI.removeItemBy(id);
        this._datas.splice(id, 1);
        this.updateOrder();
        this._scrollerUI.updateListHeight();
    };
    SendListUI.prototype.addOrder = function () {
        for (var i = 0; i < this._datas.length; i++) {
            this._datas[i] = __assign({ order: i }, this._datas[i]);
        }
    };
    SendListUI.prototype.updateOrder = function () {
        for (var i = 0; i < this._datas.length; i++) {
            this._datas[i].order = i;
        }
    };
    return SendListUI;
}(egret.Sprite));
__reflect(SendListUI.prototype, "SendListUI");
//# sourceMappingURL=SendListUI.js.map