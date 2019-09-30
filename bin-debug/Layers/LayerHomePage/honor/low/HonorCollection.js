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
// 集合区域，收集徽章区域 底部
var HonorCollection = (function (_super) {
    __extends(HonorCollection, _super);
    function HonorCollection(w, h) {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.passNum = 0;
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
    HonorCollection.prototype.initSprite = function () {
        var scNum = 0, honorBtnW = 0, honorBtnH = 0;
        scNum = Main.scaleNum - .1;
        this.honBtnArr = [];
        this.honBtnNameArr = [];
        this.bgColor = new egret.Shape();
        this.bgColor.graphics.beginFill(0x40070F, 0);
        this.bgColor.graphics.drawRect(0, 0, this.width, this.height);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);
        this.syntheticBtn = new ImgTemplate('img_synthetic');
        this.addChild(this.syntheticBtn);
        honorBtnW = this.syntheticBtn.width + (this.syntheticBtn.width * scNum);
        honorBtnH = this.syntheticBtn.height + (this.syntheticBtn.height * scNum);
        this.syntheticBtn.result.width = honorBtnW;
        this.syntheticBtn.result.height = honorBtnH;
        var i, l, obj;
        this.honBtnNameArr = ['闯关', '练习', '竞技', '排行', '活跃'];
        for (i = 0; i < DataBus._honorType.length - 1; i++) {
            this.honBtn = new honorBtnClass();
            this.honBtn.eid = DataBus._honorType[i].id;
            for (l = 0; l < DataBus._honorNum.length; l++) {
                if (this.honBtn.eid == DataBus._honorNum[l].emblemId) {
                    // console.log('徽章存在',DataBus._honorNum[l].emblemTitle);
                    this.honBtn.emblemSum = DataBus._honorNum[l].emblemSum;
                }
            }
            this.honBtn.setHonorBtnContent('img_badge', this.honBtn.emblemSum, this.honBtnNameArr[i]);
            this.addChild(this.honBtn);
            this.honBtnArr.push(this.honBtn);
        }
        console.log(this.honBtnArr);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    HonorCollection.prototype.UpWindowData = function () {
        var i, obj;
        this.syntheticBtn.x = 20;
        this.syntheticBtn.y = (this.bgColor.height - this.syntheticBtn.result.height) / 2;
        var contentW = Main.W - this.syntheticBtn.width;
        var multiple = Math.ceil(contentW / this.honBtnArr[0].width);
        for (i = 0; i < this.honBtnArr.length; i++) {
            obj = this.honBtnArr[i];
            obj.x = (this.syntheticBtn.x + this.syntheticBtn.width + obj.width / 10) + (contentW / multiple + obj.width / 10) * i;
            obj.y = (this.bgColor.height - obj.height) / 2;
        }
    };
    /**
     * 初始化事件消息
     */
    HonorCollection.prototype.initMessage = function () {
        this.syntheticBtn.touchEnabled = true;
        this.syntheticBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.syntheticBtnTouch, this);
    };
    //立即合成
    HonorCollection.prototype.syntheticBtnTouch = function (e) {
        var i, l, obj, objTextNum, syntheticBoo = false;
        for (i = 0; i < this.honBtnArr.length; i++) {
            obj = this.honBtnArr[i];
            objTextNum = Number(obj.honorNum.text);
            console.log(objTextNum);
            if (objTextNum <= 0) {
                syntheticBoo = true;
            }
        }
        if (syntheticBoo == false) {
            for (l = 0; l < this.honBtnArr.length; l++) {
                obj = this.honBtnArr[l];
                objTextNum = Number(obj.honorNum.text);
                objTextNum = objTextNum - 1;
                //----------暂时使用----------
                this.passNum = 5 - objTextNum;
                //---------------------------
                obj.honorNum.text = (objTextNum).toString();
                console.log(objTextNum);
                console.log(this.passNum);
            }
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, this.passNum));
        }
        else {
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('缺少徽章,请完成徽章收集.');
        }
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    HonorCollection.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    HonorCollection.prototype.DestroyOut = function (exitTime, waitTime) {
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
    HonorCollection.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return HonorCollection;
}(BaseContainer));
__reflect(HonorCollection.prototype, "HonorCollection");
//# sourceMappingURL=HonorCollection.js.map