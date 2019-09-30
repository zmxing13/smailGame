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
var PageTabBtns = (function (_super) {
    __extends(PageTabBtns, _super);
    function PageTabBtns(h, pageNum, showNum) {
        var _this = _super.call(this) || this;
        _this._height = h;
        _this._totalPageNum = pageNum;
        _this._showPageNum = showNum;
        _this._tabIndex = 1;
        _this._space = 10;
        _this._btns = [];
        _this.createBtns();
        _this.addEvent();
        _this.updateBtns();
        _this._selectedBtn = _this._btns[0];
        _this._selectedBtn.state = ButtonState.RIGHT;
        return _this;
    }
    PageTabBtns.prototype.createBtns = function () {
        for (var i = 1; i <= this._showPageNum; i++) {
            var btn = new PageButton(this._height, this._height, String(i));
            btn.state = ButtonState.UP;
            btn.touchEnabled = true;
            btn.x = (this._height + this._space) * i;
            btn.y = 0;
            this._btns.push(btn);
            this.addChild(btn);
        }
        this._preBtn = new PageButton(this._height, this._height, "<");
        this._preBtn.touchEnabled = true;
        this.addChild(this._preBtn);
        this._nextBtn = new PageButton(this._height, this._height, ">");
        this._nextBtn.touchEnabled = true;
        this.addChild(this._nextBtn);
        this._nextBtn.x = (this._height + this._space) * (this._showPageNum + 1);
    };
    PageTabBtns.prototype.addEvent = function () {
        var _this = this;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var btn = e.target;
            if (btn.label == "<") {
                if (_this._tabIndex > 1) {
                    _this._tabIndex--;
                    _this.updateBtns();
                    _this._nextBtn.state = ButtonState.UP;
                }
                else {
                    btn.state = ButtonState.DOWN;
                }
            }
            else if (btn.label == ">") {
                var hasLastPage = _this._tabIndex < Math.ceil(_this._totalPageNum / _this._showPageNum);
                if (hasLastPage) {
                    _this._tabIndex++;
                    _this.updateBtns();
                    _this._preBtn.state = ButtonState.UP;
                }
                else {
                    btn.state = ButtonState.DOWN;
                }
            }
            else {
                if (btn.state == ButtonState.UP) {
                    _this._selectedBtn.state = ButtonState.UP;
                    _this._selectedBtn = btn;
                    _this._selectedBtn.state = ButtonState.RIGHT;
                    _this.dispatchEvent(new egret.Event("switchPage", false, false, { index: btn.label }));
                }
            }
        }, this);
    };
    PageTabBtns.prototype.updateBtns = function () {
        var first = (this._tabIndex - 1) * this._showPageNum + 1;
        for (var i = 0; i < this._btns.length; i++) {
            var btn = this._btns[i];
            btn.label = String(i + first);
            if (i + first <= this._totalPageNum) {
                btn.state = ButtonState.UP;
            }
            else {
                btn.state = ButtonState.DOWN;
            }
        }
        if (this._tabIndex == 1) {
            this._preBtn.state = ButtonState.DOWN;
        }
        else {
            this._preBtn.state = ButtonState.UP;
        }
        if (this._tabIndex >= Math.ceil(this._totalPageNum / this._showPageNum)) {
            this._nextBtn.state = ButtonState.DOWN;
        }
        else {
            this._nextBtn.state = ButtonState.UP;
        }
    };
    return PageTabBtns;
}(egret.Sprite));
__reflect(PageTabBtns.prototype, "PageTabBtns");
//# sourceMappingURL=PageTabBtns.js.map