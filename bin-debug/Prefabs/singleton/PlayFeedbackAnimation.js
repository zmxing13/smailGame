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
//反馈动画模块
var PlayFeedbackAnimation = (function (_super) {
    __extends(PlayFeedbackAnimation, _super);
    function PlayFeedbackAnimation() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.outTime = 0; //退出时间
        _this.outBoo = false; //退出状态
        if (PlayFeedbackAnimation.playAnimation) {
            throw new Error('反馈动画模板-已存在,无需创建');
        }
        PlayFeedbackAnimation.playAnimation = _this;
        _this.outTime = 3000;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     *显示加载封屏页
    */
    PlayFeedbackAnimation.prototype.saveLoad = function (_disText) {
        var _this = this;
        if (_disText === void 0) { _disText = '反馈动画播放ing'; }
        this.UpWindowData();
        this.bg.visible = true;
        this.bg.touchEnabled = true;
        this.loadText.visible = true;
        this.loadText.text = _disText;
        this.loadText.size = Main.W / 20 * 1;
        this.loadText.x = (this.bg.width - this.loadText.width) / 2;
        this.loadText.y = (this.bg.height - this.loadText.height) / 2;
        this.outBoo = false;
        egret.Tween.get(this)
            .wait(this.outTime)
            .call(function () { _this.killLoad(); });
    };
    /**
     *隐藏加载封屏页
    */
    PlayFeedbackAnimation.prototype.killLoad = function () {
        this.hiddenOut(.2, 0, 0);
        this.bg.visible = false;
        this.bg.touchEnabled = false;
        this.loadText.visible = false;
        this.loadText.text = '';
        this.outBoo = true;
        console.log('kill PlayFeedbackAnimation');
    };
    /**
     * 创建图形界面
     */
    PlayFeedbackAnimation.prototype.initSprite = function () {
        this.bg = new egret.Sprite();
        this.bg.graphics.beginFill(0x000000, .5);
        this.bg.graphics.drawRect(0, 0, Main.W, Main.H);
        this.bg.graphics.endFill();
        this.addChild(this.bg);
        this.bg.visible = false;
        this.loadText = this._public.createTextByName('反馈动画播放ing');
        this.loadText.size = Main.W / 20 * 1;
        this.loadText.x = (this.bg.width - this.loadText.width) / 2;
        this.loadText.y = (this.bg.height - this.loadText.height) / 2;
        this.addChild(this.loadText);
        this.loadText.visible = false;
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    PlayFeedbackAnimation.prototype.UpWindowData = function () {
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(0x000000, .5);
        this.bg.graphics.drawRect(0, 0, Main.W, Main.H);
        this.bg.graphics.endFill();
    };
    /**
     * 初始化事件消息
     */
    PlayFeedbackAnimation.prototype.initMessage = function () {
        this.bg.touchEnabled = true;
        this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.bgTouch, this);
    };
    PlayFeedbackAnimation.prototype.bgTouch = function (e) {
        this.killLoad();
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    PlayFeedbackAnimation.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    PlayFeedbackAnimation.prototype.DestroyOut = function (exitTime, waitTime) {
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
    PlayFeedbackAnimation.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return PlayFeedbackAnimation;
}(BaseContainer));
__reflect(PlayFeedbackAnimation.prototype, "PlayFeedbackAnimation");
//# sourceMappingURL=PlayFeedbackAnimation.js.map