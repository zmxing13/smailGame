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
// 竞技
var LayerCompetitive = (function (_super) {
    __extends(LayerCompetitive, _super);
    function LayerCompetitive() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    LayerCompetitive.prototype.initSprite = function () {
        this.disPlaySp = new egret.Sprite();
        this.addChild(this.disPlaySp);
        this.titleClass = new TitleReturnClass('img_CompettiveTitle');
        this.titleClass.returnBtn.touchEnabled = true;
        this.titleClass.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.textClick, this);
        this.disPlaySp.addChild(this.titleClass);
        this.pkPanel = new PKPanel(Main.W / 10 * 9.5, Main.H - this.titleClass.height - 30);
        this.addChild(this.pkPanel);
    };
    LayerCompetitive.prototype.textClick = function (e) {
        if (DataBus.isCompettiveBoo == true) {
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('确定要退出吗？', DialogBox.TypeModel.Type_Warn, this.compettiveStatusComplete, this, '取  消', '确  定');
            DataBus.isCompettiveBoo = false;
        }
        else {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, true));
        }
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    LayerCompetitive.prototype.UpWindowData = function () {
        this.titleClass.x = Main.W * .1;
        this.titleClass.y = Main.H * .01;
        this.pkPanel.x = (Main.W - this.pkPanel.width) / 2;
        this.pkPanel.y = this.titleClass.y + this.titleClass.height;
    };
    /**
     * 初始化事件消息
     */
    LayerCompetitive.prototype.initMessage = function () {
        this.pkPanel.addEventListener(EventEnumerate.SELECT_COMPLETE, this.pkPanelComplete, this);
    };
    //竞技面板返回状态
    LayerCompetitive.prototype.pkPanelComplete = function (e) {
        console.log('pk对象：', e.data);
        if (e.data == 'accept') {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'accept')); //接受挑战
        }
        else if (e.data == 'reject') {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'reject')); //拒绝挑战
        }
        else {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, e.data)); //选择pk对象
        }
    };
    //是否在竞技状态中退出
    LayerCompetitive.prototype.compettiveStatusComplete = function (e) {
        if (e == true) {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, true));
        }
    };
    //更新竞技面板
    LayerCompetitive.prototype.updatePKPanel = function () {
        this.pkPanel.updatePkPanel();
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    LayerCompetitive.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
        if (exitTime === void 0) { exitTime = 0.1; }
        if (waitTime === void 0) { waitTime = 0.1; }
        if (stateAlpha === void 0) { stateAlpha = 1; }
        egret.Tween.get(this, {
            onChangeObj: this
        })
            .wait(waitTime * 1000)
            .to({ alpha: stateAlpha }, exitTime * 1000);
        if (stateAlpha == 1) {
            this.pkPanel.visible = true;
        }
        else if (stateAlpha == 0) {
            this.pkPanel.visible = false;
        }
    };
    /**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    LayerCompetitive.prototype.DestroyOut = function (exitTime, waitTime) {
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
    LayerCompetitive.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return LayerCompetitive;
}(BaseContainer));
__reflect(LayerCompetitive.prototype, "LayerCompetitive");
//# sourceMappingURL=LayerCompetitive.js.map