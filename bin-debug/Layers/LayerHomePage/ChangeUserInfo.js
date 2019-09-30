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
//更改用户信息类
var ChangeUserInfo = (function (_super) {
    __extends(ChangeUserInfo, _super);
    function ChangeUserInfo() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        //选中头像id
        _this.selectedAvatarId = 0;
        //昵称默认输入框
        _this.selectedNickName = '';
        _this.avatarArr = [];
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    ChangeUserInfo.prototype.initSprite = function () {
        this.feedbackBg = new ChangeBgFeedback();
        this.addChild(this.feedbackBg);
        this.changeUserInfoBackTitle = this._public.createTextByName('修改用户信息', 80, 0x000000);
        this.addChild(this.changeUserInfoBackTitle);
        this.changeUserAvatarSp = new egret.Sprite();
        this.addChild(this.changeUserAvatarSp);
        var i, curAvatar, curTexture;
        DataBus._userAvatarBitmapArr = [];
        if (DataBus._userAvatarTextureArr.length > 0) {
            for (i = 0; i < DataBus._userAvatarTextureArr.length; i++) {
                curAvatar = new egret.Bitmap();
                var curTexture_1 = DataBus._userAvatarTextureArr[i];
                curAvatar.texture = curTexture_1;
                curAvatar.width = this.feedbackBg.width / 6;
                curAvatar.height = this.feedbackBg.width / 6;
                curAvatar.x = curAvatar.width * i;
                curAvatar.name = (i + 1).toString();
                this.avatarArr.push(curAvatar);
                DataBus._userAvatarBitmapArr.push(curAvatar);
                this.changeUserAvatarSp.addChild(curAvatar);
            }
        }
        this.changeUserNick = new InputTextClass();
        this.changeUserNick.setExplainStr('请输入更改的昵称');
        this.addChild(this.changeUserNick);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    ChangeUserInfo.prototype.UpWindowData = function () {
        this.feedbackBg.x = 0;
        this.feedbackBg.y = 0;
        this.changeUserInfoBackTitle.x = (this.feedbackBg.width - this.changeUserInfoBackTitle.width) / 2;
        this.changeUserInfoBackTitle.y = this.feedbackBg.height / 10 * 2;
        this.changeUserAvatarSp.x = (this.feedbackBg.width - this.changeUserAvatarSp.width) / 2;
        this.changeUserAvatarSp.y = this.feedbackBg.height / 10 * 3;
        this.changeUserNick.x = (this.feedbackBg.width - this.changeUserNick.width) / 2;
        this.changeUserNick.y = this.feedbackBg.height / 10 * 5;
    };
    /**
     * 初始化事件消息
     */
    ChangeUserInfo.prototype.initMessage = function () {
        var i, obj;
        for (i = 0; i < this.avatarArr.length; i++) {
            obj = this.avatarArr[i];
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.avaatarTouch, this);
        }
        this.feedbackBg.bgColor.touchEnabled = true;
        this.feedbackBg.shutDownSp.touchEnabled = true;
        this.feedbackBg.bgColor.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.feedBackTouch, this);
        this.feedbackBg.shutDownSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.feedBackTouch, this);
    };
    ChangeUserInfo.prototype.avaatarTouch = function (e) {
        var mc = e.currentTarget;
        console.log('当前选中的图片下标是：' + mc.name);
        this.selectedAvatarId = parseInt(mc.name);
    };
    //关闭本身
    ChangeUserInfo.prototype.feedBackTouch = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'shutdownChangeFeedback'));
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    ChangeUserInfo.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
            this.changeUserAvatarSp.visible = true;
            this.changeUserAvatarSp.touchEnabled = true;
            this.changeUserNick.visible = true;
        }
        else {
            this.feedbackBg.touchEnabled = false;
            this.feedbackBg.bgColor.touchEnabled = false;
            this.feedbackBg.changeBackBg.touchEnabled = false;
            this.feedbackBg.shutDownSp.touchEnabled = false;
            this.changeUserAvatarSp.visible = false;
            this.changeUserAvatarSp.touchEnabled = false;
            this.changeUserNick.visible = false;
            this.changeUserNick.inputTextContent.text = '';
        }
    };
    /**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    ChangeUserInfo.prototype.DestroyOut = function (exitTime, waitTime) {
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
    ChangeUserInfo.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return ChangeUserInfo;
}(BaseContainer));
__reflect(ChangeUserInfo.prototype, "ChangeUserInfo");
//# sourceMappingURL=ChangeUserInfo.js.map