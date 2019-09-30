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
 * 世界地图
 */
var LayerWordMap = (function (_super) {
    __extends(LayerWordMap, _super);
    function LayerWordMap() {
        var _this = _super.call(this) || this;
        /**
         * 验证生命力状态
         */
        _this.verifyLife = false;
        _this._public = new PublicClass();
        _this.templateSp = new egret.Sprite();
        _this.worldbtnNum = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.worldMapOnAddToStage, _this);
        return _this;
    }
    LayerWordMap.prototype.worldMapOnAddToStage = function (event) {
        this.initSprite();
        this.UpWindowData();
        this.initMessage();
        this.validationDUpWindowData();
        LayerDialogBoxScene.getInstance().newDialogBoxEvent('欢迎' + DataBus._userName + '进入游戏');
    };
    /**
     * 1.验证体力
     * 2.检查是否有挑战信息-竞技提醒
     *          1.接受挑战
     *          2.挑战完成
     * 3.
     */
    LayerWordMap.prototype.validationDUpWindowData = function () {
        WebServerData.webServer.getUserPower(DataBus._token, this.getpowerHandler, this);
        WebServerData.webServer.getMessage(DataBus._token, this.getMessageHandler, this);
    };
    /**
     * 查看体力
     */
    LayerWordMap.prototype.getpowerHandler = function (e) {
        console.log('当前用户体力：', e);
        if (e.code == 10001) {
            if (e.data.power <= 0) {
                this.verifyLife = false;
            }
            else {
                this.verifyLife = true;
                DataBus._power = e.data.power;
            }
        }
        else {
            console.log('获取体力错误', e);
        }
    };
    /**
     * 查看竞技消息
     */
    LayerWordMap.prototype.getMessageHandler = function (e) {
        console.log('当前用户竞技消息：', e);
        var i, obj, boo = false;
        if (e.code == 10001) {
            if (e.data.messageListMinor.length >= 1) {
                for (i = 0; i < e.data.messageListMinor.length; i++) {
                    obj = e.data.messageListMinor[i];
                    if (obj.status.code == '101') {
                        boo = true;
                    }
                }
                if (boo == true) {
                    LayerDialogBoxScene.getInstance().newDialogBoxEvent('你有挑战消息,是否查看？', DialogBox.TypeModel.Type_Inquiry, this.competitiveComplete, this, '取  消', '确  定');
                }
            }
        }
    };
    LayerWordMap.prototype.competitiveComplete = function (e) {
        if (e == true) {
            if (!this.competitive) {
                this.competitive = new LayerCompetitive();
                this.addChild(this.competitive);
                this.templateArr.push(this.competitive);
                this.competitive.addEventListener(EventEnumerate.SELECT_COMPLETE, this.templateCustomDispathEvent, this);
                this.competitive.addEventListener(EventEnumerate.SELECT_COMPLETE, this.pkPanelComplete, this);
                console.log('new competitive');
            }
            else {
                this.competitive.hiddenOut(.1, .1, 1);
                this.competitive.visible = true;
                this.competitive.updatePKPanel();
                console.log('hiddenout competitive');
            }
        }
    };
    /**
     * 创建图形界面
    */
    LayerWordMap.prototype.initSprite = function () {
        this.worldMapBtnArr = [];
        this.worldMapNameArr = [];
        this.templateArr = [];
        this.worldbtnNum = 6;
        this.worldMapNameArr = ['img_userHome', 'img_confirm', 'img_practice', 'img_competitive', 'img_footprint', 'img_ranking'];
        var i, obj;
        for (i = 0; i < this.worldbtnNum; i++) {
            obj = new ImgTemplate(this.worldMapNameArr[i]);
            obj.index = i;
            this.templateSp.addChild(obj);
            this.worldMapBtnArr.push(obj);
        }
        this.addChild(this.templateSp);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    LayerWordMap.prototype.UpWindowData = function () {
        var i, obj;
        for (i = 0; i < this.worldMapBtnArr.length; i++) {
            obj = this.worldMapBtnArr[i];
            obj.x = obj.width * i;
            obj.y = 0;
        }
        this.templateSp.x = (Main.W - this.templateSp.width) / 2;
        this.templateSp.y = (Main.H - this.templateSp.height) / 2;
    };
    /**
     * 初始化事件消息
     */
    LayerWordMap.prototype.initMessage = function () {
        var i, obj;
        for (i = 0; i < this.worldMapBtnArr.length; i++) {
            obj = this.worldMapBtnArr[i];
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.worldMapBtnClidk, this);
        }
    };
    LayerWordMap.prototype.worldMapBtnClidk = function (e) {
        var mc = e.currentTarget;
        if (!this.verifyLife) {
            if (mc.index == 0 || mc.index == 4 || mc.index == 5) {
                this.showRoomHandler(mc.index);
                LayerDialogBoxScene.getInstance().newDialogBoxEvent('休息一会,恢复体力');
                this.showRoomHandler(mc.index);
                return;
            }
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('体力值用光了,休息一会儿吧');
            return console.log('体力槽已空');
        }
        this.showRoomHandler(mc.index);
    };
    //隐藏世界地图，显示点击的模板
    LayerWordMap.prototype.showRoomHandler = function (roomNum) {
        // console.log(this.worldMapNameArr[roomNum]);
        var i, obj;
        for (i = 0; i < this.templateArr.length; i++) {
            obj = this.templateArr[i];
            if (obj.alpha == 1) {
                obj.alpha = 0;
                obj.visible = false;
            }
        }
        this.templateSp.alpha = 0;
        this.templateSp.visible = false;
        switch (roomNum) {
            case 0:
                //个人主页
                if (!this.userHome) {
                    this.userHome = new LayerHomePage();
                    this.addChild(this.userHome);
                    this.templateArr.push(this.userHome);
                    this.userHome.addEventListener(EventEnumerate.SELECT_COMPLETE, this.templateCustomDispathEvent, this);
                    console.log('new userHome');
                }
                else {
                    this.userHome.hiddenOut(.1, .1, 1);
                    this.userHome.visible = true;
                    console.log('hiddenout userHome');
                }
                break;
            case 1:
                //闯关
                if (!this.confirm) {
                    this.confirm = new LayerConfirm('img_confirmTItle');
                    this.addChild(this.confirm);
                    this.templateArr.push(this.confirm);
                    this.confirm.addEventListener(EventEnumerate.SELECT_COMPLETE, this.templateCustomDispathEvent, this);
                    console.log('new confirm');
                }
                else {
                    this.confirm.hiddenOut(.1, .1, 1);
                    this.confirm.visible = true;
                    this.confirm.killConfirm('img_confirmTItle');
                    console.log('hiddenout confirm');
                }
                break;
            case 2:
                //练习
                if (!this.practice) {
                    this.practice = new LayerConfirm('img_practiceTitle');
                    this.addChild(this.practice);
                    this.templateArr.push(this.practice);
                    this.practice.addEventListener(EventEnumerate.SELECT_COMPLETE, this.templateCustomDispathEvent, this);
                    console.log('new practice');
                }
                else {
                    this.practice.hiddenOut(.1, .1, 1);
                    this.practice.visible = true;
                    this.practice.killConfirm('img_practiceTitle');
                    console.log('hiddenout practice');
                }
                break;
            case 3:
                //竞技
                if (!this.competitive) {
                    this.competitive = new LayerCompetitive();
                    this.addChild(this.competitive);
                    this.templateArr.push(this.competitive);
                    this.competitive.addEventListener(EventEnumerate.SELECT_COMPLETE, this.templateCustomDispathEvent, this);
                    this.competitive.addEventListener(EventEnumerate.SELECT_COMPLETE, this.pkPanelComplete, this);
                    console.log('new competitive');
                }
                else {
                    this.competitive.hiddenOut(.1, .1, 1);
                    this.competitive.visible = true;
                    this.competitive.updatePKPanel();
                    console.log('hiddenout competitive');
                }
                break;
            case 4:
                //足迹
                if (!this.footprint) {
                    this.footprint = new LayerFootPrint();
                    this.addChild(this.footprint);
                    this.templateArr.push(this.footprint);
                    this.footprint.addEventListener(EventEnumerate.SELECT_COMPLETE, this.templateCustomDispathEvent, this);
                    console.log('new footprint');
                }
                else {
                    this.footprint.hiddenOut(.1, .1, 1);
                    this.footprint.visible = true;
                    console.log('hiddenout footprint');
                }
                break;
            case 5:
                //排行榜
                if (!this.ranking) {
                    this.ranking = new LayerRank();
                    this.addChild(this.ranking);
                    this.templateArr.push(this.ranking);
                    this.ranking.addEventListener(EventEnumerate.SELECT_COMPLETE, this.templateCustomDispathEvent, this);
                    console.log('new ranking');
                }
                else {
                    this.ranking.hiddenOut(.1, .1, 1);
                    this.ranking.visible = true;
                    console.log('hiddenout ranking');
                }
                break;
        }
    };
    LayerWordMap.prototype.templateCustomDispathEvent = function (e) {
        if (e.data == true) {
            var mc = e.currentTarget;
            mc.visible = false;
            mc.alpha = 0;
            this.templateSp.visible = true;
            this.templateSp.alpha = 1;
        }
    };
    LayerWordMap.prototype.pkPanelComplete = function (e) {
        if (e.data == true) {
            if (this.competitiveTitle) {
                this.competitiveTitle.hiddenOut(0);
                this.competitiveTitle.visible = false;
            }
            return;
        }
        ;
        // console.log(e.data)
        if (e.data == 'accept') {
            //接受挑战
            console.log('接受挑战', '答题卡id' + DataBus.getAnswerSheetId);
            // this.competitive.hiddenOut(0,0,0);
            this.competitive.pkPanel.visible = false;
            WebServerData.webServer.getContestQuestion(DataBus._token, DataBus.getAnswerSheetId, this.getContestQuestionHandler, this);
            LoadSeadScreen.loadScreen.saveLoad();
            return;
        }
        else if (e.data == 'reject') {
            //拒绝挑战
            console.log('拒绝挑战,更新本条竞技消息状态');
            //竞技邀请id
            WebServerData.webServer.refuseContest(DataBus._token, DataBus.curTargetCompettiveId, this.getAnswerSheetIdHandler, this);
            return;
        }
        else {
            //发起挑战
            DataBus.hitTargetid = e.data.userid;
            // this.competitive.hiddenOut(0,0,0);
            this.competitive.pkPanel.visible = false;
        }
        if (!this.competitiveTitle) {
            this.competitiveTitle = new CompetitiveTitleClass();
            this.addChild(this.competitiveTitle);
            this.competitiveTitle.x = 0;
            this.competitiveTitle.y = this.competitive.titleClass.x + this.competitive.titleClass.height;
            this.templateArr.push(this.competitiveTitle);
            this.competitiveTitle.addEventListener(EventEnumerate.SELECT_COMPLETE, this.competitiveTitleComplete, this);
        }
        else {
            this.competitiveTitle.x = 0;
            this.competitiveTitle.y = this.competitive.titleClass.x + this.competitive.titleClass.height;
            this.competitiveTitle.hiddenOut(.1, .1, 1);
            this.competitiveTitle.visible = true;
            // DataBus.isCompettiveBoo=true;
        }
    };
    LayerWordMap.prototype.getAnswerSheetIdHandler = function (e) {
        console.log('拒绝竞技邀请', e);
    };
    LayerWordMap.prototype.getContestQuestionHandler = function (e) {
        console.log('获取竞技答题卡数据', e);
        LoadSeadScreen.loadScreen.killLoad();
        if (e.code == 10001) {
            if (!this.competitiveTitle) {
                this.competitiveTitle = new CompetitiveTitleClass(true, e.data.answerSheetList);
                this.addChild(this.competitiveTitle);
                this.competitiveTitle.x = 0;
                this.competitiveTitle.y = this.competitive.titleClass.x + this.competitive.titleClass.height;
                this.templateArr.push(this.competitiveTitle);
                this.competitiveTitle.addEventListener(EventEnumerate.SELECT_COMPLETE, this.competitiveTitleComplete, this);
            }
            else {
                this.competitiveTitle.x = 0;
                this.competitiveTitle.y = this.competitive.titleClass.x + this.competitive.titleClass.height;
                this.competitiveTitle.hiddenOut(.1, .1, 1);
                this.competitiveTitle.visible = true;
            }
        }
        else {
            this.competitive.hiddenOut();
        }
    };
    //竞技答题完成
    LayerWordMap.prototype.competitiveTitleComplete = function (e) {
        if (e.data == 'gameover') {
            this.competitiveTitle.hiddenOut();
            // this.competitive.hiddenOut(.1,.1,1);
            this.competitive.pkPanel.visible = true;
        }
    };
    /**
    * 隐藏 / 显示
    *   exitTime     淡出时间
    *   waitTime     等待时间
    *   stateAlpha   alpha状态
    */
    LayerWordMap.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    LayerWordMap.prototype.DestroyOut = function (exitTime, waitTime) {
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
    LayerWordMap.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return LayerWordMap;
}(BaseContainer));
__reflect(LayerWordMap.prototype, "LayerWordMap");
//# sourceMappingURL=LayerWordMap.js.map