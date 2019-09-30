// 徽章拖动按钮，单元
class SyntheticBtnClass extends BaseContainer{
    public oldX:number=0;
    public oldY:number=0;
    public id:number=0;
    //按钮纹理名字
    public textureName:string='';
    //是否被占用
    public placeholderBoo:boolean=false;
    //被占用下标
    public placeholderIndex:number=0;

    private _public:PublicClass = new PublicClass();

    private btnBg:egret.Shape;
    private syntheitcImg:ImgTemplate;
    //背景纹理-是否被碰撞到，是显示，无隐藏
    public bgTexture:egret.Shape;

	public constructor(syntheicType:string='') {
		super();
		this.initSprite(syntheicType);
		this.UpWindowData();
		this.initMessage();
	}
	/**
     * 创建图形界面
     */
	private initSprite(syntheicType:string){

        this.bgTexture = new egret.Shape();
        this.bgTexture.graphics.beginFill(0xff00ff,1);
        this.bgTexture.graphics.drawRect(-10,-10,Main.W/6+20,Main.W/6+20);
        this.bgTexture.graphics.endFill();
        this.addChild(this.bgTexture);
        this.bgTexture.visible=false;


        this.btnBg = new egret.Shape();
        this.btnBg.graphics.beginFill(0x00ff00,.5);
        // this.btnBg.graphics.drawRoundRect(0,0,Main.W/6,Main.W/6,50,50);
        this.btnBg.graphics.drawRect(0,0,Main.W/6,Main.W/6);
        this.btnBg.graphics.endFill();
        this.addChild(this.btnBg);

        if(syntheicType!=''){
            this.syntheitcImg = new ImgTemplate(syntheicType);
            this.syntheitcImg.result.width = this.btnBg.width;
            this.syntheitcImg.result.height = this.btnBg.height;
            this.addChild(this.syntheitcImg);
        }
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        let scNum:number=0,
            honorBtnW:number=0,
            honorBtnH:number=0;
        scNum = Main.scaleNum +.8;
        
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