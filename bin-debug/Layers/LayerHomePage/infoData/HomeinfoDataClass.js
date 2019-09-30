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
 * 个人主页 用户信息展示类
 */
var HomeinfoDataClass = (function (_super) {
    __extends(HomeinfoDataClass, _super);
    function HomeinfoDataClass() {
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
    HomeinfoDataClass.prototype.initSprite = function () {
        this.bgColor = new egret.Shape();
        this.bgColor.graphics.beginFill(0xEFEFEF);
        this.bgColor.graphics.drawRect(0, 0, Main.W, Main.H * .15);
        this.bgColor.graphics.endFill();
        this.bgColor.alpha = 0;
        this.addChild(this.bgColor);
        this.changeInfoBtn = this._public.createBitmapByName('img_changeInfo');
        this.addChild(this.changeInfoBtn);
        this.changePasswordBtn = this._public.createBitmapByName('img_changepassword');
        this.addChild(this.changePasswordBtn);
        this.formRemote();
    };
    //从网络加载资源
    HomeinfoDataClass.prototype.formRemote = function () {
        this.infoData = new egret.Bitmap;
        this.infoData.texture = DataBus._userAvatarTexture;
        this.addChild(this.infoData);
        if (DataBus._nickName != '') {
            this.userNickName = this._public.createTextByName(DataBus._nickName, 50, 0xffffff);
        }
        else {
            this.userNickName = this._public.createTextByName(DataBus._userName, 50, 0xffffff);
        }
        this.userNickName.border = true;
        this.userNickName.borderColor = 0xff0000;
        this.addChild(this.userNickName);
        this.userLevel = this._public.createTextByName('Lv:' + DataBus._level[0].toString(), 50, 0xffffff);
        this.addChild(this.userLevel);
        this.userIntegral = this._public.createTextByName('积分:' + DataBus._score, 50, 0xffffff);
        this.addChild(this.userIntegral);
        this.userLife = this._public.createTextByName('体力:' + DataBus._power, 50, 0xffffff);
        this.addChild(this.userLife);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    HomeinfoDataClass.prototype.UpWindowData = function () {
        this.infoData.width = this.bgColor.height;
        this.infoData.height = this.bgColor.height;
        this.infoData.x = this.infoData.width / 6;
        this.userNickName.x = this.infoData.x + this.infoData.width * 1.3;
        this.userNickName.y = this.bgColor.height * .1;
        this.userLevel.x = this.infoData.x + this.infoData.width * 1.3;
        this.userLevel.y = this.bgColor.height * .3;
        this.userIntegral.x = this.infoData.x + this.infoData.width * 1.3;
        this.userIntegral.y = this.bgColor.height * .5;
        this.userLife.x = this.infoData.x + this.infoData.width * 1.3;
        this.userLife.y = this.bgColor.height * .7;
        this.changeInfoBtn.width = this.bgColor.height / 3;
        this.changeInfoBtn.height = this.bgColor.height / 3;
        this.changeInfoBtn.x = this.bgColor.width - this.changeInfoBtn.width * 1.5;
        this.changePasswordBtn.width = this.bgColor.height / 3;
        this.changePasswordBtn.height = this.bgColor.height / 3;
        this.changePasswordBtn.x = this.bgColor.width - this.changePasswordBtn.width * 1.5;
        this.changePasswordBtn.y = this.changeInfoBtn.y + this.changeInfoBtn.height * 1.5;
    };
    /**
     * 初始化事件消息
     */
    HomeinfoDataClass.prototype.initMessage = function () {
        this.changeInfoBtn.touchEnabled = true;
        this.changeInfoBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeInfoTouch, this);
        this.changePasswordBtn.touchEnabled = true;
        this.changePasswordBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changePasswordTouch, this);
    };
    HomeinfoDataClass.prototype.changeInfoTouch = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'changeInfo'));
    };
    HomeinfoDataClass.prototype.changePasswordTouch = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'changePassword'));
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    HomeinfoDataClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    HomeinfoDataClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    HomeinfoDataClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return HomeinfoDataClass;
}(BaseContainer));
__reflect(HomeinfoDataClass.prototype, "HomeinfoDataClass");
//# sourceMappingURL=HomeinfoDataClass.js.map