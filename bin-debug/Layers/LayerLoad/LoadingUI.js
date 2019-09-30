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
//  loading
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    /**
     * @param bgColor 背景颜色
     */
    function LoadingUI(bgColor) {
        if (bgColor === void 0) { bgColor = 0x161F30; }
        var _this = _super.call(this) || this;
        _this._bgColor = bgColor;
        _this.initBg();
        _this.initSprite();
        _this.initData();
        return _this;
    }
    LoadingUI.prototype.initBg = function () {
        this._bgImg = new egret.Sprite();
        this._bgImg.graphics.beginFill(this._bgColor);
        this._bgImg.graphics.drawRect(0, 0, Main.W, Main.H);
        this.addChild(this._bgImg);
    };
    LoadingUI.prototype.initSprite = function () {
        this._barBg = new egret.Bitmap();
        this._barBg.texture = RES.getRes("Img_bar_bg");
        this.addChild(this._barBg);
        this._barImg = new egret.Bitmap();
        this._barImg.texture = RES.getRes("Img_bar");
        this.addChild(this._barImg);
        this._barShade = new egret.Bitmap();
        this._barShade.texture = RES.getRes("bar_texture_Bmp");
        this.addChild(this._barShade);
        this._loadingImg = new egret.Bitmap();
        this._loadingImg.texture = RES.getRes("loadTxtImg");
        this.addChild(this._loadingImg);
    };
    LoadingUI.prototype.initData = function () {
        this._barBg.scale9Grid = new egret.Rectangle(24, 19, 70, 2);
        this._barBg.width = this._bgImg.width / 10 * 8;
        this._barBg.x = (this._bgImg.width - this._barBg.width) / 2;
        this._barBg.y = (this._bgImg.height - this._barBg.height) / 2;
        this._barImg.scale9Grid = new egret.Rectangle(17, 11, 68, 2);
        this._barImg.width = 50;
        this._barImg.x = this._barBg.x + 10;
        this._barImg.y = this._barBg.y + 7;
        this._barShade.fillMode = egret.BitmapFillMode.REPEAT;
        this._barShade.width = 10;
        this._barShade.height = 20;
        this._barShade.x = this._barBg.x + 20;
        this._barShade.y = this._barBg.y + 10;
        var tempw = this._loadingImg.width;
        this._loadingImg.anchorOffsetX = this._loadingImg.width / 2;
        this._loadingImg.scaleX = this._loadingImg.scaleY = Main.scaleNum;
        this._loadingImg.x = this._barBg.x + this._barBg.width / 2;
        this._loadingImg.y = this._barBg.y + 50;
        this._barShade.width = 0;
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    LoadingUI.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
        if (exitTime === void 0) { exitTime = 0.1; }
        if (waitTime === void 0) { waitTime = 0.1; }
        if (stateAlpha === void 0) { stateAlpha = 1; }
        egret.Tween.get(this, {
            onChangeObj: this
        })
            .wait(waitTime * 1000)
            .to({ alpha: stateAlpha }, exitTime * 1000);
    };
    /**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    LoadingUI.prototype.DestroyOut = function (exitTime, waitTime) {
        if (exitTime === void 0) { exitTime = 0.1; }
        if (waitTime === void 0) { waitTime = 0.1; }
        egret.Tween.get(this, {
            onChangeObj: this
        })
            .wait(waitTime * 1000)
            .to({ alpha: 0 }, exitTime * 1000)
            .call(this.Destroy, this, []);
    };
    /**
     * 删除自己
     */
    LoadingUI.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
            // console.log('remove loading')
        }
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        var newW = Math.floor(current * (this._barBg.width - 18) / total);
        this._barImg.width = newW;
        this._barShade.width = newW - 20;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map