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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(w, h, label) {
        if (label === void 0) { label = "按钮"; }
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this._label = label;
        _this.init();
        return _this;
    }
    Button.prototype.init = function () {
        this.createFrame();
    };
    Button.prototype.createFrame = function () {
        this.createBackground();
        this.createOption();
    };
    /*创建/更新背景*/
    Button.prototype.createBackground = function () {
        var color = 0xdcb05a;
        switch (this._state) {
            case ButtonState.DOWN:
                color = 0x888888;
                break;
            case ButtonState.UP:
                color = 0x0096ff;
                break;
            case ButtonState.RIGHT:
                color = 0x17c872;
                break;
            case ButtonState.WRONG:
                color = 0xa20909;
                break;
        }
        var g = this.graphics;
        g.clear();
        g.beginFill(color);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
    };
    /*创建/更新按钮内容*/
    Button.prototype.createOption = function () {
        this._option = new egret.TextField();
        this.addChild(this._option);
        this._option.width = this._width;
        this._option.height = this._height;
        this._option.text = this._label;
        this._option.textColor = 0xffffff;
        this._option.textAlign = egret.HorizontalAlign.CENTER;
        this._option.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._option.size = this._height * 0.6;
        this._option.fontFamily = "微软雅黑";
        this._option.anchorOffsetX = this._option.width / 2;
        this._option.anchorOffsetY = this._option.height / 2;
        this._option.x = this._width / 2;
        this._option.y = this._height / 2;
    };
    return Button;
}(egret.Sprite));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map