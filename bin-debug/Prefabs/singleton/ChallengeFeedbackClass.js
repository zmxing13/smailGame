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
//挑战信息弹框
var ChallengeClass = (function (_super) {
    __extends(ChallengeClass, _super);
    function ChallengeClass() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        if (ChallengeClass.challenge) {
            throw new Error('加载封屏页-已存在,无需创建');
        }
        ChallengeClass.challenge = _this;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     *显示加载封屏页
    */
    ChallengeClass.prototype.saveLoad = function (_disText) {
        if (_disText === void 0) { _disText = '你收到了挑战,是否查看?'; }
        this.UpWindowData();
        this.bgColor.visible = true;
        this.bgColor.touchEnabled = true;
        this.loadText.visible = true;
        this.loadText.text = _disText;
        this.loadText.size = Main.W / 15;
        this.loadText.x = (this.bgColor.width - this.loadText.width) / 2;
        this.loadText.y = (this.bgColor.height - this.loadText.height) / 2 - (this.loadText.height * 2);
        this.determineBtn.visible = true;
        this.cancelBtn.visible = true;
        this.determineBtn.touchEnabled = true;
        this.cancelBtn.touchEnabled = true;
    };
    /**
     *隐藏加载封屏页
    */
    ChallengeClass.prototype.killLoad = function () {
        this.hiddenOut();
        this.bgColor.visible = false;
        this.bgColor.touchEnabled = false;
        this.loadText.visible = false;
        this.loadText.visible = false;
        this.loadText.text = '';
        this.determineBtn.visible = false;
        this.cancelBtn.visible = false;
        this.determineBtn.touchEnabled = false;
        this.cancelBtn.touchEnabled = false;
    };
    /**
     * 创建图形界面
     */
    ChallengeClass.prototype.initSprite = function () {
        this.bgColor = new egret.Sprite();
        this.bgColor.graphics.beginFill(0x000000, .5);
        this.bgColor.graphics.drawRect(0, 0, Main.W, Main.H);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);
        this.loadText = this._public.createTextByName('你收到了挑战,是否查看?');
        this.loadText.size = Main.W / 15;
        this.loadText.x = (this.bgColor.width - this.loadText.width) / 2;
        this.loadText.y = (this.bgColor.height - this.loadText.height) / 2 - (this.loadText.height * 2);
        this.addChild(this.loadText);
        this.determineBtn = this._public.createBitmapByName('img_wordMap_doneBtn');
        this.addChild(this.determineBtn);
        this.cancelBtn = this._public.createBitmapByName('img_wordMap_cancelBtn');
        this.addChild(this.cancelBtn);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
    */
    ChallengeClass.prototype.UpWindowData = function () {
        this.bgColor.x = 0;
        this.bgColor.y = 0;
        this.bgColor.width = Main.W;
        this.bgColor.height = Main.H;
        this.determineBtn.x = (Main.W - this.determineBtn.width) / 2 - this.determineBtn.width;
        this.determineBtn.y = (Main.H - this.determineBtn.height) / 2;
        this.cancelBtn.x = (Main.W - this.cancelBtn.width) / 2 + this.cancelBtn.width;
        this.cancelBtn.y = (Main.H - this.cancelBtn.height) / 2;
    };
    //更改提示文字内容
    ChallengeClass.prototype.setLoadText = function (str) {
        this.loadText.text = str;
        this.loadText.size = Main.W / 15;
        this.loadText.x = (this.bgColor.width - this.loadText.width) / 2;
        this.loadText.y = (this.bgColor.height - this.loadText.height) / 2 - (this.loadText.height * 2);
    };
    /**
     * 初始化事件消息
     */
    ChallengeClass.prototype.initMessage = function () {
        this.bgColor.touchEnabled = true;
        this.determineBtn.touchEnabled = true;
        this.cancelBtn.touchEnabled = true;
        this.determineBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.determinBtnTouch, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.cancelBtnTouch, this);
    };
    //确定事件
    ChallengeClass.prototype.determinBtnTouch = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'determin'));
        // this.hiddenOut(.1,0,0)
    };
    //取消事件
    ChallengeClass.prototype.cancelBtnTouch = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'cancel'));
        // this.hiddenOut(.1,0,0)
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    ChallengeClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
        if (exitTime === void 0) { exitTime = 0.1; }
        if (waitTime === void 0) { waitTime = 0.1; }
        if (stateAlpha === void 0) { stateAlpha = 1; }
        egret.Tween.get(this, {
            onChangeObj: this
        })
            .wait(waitTime * 1000)
            .to({ alpha: stateAlpha }, exitTime * 1000)
            .call(function () {
            if (stateAlpha == 1) {
                this.bgColor.touchEnabled = true;
                this.determineBtn.touchEnabled = true;
                this.cancelBtn.touchEnabled = true;
            }
            else if (stateAlpha == 0) {
                this.bgColor.touchEnabled = false;
                this.determineBtn.touchEnabled = false;
                this.cancelBtn.touchEnabled = false;
            }
        });
    };
    /**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    ChallengeClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    ChallengeClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return ChallengeClass;
}(BaseContainer));
__reflect(ChallengeClass.prototype, "ChallengeClass");
//# sourceMappingURL=ChallengeFeedbackClass.js.map