//load加载动画
class LoadAnimation extends BaseContainer{
    private _public:PublicClass = new PublicClass();
    private _animtion:egret.Bitmap;
    private openClass:LayerOpenClass;
	public constructor() {
		super();
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}
	/**
     * 创建图形界面
    */
	private initSprite(){
        this._animtion = this._public.createBitmapByName('img_loadAnim');
        this.addChild(this._animtion);
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        this._animtion.width = Main.W;
        this._animtion.height = Main.H;
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
        
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
        }
    }
}