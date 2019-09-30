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
var RedAlert = (function (_super) {
    __extends(RedAlert, _super);
    function RedAlert(radius) {
        if (radius === void 0) { radius = 40; }
        var _this = _super.call(this) || this;
        _this._currentNum = 0;
        _this._radius = radius;
        _this._bg = new egret.Shape;
        _this.addChild(_this._bg);
        _this._txt = new egret.TextField();
        _this._txt.text = String(_this._currentNum);
        _this._txt.textAlign = egret.HorizontalAlign.CENTER;
        _this._txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        var size = radius;
        _this._txt.width = radius * 2;
        _this._txt.height = radius * 2;
        _this._txt.anchorOffsetX = radius;
        _this._txt.anchorOffsetY = radius;
        _this._txt.bold = true;
        _this._txt.size = size;
        _this.addChild(_this._txt);
        _this.draw();
        return _this;
    }
    Object.defineProperty(RedAlert.prototype, "currentNum", {
        get: function () {
            return this._currentNum;
        },
        set: function (value) {
            this._currentNum = value;
            this._txt.text = String(this._currentNum);
        },
        enumerable: true,
        configurable: true
    });
    RedAlert.prototype.draw = function () {
        var fillColor;
        var textColor;
        fillColor = 0xff0000;
        textColor = 0xffffff;
        var g = this._bg.graphics;
        g.clear();
        g.beginFill(fillColor);
        g.lineStyle(1, 0xffffff);
        g.drawCircle(0, 0, this._radius);
        g.endFill();
        this._txt.textColor = textColor;
    };
    return RedAlert;
}(egret.Sprite));
__reflect(RedAlert.prototype, "RedAlert");
//# sourceMappingURL=RedAlert.js.map