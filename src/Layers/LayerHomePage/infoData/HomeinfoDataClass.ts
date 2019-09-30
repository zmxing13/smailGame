/**
 * 个人主页 用户信息展示类
 */
class HomeinfoDataClass extends BaseContainer{
    private _public:PublicClass = new PublicClass();
    
    private bgColor:egret.Shape;
    public  infoData:egret.Bitmap;
    //昵称
    public userNickName:egret.TextField;
    //等级
    private userLevel:egret.TextField;
    //积分
    private userIntegral:egret.TextField;
    //体力
    private userLife:egret.TextField;
    //修改信息按钮
    private changeInfoBtn:egret.Bitmap;
    //修改密码按钮
    private changePasswordBtn:egret.Bitmap;

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
        this.bgColor = new egret.Shape();
        this.bgColor.graphics.beginFill(0xEFEFEF);
        this.bgColor.graphics.drawRect(0, 0, Main.W, Main.H*.15);
        this.bgColor.graphics.endFill();
        this.bgColor.alpha=0;
        this.addChild(this.bgColor);

        this.changeInfoBtn = this._public.createBitmapByName('img_changeInfo');
        this.addChild(this.changeInfoBtn);

        this.changePasswordBtn = this._public.createBitmapByName('img_changepassword');
        this.addChild(this.changePasswordBtn);
        
        this.formRemote();
	}

    //从网络加载资源
    public formRemote(){
        this.infoData = new egret.Bitmap;
        this.infoData.texture=DataBus._userAvatarTexture;
        this.addChild(this.infoData);

        if(DataBus._nickName!=''){
            this.userNickName = this._public.createTextByName(DataBus._nickName,50,0xffffff);
        }else {
            this.userNickName = this._public.createTextByName(DataBus._userName,50,0xffffff);
        }
        this.userNickName.border=true;
        this.userNickName.borderColor=0xff0000;
        this.addChild(this.userNickName);

        this.userLevel = this._public.createTextByName('Lv:'+DataBus._level[0].toString(),50,0xffffff);
        this.addChild(this.userLevel);

        this.userIntegral = this._public.createTextByName('积分:'+DataBus._score,50,0xffffff);
        this.addChild(this.userIntegral);

        this.userLife = this._public.createTextByName('体力:'+DataBus._power,50,0xffffff);
        this.addChild(this.userLife);
    }

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        
        this.infoData.width=this.bgColor.height;        
        this.infoData.height=this.bgColor.height;
        this.infoData.x=this.infoData.width/6;
        
        this.userNickName.x=this.infoData.x+this.infoData.width*1.3;
        this.userNickName.y=this.bgColor.height*.1;

        this.userLevel.x=this.infoData.x+this.infoData.width*1.3;
        this.userLevel.y=this.bgColor.height*.3;

        this.userIntegral.x=this.infoData.x+this.infoData.width*1.3;
        this.userIntegral.y=this.bgColor.height*.5;

        this.userLife.x=this.infoData.x+this.infoData.width*1.3;
        this.userLife.y=this.bgColor.height*.7;

        this.changeInfoBtn.width=this.bgColor.height /3;        
        this.changeInfoBtn.height=this.bgColor.height /3;
        this.changeInfoBtn.x = this.bgColor.width - this.changeInfoBtn.width*1.5;

        this.changePasswordBtn.width=this.bgColor.height /3;        
        this.changePasswordBtn.height=this.bgColor.height /3;
        this.changePasswordBtn.x = this.bgColor.width - this.changePasswordBtn.width*1.5;
        this.changePasswordBtn.y = this.changeInfoBtn.y + this.changeInfoBtn.height*1.5;
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		this.changeInfoBtn.touchEnabled=true;
        this.changeInfoBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.changeInfoTouch,this);

		this.changePasswordBtn.touchEnabled=true;
        this.changePasswordBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.changePasswordTouch,this);
	}
    private changeInfoTouch(e:egret.TouchEvent){
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'changeInfo'));
    }

    private changePasswordTouch(e:egret.TouchEvent){
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'changePassword'));
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