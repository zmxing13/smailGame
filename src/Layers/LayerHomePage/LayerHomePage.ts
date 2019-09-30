/**
 * 个人主页
 */
class LayerHomePage extends BaseContainer{
    private _public:PublicClass = new PublicClass();
    private disPlaySp:egret.Sprite;
    /**
     * 修改信息/密码弹板
     */
    private changeBack:ChangeUserInfoOrPasswordClass;
    /**
     * 标题显示类 含返回按钮
     */
    private titleClass:TitleReturnClass;
    /**
     * 个人数据
     */
    private infoDataClass:HomeinfoDataClass;
    /**
     * 荣誉徽章
     */
    private honorClass:HomeHonorClass;
    
	public constructor() {
		super();
        LoadSeadScreen.loadScreen.saveLoad();
        //获取用户数据
        WebServerData.webServer.getUserData(DataBus._token,this.getUserDataSendDone,this);
	}
    
    //获取用户数据
    private getUserDataSendDone(e:any){
        console.log('获取用户数据:',e);
        //体力
        DataBus._power=e.data.power.power;
        //等级
        if(e.data.levelInfo.length!=0)DataBus._level=this._public.parsingLevelData(e.data.levelInfo);
        //积分
        DataBus._score=e.data.score;
        //获取用户信息
        WebServerData.webServer.getUserInfo(DataBus._token,this.getUserInfoSendDone,this);
    }
    //获取用户信息
    private getUserInfoSendDone(e:any){
        console.log('获取用户信息:',e);
        DataBus._nickName=e.data.nickname;
        DataBus._userAvatarUrl=e.data.picture.split('?')[0];
        var promise=this._public.aisleUrlReturnTexture(DataBus._userAvatarUrl);
        promise.then(function(data){
            // console.log(data,'---头像---');
            DataBus._userAvatarTexture=data;
            //获取徽章
            WebServerData.webServer.getEmblen(DataBus._token,this.getUserEmblenSendDone,this);
        }.bind(this))
    }
    //获取徽章
    private getUserEmblenSendDone(e:any){
        console.log('获取徽章:',e);
        DataBus._honorType = e.data.emblemList;
        DataBus._honorNum = e.data.holdEmblem;  
        // console.log(DataBus._honorType);  
        // console.log(DataBus._honorNum);  
        this.initSprite();
        this.UpWindowData();
        this.initMessage();
        LoadSeadScreen.loadScreen.killLoad();
    }

	/**
     * 创建图形界面
    */
	private initSprite(){
        this.disPlaySp = new egret.Sprite();
        this.addChild(this.disPlaySp);

        this.titleClass = new TitleReturnClass('homePageTitle');
        this.titleClass.returnBtn.touchEnabled=true;
        this.titleClass.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.textClick,this);
        this.disPlaySp.addChild(this.titleClass);

        this.infoDataClass = new HomeinfoDataClass();
        this.disPlaySp.addChild(this.infoDataClass);
        
        this.honorClass = new HomeHonorClass(Main.W,Main.H-(this.titleClass.height+this.infoDataClass.height));
        this.disPlaySp.addChild(this.honorClass);

        this.changeBack =  new ChangeUserInfoOrPasswordClass();
        this.addChild(this.changeBack);
	}

    private textClick(e:egret.TouchEvent){
        // egret.localStorage.clear();
        // console.log('------清理本地所有注册信息------')
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,true));
    }

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        this.disPlaySp.x=this.disPlaySp.y=0;
        
        this.titleClass.x = Main.W*.1;
        this.titleClass.y = Main.H*.01;

        this.infoDataClass.x = 0;
        this.infoDataClass.y = this.titleClass.y + this.titleClass.height;

        this.honorClass.x = 0;
        this.honorClass.y = this.infoDataClass.y + this.infoDataClass.height;
        
	}
	/**
     * 初始化事件消息
     */
	private initMessage(){
        this.infoDataClass.addEventListener(EventEnumerate.SELECT_COMPLETE,this.infoDataClassComplete,this);
        this.changeBack.addEventListener(EventEnumerate.SELECT_COMPLETE,this.changeBackComplete,this);
	}

    private infoDataClassComplete(e:EventManage){
        // console.log(e.data);
        if(e.data=='changeInfo'){
            console.log('修改用户信息')
            LoadSeadScreen.loadScreen.saveLoad('资源加载中')
            WebServerData.webServer.getPortraitList(DataBus._token,this.getPortraitListSendDone,this);
        }else if(e.data=='changePassword'){
            console.log('修改登陆密码');
            this.changeBack.changeUserPassWordHandler();
        }
    }

    private changeBackComplete(e:EventManage){
        if(e.data=="updateNickName"){
            this.infoDataClass.userNickName.text=DataBus._nickName;
            this.infoDataClass.infoData.texture=DataBus._userAvatar.texture;
        }
    }

    //获取头像列表
    private getPortraitListSendDone(data:any){
        LoadSeadScreen.loadScreen.killLoad();
        this.parsingPortraitList(data.data.PortraitList)
    }

    private parsingPortraitList(_portraitList:Array<string>){
        console.log('头像列表资源加载完成',_portraitList)
        let portraitList,i,l,num=0,curPor,tempStr,tempId,promise,
        promiseArr:Array<any>=[],
        portraitUrlArr:Array<string>;
        
        portraitList = _portraitList;
        portraitUrlArr=[];
        
        for (i=0;i<portraitList.length;i++){
            curPor = portraitList[i].url;
            portraitUrlArr.push(curPor)
        }
        DataBus._userAvatarTextureArr=[];
        DataBus._userAvatarIdArr=[];
        
        for (l=0;l<portraitUrlArr.length;l++){
            tempStr = portraitUrlArr[l];
            tempStr = tempStr.match(/(\S*)jpg/)[0];     //使用正则 截取字符串 'jpg' 前所有内容(含jpg)
            tempId = portraitUrlArr[l];
            tempId = tempId.match(/id=(\S*)/)[1];       //使用正则 截取字符串 'id=' 后所有内容
            promise = this._public.aisleUrlReturnTexture(tempStr,l+1,tempId);
			promiseArr.push(promise)
        }
        Promise.all(promiseArr).then((function(data){
            console.log(data)
            console.log('加载完成');
            DataBus._userAvatarTextureArr=data;
            this.changeBack.changeUserInfoHandler();
        }).bind(this))
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