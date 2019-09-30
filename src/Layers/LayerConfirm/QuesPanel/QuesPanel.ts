class QuesPanel extends egret.Sprite{
	private _width:number;
	private _height:number;
	private _datas:Array<any>;
	private _titleId:number;
	private _optionUI:OptionsUI;
	private _titleUI:TitleUI;

	public constructor(w:number,h:number) {
		super();
		this._width=w;
		this._height=h;
		this._datas=[];
		this._titleId=1;
		this.createTitleUI();
		this.createOptionUI();
	}

	public setDatas(datas:Array<any>){
		this._datas=datas;
		this._titleUI.setTitleDatas(datas);
		this._optionUI.setOptionDatas(datas);
	}

	public gotoAndStart(titleId){
		if(this._datas.length==0){
			throw new egret.error("请先通过setDatas接口设置题目数据");
		}
		if(titleId>this._datas.length){
			throw new egret.error("总共"+this._datas.length+"道题，不能跳转至第"+titleId+"题。");
		}
		this._titleId=titleId;
		this._titleUI.switchToTitle(this._titleId);
		this._optionUI.switchToTitle(this._titleId);
	}

	private createTitleUI(){
		this._titleUI=new TitleUI(this._width,this._height/2-10);
       	this._titleUI.x=0;
       	this._titleUI.y=0;
       	this.addChild(this._titleUI);
	}

	private createOptionUI(){
		this._optionUI=new OptionsUI(this._width,this._height/2-10);
       	this._optionUI.x=0;
       	this._optionUI.y=this._height/2+10;
       	this.addChild(this._optionUI);
		
		this._optionUI.addEventListener(GameEvent.RIGHT,(e)=>{
			this._titleId=e.data.currentIndex;
           	this.dispatchEvent(new egret.Event(GameEvent.RIGHT,false,false,{titleId:this._titleId,Id:this._datas[this._titleId-1].Id,btnLable:e.data.label}));
       	},this);

       	this._optionUI.addEventListener(GameEvent.WRONG,(e)=>{
			this._titleId=e.data.currentIndex;
           	this.dispatchEvent(new egret.Event(GameEvent.WRONG,false,false,{titleId:this._titleId,Id:this._datas[this._titleId-1].Id,btnLable:e.data.label}));
       	},this);

       	this._optionUI.addEventListener(GameEvent.TITLE_FINISH,(e)=>{
           	this.dispatchEvent(new egret.Event(GameEvent.TITLE_FINISH));
       	},this);

       	this._optionUI.addEventListener(GameEvent.SWITCH_TO_NEXT_TITLE,(e)=>{
			this._titleId=e.data.currentIndex;
			this._titleUI.switchToTitle(this._titleId);
			this.dispatchEvent(new egret.Event(GameEvent.SWITCH_TO_NEXT_TITLE,false,false,{titleId:this._titleId,Id:this._datas[this._titleId-1].Id}));
       	},this);
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