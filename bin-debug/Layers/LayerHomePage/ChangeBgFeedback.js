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
//修改背景框底部背景框弹板
var ChangeBgFeedback = (function (_super) {
    __extends(ChangeBgFeedback, _super);
    function ChangeBgFeedback() {
        var _this = _super.call(this) || this;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    ChangeBgFeedback.prototype.initSprite = function () {
        this.bgColor = new egret.Sprite();
        this.bgColor.graphics.beginFill(0x000000, .3);
        this.bgColor.graphics.drawRect(0, 0, Main.W, Main.H);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);
        this.changeBackBg = new egret.Sprite();
        this.changeBackBg.graphics.beginFill(0xffffff, .95);
        this.changeBackBg.graphics.drawRoundRect(0, 0, Main.W / 10 * 8, Main.H / 10 * 8, 50, 50);
        this.changeBackBg.graphics.endFill();
        this.addChild(this.changeBackBg);
        this.shutDownSp = new egret.Sprite();
        this.shutDownSp.graphics.beginFill(0xD83838);
        this.shutDownSp.graphics.drawCircle(0, 0, this.changeBackBg.width / 30 * 2);
        this.shutDownSp.graphics.endFill();
        this.addChild(this.shutDownSp);
        this.shutDownBtn = new egret.TextField();
        this.shutDownBtn.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.shutDownBtn.textAlign = egret.HorizontalAlign.CENTER;
        this.shutDownBtn.fontFamily = "微软雅黑";
        this.shutDownBtn.textColor = 0xffffff;
        this.shutDownBtn.text = '✖';
        this.shutDownBtn.size = this.shutDownSp.width / 2;
        this.shutDownSp.addChild(this.shutDownBtn);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    ChangeBgFeedback.prototype.UpWindowData = function () {
        this.bgColor.graphics.clear();
        this.bgColor.graphics.beginFill(0x000000, .3);
        this.bgColor.graphics.drawRect(0, 0, Main.W, Main.H);
        this.bgColor.graphics.endFill();
        this.changeBackBg.graphics.clear();
        this.changeBackBg.graphics.beginFill(0xffffff, .95);
        this.changeBackBg.graphics.drawRoundRect(0, 0, Main.W / 10 * 8, Main.H / 10 * 8, 50, 50);
        this.changeBackBg.graphics.endFill();
        this.changeBackBg.x = (Main.W - this.changeBackBg.width) / 2;
        this.changeBackBg.y = (Main.H - this.changeBackBg.height) / 2;
        this.shutDownSp.x = this.changeBackBg.x + this.changeBackBg.width;
        this.shutDownSp.y = this.changeBackBg.y;
        this.shutDownBtn.x = -this.shutDownBtn.width / 2;
        this.shutDownBtn.y = -this.shutDownBtn.height / 2;
    };
    /**
     * 初始化事件消息
     */
    ChangeBgFeedback.prototype.initMessage = function () {
        this.bgColor.touchEnabled = true;
        this.changeBackBg.touchEnabled = true;
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    ChangeBgFeedback.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    ChangeBgFeedback.prototype.DestroyOut = function (exitTime, waitTime) {
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
    ChangeBgFeedback.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return ChangeBgFeedback;
}(BaseContainer));
__reflect(ChangeBgFeedback.prototype, "ChangeBgFeedback");
//# sourceMappingURL=ChangeBgFeedback.js.map