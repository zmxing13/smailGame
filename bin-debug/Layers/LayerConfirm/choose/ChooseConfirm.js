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
//闯关游戏模式，按钮选择
var ChooseConfirm = (function (_super) {
    __extends(ChooseConfirm, _super);
    function ChooseConfirm(_arr) {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.addChildIndexArr = [];
        _this.addChildIndexArr = _arr;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 返回世界地图后初始化内容
     */
    ChooseConfirm.prototype.updataInit = function () {
    };
    /**
     * 创建图形界面
     */
    ChooseConfirm.prototype.initSprite = function () {
        var i, arrChild = 0, obj;
        for (i = 0; i < this.addChildIndexArr.length; i++) {
            arrChild = this.addChildIndexArr[i];
            obj = new ImgTemplate('img_confirm_chooseGrade_' + (i + 1));
            obj.x = 0;
            obj.y = obj.height * i;
            obj.id = (i + 1);
            this.addChild(obj);
            obj.touchEnabled = true;
            if (arrChild != 0) {
                obj.statusBoo = true;
            }
            else {
                obj.setBitmapFlilter();
            }
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.objTouch, this);
        }
    };
    ChooseConfirm.prototype.objTouch = function (e) {
        var mc = e.currentTarget;
        console.log('闯关模式-年级按钮选择中' + mc.id, '当前对象触摸状态：' + mc.statusBoo);
        if (mc.statusBoo == true) {
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, e.currentTarget.id));
        }
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    ChooseConfirm.prototype.UpWindowData = function () {
    };
    /**
     * 初始化事件消息
     */
    ChooseConfirm.prototype.initMessage = function () {
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    ChooseConfirm.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    ChooseConfirm.prototype.DestroyOut = function (exitTime, waitTime) {
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
    ChooseConfirm.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return ChooseConfirm;
}(BaseContainer));
__reflect(ChooseConfirm.prototype, "ChooseConfirm");
//# sourceMappingURL=ChooseConfirm.js.map