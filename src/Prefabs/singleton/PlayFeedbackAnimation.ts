//反馈动画模块
class PlayFeedbackAnimation extends BaseContainer{
	public static playAnimation:PlayFeedbackAnimation;

	private _public:PublicClass = new PublicClass();
	private bg:egret.Sprite;
	private loadText:egret.TextField;
	private outTime:number=0;		//退出时间
	private outBoo:boolean=false;	//退出状态
	public constructor() {
		super();
		if(PlayFeedbackAnimation.playAnimation){
			throw new Error('反馈动画模板-已存在,无需创建');
		}
		PlayFeedbackAnimation.playAnimation = this;
		this.outTime=3000;
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}

	/**
	 *显示加载封屏页 
	*/
	public saveLoad(_disText:string='反馈动画播放ing'){
		this.UpWindowData();
		this.bg.visible=true;
		this.bg.touchEnabled=true;
		this.loadText.visible=true;
		this.loadText.text=_disText;
		this.loadText.size=Main.W/20*1;
		this.loadText.x=(this.bg.width-this.loadText.width)/2;
		this.loadText.y=(this.bg.height-this.loadText.height)/2;
		this.outBoo=false;
		egret.Tween.get(this)
					.wait(this.outTime)
					.call(()=>{this.killLoad()})
	}
	/**
	 *隐藏加载封屏页
	*/
	public killLoad(){
		this.hiddenOut(.2,0,0);
		this.bg.visible=false;
		this.bg.touchEnabled=false;
		this.loadText.visible=false;
		this.loadText.text='';
		this.outBoo=true;
		console.log('kill PlayFeedbackAnimation')
	}

	/**
     * 创建图形界面
     */
	private initSprite(){
		this.bg=new egret.Sprite();
		this.bg.graphics.beginFill(0x000000,.5);
		this.bg.graphics.drawRect(0,0,Main.W,Main.H);
		this.bg.graphics.endFill();
		this.addChild(this.bg);
		this.bg.visible=false;

		this.loadText=this._public.createTextByName('反馈动画播放ing');
		this.loadText.size=Main.W/20*1;
		this.loadText.x=(this.bg.width-this.loadText.width)/2;
		this.loadText.y=(this.bg.height-this.loadText.height)/2;
		this.addChild(this.loadText);
		this.loadText.visible=false;
	}
	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
		this.bg.graphics.clear();
		this.bg.graphics.beginFill(0x000000,.5);
		this.bg.graphics.drawRect(0,0,Main.W,Main.H);
		this.bg.graphics.endFill();
	}
	/**
     * 初始化事件消息
     */
	private initMessage(){
		this.bg.touchEnabled=true;
		this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.bgTouch,this)
	}

	private bgTouch(e:egret.TouchEvent){
		this.killLoad();
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