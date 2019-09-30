class HistoryPanel extends egret.Sprite{
    private _public:PublicClass = new PublicClass();

	private _width:number;
	private _height:number;

	private _historyList:HistoryListUI;
	private _detailList:HistoryListUI;
	private _index:number;
	private _loadingMc:egret.MovieClip;

	private _blackMask:egret.Shape;
	private _historyTitlePanel:HistoryTitlePanel;

	private _pageTabBtns:PageTabBtns;

	private getUserTrackArr:Array<any>=[];			//用户足迹数据
	private getUserTrackDataArr:Array<any>=[];		//用户足迹id数据

	

	public constructor(w:number,h:number) {
		super();
		this._width=w;
		this._height=h;
		this.init();
	}

	public init(){

		/*历史记录列表*/
		this._historyList=new HistoryListUI(this._width,this._height*0.9);
		this.addChild(this._historyList);
		this._historyList.y=0;

		/*切换按钮*/
		this._pageTabBtns=new PageTabBtns(Main.W*0.1,12,5);
		this._pageTabBtns.anchorOffsetX=this._pageTabBtns.width/2;
		this.addChild(this._pageTabBtns);
		this._pageTabBtns.y=this._height-this._height*0.1;
		this._pageTabBtns.x=this._width/2;

		/*this._detailList=new HistoryListUI(this._width,this._height*0.8);
		this.addChild(this._detailList);
		this._detailList.x=50;
		this._detailList.y=20;
		this._detailList.visible=false;*/

		this._blackMask=new egret.Shape();
		let g=this._blackMask.graphics;
		g.beginFill(0x000000,0.5);
		g.drawRect(0,0,this._width,this._height);
		this.addChild(this._blackMask);
		this._blackMask.visible=false;
		this._blackMask.touchEnabled=true;

		this._historyTitlePanel=new HistoryTitlePanel(this._width*0.9,this._height*0.9);
		this._historyTitlePanel.x=this._width*0.05;
		this._historyTitlePanel.y=this._height*0.02;
		this._historyTitlePanel.visible=false;
		this.addChild(this._historyTitlePanel);

		this.createLoadingMovieClip();
		WebServerData.webServer.getUserTrack(DataBus._token,1,100,this.getUserTrackSendDataDone,this);
		
	}
	//获取用户足迹信息
	private getUserTrackSendDataDone(e){
		console.log('获取足迹信息',e);
		if(e.code=='10001'){
			this.getUserTrackArr = this._public.formattingUserTrackData(e.data.dataList);
		}
		console.log('格式化后的数组数据：',this.getUserTrackArr);

		this.switchToList(1)
		this.addEvent();
	}

	private getAnswerSheetDataDone(e){
		console.log('获取足迹id信息',e);
		this.getUserTrackDataArr = this._public.formattingUserTrackIdData(e.data);

		this._blackMask.visible=true;
		this._historyTitlePanel.visible=true;
		this.showLoadingAnimation();
		this._historyTitlePanel.setData([]);
		egret.setTimeout(()=>{
			this.hideLoadingAnimation();
			this._historyTitlePanel.setData(this.getUserTrackDataArr);
		},this,10);

	}

	private addEvent(){
		this._historyList.addEventListener("detail",(e)=>{
			//这里请求具体题目数据;
			console.log(e.data.userData);
			WebServerData.webServer.getAnswerSheet(DataBus._token,e.data.userData.id,this.getAnswerSheetDataDone,this);
			
		},this);

		this._pageTabBtns.addEventListener("switchPage",(e)=>{
			let index=Number(e.data.index);
			this.switchToList(index);
		},this);

		this._historyTitlePanel.addEventListener("close",(e)=>{
			this._blackMask.visible=false;
			this._historyTitlePanel.visible=false;
		},this)
	}
	
	private switchToList(pageId){

		/*切换至pageId页*/
		/*先请求数据*/
		//  let data=[{
        //             type:"level",
        //             info:"闯关：1到5级",
        //             date:"2019-05-03"
        //         },{
        //             type:"pk",
        //             info:"pk:胜利",
        //             date:"2019-05-03"
        //         },{
        //             type:"practice",
        //             info:"练习：正确5题，错误5题",
        //             date:"2019-05-03"
        //         }];

		this._historyList.visible=false;
		this.showLoadingAnimation();

		egret.setTimeout(()=>{
			this.hideLoadingAnimation();
			this.showHistoryList(this.getUserTrackArr);
		},this,10)
		
	}


	private showHistoryList(data){
		this._historyList.setDatas(data);
		this._historyList.visible=true;
		this._historyList.alpha=0;
		egret.Tween.get(this._historyList).to({alpha:1},200);
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
	}
}