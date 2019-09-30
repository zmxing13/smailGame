/**
 *文件管理 /控制器
*/
class LayerManagement extends BaseContainer {
	private _public:PublicClass = new PublicClass();
	//是否有token值->
	private isCheckToken:boolean;
	/**
	 * 开始页 获取用户基本信息
	 */
	private openClass:LayerOpenClass;
	/**
	 * 注册登陆页
	 */
	private loginClass:LayerLogin;
	/**
	 * 世界地图页
	 */
	private wordMap:LayerWordMap;
	public constructor() {
		super();
	}
	/**
	 * 设置token是否存在值
	 */
	public setToken(tokenBoo:boolean=false){
		this.isCheckToken=tokenBoo;
		this.createGameScene();
	}
	/**
     * 创建游戏场景
	 * 1.open页 - 自定义页 - 世界地图页 
     */
	private createGameScene(){
		if(!this.isCheckToken){
			//无token
			this.openClass = new LayerOpenClass();
			this.openClass.alpha=0;
			this.openClass.hiddenOut(.1,.1);
			this.addChild(this.openClass);
			this.UpWindowData();
			this.initMessage();
		}else{
			//有token			
			let userInfo:string = egret.localStorage.getItem("userInfo");
			console.log(JSON.stringify(userInfo))
			if(userInfo!=null){
				let arr:Array<string>;
				//从本地获取到的用户信息，用 | 分割并存入数组
				arr = userInfo.split('|');
				DataBus._userName=arr[0];
				DataBus._password=arr[1];
			}
			this.newLayerWordMap();
		}
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
        this.openClass.addEventListener(EventEnumerate.SELECT_COMPLETE,this.openClassCustomDispathEvent,this);
	}
	//open页 操作
	private openClassCustomDispathEvent(e:EventManage){
		if(e.data=='user'){
			console.log(e.data,'用户登陆->登陆页->世界地图页');
			//从本地获取用户登陆信息-用户+密码
			let userInfo:string = egret.localStorage.getItem("userInfo");
			console.log(JSON.stringify(userInfo))
			this.openClass.DestroyOut();
			this.loginClass = new LayerLogin();
			this.loginClass.alpha=0;
			this.loginClass.hiddenOut(.1,.1);
        	this.addChild(this.loginClass);
        	this.loginClass.addEventListener(EventEnumerate.SELECT_COMPLETE,this.loginClassComplete,this);
			if(userInfo!=null){
				let arr:Array<string>;
				//从本地获取到的用户信息，用 | 分割并存入数组
				arr = userInfo.split('|');
				DataBus._userName=arr[0];
				DataBus._password=arr[1];
				this.loginClass.setUserInfoLabal(DataBus._userName,DataBus._password);
			}
		}else if(e.data=='visitor'){
			console.log(e.data,'访客登陆->世界地图页');
			this.openClass.DestroyOut();
			WebServerData.webServer.userQuickLogin(this.sendDone,this);
			LoadSeadScreen.loadScreen.saveLoad();
		}
    }

	private newLayerWordMap(){
		this.wordMap=new LayerWordMap();
		this.wordMap.alpha=0;
		this.wordMap.hiddenOut(.1,.1);
		this.addChild(this.wordMap);
		// FeedbackBouncedClass.feedback.setLable('欢迎'+DataBus._userName+'进入游戏');
	}

	private loginClassComplete(e:EventManage){
		if(e.data=='DoneSign'){
			// console.log('-----游戏开始------');
			// console.log('token:'+DataBus._token,'\n\nusername:'+DataBus._userName,'  password:'+DataBus._password)
			this.loginClass.DestroyOut();
			this.wordMap=new LayerWordMap();
			this.wordMap.alpha=0;
			this.wordMap.hiddenOut(.1,.1);
			this.addChild(this.wordMap);
			LoadSeadScreen.loadScreen.killLoad();
		}
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】
     */
	public UpWindowData(){

	}

	 //服务器访问完成后执行
    private sendDone(data:any){
		console.log('快速登陆: ',data)
		if(data.code==20000){
			LoadSeadScreen.loadScreen.killLoad();
			
			DataBus._token = data.data.token;
			DataBus._userName = data.data.userinfo.username;
			DataBus._password = data.data.userinfo.password;

			//------用户登陆信息存储本地-----------
			let userinfo:string = "userInfo";
			let userValue:string = DataBus._userName + "|" + DataBus._password;
			egret.localStorage.setItem(userinfo,userValue); 

			//------用户token存储本地-----------
			let usertoken:string = "userToken";
			let tokenValue:string = DataBus._token;
			egret.localStorage.setItem(usertoken,tokenValue); 

			this.wordMap=new LayerWordMap();
			this.wordMap.alpha=0;
			this.wordMap.hiddenOut(.1,.1);
			this.addChild(this.wordMap);
			
			LayerDialogBoxScene.getInstance().newDialogBoxEvent('账户:'+DataBus._userName+'\n\n密码:'+DataBus._password+'\n\n请截屏保存账户密码');
		}else{
			LayerDialogBoxScene.getInstance().newDialogBoxEvent('注册失败，请重试！');
			
		}
	}
}