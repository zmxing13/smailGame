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
var UserItemUI = (function (_super) {
    __extends(UserItemUI, _super);
    function UserItemUI(w) {
        var _this = _super.call(this) || this;
        _this._data = {
            userid: 1245,
            img: "http://10.12.5.32/static/media/ImgTitles/title_img_6_1567756360.png",
            nickName: "小王",
            score: 125,
            selectable: false,
        };
        _this._width = w;
        _this._minSpace = w / 10;
        _this._height = _this._minSpace * 15;
        _this._img = new egret.Bitmap();
        _this.drawBackGround();
        _this.drawContent();
        return _this;
    }
    UserItemUI.prototype.setData = function (data) {
        var _this = this;
        this._data = data;
        this._name.text = this._data.nickName;
        this._score.text = this._data.score;
        RES.getResByUrl(this._data.img, function (data) {
            //console.log(data);
            _this._img.texture = data;
        }, this);
        var color = this._data.selectable ? 0x0096ff : 0x888888;
        var g = this._bg.graphics;
        g.clear();
        g.beginFill(color);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
    };
    Object.defineProperty(UserItemUI.prototype, "userData", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    UserItemUI.prototype.drawBackGround = function () {
        this._bg = new egret.Shape();
        var g = this._bg.graphics;
        g.clear();
        g.beginFill(0x0096ff);
        g.drawRoundRect(0, 0, this._width, this._height, 20, 20);
        this.addChild(this._bg);
    };
    UserItemUI.prototype.drawContent = function () {
        this.drawImg();
        this.drawNickName();
        this.drawScore();
    };
    UserItemUI.prototype.drawImg = function () {
        this.addChild(this._img);
        this._img.width = 8 * this._minSpace;
        this._img.height = 8 * this._minSpace;
        this._img.y = this._minSpace;
        this._img.x = this._minSpace;
    };
    UserItemUI.prototype.drawNickName = function () {
        this._name = new egret.TextField();
        this.addChild(this._name);
        this._name.width = this._minSpace * 8;
        this._name.height = this._minSpace * 2;
        this._name.textColor = 0xffffff;
        this._name.fontFamily = "微软雅黑";
        this._name.textAlign = egret.HorizontalAlign.CENTER;
        this._name.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._name.size = this._name.height;
        this._name.anchorOffsetX = this._name.width / 2;
        this._name.anchorOffsetY = this._name.height / 2;
        this._name.x = this._minSpace * 5;
        this._name.y = this._minSpace * 10;
    };
    UserItemUI.prototype.drawScore = function () {
        this._score = new egret.TextField();
        this.addChild(this._score);
        this._score.width = this._minSpace * 8;
        this._score.height = this._minSpace * 2;
        this._score.textColor = 0xffffff;
        this._score.fontFamily = "微软雅黑";
        this._score.textAlign = egret.HorizontalAlign.CENTER;
        this._score.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._score.size = this._score.height / 1.2;
        this._score.anchorOffsetX = this._score.width / 2;
        this._score.anchorOffsetY = this._score.height / 2;
        this._score.x = this._minSpace * 5;
        this._score.y = this._minSpace * 13;
    };
    return UserItemUI;
}(egret.Sprite));
__reflect(UserItemUI.prototype, "UserItemUI");
//# sourceMappingURL=UserItemUI.js.map