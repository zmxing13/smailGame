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
// 徽章显示区域 顶部
var HonorDisPlay = (function (_super) {
    __extends(HonorDisPlay, _super);
    function HonorDisPlay(w, h) {
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
    HonorDisPlay.prototype.initSprite = function () {
        this.bgColor = new egret.Shape();
        this.bgColor.graphics.beginFill(0xAE2824, 0);
        this.bgColor.graphics.drawRect(0, 0, this.width, this.height);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);
        this.disPlayAnim = new DragonBonesAnimation('titleAnim');
        this.addChild(this.disPlayAnim);
        this.disPlayAnim.play("anim");
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    HonorDisPlay.prototype.UpWindowData = function () {
        this.disPlayAnim.scaleX = this.disPlayAnim.scaleY = Main.scaleNum - .4;
        this.disPlayAnim.x = this.bgColor.x + this.bgColor.width / 2;
        this.disPlayAnim.y = this.bgColor.y + this.bgColor.height / 1.8;
    };
    /**
     * 初始化事件消息
     */
    HonorDisPlay.prototype.initMessage = function () {
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    HonorDisPlay.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    HonorDisPlay.prototype.DestroyOut = function (exitTime, waitTime) {
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
    HonorDisPlay.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return HonorDisPlay;
}(BaseContainer));
__reflect(HonorDisPlay.prototype, "HonorDisPlay");
//# sourceMappingURL=HonorDisPlay.js.map