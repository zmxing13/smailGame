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
// 实例化图片模板
var ImgTemplate = (function (_super) {
    __extends(ImgTemplate, _super);
    function ImgTemplate(_texture) {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.index = 0;
        _this.id = 0;
        _this.oldX = 0;
        _this.oldY = 0;
        _this.statusNum = 0; //状态值
        _this.statusBoo = false; //状态布尔-是否是可触摸状态
        _this._colorFlilter = new egret.ColorMatrixFilter([0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0]);
        _this.createBitmapByName(_texture);
        return _this;
    }
    /**
     * 根据name关键字创建一个Bitmap对象。
     * name属性请参考resources/resource.json配置文件的内容
    */
    ImgTemplate.prototype.createBitmapByName = function (_texture) {
        this.result = new egret.Bitmap();
        var texture = RES.getRes(_texture + '_png');
        this.result.texture = texture;
        this.addChild(this.result);
    };
    //设置图片为灰色
    ImgTemplate.prototype.setBitmapFlilter = function () {
        this.result.filters = [this._colorFlilter];
    };
    return ImgTemplate;
}(egret.DisplayObjectContainer));
__reflect(ImgTemplate.prototype, "ImgTemplate");
//# sourceMappingURL=ImgTemplate.js.map