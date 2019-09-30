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
var TabBar = (function (_super) {
    __extends(TabBar, _super);
    function TabBar(w, h) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this._receiveBtn = new AlertButton(w / 2 - 5, h, "收到的PK");
        _this._receiveBtn.x = 0;
        _this._receiveBtn.y = 0;
        _this._sendBtn = new AlertButton(w / 2 - 5, h, "发起的PK");
        _this._sendBtn.x = w / 2 + 5;
        _this._sendBtn.y = 0;
        _this.addChild(_this._receiveBtn);
        _this.addChild(_this._sendBtn);
        _this._sendBtn.state = ButtonState.UP;
        _this._receiveBtn.state = ButtonState.DOWN;
        _this.addEvent();
        return _this;
    }
    TabBar.prototype.setReceiveNum = function (num) {
        this._receiveBtn.alertNum = num;
    };
    TabBar.prototype.setSendNum = function (num) {
        this._sendBtn.alertNum = num;
    };
    TabBar.prototype.addEvent = function () {
        var _this = this;
        this._receiveBtn.touchEnabled = true;
        this._sendBtn.touchEnabled = true;
        this._receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (_this._currentIndex != 1) {
                _this._sendBtn.state = ButtonState.UP;
                _this._receiveBtn.state = ButtonState.DOWN;
                _this._currentIndex = 1;
                _this.dispatchEvent(new egret.Event("change", false, false, { index: _this._currentIndex }));
            }
        }, this);
        this._sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (_this._currentIndex != 2) {
                _this._sendBtn.state = ButtonState.DOWN;
                _this._receiveBtn.state = ButtonState.UP;
                _this._currentIndex = 2;
                _this.dispatchEvent(new egret.Event("change", false, false, { index: _this._currentIndex }));
            }
        }, this);
    };
    return TabBar;
}(egret.Sprite));
__reflect(TabBar.prototype, "TabBar");
//# sourceMappingURL=TabBar.js.map