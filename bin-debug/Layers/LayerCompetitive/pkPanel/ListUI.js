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
var ListUI = (function (_super) {
    __extends(ListUI, _super);
    function ListUI(w, h, lineSpace, itemHeight) {
        if (lineSpace === void 0) { lineSpace = 10; }
        if (itemHeight === void 0) { itemHeight = 80; }
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this._itemHeight = itemHeight;
        _this._lineSpace = lineSpace;
        _this._list = [];
        _this._listContainer = new egret.Sprite();
        _this.addChild(_this._listContainer);
        return _this;
    }
    ListUI.prototype.setList = function (list) {
        this._list = [];
        this._listContainer.removeChildren();
        if (list.length > 0) {
            this._itemHeight = list[0].height;
            for (var i = 0; i < list.length; i++) {
                this.addItem(list[i]);
            }
        }
    };
    ListUI.prototype.addItem = function (item) {
        this._list.push(item);
        this._listContainer.addChild(item);
        var index = this._list.indexOf(item);
        item.width = this._width;
        item.height = this._itemHeight;
        if (index == 0) {
            item.y = this._lineSpace;
        }
        else {
            item.y = this._list[index - 1].y + this._itemHeight + this._lineSpace;
        }
        item.x = 0;
    };
    ListUI.prototype.removeItem = function (item) {
        var id = this._list.indexOf(item);
        if (id != -1) {
            this.removeItemBy(id);
        }
    };
    ListUI.prototype.removeItemBy = function (id) {
        var _this = this;
        this.preventClick();
        var item = this._list[id];
        egret.Tween.get(item).to({ x: -600 }, 200).call(function () {
            _this._listContainer.removeChild(item);
            _this._list.splice(id, 1);
            var promises = _this.layout(id);
            Promise.all(promises).then(function () {
                _this.allowClick();
            });
        });
    };
    ListUI.prototype.getListLength = function () {
        return this._list.length;
    };
    /*阻止点击*/
    ListUI.prototype.preventClick = function () {
        for (var i = 0; i < this._list.length; i++) {
            this._list[i].touchEnabled = false;
        }
    };
    /*允许点击*/
    ListUI.prototype.allowClick = function () {
        for (var i = 0; i < this._list.length; i++) {
            this._list[i].touchEnabled = true;
        }
    };
    ListUI.prototype.layout = function (id) {
        var _this = this;
        var promises = [];
        var _loop_1 = function (i) {
            var targetY = this_1._lineSpace + i * (this_1._itemHeight + this_1._lineSpace);
            var p = new Promise(function (resolve, reject) {
                egret.setTimeout(function () {
                    egret.Tween.get(_this._list[i]).to({ y: targetY }, 100).call(function () {
                        resolve();
                    });
                }, _this, (i - id) * 10);
            });
            promises.push(p);
        };
        var this_1 = this;
        for (var i = id; i < this._list.length; i++) {
            _loop_1(i);
        }
        return promises;
    };
    return ListUI;
}(egret.Sprite));
__reflect(ListUI.prototype, "ListUI");
//# sourceMappingURL=ListUI.js.map