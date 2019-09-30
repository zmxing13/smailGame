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
//更改用户信息，登陆密码
var ChangeUserInfoOrPasswordClass = (function (_super) {
    __extends(ChangeUserInfoOrPasswordClass, _super);
    function ChangeUserInfoOrPasswordClass() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        //用户信息 or 用户密码 布尔
        _this.userIsPassBoo = false;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    ChangeUserInfoOrPasswordClass.prototype.initSprite = function () {
        this.doneBtn = this._public.createBitmapByName('img_done');
        this.doneBtn.alpha = 0;
        this.addChildAt(this.doneBtn, 1);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    ChangeUserInfoOrPasswordClass.prototype.UpWindowData = function () {
    };
    /**
     * 初始化事件消息
     */
    ChangeUserInfoOrPasswordClass.prototype.initMessage = function () {
        this.doneBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doneBtnTouch, this);
    };
    ChangeUserInfoOrPasswordClass.prototype.doneBtnTouch = function (e) {
        this.doneBtn.touchEnabled = false;
        if (this.userIsPassBoo) {
            console.log('updata password');
            if (this.changePassword.changeOldPassWord || this.changePassword.changeNewPassWord || this.changePassword.changeAgainPassWord) {
                var passwordState = this._public.validationPassWord(this.changePassword.changeNewPassWord.inputTextContent.text, this.changePassword.changeAgainPassWord.inputTextContent.text);
                // console.log(passwordState)
                this.doneBtn.touchEnabled = true;
                if (passwordState != 'pass') {
                    LayerDialogBoxScene.getInstance().newDialogBoxEvent(passwordState, DialogBox.TypeModel.Type_Warn);
                }
                else {
                    //更换本地密码
                    WebServerData.webServer.setPassword(DataBus._token, this.changePassword.changeOldPassWord.inputTextContent.text, this.changePassword.changeNewPassWord.inputTextContent.text, this.setPasswordSendDone, this);
                }
            }
            else {
                this.doneBtn.touchEnabled = true;
                LayerDialogBoxScene.getInstance().newDialogBoxEvent('密码不能为空', DialogBox.TypeModel.Type_Warn);
            }
        }
        else {
            console.log('updata userinfo');
            var nickNameState = this._public.validationUserName(this.changeUserinfo.changeUserNick.inputTextContent.text);
            if (this.changeUserinfo.selectedAvatarId != -1 && this.changeUserinfo.changeUserNick.inputTextContent.text != '') {
                WebServerData.webServer.setUserInfo(DataBus._token, this.changeUserinfo.changeUserNick.inputTextContent.text, this.changeUserinfo.selectedAvatarId, this.setUserInfoSendDone, this);
            }
            else {
                this.doneBtn.touchEnabled = true;
                LayerDialogBoxScene.getInstance().newDialogBoxEvent('选项不能为空', DialogBox.TypeModel.Type_Warn);
            }
        }
    };
    ChangeUserInfoOrPasswordClass.prototype.setUserInfoSendDone = function (data) {
        console.log('设置用户信息：', data);
        if (data.code == 10001) {
            //删除本地用户存储信息-昵称，头像
            egret.localStorage.removeItem('userInfoNicknameAvartar');
            DataBus._nickName = data.data.nickname;
            DataBus._userAvatar = DataBus._userAvatarBitmapArr[this.changeUserinfo.selectedAvatarId - 1];
            //------修改用户信息存储本地-----------
            var userInfoNicknameAvartar = "userInfoNicknameAvartar";
            var userInfoNicknamePasswordValue = DataBus._nickName + "|" + DataBus._userAvatar;
            egret.localStorage.setItem(userInfoNicknameAvartar, userInfoNicknamePasswordValue);
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'updateNickName'));
            this.changeUserinfo.hiddenOut(.3, 0, 0);
            this.doneBtn.alpha = 0;
            this.doneBtn.touchEnabled = false;
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('更新成功', DialogBox.TypeModel.Type_Right);
        }
        else if (data.code == 10004) {
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('昵称已存在', DialogBox.TypeModel.Type_Warn);
            this.doneBtn.touchEnabled = true;
        }
        else {
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('数据有误,请重试', DialogBox.TypeModel.Type_Warn);
            this.doneBtn.touchEnabled = true;
        }
    };
    /**
     * 修改用户信息
     */
    ChangeUserInfoOrPasswordClass.prototype.changeUserInfoHandler = function () {
        this.userIsPassBoo = false;
        this.doneBtn.touchEnabled = true;
        this.doneBtn.alpha = 1;
        if (this.changePassword) {
            this.changePassword.visible = false;
            this.changePassword.hiddenOut(0, 0, 0);
        }
        ;
        if (!this.changeUserinfo) {
            this.changeUserinfo = new ChangeUserInfo();
            this.addChildAt(this.changeUserinfo, 0);
            this.doneBtn.x = (this.changeUserinfo.width - this.doneBtn.width) / 2;
            this.doneBtn.y = this.changeUserinfo.feedbackBg.changeBackBg.height - this.doneBtn.height;
            this.changeUserinfo.hiddenOut(.1, 0, 1);
        }
        else {
            this.changeUserinfo.visible = true;
            this.changeUserinfo.hiddenOut(.1, 0, 1);
        }
        this.changeUserinfo.addEventListener(EventEnumerate.SELECT_COMPLETE, this.changeUserinfoPasswordComlete, this);
    };
    /**
     * 修改用户密码
     */
    ChangeUserInfoOrPasswordClass.prototype.changeUserPassWordHandler = function () {
        this.userIsPassBoo = true;
        this.doneBtn.touchEnabled = true;
        this.doneBtn.alpha = 1;
        if (this.changeUserinfo) {
            this.changeUserinfo.visible = false;
            this.changeUserinfo.hiddenOut(0, 0, 0);
        }
        ;
        if (!this.changePassword) {
            this.changePassword = new ChangePassword();
            this.addChildAt(this.changePassword, 0);
            this.doneBtn.x = (this.changePassword.width - this.doneBtn.width) / 2;
            this.doneBtn.y = this.changePassword.feedbackBg.changeBackBg.height - this.doneBtn.height;
            this.changePassword.hiddenOut(.1, .1, 1);
        }
        else {
            this.changePassword.visible = true;
            this.changePassword.hiddenOut(.1, .1, 1);
        }
        this.changePassword.addEventListener(EventEnumerate.SELECT_COMPLETE, this.changeUserinfoPasswordComlete, this);
    };
    //---------------------------------------
    //---------------------------------------
    //---------------------------------------
    //设置新密码
    ChangeUserInfoOrPasswordClass.prototype.setPasswordSendDone = function (data) {
        console.log('设置新密码', data);
        if (data.code == 10001) {
            DataBus._password = this.changePassword.changeNewPassWord.inputTextContent.text;
            WebServerData.webServer.userLogin(DataBus._userName, DataBus._password, this.TokenSendDone, this);
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('密码更新成功', DialogBox.TypeModel.Type_Right);
        }
        else {
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('密码修改失败，请重试', DialogBox.TypeModel.Type_Warn);
        }
        this.changePassword.changeOldPassWord.inputTextContent.text = '';
        this.changePassword.changeNewPassWord.inputTextContent.text = '';
        this.changePassword.changeAgainPassWord.inputTextContent.text = '';
    };
    //验证token值
    ChangeUserInfoOrPasswordClass.prototype.TokenSendDone = function (data) {
        console.log('设置新Token', data);
        if (data.code == 20000) {
            //删除本地用户登陆信息
            egret.localStorage.removeItem('userInfo');
            //删除本地用户Token信息
            egret.localStorage.removeItem('userToken');
            //------重置本地用户登陆信息-----------
            var userinfo = "userInfo";
            var userValue = DataBus._userName + "|" + DataBus._password;
            egret.localStorage.setItem(userinfo, userValue);
            //------重置本地用户Token信息-----------
            var usertoken = "userToken";
            var tokenValue = DataBus._token;
            egret.localStorage.setItem(usertoken, tokenValue);
            this.changePassword.hiddenOut(.3, 0, 0);
            this.doneBtn.alpha = 0;
            this.doneBtn.touchEnabled = false;
        }
        else {
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('Token有误,是否重新登陆', DialogBox.TypeModel.Type_Warn, this.verifyTokenComplete, this, '取  消', '确  定');
        }
    };
    //修改信息/密码 弹板隐藏或显示
    ChangeUserInfoOrPasswordClass.prototype.changeUserinfoPasswordComlete = function (e) {
        if (e.data == 'shutdownChangeFeedback') {
            e.currentTarget.hiddenOut(0, 0, 0);
            this.doneBtn.alpha = 0;
            this.doneBtn.touchEnabled = false;
        }
    };
    /**
     * 警告框,token值过期,重新登陆
     */
    ChangeUserInfoOrPasswordClass.prototype.verifyTokenComplete = function (e) {
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    ChangeUserInfoOrPasswordClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    ChangeUserInfoOrPasswordClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    ChangeUserInfoOrPasswordClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return ChangeUserInfoOrPasswordClass;
}(BaseContainer));
__reflect(ChangeUserInfoOrPasswordClass.prototype, "ChangeUserInfoOrPasswordClass");
//# sourceMappingURL=ChangeUserInfoOrPasswordClass.js.map