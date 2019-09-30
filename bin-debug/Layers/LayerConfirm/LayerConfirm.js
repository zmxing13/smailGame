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
// 闯关
var LayerConfirm = (function (_super) {
    __extends(LayerConfirm, _super);
    function LayerConfirm(_titleName) {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.titleName = '';
        _this.titleName = _titleName;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    LayerConfirm.prototype.initSprite = function () {
        this.disPlaySp = new egret.Sprite();
        this.addChild(this.disPlaySp);
        this.titleClass = new TitleReturnClass(this.titleName);
        this.disPlaySp.addChild(this.titleClass);
        this.gameBox = new GameOperationCLass(this.titleName);
        this.disPlaySp.addChild(this.gameBox);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    LayerConfirm.prototype.UpWindowData = function () {
        this.titleClass.x = Main.W * .1;
        this.titleClass.y = Main.H / 10 * .1;
        this.gameBox.width = Main.W;
        this.gameBox.height = Main.H / 10 * 9;
        this.gameBox.x = 0;
        this.gameBox.y = this.titleClass.x + this.titleClass.height;
    };
    /**
     * 初始化事件消息
     */
    LayerConfirm.prototype.initMessage = function () {
        this.titleClass.returnBtn.touchEnabled = true;
        this.titleClass.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.titleClassTouch, this);
        this.gameBox.addEventListener(EventEnumerate.SELECT_COMPLETE, this.gameBoxComplete, this);
    };
    LayerConfirm.prototype.titleClassTouch = function (e) {
        if (this.gameBox.gameStartBoo == true) {
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('确定要退出吗？', DialogBox.TypeModel.Type_Warn, this.gameOverComplete, this, '取  消', '确  定');
        }
        else {
            this.gameBox.updataInit();
            this.gameBox.choosePage.destroyChoose();
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, true));
        }
    };
    LayerConfirm.prototype.gameOverComplete = function (e) {
        console.log(e);
        if (e == true) {
            this.gameBox.updataInit();
            this.gameBox.choosePage.destroyChoose();
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, true));
        }
        else {
        }
    };
    //游戏盒子答题完成事件
    LayerConfirm.prototype.gameBoxComplete = function (e) {
        if (e.data == 'sheetOver') {
            console.log('答题完成,结束ing');
            this.gameBox.DestroyOut();
        }
        else if (e.data == 'powerOver') {
            console.log('体力值不足');
            LoadSeadScreen.loadScreen.killLoad();
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'powerOver')); //体力值不足
            // this.gameBox.choosePage.hiddenOut();
            this.gameBox.hiddenOut();
        }
        // this.gameBox.hiddenOut()
    };
    LayerConfirm.prototype.saveConfirm = function () {
    };
    LayerConfirm.prototype.killConfirm = function (_titleName) {
        this.gameBox.againUpdataInt(_titleName);
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    LayerConfirm.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    LayerConfirm.prototype.DestroyOut = function (exitTime, waitTime) {
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
    LayerConfirm.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return LayerConfirm;
}(BaseContainer));
__reflect(LayerConfirm.prototype, "LayerConfirm");
//# sourceMappingURL=LayerConfirm.js.map