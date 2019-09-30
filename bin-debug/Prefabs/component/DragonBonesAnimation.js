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
/**
* 骨骼动画对象
*/
var DragonBonesAnimation = (function (_super) {
    __extends(DragonBonesAnimation, _super);
    function DragonBonesAnimation(name, armatureStr) {
        if (armatureStr === void 0) { armatureStr = "Armature"; }
        var _this = _super.call(this) || this;
        _this.factory = dragonBones.EgretFactory.factory;
        _this.addArmatureToFactory(_this.factory, name);
        _this.armature = _this.factory.buildArmature(armatureStr);
        _this.newObject = _this.armature.display;
        _this.addChild(_this.newObject);
        dragonBones.WorldClock.clock.add(_this.armature);
        return _this;
    }
    /**
    * 替换新图
    * @param oldName {string} 骨头名
    * @param textureName {string} 新图
    */
    DragonBonesAnimation.prototype.setNewTexture = function (oldName, textureName) {
        var W = 0;
        var H = 0;
        var _bone = this.armature.getBone(oldName);
        W = _bone.slot.display.texture.textureWidth;
        H = _bone.slot.display.texture.textureHeight;
        var _image = new egret.Bitmap();
        _image.anchorOffsetX = _image.width / 2;
        _image.anchorOffsetY = _image.height / 2;
        _image.texture = RES.getRes(textureName);
        //用image替换bone.display完成换装（注意bone.display的回收）
        _bone.slot.display = _image;
        return [W, H, _image];
    };
    /**
    * 换肤
    * @param boneSlotName {string} 骨头名
    * @param index {number} 图
    */
    DragonBonesAnimation.prototype.upSlotDisplay = function (boneSlotName, newSlotName) {
        var image = this.factory.getTextureDisplay(newSlotName); //创建新的图片用于换装
        var slot = this.armature.getSlot(boneSlotName); //找到包含要换装的图片的插槽
        slot.setDisplay(image); //替换插槽的显示对象
    };
    /**
        - 淡入播放指定的动画。
        * @param animationName - 动画数据名称。
        * @param fadeInTime - 淡入时间。 [-1: 使用动画数据默认值, [0~N]: 淡入时间 (以秒为单位)] （默认: -1）
        * @param playTimes - 播放次数。 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次] （默认: -1）
        * @param layer - 混合图层，图层高的动画状态会优先获取混合权重，当混合权重分配总和超过 1.0 时，剩余的动画状态将不能再获得权重分配。 （默认: 0）
        * @param group - 混合组名称，该属性通常用来指定多个动画状态混合时的相互替换关系。 （默认: null）
        * @param fadeOutMode - 淡出模式，该属性通常用来指定多个动画状态混合时的相互替换模式。 （默认: AnimationFadeOutMode.SameLayerAndGroup）
        * @returns 播放的动画状态。
   */
    DragonBonesAnimation.prototype.fadeIn = function (animationName, fadeInTime, playTimes, layer, group, fadeOutMode) {
        if (fadeInTime === void 0) { fadeInTime = -1; }
        if (playTimes === void 0) { playTimes = -1; }
        if (layer === void 0) { layer = 0; }
        if (group === void 0) { group = null; }
        if (fadeOutMode === void 0) { fadeOutMode = 0; }
        return this.armature.animation.fadeIn(animationName, fadeInTime, playTimes, layer, group, fadeOutMode);
    };
    /**
     * - 播放指定动画。
     * @param animationName - 动画数据名称。 （如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放之前播放的动画）
     * @param playTimes - 循环播放次数。 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次] （默认: -1）
     * @returns 播放的动画状态。
     *
     */
    DragonBonesAnimation.prototype.play = function (animationName, playTimes) {
        if (animationName === void 0) { animationName = null; }
        if (playTimes === void 0) { playTimes = -1; }
        return this.armature.animation.play(animationName, playTimes);
    };
    /**
     * - 暂停指定动画状态的播放。
     * @param animationName - 动画状态名称。 （如果未设置，则暂停所有动画）
     */
    DragonBonesAnimation.prototype.stop = function (animationName) {
        if (animationName === void 0) { animationName = null; }
        this.armature.animation.stop(animationName);
    };
    /**
    * 播放指定名称的动画并停止于某个时间点
    * @param animationName {string} 指定播放的动画名称.
    * @param time {number} 动画停止的绝对时间
    * @param normalizedTime {number} 动画停止的相对动画总时间的系数，这个参数和time参数是互斥的（例如 0.2：动画停止总时间的20%位置） 默认值：-1 意味着使用绝对时间。
    */
    DragonBonesAnimation.prototype.gotoAndStop = function (animationName, time, normalizedTime) {
        if (time === void 0) { time = 0; }
        if (normalizedTime === void 0) { normalizedTime = -1; }
        this.armature.animation.gotoAndStopByTime(animationName, time);
        return this.armature.animation.lastAnimationState;
    };
    Object.defineProperty(DragonBonesAnimation.prototype, "playing", {
        /**
        * 是否正在播放
        */
        get: function () {
            this._playing = this.armature.animation.isPlaying;
            return this._playing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragonBonesAnimation.prototype, "lastAnimationState", {
        get: function () {
            return this.armature.animation.lastAnimationState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragonBonesAnimation.prototype, "isComplete", {
        /**
        * 最近播放的动画是否播放完成.
        */
        get: function () {
            this._isComplete = this.armature.animation.isCompleted;
            return this._isComplete;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 时间缩放倍数
     * @member {number} dragonBones.Animation#timeScale
     */
    DragonBonesAnimation.prototype.setTimeScale = function (member) {
        this.armature.animation.timeScale = member;
    };
    DragonBonesAnimation.prototype.addArmatureToFactory = function (factory, directory) {
        var skeletonData = RES.getRes(directory + "_ske_dbbin");
        var textureData = RES.getRes(directory + "_tex_json");
        var texture = RES.getRes(directory + "_tex_png");
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
    };
    return DragonBonesAnimation;
}(egret.DisplayObjectContainer));
__reflect(DragonBonesAnimation.prototype, "DragonBonesAnimation");
//# sourceMappingURL=DragonBonesAnimation.js.map