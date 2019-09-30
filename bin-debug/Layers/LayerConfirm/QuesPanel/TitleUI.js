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
var TitleUI = (function (_super) {
    __extends(TitleUI, _super);
    function TitleUI(w, h) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this.drawBackground();
        _this.createContent();
        return _this;
    }
    TitleUI.prototype.setTitleDatas = function (datas) {
        this._currentIndex = 1;
        this._titleDatas = datas;
        if (this._titleDatas.length > 0) {
            this._currentTitleData = this._titleDatas[this._currentIndex - 1];
        }
        this.enterNextTitle();
    };
    TitleUI.prototype.switchToTitle = function (titleId) {
        this._currentIndex = titleId;
        this._currentTitleData = this._titleDatas[this._currentIndex - 1];
        this.quitCurrentTitle();
        egret.setTimeout(this.enterNextTitle, this, 600);
    };
    TitleUI.prototype.quitCurrentTitle = function () {
        egret.Tween.get(this).to({ x: -Main.W }, 500);
    };
    TitleUI.prototype.enterNextTitle = function () {
        this.updateContent();
        this.x = 0;
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 500);
    };
    TitleUI.prototype.drawBackground = function () {
        var bg = new egret.Shape();
        var g = bg.graphics;
        g.beginFill(0xcccccc);
        g.drawRoundRect(0, 0, this._width, this._height, 30, 30);
        this.addChild(bg);
    };
    /*创建/更新选项内容*/
    TitleUI.prototype.createContent = function () {
        this._contContainer = new egret.Sprite();
        this.addChild(this._contContainer);
        this._contContainer.x = 20;
        this._contContainer.y = 20;
    };
    TitleUI.prototype.updateContent = function () {
        var content = this._currentTitleData.title;
        var contentWidth = this._width - 40;
        var contentHeight = this._height - 40;
        this._contContainer.width = contentWidth;
        this._contContainer.height = contentHeight;
        var g = this._contContainer.graphics;
        g.clear();
        g.beginFill(0xffffff);
        g.drawRect(0, 0, contentWidth, contentHeight);
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
            txt.textColor = 0x000000;
            txt.fontFamily = "微软雅黑";
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            txt.lineSpacing = 20;
            txt.size = 50;
            txt.text = content;
        }
    };
    return TitleUI;
}(egret.Sprite));
__reflect(TitleUI.prototype, "TitleUI");
//# sourceMappingURL=TitleUI.js.map