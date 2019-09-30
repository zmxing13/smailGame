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
var ButtonObject = (function (_super) {
    __extends(ButtonObject, _super);
    function ButtonObject(label, btnW, btnH, bgTextureStr) {
        if (label === void 0) { label = "新按钮"; }
        if (btnW === void 0) { btnW = 150; }
        if (btnH === void 0) { btnH = 40; }
        if (bgTextureStr === void 0) { bgTextureStr = ""; }
        var _this = _super.call(this) || this;
        _this.defaultColor = 0x000000;
        _this.btnContent = new egret.Sprite();
        _this.addChild(_this.btnContent);
        if (bgTextureStr == "") {
            _this.btnSprite = new egret.Sprite();
            _this.btnSprite.graphics.beginFill(_this.defaultColor);
            _this.btnSprite.graphics.drawRoundRect(0, 0, btnW, btnH, 5);
            _this.btnSprite.graphics.endFill();
            _this.btnSprite.x = -btnW / 2;
            _this.btnSprite.y = -btnH / 2;
            _this.btnContent.addChild(_this.btnSprite);
        }
        else {
            _this.btnImg = new egret.Bitmap();
            _this.btnImg.texture = RES.getRes(bgTextureStr);
            _this.btnImg.smoothing = true;
            _this.btnImg.width = btnW;
            _this.btnImg.height = btnH;
            _this.btnImg.x = -btnW / 2;
            _this.btnImg.y = -btnH / 2;
            _this.btnContent.addChild(_this.btnImg);
        }
        _this.btnText = new egret.TextField();
        _this.btnText.width = btnW - 8;
        _this.btnText.height = btnH - 8;
        _this.btnText.text = label;
        _this.btnText.size = 30;
        _this.btnText.bold = true;
        _this.btnText.anchorOffsetX = _this.btnText.width / 2;
        _this.btnText.anchorOffsetY = _this.btnText.height / 2;
        _this.btnText.textAlign = egret.HorizontalAlign.CENTER;
        _this.btnText.verticalAlign = egret.VerticalAlign.MIDDLE;
        //this.btnText.border=true;
        _this.btnText.borderColor = 0xff0000;
        _this.btnContent.addChild(_this.btnText);
        _this.btnContent.touchEnabled = true;
        _this.btnContent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.runAnim, _this);
        return _this;
    }
    ButtonObject.prototype.runAnim = function () {
        egret.Tween.get(this.btnContent, {
            onChangeObj: this
        })
            .to({ scaleX: this.btnContent.scaleX - .05, scaleY: this.btnContent.scaleY - .05 }, 100)
            .call(this.exitAnim, this, []);
    };
    ButtonObject.prototype.exitAnim = function () {
        egret.Tween.removeTweens(this.btnContent);
        this.btnContent.scaleX = this.btnContent.scaleY = 1;
    };
    return ButtonObject;
}(egret.DisplayObjectContainer));
__reflect(ButtonObject.prototype, "ButtonObject");
//# sourceMappingURL=ButtonObject.js.map