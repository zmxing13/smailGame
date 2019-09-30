//练习游戏模式，按钮选择
class ChoosePractice extends BaseContainer {
    private _public:PublicClass = new PublicClass();
	private gameDataArr:Array<any>=[];

	private typeArr:Array<any>=[];
	private gradeNameArr:Array<any>=[];
	private gradeTitleArr:Array<any>=[];

	private specialBtn:ImgTemplate;
	private picureBtn:ImgTemplate;
	private gradeBtn:ImgTemplate;

	private specialBtnArr:Array<any>=[];
	private picureBtnArr:Array<any>=[];
	private gradeBtnArr:Array<any>=[];

	private returnArr:Array<any>=[];

	//模式-混合/专项
	private statusSp:egret.Sprite;
	//类型-口算/文字/图片/视频
	private typeSp:egret.Sprite;
	//年级-1-6年级
	private gradeSp:egret.Sprite;

	public constructor(_arr:Array<any>) {
		super();
		this.gameDataArr=_arr;
		this.formatting();
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}
	//数据格式化
	private formatting(){
		this.typeArr = this.gameDataArr[0];
		this.gradeNameArr = this.gameDataArr[1];
		this.gradeTitleArr = this.gameDataArr[2];
	}

	/**
     * 返回世界地图后初始化内容
     */
    public updataInit(){
		this.returnArr=[];
		this.statusSp.visible=true;
		this.typeSp.visible=false;
		this.gradeSp.visible=false;
		this.shutdownOpenObjTouchEbavled(this.specialBtnArr,true);
		this.shutdownOpenObjTouchEbavled(this.picureBtnArr);
		this.shutdownOpenObjTouchEbavled(this.gradeBtnArr);
    }

	/**
     * 创建图形界面
     */
	private initSprite(){
		var i,
		arrChild:number=0,
		obj,objTitle;
		this.statusSp=new egret.Sprite();
		this.addChild(this.statusSp);

		this.typeSp=new egret.Sprite();
		this.addChild(this.typeSp);

		this.gradeSp=new egret.Sprite();
		this.addChild(this.gradeSp);

		for(i=0;i<2;i++){
			this.specialBtn = new ImgTemplate('img_config_hybrid_'+(i+1));
			this.specialBtn.x=0;
			this.specialBtn.y=this.specialBtn.height*i;
			this.specialBtn.touchEnabled=true;
			this.specialBtn.id=(i+1);
			this.specialBtnArr.push(this.specialBtn);
			this.statusSp.addChild(this.specialBtn);
			this.specialBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.specialBtnTouch,this);
		}

		for(i=0;i<this.typeArr.length;i++){
			this.picureBtn = new ImgTemplate('img_config_oral_'+(i+1));
			this.picureBtn.x=0;
			this.picureBtn.y=this.picureBtn.height*i;
			this.picureBtn.visible=false;
			this.picureBtn.id=(i+1);
			this.picureBtnArr.push(this.picureBtn);
			this.typeSp.addChild(this.picureBtn);
			this.picureBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.picureBtnTouch,this);
		}

		for(i=0;i<this.gradeNameArr.length;i++){
			arrChild=this.gradeNameArr[i].classLevel.length;
			this.gradeBtn = new ImgTemplate('img_confirm_chooseGrade_'+(i+1));
			this.gradeBtn.x=0;
			this.gradeBtn.y=this.gradeBtn.height*i;
			this.gradeBtn.id=(i+1);
			this.gradeSp.visible=false;
			if(arrChild!=0){
                this.gradeBtn.statusBoo=true;
				this.gradeBtnArr.push(this.gradeBtn);
            }else{
                this.gradeBtn.setBitmapFlilter();
            }
			this.gradeSp.addChild(this.gradeBtn);
			this.gradeBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.gradeBtnTouch,this);
		}

	}

	//模式
	private specialBtnTouch(e:egret.TouchEvent){
		if(e.currentTarget.id==1){
			this.gradeSp.visible=true;
			this.shutdownOpenObjTouchEbavled(this.gradeBtnArr,true);
			this.returnArr.push(e.currentTarget.id);
		}else if(e.currentTarget.id==2){
			this.typeSp.visible=true;
			this.shutdownOpenObjTouchEbavled(this.picureBtnArr,true);
		}
		this.shutdownOpenObjTouchEbavled(this.specialBtnArr);
		this.statusSp.visible=false;
		
		this.returnArr.push(e.currentTarget.id);
	}
	//类型
	private picureBtnTouch(e:egret.TouchEvent){
		this.shutdownOpenObjTouchEbavled(this.picureBtnArr);
		this.typeSp.visible=false;
		this.gradeSp.visible=true;
		this.shutdownOpenObjTouchEbavled(this.gradeBtnArr,true);
		this.returnArr.push(e.currentTarget.id);
	}
	//年级
	private gradeBtnTouch(e:egret.TouchEvent){
		this.shutdownOpenObjTouchEbavled(this.gradeBtnArr);
		this.gradeSp.visible=false;
		this.returnArr.push(e.currentTarget.id);
		this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,this.returnArr));
	}

	//禁止/开始-数组内容的触摸事件
	private shutdownOpenObjTouchEbavled(_arr:Array<any>,stateBoo:boolean=false){
		let i,obj;
		for(i=0;i<_arr.length;i++){
			obj = _arr[i];
			obj.touchEnabled=stateBoo;
			obj.visible=stateBoo;
		}
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