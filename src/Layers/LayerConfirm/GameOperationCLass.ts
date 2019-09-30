//游戏操作盒子-游戏效果显示区域，答题按钮区域
class GameOperationCLass extends BaseContainer {
    private _public:PublicClass = new PublicClass();
    /**
     * 选择年级框按钮
    */
    public choosePage:ChooseClass;
    /**
     * 答题模块
    */
    private quesPanel:QuesPanel;
    /**
     * 答题完成，状态显示页
     */
    private finshStatus:finshStatusClass;
    /**
     * 游戏模式-闯关/练习/竞技
     */
    private gameStatus:string='';
    /**
     * 游戏数据数组
     */
    private gameDataArr:Array<any>=[];
    /**
     * 类型题
    */
    private typeArr:Array<string>=[];
    /**
     * 年级，有哪几个年级
    */
    private gradeNameArr:Array<string>=[];
    /**
     * 年级，关卡题的长度
     */
    private gradeTitleArr:Array<number>=[];
    /**
     * 当前关卡题干数据
     */
    private currPointDataArr:Array<any>=[];
    /**
     * 下一关卡题干数据
     */
    private nextPointDataArr:Array<any>=[];
    /**
     * 当前关卡数
     */
    private checkpointNum:number=1;
    /**
     * 年级
    */
    private classId:number=0;
    /**
     * 类型-混合,不区分类型
    */
    private categoryId:number=0;
    /**
     * 关卡/等级
    */
    private levelId:number=0;
    /**
     * 模式-1：混合 -2：专项
    */
    private statusId:number=0;
    /**
     * 当前关卡答对数
    */
    private finshNum:number=0;
    /**
     * 当前关卡连对次数
     */
    private evenForMax:number=0;
    /**
     * 当前关卡打错数
    */
    private wrongNum:number=0;
    /**
     * 首次获取题干数据
    */
    private firstGetServerBoo:boolean=false;
    /**
     * 当前年级答题的总数
    */
    private curGradeCheckpointMax:number=0;
    /**
     * 是否开始游戏
     */
    public gameStartBoo:boolean=false;

    //-----以下是上传答题卡内容数据-----
    private send_status:number=0;                           //游戏模式-1.闯关-2.练习-3.竞技
    private send_tsum:number=0;                             //答题总数
    private send_score:number=0;                            //分数
    private send_time:number=0;                             //用时-单位秒
    private send_answers:Array<any>=[];                     //答案数组-列表类型
    private timer:egret.Timer = new egret.Timer(1000,0);    //答题计时-单位秒

	public constructor(_gameStatus:string) {
		super();
        this.gameStatus=_gameStatus;
        //获取数据
        WebServerData.webServer.GetMenuTree(DataBus._token,this.getMenuTreeSendDone,this);
        LoadSeadScreen.loadScreen.saveLoad();
	}

    /**
     * 返回世界地图后初始化内容
     */
    public updataInit(){
        this.typeArr=[];                 
        this.gradeNameArr=[];
        this.gradeTitleArr=[];
        this.gameDataArr=[];

        this.currPointDataArr=[];
        this.nextPointDataArr=[];

        this.checkpointNum=1;
        this.classId=0;
        this.categoryId=0;
        this.levelId=0;
        this.statusId=0;
        this.finshNum=0;
        this.evenForMax=0;
        this.wrongNum=0;
        this.firstGetServerBoo=false;
        this.curGradeCheckpointMax=0;
        this.send_status=0;
        this.send_tsum=0;
        this.send_time=0;
        this.send_answers=[];
        this.timer.stop();

        this.quesPanel.hiddenOut(0,0,0);
        this.choosePage.updataInit();
    }
    /**
     * 再次进入后，初始化内容
     */
    public againUpdataInt(_gameStatus:string){
        this.quesPanel.hiddenOut(0,0,0);
        this.choosePage.updataInit();
        this.choosePage.hiddenOut(0,.1,1);
        this.gameStatus=_gameStatus;
        //获取数据
        WebServerData.webServer.GetMenuTree(DataBus._token,this.getMenuTreeSendDone,this);
        LoadSeadScreen.loadScreen.saveLoad();
    }

    //服务器访问完成后执行
    private getMenuTreeSendDone(data:any){
        console.log('获取目录结构:',data.data);
        LoadSeadScreen.loadScreen.killLoad();
        var i,
            titleTypeScope:number=0,        //题干类型的数量；-1：计算题-2：阅读题-3：看图题
            gradeScope:number=0;            //年级范围1-6，共有几个年级
        this.typeArr=[];                 
        this.gradeNameArr=[];
        this.gradeTitleArr=[];
        
        this.gameDataArr=[data.data["categoryList"],
                            data.data["classGroup"],
                            data.data["status"]];

        titleTypeScope = data.data.categoryList.length;
        gradeScope = data.data.classGroup.length;
        for(i=0;i<titleTypeScope;i++){
            this.typeArr.push(data.data.categoryList[i].title)
        }
        for(i=0;i<gradeScope;i++){
            this.gradeNameArr.push(data.data.classGroup[i].title)
            this.gradeTitleArr.push(data.data.classGroup[i].classLevel.length)
        }

        if(this.gameStatus=='img_confirmTItle'){
            this.send_status=1;
        }else if(this.gameStatus=='img_practiceTitle'){
            this.send_status=2;
        }else if(this.gameStatus=='img_CompettiveTitle'){
            this.send_status=3;
        }
        this.initSprite();
		this.UpWindowData();
		this.initMessage();
    }

	/**
     * 创建图形界面
     */
	private initSprite(){
        this.quesPanel =new QuesPanel(Main.W/10*8,Main.H/10*8);
        this.quesPanel.x=(Main.W-this.quesPanel.width)/2;
        this.quesPanel.y=0;
        this.quesPanel.alpha=0;
        this.quesPanel.visible=false;
        this.addChild(this.quesPanel);

        this.choosePage = new ChooseClass(this.send_status);
        this.choosePage.setBtnToucEnabled(this.gameDataArr);
        this.addChild(this.choosePage);
	}

	/**
     * 界面布局 (尺寸发生变化时会执行) 
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        this.choosePage.x=(Main.W-this.choosePage.width)/2;
        this.choosePage.y=(Main.H/10*8-this.choosePage.height)/2;
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
        this.choosePage.addEventListener(EventEnumerate.SELECT_COMPLETE,this.choosePageComplete,this);
        this.addEventListener(EventEnumerate.SELECT_COMPLETE,this.thisLoadServerDataComplete,this);
	}
    //年级选项事件
    private choosePageComplete(e:EventManage){
        if(this.gameStatus=='img_confirmTItle'){
            //竞技
            this.classId=e.data;                //年级
            this.categoryId=this.send_status;   //类型-混合,不区分类型
            this.levelId=1;                     //关卡/等级
            this.statusId=1;                    //模式-1：混合 -2：专项
            this.curGradeCheckpointMax = this.gradeTitleArr[e.data-1];
        }else if(this.gameStatus=='img_practiceTitle'){
            //练习
            this.classId=e.data[2];             //年级
            this.categoryId=e.data[1];          //类型-混合,不区分类型
            this.levelId=1;                     //关卡/等级
            this.statusId=e.data[0];            //模式-1：混合 -2：专项
            this.curGradeCheckpointMax = this.gradeTitleArr[e.data[0]-1];
        }
        LoadSeadScreen.loadScreen.killLoad();

        this.gameStartBoo=true;
        
        this.choosePage.hiddenOut(0,0,0);
        console.log('当前选中的年级是：'+this.classId+"类型："+this.categoryId+"模式："+this.statusId);

        //开始闯关,减少体力值
        let reduceDataArr:Array<number>=this._public.reduceGradePower(DataBus._power,this.classId);
        if(reduceDataArr[0]!=-1&&reduceDataArr[1]!=-1){
            console.log('减少体力值：'+reduceDataArr);
            DataBus._power=reduceDataArr[0];
            WebServerData.webServer.usePower(DataBus._token,reduceDataArr[1],this.reducePowerDataDone,this);
            WebServerData.webServer.getQuestion(DataBus._token,this.classId,this.categoryId,this.levelId,this.statusId,this.getQuestionSendDone,this);
        }else{
            LayerDialogBoxScene.getInstance().newDialogBoxEvent('体力值不足，请休息一会');
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'powerOver'));//答题完成
            return;
        }
    }
    
    //自定义派发事件，资源加载完成，数据数组格式化后执行
    private thisLoadServerDataComplete(e:EventManage){
        if(e.data=='sheetOver'){
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'sheetOver'));//答题完成
            return;
        }else if(e.data==''){
            
        }
        if(!Array.prototype.isPrototypeOf(e.data)){
            // return LoadSeadScreen.loadScreen.saveLoad('加载失败,请重试！');
        }else{
            if(!this.firstGetServerBoo){
                this.saveQuesPanel(e.data);
                this.currPointDataArr = e.data;
            }else{
                this.nextPointDataArr=e.data;
            }
            this.firstGetServerBoo=true;
        }
    }

    //显示答题模块
    private saveQuesPanel(_dataArr:Array<any>){
        LoadSeadScreen.loadScreen.killLoad();
        this.quesPanel.hiddenOut();
        this.quesPanel.visible=true;
        this.quesPanel.setDatas(_dataArr);
        this.quesPanel.addEventListener(GameEvent.RIGHT,this.quesPanelRight,this);
        this.quesPanel.addEventListener(GameEvent.WRONG,this.quesPanelWrong,this);
        this.quesPanel.addEventListener(GameEvent.SWITCH_TO_NEXT_TITLE,this.quesPanelNext,this);
        this.quesPanel.addEventListener(GameEvent.TITLE_FINISH,this.quesPanelFinsh,this);
    }
    //计时
    private timerCallFunc(e:egret.TimerEvent){
        this.send_time+=1;
        // console.log('计时：'+this.send_time);
    }
    //答对
    private quesPanelRight(e){
        let index=e.data.titleId;
        // console.log('答题正确'+index,'_题干id：'+e.data.Id);
        this.finshNum+=1;
        this.evenForMax+=1;
        this.send_answers.push([e.data.Id,e.data.btnLable]);
        //计时
        if(index==1){
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerCallFunc,this);
            this.timer.start();
        }
    }
    //答错
    private quesPanelWrong(e){
        let index=e.data.titleId;
        // console.log('答题错误'+index,'_题干id：'+e.data.Id);
        this.wrongNum+=1;
        this.evenForMax=0;
        this.send_answers.push([e.data.Id,e.data.btnLable]);
        //计时
        if(index==1){
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerCallFunc,this);
            this.timer.start();
        }
    }
    //下一题
    private quesPanelNext(e){
        let index=e.data.titleId;
        // console.log('切换下一题'+index);
        if(index==4){
            this.levelId+=1;               //关卡/等级
            if(this.levelId>this.curGradeCheckpointMax){
                return console.log('已是最后一关,无需预加载内容');
            }
            WebServerData.webServer.getQuestion(DataBus._token,this.classId,this.categoryId,this.levelId,this.statusId,this.getQuestionSendDone,this);
        }
    }
    //答题完成
    private quesPanelFinsh(e){
        console.log('答题结束');
        this.quesPanel.hiddenOut(.1,.1,0);
        if(!this.finshStatus){
            // console.log('---答题反馈页不存在');
            this.finshStatus=new finshStatusClass();
            this.addChild(this.finshStatus);
            this.finshStatus.addEventListener(EventEnumerate.SELECT_COMPLETE,this.finshStatusComplete,this);
        }else{
            // console.log('---答题反馈页已存在');
            this.finshStatus.hiddenOut();
            this.finshStatus.visible=true;
        }

        this.finshStatus.setText(this.checkpointNum,this.finshNum,this.wrongNum);
        this.finshStatus.x=(Main.W-this.finshStatus.width)/2;
        this.finshStatus.y=(this.height-this.finshStatus.height)/2;

        //-----发送答题卡数据-----
        this.send_tsum=this.finshNum+this.wrongNum;         //答题总数
        this.timer.stop();
        this.send_score = this._public.statisticalIntegral(this.classId,this.finshNum,this.evenForMax,this.send_time);
        console.log('游戏模式:'+this.send_status,'答题总数:'+this.send_tsum,'失误次数:'+this.wrongNum,'分数:'+this.send_score,'时间:'+this.send_time,'答题卡:'+this.send_answers)
        WebServerData.webServer.submitAnswer(DataBus._token,this.send_status,this.send_tsum,this.wrongNum,this.send_score,this.send_time,this.send_answers,this.sendPlayTitleData,this);
        this.send_tsum=0;
        this.finshNum=0;
        this.wrongNum=0;
        this.send_score=0;
        this.send_time=0;
        this.send_answers=[];
        //-----发送答题卡数据-----
    }
    //答题完成，状态显示页
    private finshStatusComplete(e:EventManage){
        this.finshStatus.visible=false;     
        this.finshStatus.hiddenOut(.1,0,0);
        this.finshStatus.clearText();
        if(e.data=='againCheckpoint'){
            this.saveQuesPanel(this.currPointDataArr);
            this.nextPointDataArr=[];
            this.levelId-=1;
        }else if(e.data=='nextCheckpoint'){
            if(this.levelId>this.curGradeCheckpointMax){
                LayerDialogBoxScene.getInstance().newDialogBoxEvent('已是最后一关,请选择其他年级闯关')
                this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,'sheetOver'));//答题完成
                return;
            }
            this.checkpointNum+=1;//关卡值+1
            this.currPointDataArr = this.nextPointDataArr;
            this.saveQuesPanel(this.currPointDataArr);
            this.nextPointDataArr=[];
        }
    }

    private sendPlayTitleData(data){
        console.log('答题卡上传完成：',data);
        PlayFeedbackAnimation.playAnimation.saveLoad();
    }

    /**
     * ------------------------
     * ---重要:获取题干内容-----
     * ------------------------
    */
    private getQuestionSendDone(data:any){
        console.log('获取题干内容：',data.data);
        var i,l,curobj,returnobj,promise,num=0;
        var returnobjArr:Array<any>=[],
            promiseBitmapArr:Array<any>=[],
            bitArr:Array<any>=[];
        for (i=0;i<data.data.length;i++){
            curobj = data.data[i];
            if(curobj.type==1||curobj.type==2){
                returnobj = this._public.parsingTextData(curobj);
                returnobjArr.push(returnobj);
                num++;
                this.loadServerDataDone(num,data.data.length,returnobjArr);
            }else if(curobj.type==3){
                //确定异步加载后的资源和对象进行了匹配
                returnobj = this._public.parsingBitmapData(curobj);
                returnobjArr.push(returnobj);
                promiseBitmapArr.push(returnobj)
                promise = this._public.aisleUrlReturnTexture(returnobj.title);
                bitArr.push(promise);
                num++;
            }
        }
        Promise.all(bitArr).then((promiseData)=>{
            let k,j,obj,tnum:number=0;
            for (k=0;k<promiseBitmapArr.length;k++){
                obj=promiseBitmapArr[k];
                obj.title=promiseData[k]
                if(k==promiseBitmapArr.length-1){
                    this.loadServerDataDone(num,data.data.length,returnobjArr);
                }
            }            
        }).catch(function(reason){
            // ...
        });
    }
    //加载网络资源->数据格式化->完成
    private loadServerDataDone(curNum:number,totalNum:number,_arr:Array<any>){
        if(curNum!=totalNum){return}
        console.log('done!',_arr);
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,_arr));
    }

    /**
     * 减少体力值成功回调
     */
    private reducePowerDataDone(e){
        console.log('reducePowerData:',e);
        if(e.code==10001){
            if(e.data.status==false){
                console.log('体力不足');
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