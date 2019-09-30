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
//输入文本类
var InputTextClass = (function (_super) {
    __extends(InputTextClass, _super);
    function InputTextClass() {
        var _this = _super.call(this) || this;
        _this.inputTextStr = '';
        _this.inputExplainStr = '';
        _this.displayAsBoo = false;
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    InputTextClass.prototype.setExplainStr = function (_explainStr, _boo) {
        if (_explainStr === void 0) { _explainStr = ''; }
        if (_boo === void 0) { _boo = false; }
        this.inputExplainStr = _explainStr;
        this.inputExplain.text = this.inputExplainStr;
        if (!_boo) {
            this.inputTextContent.type = egret.TextFieldType.INPUT;
        }
        else {
            this.inputTextContent.inputType = egret.TextFieldInputType.PASSWORD;
            this.inputTextContent.displayAsPassword = _boo; //密码填写完成后，点击屏幕空白处，该处EditableText为*格式
        }
    };
    /**
     * 创建图形界面
     */
    InputTextClass.prototype.initSprite = function () {
        this.inputTextSp = new egret.Sprite();
        this.inputTextSp.graphics.beginFill(0x00ff00, .5);
        this.inputTextSp.graphics.drawRoundRect(0, 0, Main.W / 2, 150, 50, 50);
        this.inputTextSp.graphics.endFill();
        this.addChild(this.inputTextSp);
        this.inputTextContent = new egret.TextField();
        this.inputTextContent.type = egret.TextFieldType.INPUT;
        this.inputTextContent.size = 50;
        this.inputTextContent.width = this.inputTextSp.width;
        this.inputTextContent.height = this.inputTextSp.height;
        this.inputTextContent.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.inputTextContent.textAlign = egret.HorizontalAlign.CENTER;
        this.inputTextContent.textColor = 0x000000;
        this.inputTextContent.text = this.inputTextStr;
        this.inputTextSp.addChild(this.inputTextContent);
        this.inputExplain = new egret.TextField();
        this.inputExplain.size = 30;
        this.inputExplain.width = this.inputTextSp.width;
        this.inputExplain.height = this.inputTextSp.height;
        this.inputExplain.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.inputExplain.textAlign = egret.HorizontalAlign.CENTER;
        this.inputExplain.textColor = 0x999999;
        this.inputExplain.text = this.inputExplainStr;
        this.inputTextSp.addChild(this.inputExplain);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    InputTextClass.prototype.UpWindowData = function () {
        this.inputTextContent.x = 0;
        this.inputTextContent.y = 0;
        this.inputExplain.x = this.inputTextContent.x;
        this.inputExplain.y = this.inputTextContent.y - this.inputTextContent.height / 1.5;
    };
    /**
     * 初始化事件消息
     */
    InputTextClass.prototype.initMessage = function () {
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    InputTextClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    InputTextClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    InputTextClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return InputTextClass;
}(BaseContainer));
__reflect(InputTextClass.prototype, "InputTextClass");
//# sourceMappingURL=InputTextClass.js.map