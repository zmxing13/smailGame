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
var pkUserList = (function (_super) {
    __extends(pkUserList, _super);
    function pkUserList(w) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._space = 10;
        _this._data = null;
        _this._items = [];
        _this.addItems();
        _this.setData();
        return _this;
    }
    pkUserList.prototype.setData = function (data) {
        if (data === void 0) { data = []; }
        this._data = data;
        var total = Math.min(this._data.length, 9);
        for (var i = 0; i < 9; i++) {
            if (i >= total) {
                this._items[i].visible = false;
                continue;
            }
            this._items[i].setData(this._data[i]);
            this._items[i].visible = true;
        }
    };
    pkUserList.prototype.addItems = function () {
        for (var i = 0; i < 9; i++) {
            var width = (this._width - this._space * 2) / 3;
            var item = new UserItemUI(width);
            item.touchEnabled = true;
            this._items.push(item);
            item.x = (item.width + this._space) * (i % 3);
            item.y = (item.height + this._space) * Math.floor(i / 3);
            this.addChild(item);
        }
    };
    return pkUserList;
}(egret.Sprite));
__reflect(pkUserList.prototype, "pkUserList");
//# sourceMappingURL=pkUserList.js.map