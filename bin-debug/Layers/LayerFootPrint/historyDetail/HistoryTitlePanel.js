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
var HistoryTitlePanel = (function (_super) {
    __extends(HistoryTitlePanel, _super);
    function HistoryTitlePanel(w, h) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this.drawBackGround();
        _this.addComponent();
        _this.addEvents();
        return _this;
    }
    HistoryTitlePanel.prototype.setData = function (data) {
        this._data = data;
        this._list.setDatas(data);
    };
    HistoryTitlePanel.prototype.addComponent = function () {
        this._closeBtn = new Button(100, 50, "关闭");
        this._closeBtn.anchorOffsetX = this._closeBtn.width / 2;
        this._closeBtn.x = this._width / 2;
        this._closeBtn.y = this._height - 70;
        this.addChild(this._closeBtn);
        this._list = new HisTitleListUI(this._width - 40, this._height - 90);
        this._list.x = 20;
        this._list.y = 20;
        this.addChild(this._list);
    };
    HistoryTitlePanel.prototype.addEvents = function () {
        var _this = this;
        this._closeBtn.touchEnabled = true;
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(new egret.Event("close"));
        }, this);
    };
    HistoryTitlePanel.prototype.drawBackGround = function () {
        var sp = new egret.Shape();
        var g = sp.graphics;
        g.beginFill(0xffffff);
        g.drawRect(0, 0, this._width, this._height);
        this.addChild(sp);
    };
    return HistoryTitlePanel;
}(egret.Sprite));
__reflect(HistoryTitlePanel.prototype, "HistoryTitlePanel");
//# sourceMappingURL=HistoryTitlePanel.js.map