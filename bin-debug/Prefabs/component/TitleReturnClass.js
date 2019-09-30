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
 * 标题类 包含返回按钮
 */
var TitleReturnClass = (function (_super) {
    __extends(TitleReturnClass, _super);
    function TitleReturnClass(titleStr, returnStr) {
        if (titleStr === void 0) { titleStr = ''; }
        if (returnStr === void 0) { returnStr = 'img_returnArrow'; }
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.initSprite(titleStr, returnStr);
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    TitleReturnClass.prototype.initSprite = function (titleStr, returnStr) {
        this.bgColor = new egret.Shape();
        this.bgColor.graphics.beginFill(0xEFEFEF);
        this.bgColor.graphics.drawRect(0, 0, Main.W, Main.H * .05);
        this.bgColor.graphics.endFill();
        this.bgColor.visible = false;
        this.addChild(this.bgColor);
        this.titleImg = new ImgTemplate(titleStr);
        this.addChild(this.titleImg);
        this.returnBtn = new ImgTemplate(returnStr);
        this.addChild(this.returnBtn);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    TitleReturnClass.prototype.UpWindowData = function () {
        this.returnBtn.scaleX = this.returnBtn.scaleY = Main.scaleNum + 1;
        this.returnBtn.x = 0;
        this.returnBtn.y = this.titleImg.height / 4;
        this.titleImg.scaleX = this.titleImg.scaleY = Main.scaleNum + 1;
        this.titleImg.x = (Main.W - this.titleImg.width) / 2 - (this.titleImg.width);
        this.titleImg.y = 0;
    };
    /**
     * 初始化事件消息
     */
    TitleReturnClass.prototype.initMessage = function () {
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
    */
    TitleReturnClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    TitleReturnClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    TitleReturnClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return TitleReturnClass;
}(BaseContainer));
__reflect(TitleReturnClass.prototype, "TitleReturnClass");
//# sourceMappingURL=TitleReturnClass.js.map