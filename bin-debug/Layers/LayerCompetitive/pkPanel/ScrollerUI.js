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
var ScrollerUI = (function (_super) {
    __extends(ScrollerUI, _super);
    function ScrollerUI(w, h, list) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this._list = list;
        _this._currentY = 0;
        _this._listV = 0;
        _this._listF = 0;
        _this.drawBackground();
        _this.addChild(_this._list);
        _this._list.mask = _this.drawMask();
        _this._scrollBar = _this.drawScrollBar();
        _this._scrollBar.visible = false;
        _this.updateListHeight();
        _this.addChild(_this._scrollBar);
        _this.addScrollListener();
        _this.update();
        return _this;
    }
    ScrollerUI.prototype.updateListHeight = function () {
        this._listHeight = this._list.height + 20;
        this._showScrollBar = this._listHeight > this._height;
    };
    ScrollerUI.prototype.drawBackground = function () {
        var sp = new egret.Shape();
        var g = sp.graphics;
        g.beginFill(0xffffff);
        g.drawRect(0, 0, this._width, this._height);
        this.addChild(sp);
    };
    ScrollerUI.prototype.drawMask = function () {
        var sp = new egret.Shape();
        var g = sp.graphics;
        g.beginFill(0x666666);
        g.drawRect(0, 0, this._width, this._height);
        this.addChild(sp);
        return sp;
    };
    ScrollerUI.prototype.drawScrollBar = function () {
        var sp = new egret.Shape();
        var g = sp.graphics;
        g.beginFill(0x002f84);
        g.drawRoundRect(this._width - 5, 0, 5, 100, 5, 5);
        this.addChild(sp);
        sp.alpha = 0.5;
        return sp;
    };
    ScrollerUI.prototype.addScrollListener = function () {
        var _this = this;
        var initY = 0;
        var lastY = 0;
        var endY = 0;
        var force = 0;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            if (!_this._showScrollBar) {
                return;
            }
            lastY = e.stageY;
            initY = e.stageY;
            _this._scrollBar.visible = true;
            _this._listV = 0;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            if (!_this._showScrollBar) {
                return;
            }
            force = e.stageY - lastY;
            _this.moveList(force);
            lastY = e.stageY;
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            if (!_this._showScrollBar) {
                return;
            }
            _this.applyForce(force);
        }, this);
    };
    ScrollerUI.prototype.moveList = function (dy) {
        this._list.y += dy;
        this.limit();
        this.setScrollBarY();
    };
    ScrollerUI.prototype.applyForce = function (force) {
        this._listF += force;
        var a = this._listF;
        this._listV += a;
        this._listF = 0;
    };
    ScrollerUI.prototype.setScrollBarY = function () {
        var ratio = -this._list.y / (this._listHeight - this._height);
        ratio = ratio < 0 ? 0 : (ratio > 1 ? 1 : ratio);
        this._scrollBar.y = (this._height - this._scrollBar.height) * ratio;
    };
    ScrollerUI.prototype.limit = function () {
        if (this._list.y > 0) {
            this._listV = Math.abs(this._listV) > 1 ? this._listV / Math.abs(this._listV) * 1 : this._listV;
            if (this._list.y > 100) {
                this._list.y = 100;
            }
            var force = Math.min(-this._list.y * 0.01, 0.001);
            this.applyForce(force);
        }
        else if (this._list.y < -(this._listHeight - this._height)) {
            this._listV = Math.abs(this._listV) > 1 ? this._listV / Math.abs(this._listV) * 1 : this._listV;
            if (this._list.y < -(this._listHeight - this._height) - 100) {
                this._list.y = -(this._listHeight - this._height) - 100;
            }
            var force = (-(this._listHeight - this._height) - this._list.y) * 0.01;
            this.applyForce(force);
        }
    };
    ScrollerUI.prototype.update = function () {
        if (this._listHeight > this._height) {
            this._list.y += this._listV;
            var fractionForce = this._listV != 0 ? -this._listV / Math.abs(this._listV) * 0.1 : 0;
            this.applyForce(fractionForce);
            this.setScrollBarY();
            this.limit();
            this._scrollBar.visible = true;
        }
        else {
            egret.Tween.get(this._list).to({ y: 0 }, 300);
            this._scrollBar.visible = false;
        }
        requestAnimationFrame(this.update.bind(this));
    };
    return ScrollerUI;
}(egret.Sprite));
__reflect(ScrollerUI.prototype, "ScrollerUI");
//# sourceMappingURL=ScrollerUI.js.map