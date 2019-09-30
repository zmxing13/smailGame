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
//服务器数据
var WebServerData = (function (_super) {
    __extends(WebServerData, _super);
    function WebServerData(wd) {
        var _this = _super.call(this) || this;
        _this.Request_Register = 'userRegister'; //注册
        _this.Request_Login = 'userLogin'; //登陆
        _this.Request_QuickLogin = 'quickLogin'; //快速登陆
        _this.Request_UserCheck = 'userCheck'; //验证token
        _this.Request_SetUserInfo = 'setUserInfo'; //设置用户信息
        _this.Request_SetPassword = 'setPassword'; //设置登陆密码
        _this.Request_GetUserData = 'getUserData'; //获取用户数据
        _this.Request_GetUserInfo = 'getUserInfo'; //获取用户信息
        _this.Request_GetUserPower = 'getUserPower'; //获取用户体力
        _this.Request_GetPortraitList = 'getPortraitList'; //获取头像列表
        _this.Request_GetMenuTree = 'getMenuTree'; //获取目录结构-年级，类型，题，等级
        _this.Request_GetQuestion = 'getQuestion'; //获取题干内容
        _this.Request_GetRanking = 'getRanking'; //获取排行榜
        _this.Request_GetUser = 'getUser'; //获取用户列表
        _this.Request_GetMessage = 'getMessage'; //获取竞技消息
        _this.Request_GetContestQuestion = 'getContestQuestion'; //获取竞技答题卡
        _this.Request_GetUserTrack = 'getUserTrack'; //获取所有足迹信息
        _this.Request_GetAnswerSheet = 'getAnswerSheet'; //获取足迹详细信息
        _this.Request_GetEmblen = 'getEmblen'; //获取徽章数据
        _this.Request_SubmitAnswer = 'submitAnswer'; //上传答题卡
        _this.Request_UsePower = 'usePower'; //上传/更新体力
        _this.Request_SubmitContest = 'submitContest'; //上传发起人/应答答题卡-竞技
        _this.Request_RefuseContest = 'refuseContest'; //拒绝竞技邀请
        _this.Request_DelMessage = 'delMessage'; //删除竞技邀请
        _this.Request_list = {}; //响应列表-区分回调作用域
        //url地址
        _this.urlAddress = '';
        //---------------------------------------------
        //-----------------华丽的分割线-----------------
        //---------------------------------------------
        _this.tempUrl = '';
        _this.tempData = [];
        _this.tempFun = null;
        _this.requestType = '';
        _this.urlAddress = 'https://www.relyon.xyz/MathPlay/ability/'; //网络地址
        return _this;
        // this.urlAddress = 'http://10.12.5.22/MathPlay/ability/';	//本地地址
    }
    WebServerData.getInstance = function () {
        if (WebServerData.webServer == null) {
            WebServerData.webServer = new WebServerData(new SingletonEnforcer());
        }
        return WebServerData.webServer;
    };
    /**
     * 用户注册
     */
    WebServerData.prototype.userRegister = function (_username, _password, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "username=" + _username + "&password=" + _password;
        this.currThis = newThis;
        this.Request_list[this.Request_Register] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_Register, params, _func);
    };
    /**
     * 用户登陆
     */
    WebServerData.prototype.userLogin = function (_username, _password, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "username=" + _username + "&password=" + _password;
        this.currThis = newThis;
        this.Request_list[this.Request_Login] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_Login, params, _func);
    };
    /**
     * 快速登陆
     */
    WebServerData.prototype.userQuickLogin = function (_func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = '';
        this.currThis = newThis;
        this.Request_list[this.Request_QuickLogin] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_QuickLogin, null, _func);
    };
    /**
     * 验证token是否过期
     */
    WebServerData.prototype.userCheckToken = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.Request_list[this.Request_UserCheck] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_UserCheck, params, _func);
    };
    /**
     * 设置用户信息 自定义头像，自定义昵称
     * _nickName 	自定义昵称
     * _pictureId 	自定义头像id-服务器传递时
     */
    WebServerData.prototype.setUserInfo = function (_token, _nickName, _pictureId, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&nickname=" + _nickName + "&pictureId=" + _pictureId;
        this.currThis = newThis;
        this.Request_list[this.Request_SetUserInfo] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_SetUserInfo, params, _func);
    };
    /**
     * 设置登陆密码
     * _token 		token值
     * password 	旧密码
     * newpassword	新密码
     */
    WebServerData.prototype.setPassword = function (_token, _password, _newpassword, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&password=" + _password + "&newpassword=" + _newpassword;
        this.currThis = newThis;
        this.Request_list[this.Request_SetPassword] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_SetPassword, params, _func);
    };
    /**
     * 获取用户数据
     * 用户数据包含： 等级，积分，体力
     */
    WebServerData.prototype.getUserData = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.Request_list[this.Request_GetUserData] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetUserData, params, _func);
    };
    /**
     * 获取用户信息
     * 用户信息包含： 昵称，头像
     */
    WebServerData.prototype.getUserInfo = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.Request_list[this.Request_GetUserInfo] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetUserInfo, params, _func);
    };
    /**
     * 获取用户体力
     * _token	token值
     */
    WebServerData.prototype.getUserPower = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.Request_list[this.Request_GetUserPower] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetUserPower, params, _func);
    };
    /**
     * 获取头像列表
     */
    WebServerData.prototype.getPortraitList = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.Request_list[this.Request_GetPortraitList] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetPortraitList, params, _func);
    };
    /**
     * 获取目录结构-年级，类型，题，等级
     */
    WebServerData.prototype.GetMenuTree = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.Request_list[this.Request_GetMenuTree] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetMenuTree, params, _func);
    };
    /**
     * 获取答题卡内容
     *
     * _token		token值
     * classId,	 	年级
     * categoryId,	类型-1：计算题-2：阅读题-3：看图题
     * levelId		等级
     * status 		模式-1：闯关/混合 -2：专项
     * _fun			回调方法
     * newThis		作用域
     */
    WebServerData.prototype.getQuestion = function (_token, _classId, _categoryId, _levelId, _status, _func, newThis) {
        if (_status === void 0) { _status = 0; }
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&classId=" + _classId + "&categoryId=" + _categoryId + "&levelId=" + _levelId + "&status=" + _status;
        this.currThis = newThis;
        this.Request_list[this.Request_GetQuestion] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetQuestion, params, _func);
    };
    /**
     * 获取排行榜
     * _gradeId		年级id
     */
    WebServerData.prototype.getRanking = function (_token, _gradeId, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&gradeId=" + _gradeId;
        this.currThis = newThis;
        this.Request_list[this.Request_GetRanking] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetRanking, params, _func);
    };
    /**
     * 获取用户列表
     */
    WebServerData.prototype.getUser = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.Request_list[this.Request_GetUser] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetUser, params, _func);
    };
    /**
     * 获取竞技消息
     */
    WebServerData.prototype.getMessage = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.Request_list[this.Request_GetMessage] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetMessage, params, _func);
    };
    /**
     * 获取竞技答题数据
     * _asId	答题卡id
     */
    WebServerData.prototype.getContestQuestion = function (_token, _asId, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&asId=" + _asId;
        this.currThis = newThis;
        this.Request_list[this.Request_GetContestQuestion] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetContestQuestion, params, _func);
    };
    /**
     * 获取所有足迹信息
     * _page	页数
     * _orphans	第页条数
     */
    WebServerData.prototype.getUserTrack = function (_token, _page, _orphans, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&page=" + _page + "&orphans=" + _orphans;
        this.currThis = newThis;
        this.Request_list[this.Request_GetUserTrack] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetUserTrack, params, _func);
    };
    /**
     * 获取足迹详细信息
     * _index	要查看的足迹id
     */
    WebServerData.prototype.getAnswerSheet = function (_token, _index, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&index=" + _index;
        this.currThis = newThis;
        this.Request_list[this.Request_GetAnswerSheet] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetAnswerSheet, params, _func);
    };
    /**
     * 获取徽章数据
     */
    WebServerData.prototype.getEmblen = function (_token, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token;
        this.currThis = newThis;
        this.Request_list[this.Request_GetEmblen] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_GetEmblen, params, _func);
    };
    // Request_getEmblen
    /**
     * 向服务器发送答题卡数据
     * _token		token值
     * _status,	 	游戏模式-1.闯关-2.练习-3.竞技
     * _tsum,	 	答题总数
     * _fault,	 	失误次数
     * _score,	 	分数
     * _time,		用时-单位秒
     * _answers,	答案数组-列表类型
     */
    WebServerData.prototype.submitAnswer = function (_token, _status, _tsum, _fault, _score, _time, _answers, _func, newThis) {
        if (_score === void 0) { _score = 0; }
        if (_time === void 0) { _time = 0; }
        if (_answers === void 0) { _answers = []; }
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&status=" + _status + "&tsum=" + _tsum + "&fault=" + _fault + "&score=" + _score + "&time=" + _time + "&answers=" + JSON.stringify(_answers);
        this.currThis = newThis;
        this.Request_list[this.Request_SubmitAnswer] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_SubmitAnswer, params, _func);
    };
    /**
     * 上传/更新体力值
     * _token		token值
     * _consume		消耗的体力值
     */
    WebServerData.prototype.usePower = function (_token, _consume, _func, newThis) {
        if (_consume === void 0) { _consume = 0; }
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&consume=" + _consume;
        this.currThis = newThis;
        this.Request_list[this.Request_UsePower] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_UsePower, params, _func);
    };
    /**
     * 向服务器发送答题卡数据
     * _token		token值
     * _status,	 	游戏模式-1.闯关-2.练习-3.竞技
     * _tsum,	 	答题总数
     * _fault,	 	失误次数
     * _score,	 	分数
     * _time,		用时-单位秒
     * _answers,	答案数组-列表类型
     * _targetId	被pk对象的id
     * _asId		答题卡id
     */
    WebServerData.prototype.submitCotest = function (_token, _status, _tsum, _fault, _score, _time, _answers, _targetId, _asId, _func, newThis) {
        if (_score === void 0) { _score = 0; }
        if (_time === void 0) { _time = 0; }
        if (_answers === void 0) { _answers = []; }
        if (_targetId === void 0) { _targetId = -1; }
        if (_asId === void 0) { _asId = -1; }
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&status=" + _status + "&tsum=" + _tsum + "&fault=" + _fault + "&score=" +
            _score + "&time=" + _time + "&answers=" + JSON.stringify(_answers) + "&targetId=" + _targetId + "&asId=" + _asId;
        this.currThis = newThis;
        this.Request_list[this.Request_SubmitContest] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_SubmitContest, params, _func);
    };
    /**
     * 拒绝竞技邀请
     * _messageId	要拒绝的竞技消息的ID
     */
    WebServerData.prototype.refuseContest = function (_token, _messageId, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&messageId=" + _messageId;
        this.currThis = newThis;
        this.Request_list[this.Request_RefuseContest] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_RefuseContest, params, _func);
    };
    /**
     * 删除竞技消息
     * _messageId	要删除的竞技消息的ID
     */
    WebServerData.prototype.delMessage = function (_token, _messageId, _func, newThis) {
        if (_func === void 0) { _func = null; }
        if (newThis === void 0) { newThis = null; }
        var params = "token=" + _token + "&messageId=" + _messageId;
        this.currThis = newThis;
        this.Request_list[this.Request_DelMessage] = { 'fun': _func, 'targetThis': newThis, 'params': params };
        this.sendRequest(this.Request_DelMessage, params, _func);
    };
    /**
     * 发送请求
     * url:  	接口
     * data:	参数
     * func:	回调方法
     */
    WebServerData.prototype.sendRequest = function (_url, _data, _func) {
        if (_data === void 0) { _data = null; }
        if (_func === void 0) { _func = null; }
        // this.func = _func;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(this.urlAddress + _url + "/", egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        request.send(_data);
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
        this.tempData = _data;
    };
    //成功
    WebServerData.prototype.onPostComplete = function (event) {
        // console.log(event)
        var request = event.currentTarget;
        var responseUrl = this.getRequestType(event.currentTarget._url);
        var tempObj = this.Request_list[responseUrl];
        if (tempObj) {
            var response = JSON.parse(request.response);
            if (response.code == 10001 || response.code == 20000) {
                tempObj.fun.apply(tempObj.targetThis, [response]);
            }
            else {
                LayerDialogBoxScene.getInstance().newDialogBoxEvent(request.response.explain, DialogBox.TypeModel.Type_Warn, this.resetSend, this, '取  消', '重  试');
            }
        }
    };
    //失败
    WebServerData.prototype.onPostIOError = function (event) {
        console.log("post error : ", event);
        this.requestType = this.getRequestType(event.currentTarget._url);
        LayerDialogBoxScene.getInstance().newDialogBoxEvent('通讯失败,请重试...', DialogBox.TypeModel.Type_Warn, this.resetSend, this, '取  消', '重  试');
    };
    //进程
    WebServerData.prototype.onPostProgress = function (event) {
        // console.log("post progress : " , Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    };
    //
    WebServerData.prototype.resetSend = function (e) {
        if (e) {
            // this.sendRequest(this.requestType,this.tempData,this.func);
            var tempObj = this.Request_list[this.requestType];
            if (tempObj) {
                this.sendRequest(this.requestType, tempObj.params, tempObj.fun);
            }
            console.log('重试ing');
        }
        else {
            console.log('放弃ing');
        }
        ChallengeClass.challenge.killLoad();
    };
    WebServerData.prototype.getRequestType = function (url) {
        var requestTargetStr = String(url).split("/");
        var requestTarget = requestTargetStr.pop();
        if (!requestTarget) {
            requestTarget = requestTargetStr.pop();
        }
        return requestTarget;
    };
    return WebServerData;
}(egret.DisplayObject));
__reflect(WebServerData.prototype, "WebServerData");
var SingletonEnforcer = (function () {
    function SingletonEnforcer() {
    }
    return SingletonEnforcer;
}());
__reflect(SingletonEnforcer.prototype, "SingletonEnforcer");
//# sourceMappingURL=WebServerData.js.map