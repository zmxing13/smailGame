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
var HistoryListUI = (function (_super) {
    __extends(HistoryListUI, _super);
    function HistoryListUI(w, h) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this._datas = [];
        _this._listUI = new ListUI(w, h, 5, 100);
        _this._scrollerUI = new ScrollerUI(w, h, _this._listUI);
        _this.addChild(_this._scrollerUI);
        return _this;
    }
    HistoryListUI.prototype.setDatas = function (datas) {
        var _this = this;
        this._datas = datas;
        this.addOrder();
        var list = [];
        for (var i = 0; i < this._datas.length; i++) {
            var item = new HistoryItemUI(this._width, 100, this._datas[i]);
            item.addEventListener("detail", function (e) {
                _this.dispatchEvent(new egret.Event("detail", false, false, { userData: e.data.userData }));
            }, this);
            list.push(item);
        }
        this._listUI.setList(list);
        this._scrollerUI.updateListHeight();
    };
    HistoryListUI.prototype.getListLength = function () {
        return this._datas.length;
    };
    HistoryListUI.prototype.addOrder = function () {
        for (var i = 0; i < this._datas.length; i++) {
            this._datas[i] = __assign({ order: i }, this._datas[i]);
        }
    };
    HistoryListUI.prototype.updateOrder = function () {
        for (var i = 0; i < this._datas.length; i++) {
            this._datas[i].order = i;
        }
    };
    HistoryListUI.prototype.removeItemBy = function (id) {
        this._listUI.removeItemBy(id);
        this._datas.splice(id, 1);
        this.updateOrder();
        this._scrollerUI.updateListHeight();
    };
    return HistoryListUI;
}(egret.Sprite));
__reflect(HistoryListUI.prototype, "HistoryListUI");
//# sourceMappingURL=HistoryListUI.js.map