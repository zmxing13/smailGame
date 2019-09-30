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
var DialogBox = (function (_super) {
    __extends(DialogBox, _super);
    function DialogBox(describeStr, statusStr, targetFunc, targetThis, cancelBtnLable, enterBtnLable) {
        if (statusStr === void 0) { statusStr = DialogBox.TypeModel.Type_Inquiry; }
        if (targetFunc === void 0) { targetFunc = null; }
        if (targetThis === void 0) { targetThis = null; }
        if (cancelBtnLable === void 0) { cancelBtnLable = "取  消"; }
        if (enterBtnLable === void 0) { enterBtnLable = "确  定"; }
        var _this = _super.call(this) || this;
        _this._bgMask = new egret.Sprite();
        _this._bgMask.graphics.beginFill(0x000000, 0.6);
        _this._bgMask.graphics.drawRect(0, 0, Main.W, Main.H);
        _this._bgMask.graphics.endFill();
        _this._bgMask.touchEnabled = true;
        _this.addChild(_this._bgMask);
        _this._bg = new egret.Bitmap();
        _this._bg.texture = RES.getRes("img_rect_color0005_png");
        _this.addChild(_this._bg);
        _this._bottomColour = new egret.Bitmap();
        _this._bottomColour.texture = RES.getRes("img_rect_color0006_png");
        _this.addChild(_this._bottomColour);
        _this._icon_status = new egret.Bitmap();
        _this._icon_status.texture = RES.getRes(statusStr);
        _this.addChild(_this._icon_status);
        _this._icon_line = new egret.Bitmap();
        _this._icon_line.texture = RES.getRes("img_line_01_png");
        _this.addChild(_this._icon_line);
        _this._txt_title = new egret.TextField();
        _this._txt_title.text = "新消息";
        _this._txt_title.size = 40;
        _this._txt_title.textColor = 0x000000;
        _this._txt_title.bold = true;
        _this._txt_title.textAlign = egret.HorizontalAlign.LEFT;
        _this._txt_title.verticalAlign = egret.VerticalAlign.MIDDLE;
        //this._txt_title.border=true;
        _this._txt_title.borderColor = 0xff0000;
        _this.addChild(_this._txt_title);
        _this._txt_content = new egret.TextField();
        _this._txt_content.text = describeStr;
        _this._txt_content.size = 38;
        _this._txt_content.textColor = 0x000000;
        _this._txt_content.bold = true;
        _this._txt_content.textAlign = egret.HorizontalAlign.CENTER;
        _this._txt_content.verticalAlign = egret.VerticalAlign.MIDDLE;
        //this._txt_content.border=true;
        _this._txt_content.borderColor = 0xff0000;
        _this.addChild(_this._txt_content);
        _this._btn_ok = new ButtonObject("知道了", Main.W / 3, 90, "img_rect_color0003_png");
        _this.addChild(_this._btn_ok);
        _this._btn_cancel = new ButtonObject(cancelBtnLable, Main.W / 3, 90, "img_rect_color0004_png");
        _this.addChild(_this._btn_cancel);
        _this._btn_enter = new ButtonObject(enterBtnLable, Main.W / 3, 90, "img_rect_color0002_png");
        _this.addChild(_this._btn_enter);
        _this._btn_ok.touchEnabled = true;
        _this._btn_ok.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.exitDialog, _this);
        _this._btn_enter.touchEnabled = true;
        _this._btn_enter.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.selectEvent, _this);
        _this._btn_cancel.touchEnabled = true;
        _this._btn_cancel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.selectEvent, _this);
        if (!targetFunc) {
            _this._btn_ok.visible = true;
            _this._btn_cancel.visible = false;
            _this._btn_enter.visible = false;
        }
        else {
            _this._fun_select = targetFunc;
            _this._targetThis = targetThis;
            _this._btn_ok.visible = false;
            _this._btn_cancel.visible = true;
            _this._btn_enter.visible = true;
        }
        _this.UpWindowData();
        return _this;
    }
    DialogBox.prototype.selectEvent = function (e) {
        this.exitDialog(e);
        if (e.currentTarget == this._btn_enter) {
            this._fun_select.apply(this._targetThis, [true]);
        }
        else {
            this._fun_select.apply(this._targetThis, [false]);
        }
    };
    DialogBox.prototype.exitDialog = function (e) {
        for (var i = 0; i < this.numChildren; i++) {
            if (this.getChildAt(i) == this._bgMask) {
                continue;
            }
            else {
                this.getChildAt(i).visible = false;
            }
        }
        this.hide();
    };
    DialogBox.prototype.hide = function () {
        egret.Tween.get(this._bgMask, {
            onChangeObj: this
        })
            .to({ alpha: 0 }, 100)
            .call(this.exitDialogBoxEvent, this, []);
    };
    DialogBox.prototype.exitDialogBoxEvent = function (e) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    DialogBox.prototype.UpWindowData = function () {
        this._bgMask.graphics.clear();
        this._bgMask.graphics.beginFill(0x000000, 0.6);
        this._bgMask.graphics.drawRect(0, 0, Main.W, Main.H);
        this._bgMask.graphics.endFill();
        this._bg.width = this._bgMask.width / 6 * 5;
        this._bg.height = 615;
        this._bg.x = (this._bgMask.width - this._bg.width) / 2;
        this._bg.y = (this._bgMask.height - this._bg.height) / 2;
        this._bottomColour.width = this._bg.width - 30;
        this._bottomColour.height = 480;
        this._bottomColour.x = this._bg.x + (this._bg.width - this._bottomColour.width) / 2;
        this._bottomColour.y = this._bg.y + 15;
        this._icon_status.width = this._icon_status.height = 72;
        this._icon_status.x = this._bottomColour.x + 20;
        this._icon_status.y = this._bottomColour.y + 20;
        this._icon_line.width = this._bottomColour.width - 40;
        this._icon_line.x = this._bottomColour.x + (this._bottomColour.width - this._icon_line.width) / 2;
        this._icon_line.y = this._icon_status.y + this._icon_status.height + 10;
        this._txt_title.width = this._icon_line.width - this._icon_status.width - 10;
        this._txt_title.height = this._icon_status.height;
        this._txt_title.x = this._icon_status.x + this._icon_status.width + 10;
        this._txt_title.y = this._icon_status.y;
        this._txt_content.width = this._icon_line.width;
        this._txt_content.height = this._bottomColour.height - this._icon_status.height * 2;
        this._txt_content.x = this._icon_line.x;
        this._txt_content.y = this._icon_line.y + 15;
        this._btn_ok.x = Main.W / 2;
        this._btn_ok.y = this._bottomColour.y + this._bottomColour.height + (this._bg.height - this._bottomColour.height) / 2 - 10;
        this._btn_cancel.width = this._bottomColour.width / 2.5;
        this._btn_cancel.x = this._btn_ok.x - this._bottomColour.width / 4;
        this._btn_cancel.y = this._btn_ok.y;
        this._btn_enter.width = this._bottomColour.width / 2.5;
        this._btn_enter.x = this._btn_ok.x + this._bottomColour.width / 4;
        this._btn_enter.y = this._btn_ok.y;
    };
    DialogBox.TypeModel = {
        /**
         * 正确风格
         */
        Type_Right: "ic_ok_n_png",
        /**
         * 错误风格
         */
        Type_Error: "ic_cancel_n_png",
        /**
         * 警告风格
         */
        Type_Warn: "ic_warn_n_png",
        /**
         * 默认风格
         */
        Type_Inquiry: "ic_inquiry_n_png"
    };
    return DialogBox;
}(BaseContainer));
__reflect(DialogBox.prototype, "DialogBox");
//# sourceMappingURL=DialogBox.js.map