/**
* 序列帧动画对象
*/
class MovieClipAnimation extends egret.DisplayObjectContainer {
    public type: string = "";
    public info:any;
    private _currentFrame: number;
    private _totalFrames: number;
    private _frameRate: number;
    private _isPlaying: boolean;
    private _width: number;
    private _height
    private data: any;
    private txtr: any;
    private mcFactory: egret.MovieClipDataFactory;
    public mc: egret.MovieClip;
    public constructor(name: string) {
        super();
        var data = RES.getRes(name+"_json");
        var txtr = RES.getRes(name +"_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(name));
        this.addChild(this.mc);
    }
    /**
     * 将播放头移到指定帧并播放
     * @method egret.MovieClip#gotoAndPlay
     * @param frame {any} 指定帧的帧号或帧标签
     * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数
     */
    public gotoAndPlay(frame:any,playTimes:number=0): void {
        this.mc.gotoAndPlay(frame, playTimes);
    }
    /**
     * 将播放头移到指定帧并停止
     * @param frame {any} 指定帧的帧号或帧标签
     */
    public gotoAndStop(frame: any): void {
        this.mc.gotoAndStop(frame);
    }
    /**
     * 继续播放当前动画
     * @param playNum {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
     */
    public play(playNum:number=1) {
        this.mc.play(playNum);
    }
    /**
     * 暂停播放动画
     */
    public stop() {
        this.mc.stop();
    }
    set frameRate(speed:number) {
        this._frameRate = (speed >> 0);
        this.mc.frameRate = this._frameRate;
    }
    get frameRate(): number {
        return this.mc.frameRate;
    }
    /**
    *当前播放的帧的序号
    */
    public get currentFrame(): number {
        this._currentFrame = this.mc.currentFrame;
        this._currentFrame = this._currentFrame >> 0;
        return this._currentFrame;
    }
    /**
    *帧的总数
    */
    public get totalFrames(): number {
        this._totalFrames = this.mc.totalFrames;
        this._totalFrames = this.totalFrames;
        return this._totalFrames;
    }
    get isPlaying(): boolean {
        this._isPlaying=this.mc.isPlaying;
        return this._isPlaying;
    }
    get width(): number {
        this._width = this.mc.width;
        return this._width;
    }
    set width(num:number) {
        this._width = num;
        this.mc.width = this._width;
    }
    get height(): number {
        this._height = this.mc.height;
        return this._height;
    }
    set height(num: number) {
        this._height = num;
        this.mc.height = this._height;
    }
}