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
// 徽章按钮，单元
var honorBtnClass = (function (_super) {
    __extends(honorBtnClass, _super);
    function honorBtnClass() {
        var _this = _super.call(this) || this;
        _this.eid = 0;
        _this.emblemSum = 0;
        _this._public = new PublicClass();
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 徽章按钮-设置按钮显示内容
     * honorType    类型
     * honorNum     数量
     * honorName    名字
     */
    honorBtnClass.prototype.setHonorBtnContent = function (honorType, honorNum, honrName) {
        if (honorNum === void 0) { honorNum = 0; }
        if (honrName === void 0) { honrName = ''; }
        this.addChild(this.honorBtn);
        this.honorSp.graphics.beginFill(0xDDD28F, 1);
        this.honorSp.graphics.drawCircle(0, 0, 25);
        this.honorSp.graphics.endFill();
        this.addChild(this.honorSp);
        this.honorNum.text = honorNum.toString();
        this.honorNum.size = 30;
        this.addChild(this.honorNum);
        this.honorName.text = honrName.toString();
        this.honorName.size = 40;
        this.addChild(this.honorName);
        this.UpWindowData();
    };
    /**
     * 创建图形界面
     */
    honorBtnClass.prototype.initSprite = function () {
        this.honorBtn = this._public.createBitmapByName('img_badge');
        this.addChild(this.honorBtn);
        this.honorSp = new egret.Shape();
        this.honorSp.graphics.beginFill(0xDDD28F, 1);
        this.honorSp.graphics.drawCircle(0, 0, 25);
        this.honorSp.graphics.endFill();
        this.addChild(this.honorSp);
        this.honorNum = this._public.createTextByName('1', 30, 0xDD1E29);
        this.addChild(this.honorNum);
        this.honorName = this._public.createTextByName('1', 40, 0xffffff);
        this.addChild(this.honorName);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    honorBtnClass.prototype.UpWindowData = function () {
        var scNum = 0, honorBtnW = 0, honorBtnH = 0;
        scNum = Main.scaleNum + .8;
        honorBtnW = this.honorBtn.width + (this.honorBtn.width * scNum);
        honorBtnH = this.honorBtn.height + (this.honorBtn.height * scNum);
        this.honorBtn.width = Main.W / 8;
        this.honorBtn.height = Main.W / 8;
        this.honorSp.x = this.honorBtn.width;
        this.honorSp.y = 0;
        this.honorNum.x = this.honorSp.x - (this.honorNum.width / 2);
        this.honorNum.y = this.honorSp.y - (this.honorNum.height / 2);
        this.honorName.x = (this.honorSp.width - this.honorName.width / 3);
        this.honorName.y = this.honorSp.height * 2.5;
    };
    /**
     * 初始化事件消息
     */
    honorBtnClass.prototype.initMessage = function () {
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    honorBtnClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    honorBtnClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    honorBtnClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return honorBtnClass;
}(BaseContainer));
__reflect(honorBtnClass.prototype, "honorBtnClass");
//# sourceMappingURL=honorBtnClass.js.map