/**
 * 标题类 包含返回按钮
 */
class TitleReturnClass extends BaseContainer{
    private _public:PublicClass = new PublicClass();
    private bgColor:egret.Shape;

    public returnBtn:ImgTemplate;
    private titleImg:ImgTemplate;
    
	public constructor(titleStr:string='',returnStr:string='img_returnArrow') {
		super();
		this.initSprite(titleStr,returnStr);
		this.UpWindowData();
		this.initMessage();
	}
	/**
     * 创建图形界面
     */
	private initSprite(titleStr:string,returnStr:string){
        
        this.bgColor = new egret.Shape();
        this.bgColor.graphics.beginFill(0xEFEFEF);
        this.bgColor.graphics.drawRect(0, 0, Main.W, Main.H*.05);
        this.bgColor.graphics.endFill();
        this.bgColor.visible=false;
        this.addChild(this.bgColor);

        this.titleImg = new ImgTemplate(titleStr)
		this.addChild(this.titleImg);

        this.returnBtn = new ImgTemplate(returnStr);
		this.addChild(this.returnBtn);
	}
    
	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        this.returnBtn.scaleX=this.returnBtn.scaleY=Main.scaleNum + 1;  
        this.returnBtn.x = 0;
        this.returnBtn.y = this.titleImg.height/4;

        this.titleImg.scaleX=this.titleImg.scaleY=Main.scaleNum + 1;          
        this.titleImg.x = (Main.W-this.titleImg.width)/2-(this.titleImg.width);
        this.titleImg.y = 0;
        
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