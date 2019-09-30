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
var BaseContainer = (function (_super) {
    __extends(BaseContainer, _super);
    function BaseContainer() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.onAddToStage();
        }
        else {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    BaseContainer.prototype.onAddToStage = function () {
        this.stage.addEventListener(egret.Event.RESIZE, this.UpWindowData, this);
    };
    return BaseContainer;
}(egret.DisplayObjectContainer));
__reflect(BaseContainer.prototype, "BaseContainer");
//# sourceMappingURL=BaseContainer.js.map