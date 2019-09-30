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
var SendItemUI = (function (_super) {
    __extends(SendItemUI, _super);
    function SendItemUI(w, h, data) {
        var _this = _super.call(this) || this;
        _this._data = { order: 1, nickName: "小花", response: "no" };
        _this._width = w;
        _this._height = h;
        _this._data = data;
        _this._minSpace = w / 10;
        _this._img = new egret.Bitmap();
        _this.drawBackGround();
        _this.drawContent();
        return _this;
    }
    SendItemUI.prototype.drawBackGround = function () {
        var color = 0xcccccc;
        switch (this._data.response) {
            case "no":
                color = 0x88c9f7;
                break;
            case "reject":
                color = 0xcbcfd2;
                break;
            case "win":
                color = 0xcbe6a1;
                break;
            case "lost":
                color = 0xe3afaf;
                break;
        }
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.clear();
        g.beginFill(color);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
        this.addChild(bg);
    };
    SendItemUI.prototype.drawContent = function () {
        //this.drawOrder();
        //this.drawImg();
        this.addButtons();
        this.drawInfo();
    };
    SendItemUI.prototype.drawOrder = function () {
        var order = new egret.TextField();
        this.addChild(order);
        order.width = 40;
        order.height = this._height;
        order.text = this._data.order;
        order.textColor = 0xffffff;
        order.fontFamily = "微软雅黑";
        order.textAlign = egret.HorizontalAlign.CENTER;
        order.verticalAlign = egret.VerticalAlign.MIDDLE;
        order.size = this._height / 3;
        order.anchorOffsetX = order.width / 2;
        order.anchorOffsetY = order.height / 2;
        order.x = this._minSpace;
        order.y = this._height / 2;
    };
    SendItemUI.prototype.drawInfo = function () {
        var txt = "";
        switch (this._data.response) {
            case "no":
                txt = "你向" + this._data.nickName + "发起挑战，\n对方还未回应";
                this._okBtn.visible = false;
                break;
            case "reject":
                txt = "你向" + this._data.nickName + "发起挑战，\n对方拒绝";
                break;
            case "win":
                txt = "你向" + this._data.nickName + "发起挑战，\n恭喜你获得胜利！";
                break;
            case "lost":
                txt = "你向" + this._data.nickName + "发起挑战，\n很遗憾，你输了！";
                break;
        }
        var name = new egret.TextField();
        this.addChild(name);
        name.width = this._minSpace * 7;
        name.height = this._height;
        name.text = txt;
        name.textColor = 0x000000;
        name.fontFamily = "微软雅黑";
        name.textAlign = egret.HorizontalAlign.LEFT;
        name.verticalAlign = egret.VerticalAlign.MIDDLE;
        name.size = this._height / 4;
        name.anchorOffsetX = 0;
        name.anchorOffsetY = name.height / 2;
        name.lineSpacing = 15;
        name.x = this._minSpace;
        name.y = this._height / 2;
    };
    SendItemUI.prototype.addButtons = function () {
        var _this = this;
        this._okBtn = new Button(100, 50, "删除");
        this._okBtn.touchEnabled = true;
        this._okBtn.x = this._minSpace * 7;
        this._okBtn.y = (this._height - 50) / 2;
        this.addChild(this._okBtn);
        this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.dispatchEvent(new egret.Event("ok", false, false, { userData: _this._data }));
        }, this);
    };
    return SendItemUI;
}(egret.Sprite));
__reflect(SendItemUI.prototype, "SendItemUI");
//# sourceMappingURL=SendItemUI.js.map