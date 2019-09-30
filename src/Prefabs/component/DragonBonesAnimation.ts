/**
* 骨骼动画对象
*/
class DragonBonesAnimation extends egret.DisplayObjectContainer{
    /**
    * 骨骼动画系统的核心。他包含需要加到场景的显示对象，所有的骨骼逻辑和动画系统
    */
    public armature: dragonBones.Armature;
    private factory: dragonBones.EgretFactory;
    private newObject;

    private _playing: boolean;
    private _isComplete: boolean;
    private _lastAnimationState: dragonBones.AnimationState;
    public constructor(name: string,armatureStr:string="Armature"){
        super();
        this.factory = dragonBones.EgretFactory.factory;
        this.addArmatureToFactory(this.factory,name);
        this.armature = this.factory.buildArmature(armatureStr);
        this.newObject = this.armature.display;
        this.addChild(this.newObject);
        dragonBones.WorldClock.clock.add(this.armature);
    }
    /**
    * 替换新图
    * @param oldName {string} 骨头名
    * @param textureName {string} 新图
    */
    public setNewTexture(oldName: string,textureName: string): Array<any> {
        var W: number = 0;
        var H: number = 0;
        var _bone: dragonBones.Bone = this.armature.getBone(oldName);
        W=_bone.slot.display.texture.textureWidth;
        H=_bone.slot.display.texture.textureHeight;
        
        var _image: egret.Bitmap = new egret.Bitmap();
        _image.anchorOffsetX = _image.width/2;
        _image.anchorOffsetY = _image.height / 2;
        _image.texture = RES.getRes(textureName);
        //用image替换bone.display完成换装（注意bone.display的回收）
        _bone.slot.display = _image;
        return [W,H,_image];
    }
    /**
    * 换肤
    * @param boneSlotName {string} 骨头名
    * @param index {number} 图
    */
    public upSlotDisplay(boneSlotName: string,newSlotName: string):void{
        var image = this.factory.getTextureDisplay(newSlotName);//创建新的图片用于换装
        var slot: dragonBones.Slot = this.armature.getSlot(boneSlotName);//找到包含要换装的图片的插槽
        slot.setDisplay(image);//替换插槽的显示对象
    }
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
    public fadeIn(animationName: string, fadeInTime: number=-1, playTimes: number=-1, layer: number=0, group: string=null, fadeOutMode: number=0): dragonBones.AnimationState {
        return this.armature.animation.fadeIn(animationName, fadeInTime, playTimes, layer, group, fadeOutMode);
    }
    /**
     * - 播放指定动画。
     * @param animationName - 动画数据名称。 （如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放之前播放的动画）
     * @param playTimes - 循环播放次数。 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次] （默认: -1）
     * @returns 播放的动画状态。
     * 
     */
    public play(animationName: string=null, playTimes: number=-1){
        return this.armature.animation.play(animationName,playTimes)
    }
    /**
     * - 暂停指定动画状态的播放。
     * @param animationName - 动画状态名称。 （如果未设置，则暂停所有动画）
     */
    public stop(animationName: string=null): void{
        this.armature.animation.stop(animationName);
    }
    /**
    * 播放指定名称的动画并停止于某个时间点
    * @param animationName {string} 指定播放的动画名称.
    * @param time {number} 动画停止的绝对时间
    * @param normalizedTime {number} 动画停止的相对动画总时间的系数，这个参数和time参数是互斥的（例如 0.2：动画停止总时间的20%位置） 默认值：-1 意味着使用绝对时间。
    */
    public gotoAndStop(animationName: string, time: number=0, normalizedTime: number=-1):dragonBones.AnimationState{
        this.armature.animation.gotoAndStopByTime(animationName,time);
        return this.armature.animation.lastAnimationState;
    }
    /**
    * 是否正在播放
    */
    public get playing(): boolean {
        this._playing = this.armature.animation.isPlaying;
        return this._playing;
    }
    public get lastAnimationState():dragonBones.AnimationState{
        return this.armature.animation.lastAnimationState;
    }
    /**
    * 最近播放的动画是否播放完成.
    */
    public get isComplete():boolean{ 
        this._isComplete = this.armature.animation.isCompleted;
        return this._isComplete;
    }
    /**
     * 时间缩放倍数
     * @member {number} dragonBones.Animation#timeScale
     */
    public setTimeScale(member: number): void {
        this.armature.animation.timeScale = member;
    }
    private addArmatureToFactory(factory: dragonBones.EgretFactory,directory: string) {
        var skeletonData = RES.getRes(directory + "_ske_dbbin");
        var textureData = RES.getRes(directory+"_tex_json");
        var texture = RES.getRes(directory+"_tex_png");

        factory.parseDragonBonesData(skeletonData);  
        factory.parseTextureAtlasData(textureData, texture);
    }
}