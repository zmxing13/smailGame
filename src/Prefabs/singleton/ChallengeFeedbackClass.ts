//挑战信息弹框
class ChallengeClass extends BaseContainer {
	public static challenge:ChallengeClass;

    private _public:PublicClass = new PublicClass();
    
	private bgColor:egret.Sprite;
	private loadText:egret.TextField;

	private determineBtn:egret.Bitmap;
	private cancelBtn:egret.Bitmap;

	public constructor() {
		super();
		if(ChallengeClass.challenge){
			throw new Error('加载封屏页-已存在,无需创建');
		}
		ChallengeClass.challenge = this;
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}

	/**
	 *显示加载封屏页 
	*/
	public saveLoad(_disText:string='你收到了挑战,是否查看?'){
		this.UpWindowData();
		this.bgColor.visible=true;
		this.bgColor.touchEnabled=true;
		this.loadText.visible=true;
		this.loadText.text=_disText;
		this.loadText.size=Main.W/15;
		this.loadText.x=(this.bgColor.width-this.loadText.width)/2;
		this.loadText.y=(this.bgColor.height-this.loadText.height)/2 - (this.loadText.height*2);
		this.determineBtn.visible=true;
		this.cancelBtn.visible=true;
		this.determineBtn.touchEnabled=true;
		this.cancelBtn.touchEnabled=true;
	}

	/**
	 *隐藏加载封屏页 
	*/
	public killLoad(){
		this.hiddenOut();
		this.bgColor.visible=false;
		this.bgColor.touchEnabled=false;
		this.loadText.visible=false;
		this.loadText.visible=false;
		this.loadText.text='';
		this.determineBtn.visible=false;
		this.cancelBtn.visible=false;
		this.determineBtn.touchEnabled=false;
		this.cancelBtn.touchEnabled=false;
	}

	
	/**
     * 创建图形界面
     */
	private initSprite(){
		this.bgColor = new egret.Sprite();
		this.bgColor.graphics.beginFill(0x000000,.5);
		this.bgColor.graphics.drawRect(0,0,Main.W,Main.H);
		this.bgColor.graphics.endFill();
		this.addChild(this.bgColor);

		this.loadText=this._public.createTextByName('你收到了挑战,是否查看?');
		this.loadText.size=Main.W/15;
		this.loadText.x=(this.bgColor.width-this.loadText.width)/2;
		this.loadText.y=(this.bgColor.height-this.loadText.height)/2 - (this.loadText.height*2);
		this.addChild(this.loadText);

		this.determineBtn = this._public.createBitmapByName('img_wordMap_doneBtn');
		this.addChild(this.determineBtn);

		this.cancelBtn = this._public.createBitmapByName('img_wordMap_cancelBtn');
		this.addChild(this.cancelBtn);
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
	*/
	public UpWindowData(){
		this.bgColor.x=0;
		this.bgColor.y=0;
		this.bgColor.width=Main.W;
		this.bgColor.height=Main.H;

		this.determineBtn.x = (Main.W-this.determineBtn.width)/2 - this.determineBtn.width;
		this.determineBtn.y = (Main.H-this.determineBtn.height)/2;

		this.cancelBtn.x = (Main.W-this.cancelBtn.width)/2 + this.cancelBtn.width;
		this.cancelBtn.y = (Main.H-this.cancelBtn.height)/2;
	}
	//更改提示文字内容
	public setLoadText(str:string){
		this.loadText.text=str;
		this.loadText.size=Main.W/15;
		this.loadText.x=(this.bgColor.width-this.loadText.width)/2;
		this.loadText.y=(this.bgColor.height-this.loadText.height)/2 - (this.loadText.height*2);
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		this.bgColor.touchEnabled=true;
		this.determineBtn.touchEnabled=true;
		this.cancelBtn.touchEnabled=true;
		this.determineBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.determinBtnTouch,this);
		this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.cancelBtnTouch,this);
	}
	//确定事件
	private determinBtnTouch(e:egret.TouchEvent){
		this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'determin'));
		// this.hiddenOut(.1,0,0)
	}
	//取消事件
	private cancelBtnTouch(e:egret.TouchEvent){
		this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'cancel'));
		// this.hiddenOut(.1,0,0)
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
		.call(function(){
			if(stateAlpha==1){
				this.bgColor.touchEnabled=true;
				this.determineBtn.touchEnabled=true;
				this.cancelBtn.touchEnabled=true;
			}else if(stateAlpha==0){
				this.bgColor.touchEnabled=false;
				this.determineBtn.touchEnabled=false;
				this.cancelBtn.touchEnabled=false;
			}
		})
		
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