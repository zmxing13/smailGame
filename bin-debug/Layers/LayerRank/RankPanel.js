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
var RankPanel = (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        var _this = _super.call(this) || this;
        _this.rank = new RankUI();
        _this.addChild(_this.rank);
        return _this;
    }
    RankPanel.prototype.updataGrade = function (index) {
        this.rank.updataGrade(index);
    };
    return RankPanel;
}(eui.UILayer));
__reflect(RankPanel.prototype, "RankPanel");
//# sourceMappingURL=RankPanel.js.map