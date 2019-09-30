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
var OptionBtn = (function (_super) {
    __extends(OptionBtn, _super);
    function OptionBtn(w, h, data) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this._data = data;
        _this.init();
        return _this;
    }
    Object.defineProperty(OptionBtn.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionBtn.prototype, "data", {
        set: function (value) {
            this._data = value;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionBtn.prototype, "state", {
        set: function (value) {
            this._state = value;
            this.updateBackground();
        },
        enumerable: true,
        configurable: true
    });
    OptionBtn.prototype.setWidth = function (value) {
        this._width = value;
        this.width = value;
        this.update();
    };
    OptionBtn.prototype.setHeight = function (value) {
        this._height = value;
        this.height = value;
        this.update();
    };
    OptionBtn.prototype.init = function () {
        this.createFrame();
    };
    OptionBtn.prototype.createFrame = function () {
        this.createBackground();
        this.createOption();
        this.createContent();
    };
    OptionBtn.prototype.update = function () {
        this.updateBackground();
        this.updateOption();
        this.updateContent();
    };
    /*创建/更新背景*/
    OptionBtn.prototype.createBackground = function () {
        var color = 0x0096ff;
        switch (this._state) {
            case ButtonState.DOWN:
                color = 0x888888;
                break;
            case ButtonState.UP:
                color = 0x0096ff;
                break;
            case ButtonState.RIGHT:
                color = 0x17c872;
                break;
            case ButtonState.WRONG:
                color = 0xa20909;
                break;
        }
        var g = this.graphics;
        g.clear();
        g.beginFill(color);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
    };
    OptionBtn.prototype.updateBackground = function () {
        this.createBackground();
    };
    /*创建/更新选项ABC*/
    OptionBtn.prototype.createOption = function () {
        this._option = new egret.TextField();
        this.addChild(this._option);
        this._option.width = 80; //选项卡宽度固定80
        this._option.height = this._height;
        this._label = this._data.label;
        this._option.text = this._data.label;
        this._option.textColor = 0xffffff;
        this._option.textAlign = egret.HorizontalAlign.CENTER;
        this._option.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._option.size = 40;
        this._option.anchorOffsetX = this._option.width / 2;
        this._option.anchorOffsetY = this._option.height / 2;
        this._option.x = this._option.width / 2;
        this._option.y = this._height / 2;
    };
    OptionBtn.prototype.updateOption = function () {
        this._option.text = this._data.label;
        this._option.y = this._height / 2;
    };
    /*创建/更新选项内容*/
    OptionBtn.prototype.createContent = function () {
        this._contContainer = new egret.Sprite();
        this.addChild(this._contContainer);
        this._contContainer.x = 80;
        this._contContainer.y = 10;
        this.updateContent();
    };
    OptionBtn.prototype.updateContent = function () {
        var content = this._data.content;
        var contentWidth = this._width - 100;
        var contentHeight = this._height - 20;
        this._contContainer.width = contentWidth;
        this._contContainer.height = contentHeight;
        /*let g=this._contContainer.graphics;
        g.clear();
        g.beginFill(0x222222);
        g.drawRect(0,0,contentWidth,contentHeight);*/
        this._contContainer.removeChildren();
        if (content instanceof egret.Texture) {
            var bitmap = new egret.Bitmap();
            bitmap.texture = content;
            bitmap.width = contentWidth;
            bitmap.height = contentHeight;
            this._contContainer.addChild(bitmap);
        }
        else {
            var txt = new egret.TextField();
            txt.width = contentWidth;
            txt.height = contentHeight;
            this._contContainer.addChild(txt);
            txt.wordWrap = true;
            txt.textColor = 0xffffff;
            txt.fontFamily = "微软雅黑";
            txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            txt.size = 40;
            txt.text = content;
        }
    };
    return OptionBtn;
}(egret.Sprite));
__reflect(OptionBtn.prototype, "OptionBtn");
//# sourceMappingURL=OptionBtn.js.map