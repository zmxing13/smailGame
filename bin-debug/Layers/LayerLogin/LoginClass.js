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
// 登陆页
var LoginClass = (function (_super) {
    __extends(LoginClass, _super);
    function LoginClass(_userName, _password) {
        if (_userName === void 0) { _userName = ''; }
        if (_password === void 0) { _password = ''; }
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.userNameStr = _userName;
        _this.passwordStr = _password;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    //设置登录页用户和密码
    LoginClass.prototype.setUserInfoLabal = function (_username, _password) {
        if (_username === void 0) { _username = ''; }
        if (_password === void 0) { _password = ''; }
        this.userNameStr = _username;
        this.passwordStr = _password;
        this.userNameBox.text = this.userNameStr;
        this.passWordBox.text = this.passwordStr;
    };
    /**
     * 创建图形界面
     */
    LoginClass.prototype.initSprite = function () {
        this.userNameSp = new egret.Sprite();
        this.addChild(this.userNameSp);
        this.passWordSp = new egret.Sprite();
        this.addChild(this.passWordSp);
        this.userNameBg = new egret.Sprite();
        this.userNameBg.graphics.beginFill(0x00ff00, .5);
        this.userNameBg.graphics.drawRoundRect(0, 0, Main.W / 2, 150, 50, 50);
        this.userNameBg.graphics.endFill();
        this.userNameSp.addChild(this.userNameBg);
        this.userNameBox = new egret.TextField();
        this.userNameBox.type = egret.TextFieldType.INPUT;
        this.userNameBox.size = 50;
        this.userNameBox.width = Main.W / 2;
        this.userNameBox.height = 150;
        this.userNameBox.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.userNameBox.textAlign = egret.HorizontalAlign.CENTER;
        this.userNameBox.textColor = 0x000000;
        this.userNameBox.text = this.userNameStr;
        this.userNameSp.addChild(this.userNameBox);
        this.userNameExplain = this._public.createBitmapByName('img_login_InputUsernameText');
        this.userNameSp.addChild(this.userNameExplain);
        //--------------------------------
        this.passWordBg = new egret.Sprite();
        this.passWordBg.graphics.beginFill(0x00ff00, .5);
        this.passWordBg.graphics.drawRoundRect(0, 0, Main.W / 2, 150, 50, 50);
        this.passWordBg.graphics.endFill();
        this.passWordSp.addChild(this.passWordBg);
        this.passWordBox = new egret.TextField();
        this.passWordBox.type = egret.TextFieldType.INPUT;
        this.passWordBox.inputType = egret.TextFieldInputType.PASSWORD;
        this.passWordBox.displayAsPassword = true; //密码填写完成后，点击屏幕空白处，该处EditableText为*格式
        this.passWordBox.size = 50;
        this.passWordBox.width = Main.W / 2;
        this.passWordBox.height = 150;
        this.passWordBox.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.passWordBox.textAlign = egret.HorizontalAlign.CENTER;
        this.passWordBox.textColor = 0x000000;
        this.passWordBox.text = this.passwordStr;
        this.passWordSp.addChild(this.passWordBox);
        this.passWordExplain = this._public.createBitmapByName('img_login_InputPassText');
        this.passWordSp.addChild(this.passWordExplain);
        //--------------------------------
        this.startBtn = this._public.createBitmapByName('startBtn');
        this.addChild(this.startBtn);
        this.signBtn = this._public.createBitmapByName('signBtn');
        this.addChild(this.signBtn);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    LoginClass.prototype.UpWindowData = function () {
        var scaleNum = 0;
        var scaleXNum = 0;
        var scaleYNum = 0;
        var tempH = 0;
        this.userNameBg.x = 0;
        this.userNameBg.y = 0;
        this.userNameBox.x = 0;
        this.userNameBox.y = 0;
        this.userNameExplain.x = this.userNameBox.x;
        this.userNameExplain.y = this.userNameBox.y - this.userNameBox.height / 2;
        scaleNum = 0;
        tempH = Main.H;
        scaleXNum = (Main.W / (this.userNameSp.width * 2));
        scaleYNum = (tempH / (this.userNameSp.height * 2));
        if (scaleXNum < scaleYNum) {
            scaleNum = scaleXNum;
        }
        else {
            scaleNum = scaleYNum;
        }
        this.userNameSp.scaleX = this.userNameSp.scaleY = scaleNum;
        this.userNameSp.x = (Main.W - this.userNameSp.width * scaleNum) / 2;
        this.userNameSp.y = (Main.H - this.userNameSp.height * scaleNum) / 10 * 2;
        this.passWordBg.x = 0;
        this.passWordBg.y = 0;
        this.passWordBox.x = 0;
        this.passWordBox.y = 0;
        this.passWordExplain.x = this.passWordBox.x;
        this.passWordExplain.y = this.passWordBox.y - this.passWordBox.height / 2;
        this.passWordSp.scaleX = this.passWordSp.scaleY = scaleNum;
        this.passWordSp.x = (Main.W - this.passWordSp.width * scaleNum) / 2;
        this.passWordSp.y = this.userNameSp.y + this.userNameSp.height;
        scaleNum = 0;
        tempH = Main.H - (this.passWordSp.y + this.passWordSp.height);
        scaleXNum = (Main.W / (this.passWordSp.width * 2.5));
        scaleYNum = (tempH / (this.passWordSp.height * 2.5));
        if (scaleXNum < scaleYNum) {
            scaleNum = scaleXNum;
        }
        else {
            scaleNum = scaleYNum;
        }
        this.startBtn.scaleX = this.startBtn.scaleY = scaleNum;
        this.startBtn.x = (Main.W - this.startBtn.width * scaleNum) / 2;
        this.startBtn.y = (this.passWordSp.y + this.passWordSp.height * scaleNum) + (tempH - this.startBtn.height * scaleNum) / 2;
        this.signBtn.scaleX = this.signBtn.scaleY = scaleNum;
        this.signBtn.x = (Main.W - this.signBtn.width * scaleNum) / 2;
        this.signBtn.y = this.startBtn.y + this.startBtn.height + (this.signBtn.height / 20);
    };
    /**
     * 初始化事件消息
     */
    LoginClass.prototype.initMessage = function () {
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startBtnTouch, this);
        this.signBtn.touchEnabled = true;
        this.signBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.signBtnTouch, this);
    };
    //开始游戏
    LoginClass.prototype.startBtnTouch = function (e) {
        /**
         * 1.验证用户是否存在
         * 2.存在-验证登陆账户密码是否正确
         * 3.不存在-提示注册
        */
        var userState = this._public.validationUserName(this.userNameBox.text);
        var passwordState = this._public.validationPassWord(this.passWordBox.text, '', false);
        if (userState == 'pass' && passwordState == 'pass') {
            // console.log(this.userNameBox.text,this.passWordBox.text)
            DataBus._userName = this.userNameBox.text;
            DataBus._password = this.passWordBox.text;
            this.webServer = WebServerData.getInstance();
            this.webServer.userLogin(this.userNameBox.text, this.passWordBox.text, this.sendDone, this);
        }
        if (userState != 'pass') {
            // FeedbackBouncedClass.feedback.setLable(userState);
            LayerDialogBoxScene.getInstance().newDialogBoxEvent(userState);
        }
        if (passwordState != 'pass') {
            // FeedbackBouncedClass.feedback.setLable(passwordState);
            LayerDialogBoxScene.getInstance().newDialogBoxEvent(passwordState);
        }
    };
    //服务器访问完成后执行
    LoginClass.prototype.sendDone = function (data) {
        console.log(data);
        if (data.code == 20000) {
            DataBus._token = data.data.token;
            //------用户登陆信息存储本地-----------
            var userinfo = "userInfo";
            var userValue = DataBus._userName + "|" + DataBus._password;
            egret.localStorage.setItem(userinfo, userValue);
            //------用户token存储本地-----------
            var usertoken = "userToken";
            var tokenValue = DataBus._token;
            egret.localStorage.setItem(usertoken, tokenValue);
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'start'));
        }
        else if (data.code == 20002) {
            // FeedbackBouncedClass.feedback.setLable('用户或密码错误');
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('用户或密码错误');
        }
    };
    //注册账户
    LoginClass.prototype.signBtnTouch = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'sign'));
    };
    //反馈弹框
    LoginClass.prototype.feedbackBouncedComplete = function (e) {
        if (e.data == 'shutdownFeedback') {
            e.currentTarget.DestroyOut();
        }
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    LoginClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    LoginClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    LoginClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return LoginClass;
}(BaseContainer));
__reflect(LoginClass.prototype, "LoginClass");
//# sourceMappingURL=LoginClass.js.map