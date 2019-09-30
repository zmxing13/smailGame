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
//竞技答题页-功能==练习
var CompetitiveTitleClass = (function (_super) {
    __extends(CompetitiveTitleClass, _super);
    function CompetitiveTitleClass(statusBoo, data) {
        if (statusBoo === void 0) { statusBoo = false; }
        if (data === void 0) { data = []; }
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        /**
         * 游戏模式-闯关/练习/竞技
         */
        _this.gameStatus = '';
        /**
         * 游戏数据数组
         */
        _this.gameDataArr = [];
        /**
         * 类型题
        */
        _this.typeArr = [];
        /**
         * 年级，有哪几个年级
        */
        _this.gradeNameArr = [];
        /**
         * 年级，关卡题的长度
         */
        _this.gradeTitleArr = [];
        /**
         * 当前关卡题干数据
         */
        _this.currPointDataArr = [];
        /**
         * 下一关卡题干数据
         */
        _this.nextPointDataArr = [];
        /**
         * 当前关卡数
         */
        _this.checkpointNum = 1;
        /**
         * 年级
        */
        _this.classId = 0;
        /**
         * 类型-混合,不区分类型
        */
        _this.categoryId = 0;
        /**
         * 关卡/等级
        */
        _this.levelId = 0;
        /**
         * 模式-1：混合 -2：专项
        */
        _this.statusId = 0;
        /**
         * 当前关卡答对数
        */
        _this.finshNum = 0;
        /**
         * 当前关卡连对次数
         */
        _this.evenForMax = 0;
        /**
         * 当前关卡打错数
        */
        _this.wrongNum = 0;
        /**
         * 首次获取题干数据
        */
        _this.firstGetServerBoo = false;
        /**
         * 当前年级答题的总数
        */
        _this.curGradeCheckpointMax = 0;
        /**
         * 竞技状态-falase=发起pk；-true=接受pk
         */
        _this.competitiveBoo = false;
        /**
         * 是否开始游戏
         */
        _this.gameStartBoo = false;
        //-----以下是上传答题卡内容数据-----
        _this.send_status = 3; //游戏模式-1.闯关-2.练习-3.竞技
        _this.send_tsum = 0; //答题总数
        _this.send_score = 0; //分数
        _this.send_time = 0; //用时-单位秒
        _this.send_answers = []; //答案数组-列表类型
        _this.timer = new egret.Timer(1000, 0); //答题计时-单位秒
        if (!statusBoo) {
            //发起挑战
            _this.competitiveBoo = false;
            WebServerData.webServer.GetMenuTree(DataBus._token, _this.getMenuTreeSendDone, _this);
        }
        else {
            //接受挑战
            _this.competitiveBoo = true;
            _this.quesPanel = new QuesPanel(Main.W / 10 * 8, Main.H / 10 * 8);
            _this.quesPanel.x = (Main.W - _this.quesPanel.width) / 2;
            _this.quesPanel.y = 0;
            _this.quesPanel.alpha = 0;
            _this.addChild(_this.quesPanel);
            _this.getQuestionSendDone(data);
        }
        return _this;
    }
    //服务器访问完成后执行
    CompetitiveTitleClass.prototype.getMenuTreeSendDone = function (data) {
        console.log('获取目录结构:', data.data);
        var i, titleTypeScope = 0, //题干类型的数量；-1：计算题-2：阅读题-3：看图题
        gradeScope = 0; //年级范围1-6，共有几个年级
        this.typeArr = [];
        this.gradeNameArr = [];
        this.gradeTitleArr = [];
        this.gameDataArr = [data.data["categoryList"],
            data.data["classGroup"],
            data.data["status"]];
        titleTypeScope = data.data.categoryList.length;
        gradeScope = data.data.classGroup.length;
        for (i = 0; i < titleTypeScope; i++) {
            this.typeArr.push(data.data.categoryList[i].title);
        }
        for (i = 0; i < gradeScope; i++) {
            this.gradeNameArr.push(data.data.classGroup[i].title);
            this.gradeTitleArr.push(data.data.classGroup[i].classLevel.length);
        }
        this.initSprite();
        this.UpWindowData();
        this.initMessage();
    };
    /**
     * 创建图形界面
     */
    CompetitiveTitleClass.prototype.initSprite = function () {
        this.quesPanel = new QuesPanel(Main.W / 10 * 8, Main.H / 10 * 8);
        this.quesPanel.x = (Main.W - this.quesPanel.width) / 2;
        this.quesPanel.y = 0;
        this.quesPanel.alpha = 0;
        this.addChild(this.quesPanel);
        this.choosePage = new ChoosePractice(this.gameDataArr);
        this.addChild(this.choosePage);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    CompetitiveTitleClass.prototype.UpWindowData = function () {
        this.choosePage.x = (Main.W - this.choosePage.width) / 2;
        this.choosePage.y = (Main.H / 10 * 8 - this.choosePage.height) / 2;
    };
    /**
     * 初始化事件消息
     */
    CompetitiveTitleClass.prototype.initMessage = function () {
        this.choosePage.addEventListener(EventEnumerate.SELECT_COMPLETE, this.choosePageComplete, this);
        this.addEventListener(EventEnumerate.SELECT_COMPLETE, this.thisLoadServerDataComplete, this);
    };
    //年级选项事件
    CompetitiveTitleClass.prototype.choosePageComplete = function (e) {
        console.log(e.data);
        this.classId = e.data[2]; //年级
        this.categoryId = e.data[1]; //类型-混合,不区分类型
        this.curGradeCheckpointMax = this.gradeTitleArr[e.data[0] - 1];
        this.levelId = Math.ceil(Math.random() * (this.curGradeCheckpointMax - 1) + 1); //关卡/等级
        this.statusId = e.data[0]; //模式-1：混合 -2：专项
        this.gameStartBoo = true;
        DataBus.isCompettiveBoo = true;
        this.choosePage.hiddenOut(0, 0, 0);
        console.log('当前选中的年级是：' + this.classId + "类型：" + this.categoryId + "模式：" + this.statusId + "关卡：" + this.levelId);
        LoadSeadScreen.loadScreen.saveLoad();
        WebServerData.webServer.getQuestion(DataBus._token, this.classId, this.categoryId, this.levelId, this.statusId, this.getQuestionSendDone, this);
    };
    //自定义派发事件，资源加载完成，数据数组格式化后执行
    CompetitiveTitleClass.prototype.thisLoadServerDataComplete = function (e) {
        if (!Array.prototype.isPrototypeOf(e.data)) {
            return LoadSeadScreen.loadScreen.saveLoad('');
        }
        this.saveQuesPanel(e.data);
    };
    //显示答题模块
    CompetitiveTitleClass.prototype.saveQuesPanel = function (_dataArr) {
        LoadSeadScreen.loadScreen.killLoad();
        this.quesPanel.hiddenOut();
        this.quesPanel.setDatas(_dataArr);
        this.quesPanel.addEventListener(GameEvent.RIGHT, this.quesPanelRight, this);
        this.quesPanel.addEventListener(GameEvent.WRONG, this.quesPanelWrong, this);
        this.quesPanel.addEventListener(GameEvent.SWITCH_TO_NEXT_TITLE, this.quesPanelNext, this);
        this.quesPanel.addEventListener(GameEvent.TITLE_FINISH, this.quesPanelFinsh, this);
    };
    //计时
    CompetitiveTitleClass.prototype.timerCallFunc = function (e) {
        this.send_time += 1;
        // console.log('计时：'+this.send_time);
    };
    //答对
    CompetitiveTitleClass.prototype.quesPanelRight = function (e) {
        var index = e.data.titleId;
        // console.log('答题正确'+index,'_题干id：'+e.data.Id);
        this.finshNum += 1;
        this.evenForMax += 1;
        this.send_answers.push([e.data.Id, e.data.btnLable]);
        //计时
        if (index == 1) {
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerCallFunc, this);
            this.timer.start();
        }
    };
    //答错
    CompetitiveTitleClass.prototype.quesPanelWrong = function (e) {
        var index = e.data.titleId;
        // console.log('答题错误'+index,'_题干id：'+e.data.Id);
        this.wrongNum += 1;
        this.evenForMax = 0;
        this.send_answers.push([e.data.Id, e.data.btnLable]);
        //计时
        if (index == 1) {
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerCallFunc, this);
            this.timer.start();
        }
    };
    //下一题
    CompetitiveTitleClass.prototype.quesPanelNext = function (e) {
        var index = e.data.titleId;
        // console.log('切换下一题'+index);
    };
    //答题完成
    CompetitiveTitleClass.prototype.quesPanelFinsh = function (e) {
        console.log('答题结束');
        this.quesPanel.hiddenOut(.1, .1, 0);
        LoadSeadScreen.loadScreen.saveLoad('挑战答题完成~');
        //-----发送答题卡数据-----
        this.send_tsum = this.finshNum + this.wrongNum; //答题总数
        this.timer.stop();
        if (this.competitiveBoo == false) {
            //发起挑战
            this.send_score = this._public.statisticalIntegral(this.classId, this.finshNum, this.evenForMax, this.send_time);
            WebServerData.webServer.submitCotest(DataBus._token, this.send_status, this.send_tsum, this.wrongNum, this.send_score, this.send_time, this.send_answers, DataBus.hitTargetid, -1, this.sendPlayTitleData, this);
        }
        else {
            //应答结束，上传成绩
            this.send_score = this._public.statisticalIntegral(1, this.finshNum, this.evenForMax, this.send_time);
            console.log(this.finshNum, this.evenForMax, this.send_time);
            WebServerData.webServer.submitCotest(DataBus._token, this.send_status, this.send_tsum, this.wrongNum, this.send_score, this.send_time, this.send_answers, -1, DataBus.getAnswerSheetId, this.sendPlayTitleData, this);
        }
        console.log('游戏模式:' + this.send_status, '答题总数:' + this.send_tsum, '失误次数:' + this.wrongNum, '分数:' + this.send_score, '时间:' + this.send_time, '答题卡:' + this.send_answers, '被pk对象id:' + DataBus.hitTargetid);
        //-----发送答题卡数据-----
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'gameover'));
        console.log('gameover');
    };
    CompetitiveTitleClass.prototype.sendPlayTitleData = function (data) {
        if (data.code == 10001) {
            console.log('答题卡上传完成-竞技：', data);
            LoadSeadScreen.loadScreen.killLoad();
            PlayFeedbackAnimation.playAnimation.saveLoad();
        }
        else {
        }
    };
    /**
     * ------------------------
     * ---重要:获取题干内容-----
     * ------------------------
    */
    CompetitiveTitleClass.prototype.getQuestionSendDone = function (data) {
        var _this = this;
        var i, l, curobj, returnobj, promise, num = 0;
        var returnobjArr = [], promiseBitmapArr = [], bitArr = [];
        if (this.competitiveBoo == false) {
            console.log('获取题干内容：', data.data);
            for (i = 0; i < data.data.length; i++) {
                curobj = data.data[i];
                if (curobj.type == 1 || curobj.type == 2) {
                    returnobj = this._public.parsingTextData(curobj);
                    returnobjArr.push(returnobj);
                    num++;
                    this.loadServerDataDone(num, data.data.length, returnobjArr);
                }
                else if (curobj.type == 3) {
                    //确定异步加载后的资源和对象进行了匹配
                    returnobj = this._public.parsingBitmapData(curobj);
                    returnobjArr.push(returnobj);
                    promiseBitmapArr.push(returnobj);
                    promise = this._public.aisleUrlReturnTexture(returnobj.title);
                    bitArr.push(promise);
                    num++;
                }
            }
        }
        else {
            console.log('获取题干内容：', data);
            for (i = 0; i < data.length; i++) {
                curobj = data[i];
                if (curobj.type == 1 || curobj.type == 2) {
                    returnobj = this._public.parsingTextData(curobj);
                    returnobjArr.push(returnobj);
                    num++;
                    this.loadServerDataDone(num, data.length, returnobjArr);
                }
                else if (curobj.type == 3) {
                    //确定异步加载后的资源和对象进行了匹配
                    returnobj = this._public.parsingBitmapData(curobj);
                    returnobjArr.push(returnobj);
                    promiseBitmapArr.push(returnobj);
                    promise = this._public.aisleUrlReturnTexture(returnobj.title);
                    bitArr.push(promise);
                    num++;
                }
            }
        }
        Promise.all(bitArr).then(function (promiseData) {
            var k, j, obj, tnum = 0;
            for (k = 0; k < promiseBitmapArr.length; k++) {
                obj = promiseBitmapArr[k];
                obj.title = promiseData[k];
                if (k == promiseBitmapArr.length - 1) {
                    if (_this.competitiveBoo == false) {
                        _this.loadServerDataDone(num, data.data.length, returnobjArr);
                    }
                    else {
                        _this.loadServerDataDone(num, data.length, returnobjArr);
                    }
                }
            }
        }).catch(function (reason) {
            // ...
        });
    };
    //加载网络资源->数据格式化->完成
    CompetitiveTitleClass.prototype.loadServerDataDone = function (curNum, totalNum, _arr) {
        if (curNum != totalNum) {
            return;
        }
        console.log('done!', _arr);
        this.saveQuesPanel(_arr);
        // this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,_arr));
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    CompetitiveTitleClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    CompetitiveTitleClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    CompetitiveTitleClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return CompetitiveTitleClass;
}(BaseContainer));
__reflect(CompetitiveTitleClass.prototype, "CompetitiveTitleClass");
//# sourceMappingURL=CompetitiveTitleClass.js.map