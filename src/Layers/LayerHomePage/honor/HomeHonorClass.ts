/**
 * 个人主页 荣誉徽章
 */
class HomeHonorClass extends BaseContainer{
    private _public:PublicClass = new PublicClass();
    private bgColor:egret.Shape;
    /**
     * 徽章顶部
     */
    private honorDisPlay:HonorDisPlay;
    /**
     * 徽章中部
     */
    private honorSynthetic:HonorSynthetic;
    /**
     * 徽章底部
     */
    private honorCollection:HonorCollection;
    
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
        this.bgColor.graphics.beginFill(0x123eab,0);
        this.bgColor.graphics.drawRect(0, 0, this.width, this.height);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);

        this.honorDisPlay = new HonorDisPlay(Main.W,this.height/10*4);
        this.addChild(this.honorDisPlay);
        
        this.honorSynthetic = new HonorSynthetic(Main.W,this.height/10*3);
        this.addChild(this.honorSynthetic);

        this.honorCollection = new HonorCollection(Main.W,this.height/10*3);
        this.addChild(this.honorCollection);
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        this.honorDisPlay.x = 0;
		this.honorDisPlay.y = this.height/10*0;

        this.honorSynthetic.x = 0;
		this.honorSynthetic.y = this.honorDisPlay.y + this.honorDisPlay.height;

        this.honorCollection.x = 0;
		this.honorCollection.y = this.height - this.honorCollection.height;
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
        this.honorCollection.addEventListener(EventEnumerate.SELECT_COMPLETE,this.CollectioneEvent,this)
	}

    private CollectioneEvent(e:EventManage){
        if(e.data){
            this.honorSynthetic.NewSyntheic(e.data)  
        }
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