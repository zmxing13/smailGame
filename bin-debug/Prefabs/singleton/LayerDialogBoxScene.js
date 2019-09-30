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
var LayerDialogBoxScene = (function (_super) {
    __extends(LayerDialogBoxScene, _super);
    /**
     * 对话框对象(单例)
     */
    function LayerDialogBoxScene() {
        return _super.call(this) || this;
    }
    /**
     * 对话框对象(单例)
     */
    LayerDialogBoxScene.getInstance = function () {
        if (LayerDialogBoxScene._MessageCenter == null) {
            LayerDialogBoxScene._MessageCenter = new LayerDialogBoxScene();
        }
        return LayerDialogBoxScene._MessageCenter;
    };
    /**
     * 弹出对话框
     * @param describeStr<string> 	对话框中的文字内容
     * @param statusStr<string> 	对话框的类型，请使用 DialogBox.TypeModel (正确，错误，警告，疑问)
     * @param targetFunc<Function>	是否存在回调通知(true,false)，此参数设置为非空时，出现 “确定、取消” 两个按钮
     * @param cancelBtnLable<string>取消按钮的 名字 *【没有回调通知，不用设置】
     * @param enterBtnLable<string>	确定按钮的 名字 *【没有回调通知，不用设置】
     */
    LayerDialogBoxScene.prototype.newDialogBoxEvent = function (describeStr, statusStr, targetFunc, targetThis, cancelBtnLable, enterBtnLable) {
        if (statusStr === void 0) { statusStr = ""; }
        if (targetFunc === void 0) { targetFunc = null; }
        if (targetThis === void 0) { targetThis = null; }
        if (cancelBtnLable === void 0) { cancelBtnLable = "取  消"; }
        if (enterBtnLable === void 0) { enterBtnLable = "确  定"; }
        var dialogBox = new DialogBox(describeStr, statusStr, targetFunc, targetThis, cancelBtnLable, enterBtnLable);
        this.addChild(dialogBox);
    };
    return LayerDialogBoxScene;
}(egret.DisplayObjectContainer));
__reflect(LayerDialogBoxScene.prototype, "LayerDialogBoxScene");
//# sourceMappingURL=LayerDialogBoxScene.js.map