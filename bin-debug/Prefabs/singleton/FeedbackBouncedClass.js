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
//反馈信息，弹框类
var FeedbackBouncedClass = (function (_super) {
    __extends(FeedbackBouncedClass, _super);
    function FeedbackBouncedClass(_feedbackStr) {
        if (_feedbackStr === void 0) { _feedbackStr = ''; }
        var _this = _super.call(this) || this;
        //反馈面板下标
        _this.feedbackName = '';
        //反馈版text内容
        _this.feedbackStr = '';
        if (FeedbackBouncedClass.feedback) {
            throw new Error('已存在,无需创建');
        }
        FeedbackBouncedClass.feedback = _this;
        _this.feedbackStr = _feedbackStr;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        _this.hiddenOut(0, 0, 0);
        return _this;
    }
    FeedbackBouncedClass.prototype.saveLoad = function (val, boo) {
        if (boo === void 0) { boo = true; }
        this.feedbackStr = val;
        this.feedbackText.text = this.feedbackStr;
        this.hiddenOut();
        this.shutDownSp.visible = boo;
        this.feedbackBg.touchEnabled = boo;
        this.bgColor.touchEnabled = boo;
        this.shutDownSp.touchEnabled = boo;
    };
    FeedbackBouncedClass.prototype.killLoad = function () {
        this.feedbackStr = "";
        this.feedbackText.text = '';
        this.hiddenOut();
        this.shutDownSp.visible = false;
        this.feedbackBg.touchEnabled = false;
        this.bgColor.touchEnabled = false;
        this.shutDownSp.touchEnabled = false;
    };
    FeedbackBouncedClass.prototype.setLable = function (val, boo) {
        if (boo === void 0) { boo = true; }
        this.feedbackStr = val;
        this.feedbackText.text = this.feedbackStr;
        this.hiddenOut();
        this.shutDownSp.visible = boo;
        this.feedbackBg.touchEnabled = boo;
        this.bgColor.touchEnabled = boo;
        this.shutDownSp.touchEnabled = boo;
    };
    /**
     * 创建图形界面
     */
    FeedbackBouncedClass.prototype.initSprite = function () {
        this.bgColor = new egret.Sprite();
        this.bgColor.graphics.beginFill(0x000000, .5);
        this.bgColor.graphics.drawRect(0, 0, Main.W, Main.H);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);
        this.feedbackBg = new egret.Sprite();
        this.feedbackBg.graphics.beginFill(0xffffff, .95);
        this.feedbackBg.graphics.drawRoundRect(0, 0, Main.W * .8, Main.H / 3, 50, 50);
        this.feedbackBg.graphics.endFill();
        this.addChild(this.feedbackBg);
        this.shutDownSp = new egret.Sprite();
        this.shutDownSp.graphics.beginFill(0xD83838);
        this.shutDownSp.graphics.drawCircle(0, 0, Main.W / 20);
        this.shutDownSp.graphics.endFill();
        this.addChild(this.shutDownSp);
        this.shutDownBtn = new egret.TextField();
        this.shutDownBtn.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.shutDownBtn.textAlign = egret.HorizontalAlign.CENTER;
        this.shutDownBtn.fontFamily = "微软雅黑";
        this.shutDownBtn.textColor = 0xffffff;
        this.shutDownBtn.text = '✖';
        this.shutDownBtn.size = Main.W / 20;
        this.shutDownSp.addChild(this.shutDownBtn);
        this.feedbackText = new egret.TextField();
        this.feedbackText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.feedbackText.textAlign = egret.HorizontalAlign.CENTER;
        this.feedbackText.width = this.feedbackBg.width * .8;
        this.feedbackText.height = this.feedbackBg.height;
        this.feedbackText.multiline = true;
        this.feedbackText.wordWrap = true;
        this.feedbackText.fontFamily = "微软雅黑";
        this.feedbackText.textColor = 0x000000;
        this.feedbackText.text = this.feedbackStr;
        this.feedbackText.size = Main.W / 20;
        this.feedbackBg.addChild(this.feedbackText);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    FeedbackBouncedClass.prototype.UpWindowData = function () {
        this.bgColor.x = 0;
        this.bgColor.y = 0;
        this.bgColor.width = Main.W;
        this.bgColor.height = Main.H;
        this.feedbackBg.x = (Main.W - this.feedbackBg.width) / 2;
        this.feedbackBg.y = (Main.H - this.feedbackBg.height) / 2;
        this.feedbackBg.width = Main.W * .8;
        this.feedbackBg.height = Main.H / 3;
        this.shutDownSp.x = this.feedbackBg.x + this.feedbackBg.width - (this.shutDownSp.width / 4);
        this.shutDownSp.y = this.feedbackBg.y;
        this.shutDownBtn.x = (this.shutDownSp.width - this.shutDownSp.width * 1.5) / 2;
        this.shutDownBtn.y = (this.shutDownSp.height - this.shutDownSp.height * 1.5) / 2;
        this.feedbackText.x = (this.feedbackBg.width - this.feedbackText.width) / 2;
        this.feedbackText.y = (this.feedbackBg.height - this.feedbackText.height) / 2;
    };
    /**
     * 初始化事件消息
     */
    FeedbackBouncedClass.prototype.initMessage = function () {
        this.feedbackBg.touchEnabled = true;
        this.bgColor.touchEnabled = true;
        this.bgColor.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shutDownSpTouch, this);
        this.shutDownSp.touchEnabled = true;
        this.shutDownSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shutDownSpTouch, this);
    };
    FeedbackBouncedClass.prototype.shutDownSpTouch = function (e) {
        // console.log('关闭shutdown')
        this.hiddenOut(0, 0, 0);
        this.feedbackText.text = '';
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'shutdownFeedback'));
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    FeedbackBouncedClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
        if (exitTime === void 0) { exitTime = 0.1; }
        if (waitTime === void 0) { waitTime = 0.1; }
        if (stateAlpha === void 0) { stateAlpha = 1; }
        egret.Tween.get(this, {
            onChangeObj: this
        })
            .wait(waitTime * 1000)
            .to({ alpha: stateAlpha }, exitTime * 1000);
        if (stateAlpha == 1) {
            this.bgColor.touchEnabled = true;
            this.feedbackBg.touchEnabled = true;
            this.shutDownSp.touchEnabled = true;
        }
        else {
            this.bgColor.touchEnabled = false;
            this.feedbackBg.touchEnabled = false;
            this.shutDownSp.touchEnabled = false;
        }
    };
    /**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    FeedbackBouncedClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    FeedbackBouncedClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return FeedbackBouncedClass;
}(BaseContainer));
__reflect(FeedbackBouncedClass.prototype, "FeedbackBouncedClass");
//# sourceMappingURL=FeedbackBouncedClass.js.map