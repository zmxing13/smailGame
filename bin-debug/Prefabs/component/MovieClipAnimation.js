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
* 序列帧动画对象
*/
var MovieClipAnimation = (function (_super) {
    __extends(MovieClipAnimation, _super);
    function MovieClipAnimation(name) {
        var _this = _super.call(this) || this;
        _this.type = "";
        var data = RES.getRes(name + "_json");
        var txtr = RES.getRes(name + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        _this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(name));
        _this.addChild(_this.mc);
        return _this;
    }
    /**
     * 将播放头移到指定帧并播放
     * @method egret.MovieClip#gotoAndPlay
     * @param frame {any} 指定帧的帧号或帧标签
     * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数
     */
    MovieClipAnimation.prototype.gotoAndPlay = function (frame, playTimes) {
        if (playTimes === void 0) { playTimes = 0; }
        this.mc.gotoAndPlay(frame, playTimes);
    };
    /**
     * 将播放头移到指定帧并停止
     * @param frame {any} 指定帧的帧号或帧标签
     */
    MovieClipAnimation.prototype.gotoAndStop = function (frame) {
        this.mc.gotoAndStop(frame);
    };
    /**
     * 继续播放当前动画
     * @param playNum {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
     */
    MovieClipAnimation.prototype.play = function (playNum) {
        if (playNum === void 0) { playNum = 1; }
        this.mc.play(playNum);
    };
    /**
     * 暂停播放动画
     */
    MovieClipAnimation.prototype.stop = function () {
        this.mc.stop();
    };
    Object.defineProperty(MovieClipAnimation.prototype, "frameRate", {
        get: function () {
            return this.mc.frameRate;
        },
        set: function (speed) {
            this._frameRate = (speed >> 0);
            this.mc.frameRate = this._frameRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClipAnimation.prototype, "currentFrame", {
        /**
        *当前播放的帧的序号
        */
        get: function () {
            this._currentFrame = this.mc.currentFrame;
            this._currentFrame = this._currentFrame >> 0;
            return this._currentFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClipAnimation.prototype, "totalFrames", {
        /**
        *帧的总数
        */
        get: function () {
            this._totalFrames = this.mc.totalFrames;
            this._totalFrames = this.totalFrames;
            return this._totalFrames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClipAnimation.prototype, "isPlaying", {
        get: function () {
            this._isPlaying = this.mc.isPlaying;
            return this._isPlaying;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClipAnimation.prototype, "width", {
        get: function () {
            this._width = this.mc.width;
            return this._width;
        },
        set: function (num) {
            this._width = num;
            this.mc.width = this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClipAnimation.prototype, "height", {
        get: function () {
            this._height = this.mc.height;
            return this._height;
        },
        set: function (num) {
            this._height = num;
            this.mc.height = this._height;
        },
        enumerable: true,
        configurable: true
    });
    return MovieClipAnimation;
}(egret.DisplayObjectContainer));
__reflect(MovieClipAnimation.prototype, "MovieClipAnimation");
//# sourceMappingURL=MovieClipAnimation.js.map