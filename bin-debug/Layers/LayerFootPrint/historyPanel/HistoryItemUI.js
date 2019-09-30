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
var HistoryItemUI = (function (_super) {
    __extends(HistoryItemUI, _super);
    function HistoryItemUI(w, h, data) {
        var _this = _super.call(this) || this;
        _this._data = {
            type: "level",
            info: "闯关：1到5级",
            date: "2019-05-03"
        };
        _this._width = w;
        _this._height = h;
        _this._data = data;
        _this._img = new egret.Bitmap();
        _this.addBackGround();
        _this.drawContent();
        _this.drawBackGround();
        return _this;
    }
    HistoryItemUI.prototype.addBackGround = function () {
        this._bg = new egret.Shape();
        this.addChild(this._bg);
    };
    HistoryItemUI.prototype.drawBackGround = function () {
        var color;
        switch (this._data.type) {
            case "level":
                color = 0xcbe6a1;
                break;
            case "pk":
                color = 0xa1f5ff;
                break;
            case "practice":
                color = 0xf1d6ff;
                break;
        }
        var g = this._bg.graphics;
        g.clear();
        g.lineStyle(1, 0xbbbbbb);
        g.beginFill(color);
        g.drawRoundRect(0, 0, this._width, this._height, 0, 0);
    };
    HistoryItemUI.prototype.drawContent = function () {
        this.drawInfo();
        this.drawDate();
        this.addButtons();
    };
    HistoryItemUI.prototype.drawInfo = function () {
        var info = new egret.TextField();
        this.addChild(info);
        info.width = this._width - 140;
        info.height = this._height - 40;
        info.text = this._data.info;
        info.textColor = 0x000000;
        info.fontFamily = "微软雅黑";
        info.textAlign = egret.HorizontalAlign.LEFT;
        info.verticalAlign = egret.VerticalAlign.MIDDLE;
        info.size = 20;
        info.x = 20;
        info.y = 20;
    };
    HistoryItemUI.prototype.drawDate = function () {
        var name = new egret.TextField();
        this.addChild(name);
        name.width = this._width - 140;
        name.height = 40;
        name.text = this._data.date;
        name.textColor = 0x888888;
        name.fontFamily = "微软雅黑";
        name.textAlign = egret.HorizontalAlign.RIGHT;
        name.verticalAlign = egret.VerticalAlign.MIDDLE;
        name.size = name.height / 2;
        name.anchorOffsetY = name.height / 2;
        name.x = 20;
        name.y = this._height - 25;
    };
    HistoryItemUI.prototype.addButtons = function () {
        var _this = this;
        this._detailBtn = new Button(80, 40, "详情");
        this._detailBtn.touchEnabled = true;
        this._detailBtn.x = this._width - 100;
        this._detailBtn.anchorOffsetY = this._detailBtn.height / 2;
        this._detailBtn.y = this._height / 2;
        this.addChild(this._detailBtn);
        this._detailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.dispatchEvent(new egret.Event("detail", false, false, { userData: _this._data }));
        }, this);
    };
    return HistoryItemUI;
}(egret.Sprite));
__reflect(HistoryItemUI.prototype, "HistoryItemUI");
//# sourceMappingURL=HistoryItemUI.js.map