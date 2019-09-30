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
//练习游戏模式，按钮选择
var ChoosePractice = (function (_super) {
    __extends(ChoosePractice, _super);
    function ChoosePractice(_arr) {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.gameDataArr = [];
        _this.typeArr = [];
        _this.gradeNameArr = [];
        _this.gradeTitleArr = [];
        _this.specialBtnArr = [];
        _this.picureBtnArr = [];
        _this.gradeBtnArr = [];
        _this.returnArr = [];
        _this.gameDataArr = _arr;
        _this.formatting();
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    //数据格式化
    ChoosePractice.prototype.formatting = function () {
        this.typeArr = this.gameDataArr[0];
        this.gradeNameArr = this.gameDataArr[1];
        this.gradeTitleArr = this.gameDataArr[2];
    };
    /**
     * 返回世界地图后初始化内容
     */
    ChoosePractice.prototype.updataInit = function () {
        this.returnArr = [];
        this.statusSp.visible = true;
        this.typeSp.visible = false;
        this.gradeSp.visible = false;
        this.shutdownOpenObjTouchEbavled(this.specialBtnArr, true);
        this.shutdownOpenObjTouchEbavled(this.picureBtnArr);
        this.shutdownOpenObjTouchEbavled(this.gradeBtnArr);
    };
    /**
     * 创建图形界面
     */
    ChoosePractice.prototype.initSprite = function () {
        var i, arrChild = 0, obj, objTitle;
        this.statusSp = new egret.Sprite();
        this.addChild(this.statusSp);
        this.typeSp = new egret.Sprite();
        this.addChild(this.typeSp);
        this.gradeSp = new egret.Sprite();
        this.addChild(this.gradeSp);
        for (i = 0; i < 2; i++) {
            this.specialBtn = new ImgTemplate('img_config_hybrid_' + (i + 1));
            this.specialBtn.x = 0;
            this.specialBtn.y = this.specialBtn.height * i;
            this.specialBtn.touchEnabled = true;
            this.specialBtn.id = (i + 1);
            this.specialBtnArr.push(this.specialBtn);
            this.statusSp.addChild(this.specialBtn);
            this.specialBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.specialBtnTouch, this);
        }
        for (i = 0; i < this.typeArr.length; i++) {
            this.picureBtn = new ImgTemplate('img_config_oral_' + (i + 1));
            this.picureBtn.x = 0;
            this.picureBtn.y = this.picureBtn.height * i;
            this.picureBtn.visible = false;
            this.picureBtn.id = (i + 1);
            this.picureBtnArr.push(this.picureBtn);
            this.typeSp.addChild(this.picureBtn);
            this.picureBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.picureBtnTouch, this);
        }
        for (i = 0; i < this.gradeNameArr.length; i++) {
            arrChild = this.gradeNameArr[i].classLevel.length;
            this.gradeBtn = new ImgTemplate('img_confirm_chooseGrade_' + (i + 1));
            this.gradeBtn.x = 0;
            this.gradeBtn.y = this.gradeBtn.height * i;
            this.gradeBtn.id = (i + 1);
            this.gradeSp.visible = false;
            if (arrChild != 0) {
                this.gradeBtn.statusBoo = true;
                this.gradeBtnArr.push(this.gradeBtn);
            }
            else {
                this.gradeBtn.setBitmapFlilter();
            }
            this.gradeSp.addChild(this.gradeBtn);
            this.gradeBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gradeBtnTouch, this);
        }
    };
    //模式
    ChoosePractice.prototype.specialBtnTouch = function (e) {
        if (e.currentTarget.id == 1) {
            this.gradeSp.visible = true;
            this.shutdownOpenObjTouchEbavled(this.gradeBtnArr, true);
            this.returnArr.push(e.currentTarget.id);
        }
        else if (e.currentTarget.id == 2) {
            this.typeSp.visible = true;
            this.shutdownOpenObjTouchEbavled(this.picureBtnArr, true);
        }
        this.shutdownOpenObjTouchEbavled(this.specialBtnArr);
        this.statusSp.visible = false;
        this.returnArr.push(e.currentTarget.id);
    };
    //类型
    ChoosePractice.prototype.picureBtnTouch = function (e) {
        this.shutdownOpenObjTouchEbavled(this.picureBtnArr);
        this.typeSp.visible = false;
        this.gradeSp.visible = true;
        this.shutdownOpenObjTouchEbavled(this.gradeBtnArr, true);
        this.returnArr.push(e.currentTarget.id);
    };
    //年级
    ChoosePractice.prototype.gradeBtnTouch = function (e) {
        this.shutdownOpenObjTouchEbavled(this.gradeBtnArr);
        this.gradeSp.visible = false;
        this.returnArr.push(e.currentTarget.id);
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, this.returnArr));
    };
    //禁止/开始-数组内容的触摸事件
    ChoosePractice.prototype.shutdownOpenObjTouchEbavled = function (_arr, stateBoo) {
        if (stateBoo === void 0) { stateBoo = false; }
        var i, obj;
        for (i = 0; i < _arr.length; i++) {
            obj = _arr[i];
            obj.touchEnabled = stateBoo;
            obj.visible = stateBoo;
        }
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    ChoosePractice.prototype.UpWindowData = function () {
    };
    /**
     * 初始化事件消息
     */
    ChoosePractice.prototype.initMessage = function () {
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    ChoosePractice.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    ChoosePractice.prototype.DestroyOut = function (exitTime, waitTime) {
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
    ChoosePractice.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return ChoosePractice;
}(BaseContainer));
__reflect(ChoosePractice.prototype, "ChoosePractice");
//# sourceMappingURL=ChoosePractice.js.map