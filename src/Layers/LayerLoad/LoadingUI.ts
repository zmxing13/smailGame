//  loading
class LoadingUI extends egret.Sprite{

    /**
     * @param bgColor 背景颜色
     */
    public constructor(bgColor=0x161F30) {
        super();
        this._bgColor=bgColor;

        this.initBg();
        this.initSprite();
        this.initData();
    }
    
    private _bgColor:number;
    private _bgImg:egret.Sprite;
    private _barImg: egret.Bitmap;
    private _barBg: egret.Bitmap;
    private _barShade: egret.Bitmap;
    private _loadingImg: egret.Bitmap;

    private initBg():void{
        this._bgImg = new egret.Sprite();
        this._bgImg.graphics.beginFill(this._bgColor);
        this._bgImg.graphics.drawRect(0,0,Main.W,Main.H)
        this.addChild(this._bgImg);
    }
    private initSprite():void{
        this._barBg = new egret.Bitmap();
        this._barBg.texture = RES.getRes("Img_bar_bg");
        this.addChild(this._barBg);
        
        this._barImg = new egret.Bitmap();
        this._barImg.texture = RES.getRes("Img_bar");
        this.addChild(this._barImg);
        
        this._barShade = new egret.Bitmap();
        this._barShade.texture = RES.getRes("bar_texture_Bmp");
        this.addChild(this._barShade);
        
        this._loadingImg = new egret.Bitmap();
        this._loadingImg.texture = RES.getRes("loadTxtImg");
        this.addChild(this._loadingImg);
    }
    private initData():void{
        this._barBg.scale9Grid = new egret.Rectangle(24,19,70,2);
        this._barBg.width = this._bgImg.width / 10 * 8;
        this._barBg.x = (this._bgImg.width - this._barBg.width) / 2;
        this._barBg.y = (this._bgImg.height - this._barBg.height) / 2;
        
        this._barImg.scale9Grid = new egret.Rectangle(17,11,68,2);
        this._barImg.width = 50;
        this._barImg.x = this._barBg.x + 10;
        this._barImg.y = this._barBg.y + 7;
        
        this._barShade.fillMode = egret.BitmapFillMode.REPEAT;
        this._barShade.width = 10;
        this._barShade.height = 20;
        this._barShade.x = this._barBg.x + 20;
        this._barShade.y = this._barBg.y + 10;
        
        var tempw: number = this._loadingImg.width;
        this._loadingImg.anchorOffsetX = this._loadingImg.width/2;
        this._loadingImg.scaleX = this._loadingImg.scaleY = Main.scaleNum;
        this._loadingImg.x = this._barBg.x + this._barBg.width / 2;
        this._loadingImg.y = this._barBg.y + 50;
        
        this._barShade.width = 0; 
    }

    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    public hiddenOut(exitTime = 0.1, waitTime = 0.1, stateAlpha = 1){
        egret.Tween.get(this,{
            onChangeObj: this
        })
        .wait(waitTime*1000)
        .to({ alpha:stateAlpha },exitTime*1000)
    }
    
    /**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    public DestroyOut(exitTime = 0.1, waitTime = 0.1){
        egret.Tween.get(this,{
            onChangeObj: this
        })
        .wait(waitTime*1000)
        .to({ alpha:0 },exitTime*1000)
        .call(this.Destroy,this,[]);
    }
    /**
     * 删除自己
     */
    private Destroy(){
        if(this.parent){
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
            // console.log('remove loading')
        }
    }
    public onProgress(current: number, total: number): void {
        var newW: number = Math.floor(current * (this._barBg.width-18) / total);
        this._barImg.width = newW;
        this._barShade.width = newW-20;
    }
}
