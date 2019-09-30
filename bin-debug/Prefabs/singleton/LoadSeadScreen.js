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
//load封屏
var LoadSeadScreen = (function (_super) {
    __extends(LoadSeadScreen, _super);
    function LoadSeadScreen() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        if (LoadSeadScreen.loadScreen) {
            throw new Error('加载封屏页-已存在,无需创建');
        }
        LoadSeadScreen.loadScreen = _this;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     *显示加载封屏页
    */
    LoadSeadScreen.prototype.saveLoad = function (_disText) {
        if (_disText === void 0) { _disText = '资源加载中,请等待~'; }
        this.UpWindowData();
        this.bg.visible = true;
        this.bg.touchEnabled = true;
        this.loadText.visible = true;
        this.loadImg.visible = true;
        this.loadText.text = _disText;
        this.loadText.size = Main.W / 20;
        this.loadText.x = (this.bg.width - this.loadText.width) / 2;
        this.loadText.y = (this.bg.height - this.loadText.height) / 2;
        this.loadImg.x = (Main.W - this.loadImg.width) / 2 + this.loadImg.width / 2;
        this.loadImg.y = this.loadText.y - this.loadImg.height;
        this.loadImg.rotation = 0;
        this.addEventListener(egret.Event.ENTER_FRAME, this.thisEvent, this);
    };
    /**
     *隐藏加载封屏页
    */
    LoadSeadScreen.prototype.killLoad = function () {
        this.hiddenOut();
        this.bg.visible = false;
        this.bg.touchEnabled = false;
        this.loadText.visible = false;
        this.loadImg.visible = false;
        this.loadText.text = '';
        this.removeEventListener(egret.Event.ENTER_FRAME, this.thisEvent, this);
    };
    /**
     * 创建图形界面
     */
    LoadSeadScreen.prototype.initSprite = function () {
        this.bg = new egret.Sprite();
        this.bg.graphics.beginFill(0x000000, .5);
        this.bg.graphics.drawRect(0, 0, Main.W, Main.H);
        this.bg.graphics.endFill();
        this.addChild(this.bg);
        this.bg.visible = false;
        this.loadText = this._public.createTextByName('资源加载中,请耐心等待~');
        this.loadText.size = Main.W / 20 * 1;
        this.loadText.x = (this.bg.width - this.loadText.width) / 2;
        this.loadText.y = (this.bg.height - this.loadText.height) / 2;
        this.addChild(this.loadText);
        this.loadText.visible = false;
        this.loadImg = this._public.createBitmapByName('loadingImg');
        this.loadImg.anchorOffsetX = this.loadImg.width / 2;
        this.loadImg.anchorOffsetY = this.loadImg.height / 2;
        this.addChild(this.loadImg);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    LoadSeadScreen.prototype.UpWindowData = function () {
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(0x000000, .5);
        this.bg.graphics.drawRect(0, 0, Main.W, Main.H);
        this.bg.graphics.endFill();
        this.loadImg.x = (Main.W - this.loadImg.width) / 2;
        this.loadImg.y = this.bg.y - this.loadImg.height;
    };
    /**
     * 初始化事件消息
     */
    LoadSeadScreen.prototype.initMessage = function () {
        this.bg.touchEnabled = true;
        // this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.bgTouch,this)
    };
    LoadSeadScreen.prototype.bgTouch = function (e) {
        this.killLoad();
    };
    LoadSeadScreen.prototype.thisEvent = function (e) {
        this.loadImg.rotation += 5;
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    LoadSeadScreen.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    LoadSeadScreen.prototype.DestroyOut = function (exitTime, waitTime) {
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
    LoadSeadScreen.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return LoadSeadScreen;
}(BaseContainer));
__reflect(LoadSeadScreen.prototype, "LoadSeadScreen");
//# sourceMappingURL=LoadSeadScreen.js.map