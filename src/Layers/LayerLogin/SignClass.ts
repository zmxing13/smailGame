// 注册页
class SignClass extends BaseContainer{
    private _public:PublicClass = new PublicClass();


    private userNameSp:egret.Sprite;            //用户名
    private passWordSp:egret.Sprite;            //确认密码容器
    private confirmPassWordSp:egret.Sprite;     //再次确认密码容器

    private userNameBg:egret.Sprite;           //用户名背景 
    private passWordBg:egret.Sprite;           //密码背景
    private confirmPassWordBg:egret.Sprite;    //确认密码背景

    //账户名
    private userNameBox:egret.TextField;
    private userNameExplain:egret.Bitmap;    //输入提示说明
    //密码
    private passWordBox:egret.TextField;
    private passWordExplain:egret.Bitmap;    //输入密码提示说明
    //确认密码
    private confirmPassWordBox:egret.TextField;
    private confirmPassWordExplain:egret.Bitmap;

    //访问服务器数据
    private webServer:WebServerData;
    private signBtn:egret.Bitmap;

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

        this.userNameSp = new egret.Sprite();
        this.addChild(this.userNameSp);

        this.passWordSp = new egret.Sprite();
        this.addChild(this.passWordSp);

        this.confirmPassWordSp = new egret.Sprite();
        this.addChild(this.confirmPassWordSp);

        this.userNameBg = new egret.Sprite();
        this.userNameBg.graphics.beginFill(0x00ff00,.5);
        this.userNameBg.graphics.drawRoundRect(0,0,Main.W/2,150,50,50);
        this.userNameBg.graphics.endFill();
        this.userNameSp.addChild(this.userNameBg);

        this.passWordBg = new egret.Sprite();
        this.passWordBg.graphics.beginFill(0x00ff00,.5);
        this.passWordBg.graphics.drawRoundRect(0,0,Main.W/2,150,50,50);
        this.passWordBg.graphics.endFill();
        this.passWordSp.addChild(this.passWordBg);

        this.confirmPassWordBg = new egret.Sprite();
        this.confirmPassWordBg.graphics.beginFill(0x00ff00,.5);
        this.confirmPassWordBg.graphics.drawRoundRect(0,0,Main.W/2,150,50,50);
        this.confirmPassWordBg.graphics.endFill();
        this.confirmPassWordSp.addChild(this.confirmPassWordBg);

        //--------------------------------
        
        this.userNameBox = new egret.TextField();
        this.userNameBox.type = egret.TextFieldType.INPUT;
        this.userNameBox.size=50;
        this.userNameBox.width = Main.W/2;
        this.userNameBox.height = 150;
        this.userNameBox.multiline = false;
        this.userNameBox.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.userNameBox.textAlign =egret.HorizontalAlign.CENTER;
        this.userNameBox.textColor = 0x000000;
        this.userNameBox.text=''
        this.userNameSp.addChild(this.userNameBox);

        this.userNameExplain = this._public.createBitmapByName('img_login_InputUsernameText');
        this.userNameSp.addChild(this.userNameExplain);

        //--------------------------------
        
        this.passWordBox = new egret.TextField();
        this.passWordBox.type = egret.TextFieldType.INPUT;
        this.passWordBox.inputType = egret.TextFieldInputType.PASSWORD;
        this.passWordBox.displayAsPassword = true;//密码填写完成后，点击屏幕空白处，该处EditableText为*格式
        this.passWordBox.size=50;
        this.passWordBox.width = Main.W/2;
        this.passWordBox.height = 150;
        this.passWordBox.multiline = false;
        this.passWordBox.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.passWordBox.textAlign =egret.HorizontalAlign.CENTER;
        this.passWordBox.textColor = 0x000000;
        this.passWordBox.text=''
        this.passWordSp.addChild(this.passWordBox);

        this.passWordExplain = this._public.createBitmapByName('img_login_InputPassText');
        this.passWordSp.addChild(this.passWordExplain);

        //--------------------------------

        this.confirmPassWordBox = new egret.TextField();
        this.confirmPassWordBox.inputType = egret.TextFieldInputType.PASSWORD;
        this.confirmPassWordBox.type = egret.TextFieldType.INPUT;
        this.confirmPassWordBox.displayAsPassword = true;//密码填写完成后，点击屏幕空白处，该处EditableText为*格式
        this.confirmPassWordBox.size=50;
        this.confirmPassWordBox.width = Main.W/2;
        this.confirmPassWordBox.height = 150;
        this.confirmPassWordBox.multiline = false;
        this.confirmPassWordBox.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.confirmPassWordBox.textAlign =egret.HorizontalAlign.CENTER;
        this.confirmPassWordBox.textColor = 0x000000;
        this.confirmPassWordBox.text=''
        this.confirmPassWordSp.addChild(this.confirmPassWordBox);

        this.confirmPassWordExplain = this._public.createBitmapByName('img_login_InputAginPassText');
        this.confirmPassWordSp.addChild(this.confirmPassWordExplain);

        //--------------------------------        

        this.signBtn = this._public.createBitmapByName('doneSignBtn');
        this.addChild(this.signBtn);

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

        this.userNameBg.x=0;
        this.userNameBg.y=0;
        this.userNameBox.x = 0;
        this.userNameBox.y = 0;
        this.userNameExplain.x=this.userNameBox.x;
        this.userNameExplain.y=this.userNameBox.y - this.userNameBox.height/2;
        
        scaleNum = (Main.W/(this.userNameSp.width*2));
        this.userNameSp.scaleX=this.userNameSp.scaleY=scaleNum;
        this.userNameSp.x=(Main.W-this.userNameSp.width*scaleNum)/2;
        this.userNameSp.y=(Main.H-this.userNameSp.height)/10*2;
        
        //--------------------------------

        this.passWordBg.x=0;
        this.passWordBg.y=0;
        this.passWordBox.x = 0;
        this.passWordBox.y = 0;
        this.passWordExplain.x=this.passWordBox.x;
        this.passWordExplain.y=this.passWordBox.y - this.passWordBox.height/2;
        this.passWordSp.scaleX=this.passWordSp.scaleY=scaleNum;
        this.passWordSp.x=(Main.W-this.passWordSp.width*scaleNum)/2;
        this.passWordSp.y=this.userNameSp.y+this.userNameSp.height;

        //--------------------------------

        this.confirmPassWordBg.x=0;
        this.confirmPassWordBg.y=0;
        this.confirmPassWordBox.x = 0;
        this.confirmPassWordBox.y = 0;
        this.confirmPassWordExplain.x=this.confirmPassWordBox.x;
        this.confirmPassWordExplain.y=this.confirmPassWordBox.y - this.confirmPassWordBox.height/2;
        this.confirmPassWordSp.scaleX=this.confirmPassWordSp.scaleY=scaleNum;
        this.confirmPassWordSp.x=(Main.W-this.confirmPassWordSp.width*scaleNum)/2;
        this.confirmPassWordSp.y=this.passWordSp.y+this.passWordSp.height;

        //--------------------------------       
        
        this.signBtn.x=(Main.W-this.signBtn.width)/2;
        this.signBtn.y=this.confirmPassWordSp.y+this.confirmPassWordSp.height;
        
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		this.signBtn.touchEnabled=true;
        this.signBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.signBtnTouch,this)
	}

    private signBtnTouch(e:egret.TouchEvent){
        let userState = this._public.validationUserName(this.userNameBox.text);
        let passwordState = this._public.validationPassWord(this.passWordBox.text,this.confirmPassWordBox.text);

        if(userState=='pass' && passwordState == 'pass'){
            // this._public.getTextWidth(this.userNameBox);
            DataBus._userName = this.userNameBox.text;
            DataBus._password = this.passWordBox.text;
            this.webServer = WebServerData.getInstance();
            this.webServer.userRegister(DataBus._userName,DataBus._password,this.sendDone,this);
        }
        
        if(userState!='pass'){
            LayerDialogBoxScene.getInstance().newDialogBoxEvent(userState);
        }
        if(passwordState!='pass'){
            LayerDialogBoxScene.getInstance().newDialogBoxEvent(passwordState);
        }
    }

    //服务器访问完成后执行
    private sendDone(data:any){
        console.log(data)
        if(data.code==10001){
            // console.log('注册完成')
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'doneSignClass'))
        }else if(data.code==20001){
            // console.log('注册失败')
            // FeedbackBouncedClass.feedback.setLable('用户已存在,请重新输入');
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('用户已存在,请重新输入');
        }
    }

    //反馈弹框
    private feedbackBouncedComplete(e:EventManage){
        var mc = e.currentTarget;
        if(e.data=='shutdownFeedback'){
            mc.DestroyOut();
            if(mc.feedbackName=='password'){
                this.passWordBox.text='';
                this.confirmPassWordBox.text='';
            }
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