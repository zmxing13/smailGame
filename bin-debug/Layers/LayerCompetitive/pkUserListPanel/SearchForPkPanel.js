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
var SearchForPkPanel = (function (_super) {
    __extends(SearchForPkPanel, _super);
    function SearchForPkPanel(w) {
        var _this = _super.call(this) || this;
        _this._minSpace = w / 10;
        _this._width = w;
        _this._height = _this._minSpace * 15;
        _this.drawBackGround();
        _this.addComponent();
        _this.addEvents();
        return _this;
    }
    SearchForPkPanel.prototype.setData = function (data) {
        this._data = data;
        this._list.setData(data);
    };
    SearchForPkPanel.prototype.addComponent = function () {
        this._updateBtn = new Button(this._minSpace * 2, this._minSpace * 1, "刷新");
        this._updateBtn.x = this._minSpace * 5;
        this._updateBtn.y = this._minSpace * 0.5;
        this.addChild(this._updateBtn);
        this._closeBtn = new Button(this._minSpace * 2, this._minSpace * 1, "关闭");
        this._closeBtn.x = this._minSpace * 7.5;
        this._closeBtn.y = this._minSpace * 0.5;
        this.addChild(this._closeBtn);
        this._list = new pkUserList(this._width - this._minSpace * 2);
        this._list.x = this._minSpace;
        this._list.y = 2 * this._minSpace;
        this.addChild(this._list);
    };
    SearchForPkPanel.prototype.addEvents = function () {
        var _this = this;
        this._updateBtn.touchEnabled = true;
        this._updateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(new egret.Event("update"));
        }, this);
        this._closeBtn.touchEnabled = true;
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(new egret.Event("close"));
        }, this);
        this._list.touchEnabled = true;
        this._list.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var btn = e.target;
            if (btn instanceof UserItemUI) {
                _this.dispatchEvent(new egret.Event("startPk", false, false, { userData: btn.userData }));
            }
        }, this);
    };
    SearchForPkPanel.prototype.drawBackGround = function () {
        var sp = new egret.Shape();
        var g = sp.graphics;
        g.beginFill(0xffffff);
        g.drawRect(0, 0, this._width, this._height);
        this.addChild(sp);
    };
    return SearchForPkPanel;
}(egret.Sprite));
__reflect(SearchForPkPanel.prototype, "SearchForPkPanel");
//# sourceMappingURL=SearchForPkPanel.js.map