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
var PKPanel = (function (_super) {
    __extends(PKPanel, _super);
    function PKPanel(w, h) {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.firstPkArr = []; //发起挑战
        _this.trucePkArr = []; //收到挑战
        _this.removeObjId = -1; //删除竞技消息id
        _this._width = w;
        _this._height = h;
        _this.init();
        return _this;
    }
    PKPanel.prototype.init = function () {
        this._tabBar = new TabBar(this._width, this._height * 0.08 - 10);
        this.addChild(this._tabBar);
        this.drawBackground();
        this._receiveList = new ReceiveListUI(this._width, this._height * 0.8);
        this.addChild(this._receiveList);
        this._receiveList.y = this._height * 0.08;
        this._sendList = new SendListUI(this._width, this._height * 0.8);
        this.addChild(this._sendList);
        this._sendList.y = this._height * 0.08;
        this._tabBar.setSendNum(this._sendList.getListLength());
        this._tabBar.setReceiveNum(this._receiveList.getListLength());
        this._index = 1;
        this._iWantPKBtn = new Button(this._width, this._height * 0.12 - 10, "找人PK");
        this.addChild(this._iWantPKBtn);
        this._iWantPKBtn.y = this._height * 0.88 + 10;
        this._blackMask = new egret.Shape();
        var g = this._blackMask.graphics;
        g.beginFill(0x000000, 0.5);
        g.drawRect(0, 0, this._width, this._height);
        this.addChild(this._blackMask);
        this._blackMask.visible = false;
        this._blackMask.touchEnabled = true;
        this._searchForPkPanel = new SearchForPkPanel(this._width - 100);
        this.addChild(this._searchForPkPanel);
        this._searchForPkPanel.x = 50;
        this._searchForPkPanel.y = 200;
        this._searchForPkPanel.visible = false;
        this.createLoadingMovieClip();
        this.switchToReceiveList();
        this.addEvent();
    };
    PKPanel.prototype.drawBackground = function () {
        var sp = new egret.Shape();
        var g = sp.graphics;
        g.beginFill(0xffffff);
        g.drawRect(0, 0, this._width, this._height * 0.8);
        sp.y = this._height * 0.08;
        this.addChild(sp);
    };
    PKPanel.prototype.addEvent = function () {
        var _this = this;
        this._tabBar.addEventListener("change", function (e) {
            _this._index = e.data.index;
            if (_this._index == 1) {
                _this.switchToReceiveList();
            }
            else {
                _this.switchToSendList();
            }
        }, this);
        this._sendList.addEventListener("ok", function (e) {
            var id = e.data.userData.order;
            console.log(e.data.userData, '删除');
            _this.removeObjId = id;
            DataBus.curTargetCompettiveId = e.data.userData.id;
            WebServerData.webServer.delMessage(DataBus._token, DataBus.curTargetCompettiveId, _this.deleteCompettiveSendDone, _this);
            _this.showLoadingAnimation();
        }, this);
        this._receiveList.addEventListener("accept", function (e) {
            var id = e.data.userData.order;
            console.log(e.data.userData, '接受');
            DataBus.getAnswerSheetId = _this.getMessageObjData.data.messageListMinor[e.data.userData.order].answerSheetID;
            DataBus.curTargetCompettiveId = e.data.userData.id;
            _this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'accept')); //接受挑战
        }, this);
        this._receiveList.addEventListener("reject", function (e) {
            var id = e.data.userData.order;
            console.log(e.data.userData, '拒绝');
            DataBus.curTargetCompettiveId = e.data.userData.id;
            _this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'reject')); //拒绝挑战
        }, this);
        this._iWantPKBtn.touchEnabled = true;
        this._iWantPKBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this._blackMask.visible = true;
            _this._searchForPkPanel.visible = true;
            WebServerData.webServer.getUser(DataBus._token, _this.getUserSendDone, _this);
        }, this);
        this._searchForPkPanel.addEventListener("update", function (e) {
            WebServerData.webServer.getUser(DataBus._token, _this.getUserSendDone, _this);
        }, this);
        this._searchForPkPanel.addEventListener("close", function (e) {
            _this._blackMask.visible = false;
            _this._searchForPkPanel.visible = false;
        }, this);
        this._searchForPkPanel.addEventListener("startPk", function (e) {
            console.log(e.data.userData);
            if (e.data.userData.selectable == false) {
                return LayerDialogBoxScene.getInstance().newDialogBoxEvent('当前玩家已被挑战,请明天再来.');
            }
            else {
                _this.userData = e.data.userData;
                LayerDialogBoxScene.getInstance().newDialogBoxEvent('确定要挑战' + e.data.userData.nickName + '吗？', DialogBox.TypeModel.Type_Warn, _this.ChallengeClassComplete, _this, '取  消', '确  定');
                return;
            }
            // this.userData= e.data.userData;
            // LayerDialogBoxScene.getInstance().newDialogBoxEvent('确定要挑战'+e.data.userData.nickName+'吗？',DialogBox.TypeModel.Type_Warn,this.ChallengeClassComplete,this,'取  消','确  定');
        }, this);
        this._receiveList.addEventListener("delete", function (e) {
            var id = e.data.userData.order;
            console.log(e.data.userData, '删除');
            _this.removeObjId = id;
            DataBus.curTargetCompettiveId = e.data.userData.id;
            WebServerData.webServer.delMessage(DataBus._token, DataBus.curTargetCompettiveId, _this.deleteCompettiveSendDone, _this);
            _this.showLoadingAnimation();
        }, this);
    };
    //删除竞技消息
    PKPanel.prototype.deleteCompettiveSendDone = function (e) {
        console.log(e);
        if (this._index == 1) {
            this._receiveList.removeItemBy(this.removeObjId);
            this._tabBar.setReceiveNum(this._receiveList.getListLength());
        }
        if (this._index == 2) {
            this._sendList.removeItemBy(this.removeObjId);
            this._tabBar.setSendNum(this._sendList.getListLength());
        }
        this.hideLoadingAnimation();
    };
    PKPanel.prototype.ChallengeClassComplete = function (e) {
        if (e) {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, this.userData)); //找人PK
        }
        else {
        }
        // ChallengeClass.challenge.killLoad();
    };
    //获取用户列表回调
    PKPanel.prototype.getUserSendDone = function (data) {
        console.log('获取用户列表：', data);
        var userListArr = [];
        userListArr = this._public.formattingUserListData(data.data.userlist);
        console.log('格式化后选择pk对象:', userListArr);
        this._searchForPkPanel.setData(userListArr);
    };
    PKPanel.prototype.switchToReceiveList = function () {
        WebServerData.webServer.getMessage(DataBus._token, this.getMessageHandler, this);
        this._sendList.visible = false;
        this.showLoadingAnimation(); //加载进度条		
    };
    /**
     * 查看竞技消息
     */
    PKPanel.prototype.getMessageHandler = function (e) {
        console.log('竞技消息：', e);
        this.getMessageObjData = e;
        this.firstPkArr = this._public.formattingFirstPkData(e.data.messageListFirst);
        this.trucePkArr = this._public.formattingTrucePkData(e.data.messageListMinor);
        console.log('格式化后竞技消息-发起：', this.firstPkArr);
        console.log('格式化后竞技消息-收到：', this.trucePkArr);
        this.hideLoadingAnimation();
        if (this._index == 1 && this.trucePkArr.length > 0) {
            this.hideLoadingAnimation();
            this.showReceiveList(this.trucePkArr);
        }
        else {
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('你没有收到pk邀请\n你可以向别人发起pk！');
        }
    };
    PKPanel.prototype.switchToSendList = function () {
        this._receiveList.visible = false;
        if (this._index == 2 && this.firstPkArr.length > 0) {
            this.hideLoadingAnimation();
            this.showSendList(this.firstPkArr);
        }
        else {
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('你没有发起pk\n向别人发起pk吧!');
        }
    };
    PKPanel.prototype.showSendList = function (data) {
        this._sendList.setDatas(data);
        this._sendList.visible = true;
        this._sendList.alpha = 0;
        egret.Tween.get(this._sendList).to({ alpha: 1 }, 200);
        this._tabBar.setSendNum(this._sendList.getListLength());
    };
    PKPanel.prototype.showReceiveList = function (data) {
        this._receiveList.setDatas(data);
        this._receiveList.visible = true;
        this._receiveList.alpha = 0;
        egret.Tween.get(this._receiveList).to({ alpha: 1 }, 200);
        this._tabBar.setReceiveNum(this._receiveList.getListLength());
    };
    PKPanel.prototype.showLoadingAnimation = function () {
        this._loadingMc.visible = true;
        this._loadingMc.play(-1);
    };
    PKPanel.prototype.hideLoadingAnimation = function () {
        this._loadingMc.visible = false;
        this._loadingMc.stop();
    };
    PKPanel.prototype.createLoadingMovieClip = function () {
        var data = RES.getRes("loading_json");
        var txtr = RES.getRes("loading_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this._loadingMc = new egret.MovieClip(mcFactory.generateMovieClipData("timg"));
        this._loadingMc.anchorOffsetX = this._loadingMc.width / 2;
        this._loadingMc.anchorOffsetY = this._loadingMc.height / 2;
        this._loadingMc.x = this._width / 2;
        this._loadingMc.y = this._height / 2;
        this.addChild(this._loadingMc);
        this.touchEnabled;
    };
    //返回世界地图后，界面更新
    PKPanel.prototype.updatePkPanel = function () {
        this._blackMask.visible = false;
        this._searchForPkPanel.visible = false;
    };
    return PKPanel;
}(egret.Sprite));
__reflect(PKPanel.prototype, "PKPanel");
//# sourceMappingURL=PKPanel.js.map