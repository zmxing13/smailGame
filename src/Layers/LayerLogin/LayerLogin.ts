// 登陆注册页
class LayerLogin extends BaseContainer{
    private _public:PublicClass = new PublicClass();
    private loginClass:LoginClass;
    private signClass:SignClass;

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
        this.loginClass = new LoginClass();
        this.addChild(this.loginClass);
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        
	}
    //设置登录页用户和密码
    public setUserInfoLabal(_username:string='',_password:string=''){
        this.loginClass.setUserInfoLabal(_username,_password)
    }
	/**
     * 初始化事件消息
     */
	private initMessage(){
        this.loginClass.addEventListener(EventEnumerate.SELECT_COMPLETE,this.loginClassComplete,this);
	}

    private loginClassComplete(e:EventManage){
        if(e.data=='sign'){
            this.loginClass.DestroyOut();
            this.signClass = new SignClass();
            this.signClass.alpha=0;
            this.signClass.hiddenOut(.1,.1);
            this.addChild(this.signClass);
            this.signClass.addEventListener(EventEnumerate.SELECT_COMPLETE,this.signClassComlete,this);
        }else if(e.data=='start'){
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'DoneSign'));
        }
    }
    //注册完成后执行
    private signClassComlete(e:EventManage){
        if(e.data=='doneSignClass'){
            this.signClass.DestroyOut();
            this.loginClass = new LoginClass(DataBus._userName,DataBus._password);
            this.loginClass.signBtn.visible=false;
            this.loginClass.addEventListener(EventEnumerate.SELECT_COMPLETE,this.loginClassComleteDone,this);
            this.addChild(this.loginClass);
        }
    }    
    //注册完成后，开始游戏按钮
    private loginClassComleteDone(e:EventManage){
        if(e.data=='start'){
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'DoneSign'));
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