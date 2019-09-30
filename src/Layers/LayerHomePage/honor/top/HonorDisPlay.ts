// 徽章显示区域 顶部
class HonorDisPlay extends BaseContainer{
    private _public:PublicClass = new PublicClass();
    private bgColor:egret.Shape;

    private disPlayAnim:DragonBonesAnimation;

	public constructor(w:number,h:number) {
		super();
        this.width=w;
        this.height=h;
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}
	/**
     * 创建图形界面
     */
	private initSprite(){

        this.bgColor = new egret.Shape();
        this.bgColor.graphics.beginFill(0xAE2824,0);
        this.bgColor.graphics.drawRect(0, 0, this.width, this.height);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);

        this.disPlayAnim = new DragonBonesAnimation('titleAnim');
		this.addChild(this.disPlayAnim);
        this.disPlayAnim.play("anim");
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】
     */
	public UpWindowData(){
        this.disPlayAnim.scaleX=this.disPlayAnim.scaleY=Main.scaleNum-.4;
        this.disPlayAnim.x=this.bgColor.x + this.bgColor.width/2;
        this.disPlayAnim.y=this.bgColor.y + this.bgColor.height/1.8;
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		
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
        }
    }
}