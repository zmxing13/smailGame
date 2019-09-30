class PKPanel extends egret.Sprite{

	private _width:number;
	private _height:number;

	private _receiveList:ReceiveListUI;
	private _sendList:SendListUI;
	private _tabBar:TabBar;
	private _index:number;
	private _loadingMc:egret.MovieClip;
	private _iWantPKBtn:Button;

	private _searchForPkPanel:SearchForPkPanel;
	private _blackMask:egret.Shape;

	private _public:PublicClass = new PublicClass();
	private firstPkArr:Array<any>=[];	//发起挑战
	private trucePkArr:Array<any>=[];	//收到挑战
	private userData;
	private getMessageObjData;		
	private removeObjId:number=-1;		//删除竞技消息id

	public constructor(w:number,h:number) {
		super();
		this._width=w;
		this._height=h;
		this.init();
	}

	public init(){
		
		this._tabBar=new TabBar(this._width,this._height*0.08-10);
		this.addChild(this._tabBar);

		this.drawBackground();

		this._receiveList=new ReceiveListUI(this._width,this._height*0.8);
		this.addChild(this._receiveList);
		this._receiveList.y=this._height*0.08;

		this._sendList=new SendListUI(this._width,this._height*0.8);
		this.addChild(this._sendList);
		this._sendList.y=this._height*0.08;

		this._tabBar.setSendNum(this._sendList.getListLength());
		this._tabBar.setReceiveNum(this._receiveList.getListLength());
		this._index=1;

		this._iWantPKBtn=new Button(this._width,this._height*0.12-10,"找人PK");
		this.addChild(this._iWantPKBtn);
		this._iWantPKBtn.y=this._height*0.88+10;

		this._blackMask=new egret.Shape();
		let g=this._blackMask.graphics;
		g.beginFill(0x000000,0.5);
		g.drawRect(0,0,this._width,this._height);
		this.addChild(this._blackMask);
		this._blackMask.visible=false;
		this._blackMask.touchEnabled=true;

		this._searchForPkPanel=new SearchForPkPanel(this._width-100);
		this.addChild(this._searchForPkPanel);
		this._searchForPkPanel.x=50;
		this._searchForPkPanel.y=200;
		this._searchForPkPanel.visible=false;

		this.createLoadingMovieClip();
		this.switchToReceiveList();
		this.addEvent();
	}

	private drawBackground(){
		let sp:egret.Shape=new egret.Shape();
		let g=sp.graphics;
		g.beginFill(0xffffff);
		g.drawRect(0,0,this._width,this._height*0.8);
		sp.y=this._height*0.08;
		this.addChild(sp);
	}


	private addEvent(){
		this._tabBar.addEventListener("change",(e)=>{
			this._index=e.data.index;
			if(this._index==1){
				this.switchToReceiveList();
			}else{
				this.switchToSendList();
			}
		},this);

		this._sendList.addEventListener("ok",(e)=>{
			let id=e.data.userData.order;
			console.log(e.data.userData,'删除');
			this.removeObjId=id;
			DataBus.curTargetCompettiveId=e.data.userData.id;
			WebServerData.webServer.delMessage(DataBus._token,DataBus.curTargetCompettiveId,this.deleteCompettiveSendDone,this)
			this.showLoadingAnimation();
		},this);

		this._receiveList.addEventListener("accept",(e)=>{
			let id=e.data.userData.order;
			console.log(e.data.userData,'接受');
			DataBus.getAnswerSheetId=this.getMessageObjData.data.messageListMinor[e.data.userData.order].answerSheetID;
			DataBus.curTargetCompettiveId=e.data.userData.id;
			this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'accept'));//接受挑战
		},this);

		this._receiveList.addEventListener("reject",(e)=>{
			let id=e.data.userData.order;
			console.log(e.data.userData,'拒绝');
			DataBus.curTargetCompettiveId=e.data.userData.id;
			this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'reject'));//拒绝挑战
		},this);

		this._iWantPKBtn.touchEnabled=true;
		this._iWantPKBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			this._blackMask.visible=true;
			this._searchForPkPanel.visible=true;
			WebServerData.webServer.getUser(DataBus._token,this.getUserSendDone,this)
		},this);

		this._searchForPkPanel.addEventListener("update",(e)=>{
			WebServerData.webServer.getUser(DataBus._token,this.getUserSendDone,this);
		},this);

		this._searchForPkPanel.addEventListener("close",(e)=>{
			this._blackMask.visible=false;
			this._searchForPkPanel.visible=false;
		},this);

		this._searchForPkPanel.addEventListener("startPk",(e)=>{
			console.log(e.data.userData);
			if(e.data.userData.selectable==false){
				return LayerDialogBoxScene.getInstance().newDialogBoxEvent('当前玩家已被挑战,请明天再来.');
			}else{
				this.userData= e.data.userData;
				LayerDialogBoxScene.getInstance().newDialogBoxEvent('确定要挑战'+e.data.userData.nickName+'吗？',DialogBox.TypeModel.Type_Warn,this.ChallengeClassComplete,this,'取  消','确  定');
				return;
			}
			// this.userData= e.data.userData;
			// LayerDialogBoxScene.getInstance().newDialogBoxEvent('确定要挑战'+e.data.userData.nickName+'吗？',DialogBox.TypeModel.Type_Warn,this.ChallengeClassComplete,this,'取  消','确  定');
		},this);

		
		this._receiveList.addEventListener("delete",(e)=>{
			let id=e.data.userData.order;
			console.log(e.data.userData,'删除');
			this.removeObjId=id;
			DataBus.curTargetCompettiveId=e.data.userData.id;
			WebServerData.webServer.delMessage(DataBus._token,DataBus.curTargetCompettiveId,this.deleteCompettiveSendDone,this)
			this.showLoadingAnimation();
		},this);

	}

	//删除竞技消息
	private deleteCompettiveSendDone(e){
		console.log(e)
		if(this._index==1){
			this._receiveList.removeItemBy(this.removeObjId);
			this._tabBar.setReceiveNum(this._receiveList.getListLength());
		}
		if(this._index==2){
			this._sendList.removeItemBy(this.removeObjId);
			this._tabBar.setSendNum(this._sendList.getListLength());
		}
		this.hideLoadingAnimation()
	}

	private ChallengeClassComplete(e){
		if(e){
			this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,this.userData));//找人PK
		}else{
			
		}
		// ChallengeClass.challenge.killLoad();
	}

	//获取用户列表回调
	private getUserSendDone(data){
		console.log('获取用户列表：',data);
		var userListArr:Array<any>=[];
		userListArr = this._public.formattingUserListData(data.data.userlist);
		console.log('格式化后选择pk对象:',userListArr);
		this._searchForPkPanel.setData(userListArr);
	}
	
	private switchToReceiveList(){
		WebServerData.webServer.getMessage(DataBus._token,this.getMessageHandler,this);
		this._sendList.visible=false;
		this.showLoadingAnimation();//加载进度条		
	}
	/**
     * 查看竞技消息
     */
    private getMessageHandler(e){
        console.log('竞技消息：',e);
		this.getMessageObjData=e;
		this.firstPkArr = this._public.formattingFirstPkData(e.data.messageListFirst);
		this.trucePkArr = this._public.formattingTrucePkData(e.data.messageListMinor);
        console.log('格式化后竞技消息-发起：',this.firstPkArr);
        console.log('格式化后竞技消息-收到：',this.trucePkArr);
		this.hideLoadingAnimation();
		
		if(this._index==1 && this.trucePkArr.length>0){
			this.hideLoadingAnimation();
			this.showReceiveList(this.trucePkArr);
		}else{
			LayerDialogBoxScene.getInstance().newDialogBoxEvent('你没有收到pk邀请\n你可以向别人发起pk！');
		}
    }

	private switchToSendList(){
		this._receiveList.visible=false;
		if(this._index==2 && this.firstPkArr.length>0){
			this.hideLoadingAnimation();
			this.showSendList(this.firstPkArr);
		}else{
			LayerDialogBoxScene.getInstance().newDialogBoxEvent('你没有发起pk\n向别人发起pk吧!');
		}
	}

	private showSendList(data){
		this._sendList.setDatas(data);
		this._sendList.visible=true;
		this._sendList.alpha=0;
		egret.Tween.get(this._sendList).to({alpha:1},200);
		this._tabBar.setSendNum(this._sendList.getListLength());
	}

	private showReceiveList(data){
		this._receiveList.setDatas(data);
		this._receiveList.visible=true;
		this._receiveList.alpha=0;
		egret.Tween.get(this._receiveList).to({alpha:1},200);
		this._tabBar.setReceiveNum(this._receiveList.getListLength());
	}

	private showLoadingAnimation(){
		this._loadingMc.visible=true;
		this._loadingMc.play(-1);
	}

	private hideLoadingAnimation(){
		this._loadingMc.visible=false;
		this._loadingMc.stop();
	}

	private createLoadingMovieClip(){
		var data = RES.getRes("loading_json");
		var txtr = RES.getRes("loading_png");
		var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr );
		this._loadingMc = new egret.MovieClip( mcFactory.generateMovieClipData("timg"));
		this._loadingMc.anchorOffsetX=this._loadingMc.width/2;
		this._loadingMc.anchorOffsetY=this._loadingMc.height/2;
		this._loadingMc.x=this._width/2;
		this._loadingMc.y=this._height/2;
		this.addChild(this._loadingMc);
		this.touchEnabled
	}

	//返回世界地图后，界面更新
	public updatePkPanel(){
		this._blackMask.visible=false;
		this._searchForPkPanel.visible=false;
	}
}