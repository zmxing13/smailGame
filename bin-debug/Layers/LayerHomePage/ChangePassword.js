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
//更改用户登陆密码类
var ChangePassword = (function (_super) {
    __extends(ChangePassword, _super);
    function ChangePassword() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    ChangePassword.prototype.initSprite = function () {
        this.feedbackBg = new ChangeBgFeedback();
        this.addChild(this.feedbackBg);
        this.changePassWordBackTitle = this._public.createTextByName('更改登陆密码', 80, 0x000000);
        this.addChild(this.changePassWordBackTitle);
        this.changeOldPassWord = new InputTextClass();
        this.changeOldPassWord.setExplainStr('请输入旧密码', true);
        // this.changeOldPassWord.x = (this.changePassWordSp.width - this.changeOldPassWord.width)/2;
        // this.changeOldPassWord.y = this.changePassWordBackTitle.y + this.changeOldPassWord.height/1.5;
        this.addChild(this.changeOldPassWord);
        this.changeNewPassWord = new InputTextClass();
        this.changeNewPassWord.setExplainStr('请输入新密码', true);
        this.addChild(this.changeNewPassWord);
        this.changeAgainPassWord = new InputTextClass();
        this.changeAgainPassWord.setExplainStr('请确认新密码', true);
        this.addChild(this.changeAgainPassWord);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    ChangePassword.prototype.UpWindowData = function () {
        var tempScale = 0;
        var scaleNum = 0;
        var scaleXNum = 0;
        var scaleYNum = 0;
        tempScale = Main.scaleNum;
        this.feedbackBg.x = 0;
        this.feedbackBg.y = 0;
        this.changePassWordBackTitle.scaleX = this.changePassWordBackTitle.scaleY = tempScale;
        this.changePassWordBackTitle.x = (this.feedbackBg.width - this.changePassWordBackTitle.width * tempScale) / 2;
        this.changePassWordBackTitle.y = this.feedbackBg.height / 10 * 2;
        this.changeOldPassWord.scaleX = this.changeOldPassWord.scaleY = tempScale;
        this.changeOldPassWord.x = (this.feedbackBg.width - this.changeOldPassWord.width * tempScale) / 2;
        this.changeOldPassWord.y = this.feedbackBg.height / 10 * 3;
        this.changeNewPassWord.scaleX = this.changeNewPassWord.scaleY = tempScale;
        this.changeNewPassWord.x = (this.feedbackBg.width - this.changeNewPassWord.width * tempScale) / 2;
        this.changeNewPassWord.y = this.changeOldPassWord.y + this.changeOldPassWord.height;
        this.changeAgainPassWord.scaleX = this.changeAgainPassWord.scaleY = tempScale;
        this.changeAgainPassWord.x = (this.feedbackBg.width - this.changeAgainPassWord.width * tempScale) / 2;
        this.changeAgainPassWord.y = this.changeNewPassWord.y + this.changeAgainPassWord.height;
    };
    /**
     * 初始化事件消息
     */
    ChangePassword.prototype.initMessage = function () {
        this.feedbackBg.bgColor.touchEnabled = true;
        this.feedbackBg.bgColor.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.feedBackTouch, this);
        this.feedbackBg.shutDownSp.touchEnabled = true;
        this.feedbackBg.shutDownSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.feedBackTouch, this);
    };
    ChangePassword.prototype.feedBackTouch = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'shutdownChangeFeedback'));
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    ChangePassword.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
        if (exitTime === void 0) { exitTime = 0.1; }
        if (waitTime === void 0) { waitTime = 0.1; }
        if (stateAlpha === void 0) { stateAlpha = 1; }
        egret.Tween.get(this, {
            onChangeObj: this
        })
            .wait(waitTime * 1000)
            .to({ alpha: stateAlpha }, exitTime * 1000);
        if (stateAlpha == 1) {
            this.feedbackBg.touchEnabled = true;
            this.feedbackBg.bgColor.touchEnabled = true;
            this.feedbackBg.changeBackBg.touchEnabled = true;
            this.feedbackBg.shutDownSp.touchEnabled = true;
            this.changeOldPassWord.visible = true;
            this.changeNewPassWord.visible = true;
            this.changeAgainPassWord.visible = true;
        }
        else {
            this.feedbackBg.touchEnabled = false;
            this.feedbackBg.bgColor.touchEnabled = false;
            this.feedbackBg.changeBackBg.touchEnabled = false;
            this.feedbackBg.shutDownSp.touchEnabled = false;
            this.changeOldPassWord.visible = false;
            this.changeNewPassWord.visible = false;
            this.changeAgainPassWord.visible = false;
            this.changeOldPassWord.inputTextContent.text = '';
            this.changeNewPassWord.inputTextContent.text = '';
            this.changeAgainPassWord.inputTextContent.text = '';
        }
    };
    /**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    ChangePassword.prototype.DestroyOut = function (exitTime, waitTime) {
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
    ChangePassword.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return ChangePassword;
}(BaseContainer));
__reflect(ChangePassword.prototype, "ChangePassword");
//# sourceMappingURL=ChangePassword.js.map