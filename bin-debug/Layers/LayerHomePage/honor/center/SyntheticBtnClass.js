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
// 徽章拖动按钮，单元
var SyntheticBtnClass = (function (_super) {
    __extends(SyntheticBtnClass, _super);
    function SyntheticBtnClass(syntheicType) {
        if (syntheicType === void 0) { syntheicType = ''; }
        var _this = _super.call(this) || this;
        _this.oldX = 0;
        _this.oldY = 0;
        _this.id = 0;
        //按钮纹理名字
        _this.textureName = '';
        //是否被占用
        _this.placeholderBoo = false;
        //被占用下标
        _this.placeholderIndex = 0;
        _this._public = new PublicClass();
        _this.initSprite(syntheicType);
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    SyntheticBtnClass.prototype.initSprite = function (syntheicType) {
        this.bgTexture = new egret.Shape();
        this.bgTexture.graphics.beginFill(0xff00ff, 1);
        this.bgTexture.graphics.drawRect(-10, -10, Main.W / 6 + 20, Main.W / 6 + 20);
        this.bgTexture.graphics.endFill();
        this.addChild(this.bgTexture);
        this.bgTexture.visible = false;
        this.btnBg = new egret.Shape();
        this.btnBg.graphics.beginFill(0x00ff00, .5);
        // this.btnBg.graphics.drawRoundRect(0,0,Main.W/6,Main.W/6,50,50);
        this.btnBg.graphics.drawRect(0, 0, Main.W / 6, Main.W / 6);
        this.btnBg.graphics.endFill();
        this.addChild(this.btnBg);
        if (syntheicType != '') {
            this.syntheitcImg = new ImgTemplate(syntheicType);
            this.syntheitcImg.result.width = this.btnBg.width;
            this.syntheitcImg.result.height = this.btnBg.height;
            this.addChild(this.syntheitcImg);
        }
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    SyntheticBtnClass.prototype.UpWindowData = function () {
        var scNum = 0, honorBtnW = 0, honorBtnH = 0;
        scNum = Main.scaleNum + .8;
    };
    /**
     * 初始化事件消息
     */
    SyntheticBtnClass.prototype.initMessage = function () {
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    SyntheticBtnClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    SyntheticBtnClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    SyntheticBtnClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return SyntheticBtnClass;
}(BaseContainer));
__reflect(SyntheticBtnClass.prototype, "SyntheticBtnClass");
//# sourceMappingURL=SyntheticBtnClass.js.map