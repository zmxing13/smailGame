/**
 * open页->游戏开始页
 */
class LayerOpenClass extends BaseContainer{
    private _public:PublicClass = new PublicClass();
    private gameName:egret.Bitmap;
    private gameContent:egret.Bitmap;
    private userBtn:egret.Bitmap;
    private touristsBtn:egret.Bitmap;
    private gameSignature:egret.Bitmap;
    
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
        this.gameName = this._public.createBitmapByName('gameName')
        this.addChild(this.gameName);
        this.gameContent = this._public.createBitmapByName('gameContent')
        this.addChild(this.gameContent);
        this.userBtn = this._public.createBitmapByName('userLandingBtn')
        this.addChild(this.userBtn);
        this.touristsBtn = this._public.createBitmapByName('touristsLandingBtn')
        this.addChild(this.touristsBtn);
        this.gameSignature = this._public.createBitmapByName('gameSignature')
        this.addChild(this.gameSignature);
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        let scaleNum:number=0;
		let scaleXNum:number=0;
		let scaleYNum:number=0;
        let tempH:number=0;
		
        scaleNum=0;
		tempH=Main.H - Main.H/10;
		scaleXNum = (Main.W/(this.gameName.width*2));
		scaleYNum = (tempH/(this.gameName.height*3));
		if(scaleXNum<scaleYNum){
			scaleNum = scaleXNum;
		}else{
			scaleNum = scaleYNum;			
		}
        this.gameName.scaleX=this.gameName.scaleY=scaleNum;
        this.gameName.x=(Main.W-this.gameName.width*scaleNum)/2;
        this.gameName.y=(Main.H/10*2-this.gameName.height*scaleNum)/2;

        scaleNum=0;
		tempH=Main.H - Main.H/10*2;
		scaleXNum = (Main.W/(this.gameContent.width*1.5));
		scaleYNum = (tempH/(this.gameContent.height*2));
		if(scaleXNum<scaleYNum){
			scaleNum = scaleXNum;
		}else{
			scaleNum = scaleYNum;
		}
        this.gameContent.scaleX=this.gameContent.scaleY=scaleNum;
        this.gameContent.x=(Main.W-this.gameContent.width*scaleNum)/2;
        this.gameContent.y=(Main.H-this.gameContent.height*scaleNum)/2-(this.gameContent.height/5);

        this.userBtn.scaleX=this.userBtn.scaleY=scaleNum;
        this.userBtn.x=(Main.W-this.userBtn.width*scaleNum)/2;
        this.userBtn.y=this.gameContent.y+this.gameContent.height*scaleNum;

        this.touristsBtn.scaleX=this.touristsBtn.scaleY=scaleNum;
        this.touristsBtn.x=(Main.W-this.touristsBtn.width*scaleNum)/2;
        this.touristsBtn.y=this.userBtn.y+this.userBtn.height*scaleNum+10;

        this.gameSignature.scaleX=this.gameSignature.scaleY=scaleNum;
        this.gameSignature.x=(Main.W-this.gameSignature.width*scaleNum)/2;
        this.gameSignature.y=Main.H-this.gameSignature.height*2;
	}

	/**
     * 初始化事件消息
    */
	private initMessage(){
		this.userBtn.touchEnabled=true;
		this.userBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.userBtnTouch,this);
        this.touristsBtn.touchEnabled=true;
		this.touristsBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touristsBtnTouch,this);
    }
    //注册用户登陆
    private userBtnTouch(e:egret.TouchEvent){
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'user'));
    }
    //访客登陆
    private touristsBtnTouch(e:egret.TouchEvent){
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'visitor'));
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