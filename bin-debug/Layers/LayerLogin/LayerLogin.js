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
// 登陆注册页
var LayerLogin = (function (_super) {
    __extends(LayerLogin, _super);
    function LayerLogin() {
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
    LayerLogin.prototype.initSprite = function () {
        this.loginClass = new LoginClass();
        this.addChild(this.loginClass);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    LayerLogin.prototype.UpWindowData = function () {
    };
    //设置登录页用户和密码
    LayerLogin.prototype.setUserInfoLabal = function (_username, _password) {
        if (_username === void 0) { _username = ''; }
        if (_password === void 0) { _password = ''; }
        this.loginClass.setUserInfoLabal(_username, _password);
    };
    /**
     * 初始化事件消息
     */
    LayerLogin.prototype.initMessage = function () {
        this.loginClass.addEventListener(EventEnumerate.SELECT_COMPLETE, this.loginClassComplete, this);
    };
    LayerLogin.prototype.loginClassComplete = function (e) {
        if (e.data == 'sign') {
            this.loginClass.DestroyOut();
            this.signClass = new SignClass();
            this.signClass.alpha = 0;
            this.signClass.hiddenOut(.1, .1);
            this.addChild(this.signClass);
            this.signClass.addEventListener(EventEnumerate.SELECT_COMPLETE, this.signClassComlete, this);
        }
        else if (e.data == 'start') {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'DoneSign'));
        }
    };
    //注册完成后执行
    LayerLogin.prototype.signClassComlete = function (e) {
        if (e.data == 'doneSignClass') {
            this.signClass.DestroyOut();
            this.loginClass = new LoginClass(DataBus._userName, DataBus._password);
            this.loginClass.signBtn.visible = false;
            this.loginClass.addEventListener(EventEnumerate.SELECT_COMPLETE, this.loginClassComleteDone, this);
            this.addChild(this.loginClass);
        }
    };
    //注册完成后，开始游戏按钮
    LayerLogin.prototype.loginClassComleteDone = function (e) {
        if (e.data == 'start') {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'DoneSign'));
        }
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    LayerLogin.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    LayerLogin.prototype.DestroyOut = function (exitTime, waitTime) {
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
    LayerLogin.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return LayerLogin;
}(BaseContainer));
__reflect(LayerLogin.prototype, "LayerLogin");
//# sourceMappingURL=LayerLogin.js.map