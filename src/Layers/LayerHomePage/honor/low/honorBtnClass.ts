// 徽章按钮，单元
class honorBtnClass extends BaseContainer{
    public eid:number=0;
    public emblemSum:number=0;
    private _public:PublicClass = new PublicClass();
	private honorBtn:egret.Bitmap;
    private honorSp:egret.Shape;
    public honorNum:egret.TextField;
    private honorName:egret.TextField;
    
	public constructor() {
		super();
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}
    /**
     * 徽章按钮-设置按钮显示内容
     * honorType    类型
     * honorNum     数量
     * honorName    名字
     */
    public setHonorBtnContent(honorType:string,honorNum:number=0,honrName:string=''){
        this.addChild(this.honorBtn);

        this.honorSp.graphics.beginFill( 0xDDD28F,1);
        this.honorSp.graphics.drawCircle(0,0,25);
        this.honorSp.graphics.endFill();
        this.addChild(this.honorSp);

        this.honorNum.text=honorNum.toString();
        this.honorNum.size=30;
        this.addChild(this.honorNum);

        this.honorName.text=honrName.toString();
        this.honorName.size=40;
        this.addChild(this.honorName);

        this.UpWindowData()
        
    }

	/**
     * 创建图形界面
     */
	private initSprite(){
        this.honorBtn = this._public.createBitmapByName('img_badge');
        this.addChild(this.honorBtn);

        this.honorSp = new egret.Shape();
        this.honorSp.graphics.beginFill(0xDDD28F,1);
        this.honorSp.graphics.drawCircle(0,0,25);
        this.honorSp.graphics.endFill();
        this.addChild(this.honorSp)

        this.honorNum = this._public.createTextByName('1',30,0xDD1E29);
        this.addChild(this.honorNum);

        this.honorName = this._public.createTextByName('1',40,0xffffff);
        this.addChild(this.honorName);

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
        honorBtnW = this.honorBtn.width + (this.honorBtn.width * scNum );
        honorBtnH = this.honorBtn.height + (this.honorBtn.height * scNum );

        this.honorBtn.width = Main.W/8;
        this.honorBtn.height = Main.W/8;

        this.honorSp.x = this.honorBtn.width;
        this.honorSp.y = 0;

        this.honorNum.x= this.honorSp.x - (this.honorNum.width/2);
        this.honorNum.y= this.honorSp.y - (this.honorNum.height/2);

        this.honorName.x= (this.honorSp.width-this.honorName.width/3);
        this.honorName.y= this.honorSp.height*2.5;
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