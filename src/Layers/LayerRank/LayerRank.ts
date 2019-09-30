class LayerRank extends BaseContainer {
	private _public:PublicClass = new PublicClass();
	 private disPlaySp:egret.Sprite;
     private rank:RankPanel;
   /**
     * 标题显示类 含返回按钮
     */
    private titleClass:TitleReturnClass;

	public constructor() {
		super();
        PageManager.Container=this;
		this.rank=new RankPanel();
        this.addChild(this.rank);
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}   

    public updataGrade(index:number){
        this.rank.updataGrade(index);
    }
    
	/**
     * 创建图形界面
    */
	private initSprite(){
        this.disPlaySp = new egret.Sprite();
        this.addChild(this.disPlaySp);

        this.titleClass = new TitleReturnClass('img_rankTitle');
        this.titleClass.returnBtn.touchEnabled=true;
        this.titleClass.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.textClick,this);
        this.disPlaySp.addChild(this.titleClass);

	}
    private textClick(e:egret.TouchEvent){
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,true));
    }

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
		this.titleClass.x = Main.W*.1;
        this.titleClass.y = Main.H*.01;
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