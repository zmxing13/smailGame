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
 * 个人主页 荣誉徽章
 */
var HomeHonorClass = (function (_super) {
    __extends(HomeHonorClass, _super);
    function HomeHonorClass(w, h) {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.width = w;
        _this.height = h;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    HomeHonorClass.prototype.initSprite = function () {
        this.bgColor = new egret.Shape();
        this.bgColor.graphics.beginFill(0x123eab, 0);
        this.bgColor.graphics.drawRect(0, 0, this.width, this.height);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);
        this.honorDisPlay = new HonorDisPlay(Main.W, this.height / 10 * 4);
        this.addChild(this.honorDisPlay);
        this.honorSynthetic = new HonorSynthetic(Main.W, this.height / 10 * 3);
        this.addChild(this.honorSynthetic);
        this.honorCollection = new HonorCollection(Main.W, this.height / 10 * 3);
        this.addChild(this.honorCollection);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    HomeHonorClass.prototype.UpWindowData = function () {
        this.honorDisPlay.x = 0;
        this.honorDisPlay.y = this.height / 10 * 0;
        this.honorSynthetic.x = 0;
        this.honorSynthetic.y = this.honorDisPlay.y + this.honorDisPlay.height;
        this.honorCollection.x = 0;
        this.honorCollection.y = this.height - this.honorCollection.height;
    };
    /**
     * 初始化事件消息
     */
    HomeHonorClass.prototype.initMessage = function () {
        this.honorCollection.addEventListener(EventEnumerate.SELECT_COMPLETE, this.CollectioneEvent, this);
    };
    HomeHonorClass.prototype.CollectioneEvent = function (e) {
        if (e.data) {
            this.honorSynthetic.NewSyntheic(e.data);
        }
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    HomeHonorClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    HomeHonorClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    HomeHonorClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return HomeHonorClass;
}(BaseContainer));
__reflect(HomeHonorClass.prototype, "HomeHonorClass");
//# sourceMappingURL=HomeHonorClass.js.map