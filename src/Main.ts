//////////////////////////////////////////////////////////////////////////////////////
//
//  ProjectMould
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
    /**
     * 设备
     */
    public static os:string="";
    /**
     * 平台
     */
    public static runtimeType:string="";

    /**
     * 缩放比例
     */
    public static scaleNum: number = 1;
    /**
     * 舞台宽
     */
    public static W: number = 960;
    /**
     * 舞台高
     */
    public static H: number = 1334;

    /**
     * “流海” 高度
     */
    public static titleBarHeight:number = 0;
    public static bitmapText: egret.BitmapFont = null;

    private loadingView:LoadingUI;
    private loadAnim:LoadAnimation;
    
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {

            Main.os = egret.Capabilities.os;
            Main.runtimeType = egret.Capabilities.runtimeType;

            //初始化龙骨时钟频率
            egret.Ticker.getInstance().register(function(advancedTime) {
                dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
            },this);

            this.onWindowStatus();
            //窗口尺寸状态监听
            this.stage.addEventListener(egret.Event.RESIZE,this.onWindowStatus,this);

            context.onUpdate = () => {
                //每一帧都运行
            }
        })

        this.runGame().catch(e => {
            console.log(e);
        })
    }
    /**
     * 窗口尺寸状态
     */
    private onWindowStatus(): void {
        //宽高信息
        Main.W = this.stage.stageWidth;
        Main.H = this.stage.stageHeight;
        //缩放信息
        var scale_X: number = Main.W / 960;
        var scale_Y: number = Main.H / 1334;
        Main.scaleNum = Math.min(scale_X,scale_Y);
    }

    //初始化Resource资源加载库
    private async runGame() {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 预加载loading资源组
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loadingAssets");
    }
    /**
     * 资源组preload加载
     * platform 初始化
     */
    private async onResourceLoadComplete(event:RES.ResourceEvent){
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            this.loadingView.DestroyOut(0.1);
            this.loadAnim = new LoadAnimation();
            this.stage.addChild(this.loadAnim);
            this.loadAnim.touchEnabled=true;
            this.loadAnim.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.textContentDown,this)
            
        }else if(event.groupName=="loadingAssets"){
            this.loadingView=new LoadingUI();
            this.stage.addChild(this.loadingView);
            RES.loadGroup("preload");
        }
    }
    /**
     * 资源组加载出错
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    }
     /**
     * 资源组加载出错
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.onProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

     //load跳过按钮
    private textContentDown(){
        this.loadAnim.touchEnabled=false;
        this.loadAnim.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.textContentDown,this);
        this.loadAnim.DestroyOut(.1);//自我销毁
        this.initGameScene();
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 初始化场景
     */
    /**
     * 文件管理
     */
    private fileManage:LayerManagement;
    /**
     * 反馈信息，弹框
     */
    public feedbackBounced:FeedbackBouncedClass;
    /**
     * 加载页，封屏
     */
    public loadScreen:LoadSeadScreen;
    /**
     * 动态动画，弹框
     */
    public playAnimation:PlayFeedbackAnimation;
    /**
     * 带有确认，取消按钮的弹框
     */
    public challenge:ChallengeClass;
    /**
     * 带有按钮的消息对话框-山景
     */
    public _manageContent:LayerDialogBoxScene;
    /**
     * 数据请求
     */
    private webServer:WebServerData;
    private usertoken:string;

    private initGameScene(){

        this.webServer = WebServerData.getInstance();

        this.feedbackBounced = new FeedbackBouncedClass();
        this.addChild(this.feedbackBounced);

        this.loadScreen = new LoadSeadScreen();
        this.addChild(this.loadScreen);

        this.playAnimation = new PlayFeedbackAnimation();
        this.addChild(this.playAnimation);

        this.challenge = new ChallengeClass();
        this.addChild(this.challenge);
        this.challenge.killLoad();
        
        this._manageContent = LayerDialogBoxScene.getInstance();
        this.addChild(this._manageContent);
        // LayerDialogBoxScene.getInstance().newDialogBoxEvent('当前玩家已被挑战,请明天再来.');
        // LayerDialogBoxScene.getInstance().newDialogBoxEvent('确定要挑战'+e.data.userData.nickName+'吗？',DialogBox.TypeModel.Type_Warn,this.ChallengeClassComplete,this,'取  消','确  定');

        //从本地缓存验证token值
        this.usertoken = egret.localStorage.getItem("userToken");
        if(this.usertoken!=null){
            console.log('验证token');
            LoadSeadScreen.loadScreen.saveLoad();
            DataBus._token=this.usertoken;
            WebServerData.webServer.userCheckToken(this.usertoken,this.sendDone,this);
        }else{
            console.log('没有token');
            this.createGameScene();
        }
    }
    /**
     * 创建游戏场景
    */
    private createGameScene() {
        console.log("创建游戏场景");
        this.fileManage = new LayerManagement();
        this.addChildAt(this.fileManage,0);
        this.fileManage.setToken(false);
    }

    //服务器访问完成后执行
    private sendDone(data:any){
        console.log('验证token是否过期->创建游戏场景',data);
        LoadSeadScreen.loadScreen.killLoad();
        this.fileManage = new LayerManagement();
        this.addChildAt(this.fileManage,0);
        
        if(data.code==10001){
            //token有效
            // console.log('有效');
            this.fileManage.setToken(true);
        }else{
            //token无效，失效
            // console.log('无效');
            this.fileManage.setToken(false);
        }
    }
}