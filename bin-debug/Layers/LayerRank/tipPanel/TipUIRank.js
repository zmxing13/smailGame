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
var TipUIRank = (function (_super) {
    __extends(TipUIRank, _super);
    function TipUIRank(info) {
        var _this = _super.call(this) || this;
        _this._info = info;
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/custom_skins/tipUIRankSkin.exml";
        return _this;
    }
    TipUIRank.prototype.uiCompHandler = function () {
        var _this = this;
        this.label.text = "你确定要与" + this._info.nickName + "PK吗？,若PK成功，你将赢得50积分，PK失败,你将输掉50积分";
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("okBtn");
            console.log(_this._info);
            _this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, _this._info)); //排行榜发起pk
        }, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("cancel");
            _this.parent.parent.removeChild(_this.parent);
            // this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,this._info));//排行榜发起pk
        }, this);
    };
    return TipUIRank;
}(eui.Component));
__reflect(TipUIRank.prototype, "TipUIRank");
//# sourceMappingURL=TipUIRank.js.map