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
var HisTitleItemUI = (function (_super) {
    __extends(HisTitleItemUI, _super);
    function HisTitleItemUI(w, h, data) {
        var _this = _super.call(this) || this;
        _this._data = {
            type: "level",
            info: "闯关：1到5级",
        };
        _this._width = w;
        _this._height = h;
        _this._data = data;
        _this._img = new egret.Bitmap();
        _this.addBackGround();
        _this.drawContent();
        _this.drawBackGround();
        return _this;
    }
    HisTitleItemUI.prototype.addBackGround = function () {
        this._bg = new egret.Shape();
        this.addChild(this._bg);
    };
    HisTitleItemUI.prototype.drawBackGround = function () {
        var g = this._bg.graphics;
        g.clear();
        g.lineStyle(1, 0xbbbbbb);
        g.beginFill(0xffffff);
        g.drawRoundRect(0, 0, this._width, this._height, 0, 0);
    };
    HisTitleItemUI.prototype.drawContent = function () {
        this.drawInfo();
    };
    HisTitleItemUI.prototype.drawInfo = function () {
        var info = new egret.TextField();
        this.addChild(info);
        info.width = this._width - 20;
        info.height = this._height - 40;
        info.text = this._data.info;
        info.textColor = 0x000000;
        info.fontFamily = "微软雅黑";
        info.textAlign = egret.HorizontalAlign.LEFT;
        info.verticalAlign = egret.VerticalAlign.MIDDLE;
        info.size = 20;
        info.x = 20;
        info.y = 20;
    };
    return HisTitleItemUI;
}(egret.Sprite));
__reflect(HisTitleItemUI.prototype, "HisTitleItemUI");
//# sourceMappingURL=HisTitleItemUI.js.map