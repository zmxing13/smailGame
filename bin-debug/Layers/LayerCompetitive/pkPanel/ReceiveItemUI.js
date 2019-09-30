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
var ReceiveItemUI = (function (_super) {
    __extends(ReceiveItemUI, _super);
    function ReceiveItemUI(w, h, data) {
        var _this = _super.call(this) || this;
        _this._data = {
            img: "http://10.12.5.32/static/media/ImgTitles/title_img_6_1567756360.png",
            nickName: "小王",
            response: "no" //"reject","win","lost"
        };
        _this._width = w;
        _this._height = h;
        _this._data = data;
        _this._minSpace = w / 10;
        _this._img = new egret.Bitmap();
        _this.drawBackGround();
        _this.drawContent();
        return _this;
    }
    ReceiveItemUI.prototype.update = function () {
        var color;
        if (this._data.response == "reject") {
            this._rejectBtn.visible = false;
            this._acceptBtn.visible = false;
            this._deleteBtn.visible = true;
            this._info.text = "你拒绝";
            color = 0xcbcfd2;
        }
        else if (this._data.response == "win") {
            this._rejectBtn.visible = false;
            this._acceptBtn.visible = false;
            this._deleteBtn.visible = true;
            this._info.text = "你赢了";
            color = 0xcbe6a1;
        }
        else if (this._data.response == "lost") {
            this._rejectBtn.visible = false;
            this._acceptBtn.visible = false;
            this._deleteBtn.visible = true;
            this._info.text = "你输了";
            color = 0xe3afaf;
        }
        else {
            this._rejectBtn.visible = true;
            this._acceptBtn.visible = true;
            this._deleteBtn.visible = false;
            this._info.text = "";
            color = 0x0096ff;
        }
        var g = this._bg.graphics;
        g.clear();
        g.beginFill(color);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
    };
    ReceiveItemUI.prototype.drawBackGround = function () {
        this._bg = new egret.Shape();
        var g = this._bg.graphics;
        g.clear();
        g.beginFill(0x0096ff);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
        this.addChild(this._bg);
    };
    ReceiveItemUI.prototype.drawContent = function () {
        this.drawOrder();
        this.drawImg();
        this.drawNickName();
        this.addButtons();
        this.addReedBackInfo();
        this.update();
    };
    ReceiveItemUI.prototype.drawOrder = function () {
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
    ReceiveItemUI.prototype.drawImg = function () {
        var _this = this;
        this.addChild(this._img);
        this._img.width = this._height * 0.8;
        this._img.height = this._height * 0.8;
        this._img.y = this._height * 0.1;
        this._img.x = this._minSpace * 2;
        RES.getResByUrl(this._data.img, function (data) {
            //console.log(data);
            _this._img.texture = data;
        }, this);
    };
    ReceiveItemUI.prototype.drawNickName = function () {
        var name = new egret.TextField();
        this.addChild(name);
        name.width = this._minSpace * 3;
        name.height = this._height;
        name.text = this._data.nickName;
        name.textColor = 0xffffff;
        name.fontFamily = "微软雅黑";
        name.textAlign = egret.HorizontalAlign.CENTER;
        name.verticalAlign = egret.VerticalAlign.MIDDLE;
        name.size = this._height / 3;
        name.anchorOffsetX = name.width / 2;
        name.anchorOffsetY = name.height / 2;
        name.x = this._minSpace * 4;
        name.y = this._height / 2;
    };
    ReceiveItemUI.prototype.addReedBackInfo = function () {
        this._info = new egret.TextField();
        this.addChild(this._info);
        this._info.width = this._minSpace * 5;
        this._info.height = this._height;
        if (this._data.response == "reject") {
            this._info.text = "你拒绝";
        }
        else if (this._data.response == "win") {
            this._info.text = "你赢了";
        }
        else if (this._data.response == "lost") {
            this._info.text = "你输了";
        }
        this._info.textColor = 0xffffff;
        this._info.fontFamily = "微软雅黑";
        this._info.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._info.size = this._height / 3;
        this._info.anchorOffsetY = this._info.height / 2;
        this._info.x = this._minSpace * 5;
        this._info.y = this._height / 2;
    };
    ReceiveItemUI.prototype.addButtons = function () {
        var _this = this;
        this._rejectBtn = new Button(100, 50, "拒绝");
        this._rejectBtn.touchEnabled = true;
        this._rejectBtn.x = this._minSpace * 6;
        this._rejectBtn.y = (this._height - 50) / 2;
        this.addChild(this._rejectBtn);
        this._rejectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.dispatchEvent(new egret.Event("reject", false, false, { userData: _this._data }));
            _this._data.response = "reject";
            _this.update();
        }, this);
        this._acceptBtn = new Button(100, 50, "接受");
        this._acceptBtn.touchEnabled = true;
        this._acceptBtn.x = this._minSpace * 8;
        this._acceptBtn.y = (this._height - 50) / 2;
        this.addChild(this._acceptBtn);
        this._acceptBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.dispatchEvent(new egret.Event("accept", false, false, { userData: _this._data }));
        }, this);
        this._deleteBtn = new Button(100, 50, "删除");
        this._deleteBtn.touchEnabled = true;
        this._deleteBtn.x = this._minSpace * 8;
        this._deleteBtn.y = (this._height - 50) / 2;
        this.addChild(this._deleteBtn);
        this._deleteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.dispatchEvent(new egret.Event("delete", false, false, { userData: _this._data }));
        }, this);
    };
    return ReceiveItemUI;
}(egret.Sprite));
__reflect(ReceiveItemUI.prototype, "ReceiveItemUI");
//# sourceMappingURL=ReceiveItemUI.js.map