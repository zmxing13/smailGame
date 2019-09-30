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
 * 足迹
 */
var LayerFootPrint = (function (_super) {
    __extends(LayerFootPrint, _super);
    function LayerFootPrint() {
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
    LayerFootPrint.prototype.initSprite = function () {
        this.disPlaySp = new egret.Sprite();
        this.addChild(this.disPlaySp);
        this.titleClass = new TitleReturnClass('img_FootPrintTitle');
        this.titleClass.returnBtn.touchEnabled = true;
        this.titleClass.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.textClick, this);
        this.disPlaySp.addChild(this.titleClass);
        this.foot = new HistoryPanel(Main.W, Main.H - this.titleClass.height - 10);
        this.addChild(this.foot);
    };
    LayerFootPrint.prototype.textClick = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, true));
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    LayerFootPrint.prototype.UpWindowData = function () {
        this.titleClass.x = Main.W * .1;
        this.titleClass.y = Main.H * .01;
        this.foot.x = 0;
        this.foot.y = this.titleClass.y + this.titleClass.height;
    };
    /**
     * 初始化事件消息
     */
    LayerFootPrint.prototype.initMessage = function () {
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    LayerFootPrint.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    LayerFootPrint.prototype.DestroyOut = function (exitTime, waitTime) {
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
    LayerFootPrint.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return LayerFootPrint;
}(BaseContainer));
__reflect(LayerFootPrint.prototype, "LayerFootPrint");
//# sourceMappingURL=LayerFootPrint.js.map