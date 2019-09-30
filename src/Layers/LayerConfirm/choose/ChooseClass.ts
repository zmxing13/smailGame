//闯关选择页
class ChooseClass extends BaseContainer {
    private _public:PublicClass = new PublicClass();
    private objArr:Array<any>=[];
    private gameStatus:number=0;

    private chooseConfirm:ChooseConfirm;
    private choosePractice:ChoosePractice;

	public constructor(_gameStatus:number) {
		super();
        this.gameStatus=_gameStatus;
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}
	
    /**
     * 返回世界地图后初始化内容
     */
    public updataInit(){
        if(this.chooseConfirm){
            this.chooseConfirm.updataInit();
        }
        if(this.choosePractice){
            this.choosePractice.updataInit();
        }
    }

    /**
     * 设置按钮点击状态
     */
    public setBtnToucEnabled(_arr:Array<any>){
        var i,
            typeArr:Array<any>=[],
            gradeNameArr:Array<any>=[],
            gradeTitleArr:Array<any>=[],
            titleTypeScope:number=0,        //题干类型的数量；-1：计算题-2：阅读题-3：看图题
            gradeScope:number=0,            //年级范围1-6，共有几个年级
            arrChild:number=0,
            obj:ImgTemplate;
        
        titleTypeScope = _arr[0].length;
        gradeScope = _arr[1].length;
        
        for(i=0;i<titleTypeScope;i++){
            typeArr.push(_arr[0][i].title);
        }
        for(i=0;i<gradeScope;i++){
            gradeNameArr.push(_arr[1][i].title);
            gradeTitleArr.push(_arr[1][i].classLevel.length);
        }

        if(this.gameStatus==1){
            //闯关
            this.chooseConfirm = new ChooseConfirm(gradeTitleArr);
            this.addChild(this.chooseConfirm);
            this.chooseConfirm.addEventListener(EventEnumerate.SELECT_COMPLETE,this.chooseConfirmComplete,this);
        }else if(this.gameStatus==2){
            //练习
            this.choosePractice = new ChoosePractice(_arr);
            this.addChild(this.choosePractice);
            this.choosePractice.addEventListener(EventEnumerate.SELECT_COMPLETE,this.choosePracticeComplete,this);
        }   
    }
    //闯关
    private chooseConfirmComplete(e:EventManage){
        this.chooseConfirm.DestroyOut();
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,e.data));
    }
    //练习
    private choosePracticeComplete(e:EventManage){
        this.choosePractice.DestroyOut();
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,e.data));
    }

    public destroyChoose(){
        if(this.chooseConfirm){
            this.chooseConfirm.DestroyOut();
        }
        if(this.choosePractice){
            this.choosePractice.DestroyOut();
        }
    }

    /**
     * 创建图形界面
     */
	private initSprite(){
       
	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
       
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		
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