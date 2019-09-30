//更改用户信息类
class ChangeUserInfo extends BaseContainer {
	private _public:PublicClass = new PublicClass();
	//弹板背景框
	public feedbackBg:ChangeBgFeedback;
	//更改用户信息弹板标题
    private changeUserInfoBackTitle:egret.TextField;
	//修改用户信息区域
    private changeUserAvatarSp:egret.Sprite;
    private changeUserAvatar:egret.Bitmap;
    public changeUserNick:InputTextClass;

	//存粗自定义头像
	private avatarArr:Array<egret.Bitmap>;
	//选中头像id
	public selectedAvatarId:number=0;
	//昵称默认输入框
	private selectedNickName:string='';

	public constructor() {
		super();
		this.avatarArr=[];
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}

	/**
     * 创建图形界面
     */
	private initSprite(){
		this.feedbackBg = new ChangeBgFeedback();
		this.addChild(this.feedbackBg);

		this.changeUserInfoBackTitle = this._public.createTextByName('修改用户信息',80,0x000000);
		this.addChild(this.changeUserInfoBackTitle);

		this.changeUserAvatarSp = new egret.Sprite();
		this.addChild(this.changeUserAvatarSp);

		var i,curAvatar:egret.Bitmap,
			curTexture:egret.Texture;
		DataBus._userAvatarBitmapArr=[];
		if(DataBus._userAvatarTextureArr.length>0){
			for (i=0;i<DataBus._userAvatarTextureArr.length;i++){
				curAvatar = new egret.Bitmap();
				let curTexture:egret.Texture = DataBus._userAvatarTextureArr[i];
				curAvatar.texture = curTexture;
				curAvatar.width=this.feedbackBg.width/6;
				curAvatar.height=this.feedbackBg.width/6;
				curAvatar.x = curAvatar.width*i;
				curAvatar.name = (i+1).toString();
				this.avatarArr.push(curAvatar);
				DataBus._userAvatarBitmapArr.push(curAvatar);
				this.changeUserAvatarSp.addChild(curAvatar);
			}
		}

		this.changeUserNick = new InputTextClass()
		this.changeUserNick.setExplainStr('请输入更改的昵称');
		this.addChild(this.changeUserNick);
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
		this.feedbackBg.x=0;
       	this.feedbackBg.y=0;

		this.changeUserInfoBackTitle.x=(this.feedbackBg.width - this.changeUserInfoBackTitle.width)/2;
		this.changeUserInfoBackTitle.y=this.feedbackBg.height/10*2;

		this.changeUserAvatarSp.x = (this.feedbackBg.width-this.changeUserAvatarSp.width)/2;
		this.changeUserAvatarSp.y = this.feedbackBg.height/10*3;
		
		this.changeUserNick.x = (this.feedbackBg.width-this.changeUserNick.width)/2;
		this.changeUserNick.y = this.feedbackBg.height/10*5;

	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		let i,obj;
		for (i=0;i<this.avatarArr.length;i++){
			obj = this.avatarArr[i];
			obj.touchEnabled=true;
			obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.avaatarTouch,this);
		}
		this.feedbackBg.bgColor.touchEnabled=true;
		this.feedbackBg.shutDownSp.touchEnabled=true;
		this.feedbackBg.bgColor.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.feedBackTouch,this);
		this.feedbackBg.shutDownSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.feedBackTouch,this)
	}

	private avaatarTouch(e:egret.TouchEvent){
		var mc = e.currentTarget;
		console.log('当前选中的图片下标是：'+mc.name);
		this.selectedAvatarId = parseInt(mc.name);
	}
	//关闭本身
	private feedBackTouch(e:egret.TouchEvent){
		this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'shutdownChangeFeedback'))
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
		if(stateAlpha==1){
			this.feedbackBg.touchEnabled=true;
			this.feedbackBg.bgColor.touchEnabled=true;
			this.feedbackBg.changeBackBg.touchEnabled=true;
			this.feedbackBg.shutDownSp.touchEnabled=true;

			this.changeUserAvatarSp.visible=true;
			this.changeUserAvatarSp.touchEnabled=true;
			this.changeUserNick.visible=true;
		}else{
			this.feedbackBg.touchEnabled=false;
			this.feedbackBg.bgColor.touchEnabled=false;
			this.feedbackBg.changeBackBg.touchEnabled=false;
			this.feedbackBg.shutDownSp.touchEnabled=false;

			this.changeUserAvatarSp.visible=false;
			this.changeUserAvatarSp.touchEnabled=false;
			this.changeUserNick.visible=false;
			this.changeUserNick.inputTextContent.text='';
			
		}
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