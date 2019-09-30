/**
 *排行榜组件,主要包含下面两部分
 *1. 年级选项卡：1-6年级
 *2. 玩家列表：名次-头像-年级-昵称-积分-pk按钮
 *功能：
 *1.从服务器取玩家排行信息
 *2.使用数据渲染年级选项卡
 *3.使用数据渲染玩家列表，并为列表按钮添加事件
 *
 *输入： 排行榜皮肤
        年级选项卡皮肤
        玩家列表皮肤
        一至六年级玩家排行榜数据
*/
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var RankUI = (function (_super) {
    __extends(RankUI, _super);
    function RankUI() {
        var _this = _super.call(this) || this;
        _this.currentGrade = 1;
        _this.gradeDataArr = [];
        _this.grade1 = [];
        _this.grade2 = [];
        _this.grade3 = [];
        _this.grade4 = [];
        _this.grade5 = [];
        _this.grade6 = [];
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/custom_skins/rankUISkin.exml";
        var exml = "resource/custom_skins/gradeTabBarSkin1.exml";
        return _this;
    }
    RankUI.prototype.updataGrade = function (index) {
        if (index === void 0) { index = 1; }
        this.changeToGrade(index); //跳转指定年级目录页
        // this.tabBarGrade.dataProvider=index;
        this.renderPlayerList();
    };
    RankUI.prototype.uiCompHandler = function () {
        this.createGradeTabBar();
        this.loadingImg.visible = false;
        this.changeToGrade(1); //跳转指定年级目录页
        this.renderPlayerList();
    };
    RankUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /*
    *渲染年级选项卡
    */
    RankUI.prototype.createGradeTabBar = function () {
        var listBar = ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"];
        this.tabBarGrade.itemRenderer = GradeListRNKIR;
        this.tabBarGrade.dataProvider = new eui.ArrayCollection(listBar);
        this.tabBarGrade.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
    };
    /*
    *切换选项卡
    */
    RankUI.prototype.onBarItemTap = function (e) {
        this.currentGrade = e.itemIndex + 1;
        this.changeToGrade(this.currentGrade);
    };
    /*切换至index年级*/
    RankUI.prototype.changeToGrade = function (index) {
        //如果当前年级数据存在，直接渲染，否则加载后渲染
        WebServerData.webServer.getRanking(DataBus._token, index, this.getrankHandler, this);
        LoadSeadScreen.loadScreen.saveLoad();
    };
    RankUI.prototype.getrankHandler = function (data) {
        console.log('排行榜', data);
        LoadSeadScreen.loadScreen.killLoad();
        var _public = new PublicClass();
        this.gradeDataArr = _public.formattingUserRankData(data.data.randinglist);
        console.log('排行榜内容:', this.gradeDataArr);
        if (this.gradeDataArr) {
            this.renderPlayerList();
        }
        else {
            this.listPlayers.dataProvider = new eui.ArrayCollection(null);
            this.loadData(this.currentGrade)
                .then(this.onComplete)
                .catch(function () {
                console.log("error"); //数据加载出错
            });
        }
    };
    /*
    *加载年级为id的排行榜信息，加载完成后渲染数据;
    */
    RankUI.prototype.loadData = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = "http://xesmpcs.speiyou.com/5test/data/grade" + id + ".json";
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, egret.HttpMethod.GET);
            request.send();
            request.addEventListener(egret.Event.COMPLETE, resolve, _this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, reject, _this);
        });
    };
    RankUI.prototype.onComplete = function (event) {
        var json = JSON.parse(event.currentTarget.response);
        console.log(json);
        this["grade" + this.currentGrade] = this.gradeDataArr;
        this.renderPlayerList();
    };
    /*
    *渲染器渲染玩家列表
    */
    RankUI.prototype.renderPlayerList = function () {
        this.listPlayers.itemRenderer = PlayerListRNKIR;
        //初始数据为一年级
        this["grade" + this.currentGrade] = this.gradeDataArr;
        var datas = this["grade" + this.currentGrade].map(function (item, index) {
            return __assign({ order: index + 1 }, item);
        });
        this.listPlayers.dataProvider = new eui.ArrayCollection(datas);
    };
    return RankUI;
}(eui.Component));
__reflect(RankUI.prototype, "RankUI");
/*玩家列表渲染器*/
var PlayerListRNKIR = (function (_super) {
    __extends(PlayerListRNKIR, _super);
    function PlayerListRNKIR() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/custom_skins/playerListSkin.exml";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        return _this;
    }
    PlayerListRNKIR.prototype.uiCompHandler = function () {
        this.dataChanged();
    };
    PlayerListRNKIR.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    PlayerListRNKIR.prototype.dataChanged = function () {
        if (this.pkBtn instanceof eui.Button) {
            if (this.pkBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP))
                return;
            this.pkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                console.log("open");
                //打开提示面板，并传递数据；
                PageManager.open(PageManager.PKSENDERTip, this.data);
            }, this);
        }
    };
    return PlayerListRNKIR;
}(eui.ItemRenderer));
__reflect(PlayerListRNKIR.prototype, "PlayerListRNKIR");
/*年级列表渲染器*/
var GradeListRNKIR = (function (_super) {
    __extends(GradeListRNKIR, _super);
    function GradeListRNKIR() {
        var _this = _super.call(this) || this;
        _this.skinName = "<e:Skin states=\"up,down\"  xmlns:e=\"http://ns.egret.com/eui\">\n                            <e:Image source=\"resource/assets/rank/btn_Bg.png\" source.down=\"resource/assets/rank/btn_Bg_down.png\" percentWidth=\"100\" percentHeight=\"100\" anchorOffsetY=\"0\" anchorOffsetX=\"0\" left=\"0\" right=\"0\" fillMode=\"scale\" bottom=\"0\" top=\"0\" scale9Grid=\"3,5,38,34\"/>\n                            <e:Label fontFamily=\"\u5FAE\u8F6F\u96C5\u9ED1\" text=\"{data}\" size=\"30\" textColor.down=\"0x666666\" textAlign=\"center\" verticalAlign=\"middle\" textColor=\"0xFFFFFF\"  anchorOffsetX=\"0\" anchorOffsetY=\"0\" left=\"0\" right=\"0\" top=\"0\" bottom=\"0\"/>\n                        </e:Skin>";
        return _this;
    }
    GradeListRNKIR.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    GradeListRNKIR.prototype.dataChanged = function () {
    };
    return GradeListRNKIR;
}(eui.ItemRenderer));
__reflect(GradeListRNKIR.prototype, "GradeListRNKIR");
//# sourceMappingURL=RankUI.js.map