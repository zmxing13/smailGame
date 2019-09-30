// 闯关
class LayerConfirm extends BaseContainer{
    private _public:PublicClass = new PublicClass();
    private titleName:string=''
    private disPlaySp:egret.Sprite;
   /**
     * 标题显示类 含返回按钮
     */
    private titleClass:TitleReturnClass;
    /**
     * 游戏盒子
    */
    private gameBox:GameOperationCLass;

	public constructor(_titleName:string) {
		super();
        this.titleName=_titleName;
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}
	/**
     * 创建图形界面
     */
	private initSprite(){
        this.disPlaySp = new egret.Sprite();
        this.addChild(this.disPlaySp);
        this.titleClass = new TitleReturnClass(this.titleName);
        this.disPlaySp.addChild(this.titleClass);
        this.gameBox = new GameOperationCLass(this.titleName);
        this.disPlaySp.addChild(this.gameBox);
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        this.titleClass.x = Main.W*.1;
        this.titleClass.y = Main.H/10*.1;

        this.gameBox.width = Main.W;
        this.gameBox.height = Main.H /10*9;
        this.gameBox.x = 0;
        this.gameBox.y = this.titleClass.x + this.titleClass.height;
        
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
        this.titleClass.returnBtn.touchEnabled=true;
        this.titleClass.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.titleClassTouch,this);
        this.gameBox.addEventListener(EventEnumerate.SELECT_COMPLETE,this.gameBoxComplete,this);
	}

    private titleClassTouch(e:egret.TouchEvent){
        if(this.gameBox.gameStartBoo==true){
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('确定要退出吗？',DialogBox.TypeModel.Type_Warn,this.gameOverComplete,this,'取  消','确  定');
        }else{
            this.gameBox.updataInit();
            this.gameBox.choosePage.destroyChoose();
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,true));
        }
    }
    private gameOverComplete(e){
        console.log(e)
        if(e==true){
            this.gameBox.updataInit();
            this.gameBox.choosePage.destroyChoose();
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,true));
        }else{

        }
        
    }
    //游戏盒子答题完成事件
    private gameBoxComplete(e:EventManage){
        if(e.data=='sheetOver'){
            console.log('答题完成,结束ing');
            this.gameBox.DestroyOut();
        }else if(e.data=='powerOver'){
            console.log('体力值不足');
            LoadSeadScreen.loadScreen.killLoad();
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'powerOver'));//体力值不足
            // this.gameBox.choosePage.hiddenOut();
            this.gameBox.hiddenOut()
        }
        // this.gameBox.hiddenOut()
    }

    public saveConfirm(){
        
    }
    
    public killConfirm(_titleName:string){
        this.gameBox.againUpdataInt(_titleName);
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