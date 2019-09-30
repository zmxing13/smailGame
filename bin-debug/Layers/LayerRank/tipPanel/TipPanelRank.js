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
var TipPanelRank = (function (_super) {
    __extends(TipPanelRank, _super);
    function TipPanelRank(info) {
        var _this = _super.call(this) || this;
        var tipUI = new TipUIRank(info);
        _this.addChild(tipUI);
        return _this;
    }
    return TipPanelRank;
}(eui.UILayer));
__reflect(TipPanelRank.prototype, "TipPanelRank");
//# sourceMappingURL=TipPanelRank.js.map