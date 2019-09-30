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
 *文件管理 /控制器
*/
var LayerManagement = (function (_super) {
    __extends(LayerManagement, _super);
    function LayerManagement() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        return _this;
    }
    /**
     * 设置token是否存在值
     */
    LayerManagement.prototype.setToken = function (tokenBoo) {
        if (tokenBoo === void 0) { tokenBoo = false; }
        this.isCheckToken = tokenBoo;
        this.createGameScene();
    };
    /**
     * 创建游戏场景
     * 1.open页 - 自定义页 - 世界地图页
     */
    LayerManagement.prototype.createGameScene = function () {
        if (!this.isCheckToken) {
            //无token
            this.openClass = new LayerOpenClass();
            this.openClass.alpha = 0;
            this.openClass.hiddenOut(.1, .1);
            this.addChild(this.openClass);
            this.UpWindowData();
            this.initMessage();
        }
        else {
            //有token			
            var userInfo = egret.localStorage.getItem("userInfo");
            console.log(JSON.stringify(userInfo));
            if (userInfo != null) {
                var arr = void 0;
                //从本地获取到的用户信息，用 | 分割并存入数组
                arr = userInfo.split('|');
                DataBus._userName = arr[0];
                DataBus._password = arr[1];
            }
            this.newLayerWordMap();
        }
    };
    /**
     * 初始化事件消息
     */
    LayerManagement.prototype.initMessage = function () {
        this.openClass.addEventListener(EventEnumerate.SELECT_COMPLETE, this.openClassCustomDispathEvent, this);
    };
    //open页 操作
    LayerManagement.prototype.openClassCustomDispathEvent = function (e) {
        if (e.data == 'user') {
            console.log(e.data, '用户登陆->登陆页->世界地图页');
            //从本地获取用户登陆信息-用户+密码
            var userInfo = egret.localStorage.getItem("userInfo");
            console.log(JSON.stringify(userInfo));
            this.openClass.DestroyOut();
            this.loginClass = new LayerLogin();
            this.loginClass.alpha = 0;
            this.loginClass.hiddenOut(.1, .1);
            this.addChild(this.loginClass);
            this.loginClass.addEventListener(EventEnumerate.SELECT_COMPLETE, this.loginClassComplete, this);
            if (userInfo != null) {
                var arr = void 0;
                //从本地获取到的用户信息，用 | 分割并存入数组
                arr = userInfo.split('|');
                DataBus._userName = arr[0];
                DataBus._password = arr[1];
                this.loginClass.setUserInfoLabal(DataBus._userName, DataBus._password);
            }
        }
        else if (e.data == 'visitor') {
            console.log(e.data, '访客登陆->世界地图页');
            this.openClass.DestroyOut();
            WebServerData.webServer.userQuickLogin(this.sendDone, this);
            LoadSeadScreen.loadScreen.saveLoad();
        }
    };
    LayerManagement.prototype.newLayerWordMap = function () {
        this.wordMap = new LayerWordMap();
        this.wordMap.alpha = 0;
        this.wordMap.hiddenOut(.1, .1);
        this.addChild(this.wordMap);
        // FeedbackBouncedClass.feedback.setLable('欢迎'+DataBus._userName+'进入游戏');
    };
    LayerManagement.prototype.loginClassComplete = function (e) {
        if (e.data == 'DoneSign') {
            // console.log('-----游戏开始------');
            // console.log('token:'+DataBus._token,'\n\nusername:'+DataBus._userName,'  password:'+DataBus._password)
            this.loginClass.DestroyOut();
            this.wordMap = new LayerWordMap();
            this.wordMap.alpha = 0;
            this.wordMap.hiddenOut(.1, .1);
            this.addChild(this.wordMap);
            LoadSeadScreen.loadScreen.killLoad();
        }
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    LayerManagement.prototype.UpWindowData = function () {
    };
    //服务器访问完成后执行
    LayerManagement.prototype.sendDone = function (data) {
        console.log('快速登陆: ', data);
        if (data.code == 20000) {
            LoadSeadScreen.loadScreen.killLoad();
            DataBus._token = data.data.token;
            DataBus._userName = data.data.userinfo.username;
            DataBus._password = data.data.userinfo.password;
            //------用户登陆信息存储本地-----------
            var userinfo = "userInfo";
            var userValue = DataBus._userName + "|" + DataBus._password;
            egret.localStorage.setItem(userinfo, userValue);
            //------用户token存储本地-----------
            var usertoken = "userToken";
            var tokenValue = DataBus._token;
            egret.localStorage.setItem(usertoken, tokenValue);
            this.wordMap = new LayerWordMap();
            this.wordMap.alpha = 0;
            this.wordMap.hiddenOut(.1, .1);
            this.addChild(this.wordMap);
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('账户:' + DataBus._userName + '\n\n密码:' + DataBus._password + '\n\n请截屏保存账户密码');
        }
        else {
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('注册失败，请重试！');
        }
    };
    return LayerManagement;
}(BaseContainer));
__reflect(LayerManagement.prototype, "LayerManagement");
//# sourceMappingURL=LayerManagement.js.map