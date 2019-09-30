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
//闯关选择页
var ChooseClass = (function (_super) {
    __extends(ChooseClass, _super);
    function ChooseClass(_gameStatus) {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.objArr = [];
        _this.gameStatus = 0;
        _this.gameStatus = _gameStatus;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 返回世界地图后初始化内容
     */
    ChooseClass.prototype.updataInit = function () {
        if (this.chooseConfirm) {
            this.chooseConfirm.updataInit();
        }
        if (this.choosePractice) {
            this.choosePractice.updataInit();
        }
    };
    /**
     * 设置按钮点击状态
     */
    ChooseClass.prototype.setBtnToucEnabled = function (_arr) {
        var i, typeArr = [], gradeNameArr = [], gradeTitleArr = [], titleTypeScope = 0, //题干类型的数量；-1：计算题-2：阅读题-3：看图题
        gradeScope = 0, //年级范围1-6，共有几个年级
        arrChild = 0, obj;
        titleTypeScope = _arr[0].length;
        gradeScope = _arr[1].length;
        for (i = 0; i < titleTypeScope; i++) {
            typeArr.push(_arr[0][i].title);
        }
        for (i = 0; i < gradeScope; i++) {
            gradeNameArr.push(_arr[1][i].title);
            gradeTitleArr.push(_arr[1][i].classLevel.length);
        }
        if (this.gameStatus == 1) {
            //闯关
            this.chooseConfirm = new ChooseConfirm(gradeTitleArr);
            this.addChild(this.chooseConfirm);
            this.chooseConfirm.addEventListener(EventEnumerate.SELECT_COMPLETE, this.chooseConfirmComplete, this);
        }
        else if (this.gameStatus == 2) {
            //练习
            this.choosePractice = new ChoosePractice(_arr);
            this.addChild(this.choosePractice);
            this.choosePractice.addEventListener(EventEnumerate.SELECT_COMPLETE, this.choosePracticeComplete, this);
        }
    };
    //闯关
    ChooseClass.prototype.chooseConfirmComplete = function (e) {
        this.chooseConfirm.DestroyOut();
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, e.data));
    };
    //练习
    ChooseClass.prototype.choosePracticeComplete = function (e) {
        this.choosePractice.DestroyOut();
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, e.data));
    };
    ChooseClass.prototype.destroyChoose = function () {
        if (this.chooseConfirm) {
            this.chooseConfirm.DestroyOut();
        }
        if (this.choosePractice) {
            this.choosePractice.DestroyOut();
        }
    };
    /**
     * 创建图形界面
     */
    ChooseClass.prototype.initSprite = function () {
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    ChooseClass.prototype.UpWindowData = function () {
    };
    /**
     * 初始化事件消息
     */
    ChooseClass.prototype.initMessage = function () {
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    ChooseClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    ChooseClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    ChooseClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return ChooseClass;
}(BaseContainer));
__reflect(ChooseClass.prototype, "ChooseClass");
//# sourceMappingURL=ChooseClass.js.map