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
var finshText = (function (_super) {
    __extends(finshText, _super);
    function finshText() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        return _this;
    }
    finshText.prototype.setAdditionalNumber = function (_startText, _contentText, endText) {
        if (_startText === void 0) { _startText = ''; }
        if (_contentText === void 0) { _contentText = ''; }
        if (endText === void 0) { endText = ''; }
        this.contentText = this._public.createTextByName(_startText + _contentText + endText);
        this.contentText.size = Main.W / 15;
        this.addChild(this.contentText);
    };
    return finshText;
}(egret.DisplayObjectContainer));
__reflect(finshText.prototype, "finshText");
//# sourceMappingURL=finshText.js.map