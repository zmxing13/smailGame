class OptionsUI extends egret.Sprite{
	
	private _width:number;
	private _height:number;
	private _space:number;

	private _currentIndex:number;
	private _currentOptions;

	private _titleDatas:Array<any>;
	private _currentTitleData:any;

	public constructor(w:number,h:number) {
		super();
		this._width=w;
		this._height=h;

		this._space=20;
		this._currentIndex=1;
		this._currentOptions=[];
		this._titleDatas=[];
		this._currentTitleData=null;
	}

	public setOptionDatas(datas){
		this._currentIndex=1;
		this._titleDatas=datas;

		if(this._titleDatas.length>0){
			this._currentTitleData=this._titleDatas[this._currentIndex-1];
			if(this._currentOptions.length==0){
				this._currentOptions=this.createOptions(this._currentTitleData.options);
			}else{
				this.updateCurrentOptions(this._currentTitleData.options);
			}
			this.layout();
			this.allowClick();
		}
	}

	public switchToTitle(titleId:number){
		this._currentIndex=titleId-1;
		this.switchNextOptions();
	}

	/*选项布局*/
	private layout(){
		if(this._currentOptions){
			let btnType=this._currentOptions[0];
			if(btnType=="image"){
				for(let i=1;i<this._currentOptions.length;i++){
					let btn=this._currentOptions[i];
					this.addChild(btn);
					btn.x=i%2==0?btn.width+this._space:0;
					btn.y=i<=2?0:btn.height+this._space;
				}
			}else{
				for(let i=1;i<this._currentOptions.length;i++){
					let btn=this._currentOptions[i];
					this.addChild(btn);
					btn.x=0;
					btn.y=(i-1)*(btn.height+this._space);
				}
			}
		}
	}

	/*根据当前数据创建选项列表*/

	private createOptions(data){
		let num=data.length;
		if(num<1){
			return;
		}
		let btnsize=this.calculateBtnSize(data,this._space);
		let arr=[];
		arr.push(btnsize.type);
		for(var i=0;i<num;i++){
			let option=new OptionBtn(btnsize.width,btnsize.height,data[i]);
			option.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e)=>{this.optionTouchBeginHandler(e);},this);
			option.addEventListener(egret.TouchEvent.TOUCH_END,(e)=>{this.optionTouchEndHandler(e)},this);
			arr.push(option);
		}
		return arr;
	}

	/*根据当前数据更新选项列表*/

	private updateCurrentOptions(data){
		let num=data.length;
		if(num<1){
			return;
		}
		let btnsize=this.calculateBtnSize(data,this._space);
		this._currentOptions[0]=btnsize.type;
		for(let i=1;i<=num;i++){
			if(i<this._currentOptions.length){
				let option=this._currentOptions[i];
				option.visible=true;
				option.setWidth(btnsize.width);
				option.setHeight(btnsize.height);
				option.data=data[i-1];
				option.state=ButtonState.UP;
			}else{
				let option=new OptionBtn(btnsize.width,btnsize.height,data[i-1]);
				option.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e)=>{this.optionTouchBeginHandler(e);},this);
				option.addEventListener(egret.TouchEvent.TOUCH_END,(e)=>{this.optionTouchEndHandler(e)},this);
				this._currentOptions.push(option);
			}
		}

		for(let i=num+1;i<this._currentOptions.length;i++){
			let option=this._currentOptions[i];
			option.visible=false;
		}
	}

	/*选择选项*/

	private optionTouchBeginHandler(e){
		let btn=e.currentTarget as OptionBtn;
		let selectType=btn.label;
		let reLabelIndex;
		switch(selectType){
			case "A":
				reLabelIndex=0;
			break;
			case "B":
				reLabelIndex=1;
			break;
			case "C":
				reLabelIndex=2;
			break;
			case "D":
				reLabelIndex=3;
			break;
		}
		if(this.isRight(selectType)){
			btn.state=ButtonState.RIGHT;
			this.dispatchEvent(new egret.Event(GameEvent.RIGHT,false,false,{currentIndex:this._currentIndex,label:reLabelIndex}));
		}else{
			btn.state=ButtonState.WRONG;
			this.dispatchEvent(new egret.Event(GameEvent.WRONG,false,false,{currentIndex:this._currentIndex,label:reLabelIndex}));
		}
		this.preventClick();
		egret.setTimeout(this.switchNextOptions,this,300);
	}

	private isRight(selectType){
		return selectType==this._currentTitleData.correct;
	}

	/*按钮抬起*/

	private optionTouchEndHandler(e){
		let btn=e.currentTarget as OptionBtn;
		//btn.state=ButtonState.UP;
	}

	/*切换下一题的选项*/

	private switchNextOptions(){
		if(this.hasNext()){
			this._currentIndex++;
			this._currentTitleData=this._titleDatas[this._currentIndex-1];
			this.quitCurrentOptions();
			egret.setTimeout(()=>{
				this.enterNextOptions(this._currentTitleData.options);
			},this,800);
			this.dispatchEvent(new egret.Event(GameEvent.SWITCH_TO_NEXT_TITLE,false,false,{currentIndex:this._currentIndex}));
		}else{
			this.dispatchEvent(new egret.Event(GameEvent.TITLE_FINISH));
		}
	}

	private quitCurrentOptions(){
		for(let i=1;i<this._currentOptions.length;i++){
			egret.setTimeout(()=>{
				egret.Tween.get(this._currentOptions[i]).to({x:-Main.W},500)
			},this,i*50);
		}		
	}

	private enterNextOptions(data){
		this.updateCurrentOptions(data);
		this.layout();
		for(let i=1;i<this._currentOptions.length;i++){
			this._currentOptions[i].alpha=0;
			egret.setTimeout(()=>{
				egret.Tween.get(this._currentOptions[i]).to({alpha:1},200)
			},this,i*50);
		}	
		this.allowClick();
	}

	/*根据当前选项数据计算选项按钮的大小*/

	private calculateBtnSize(data,space){
		let isImage=data[0].content instanceof egret.Bitmap;
		let btnWidth,btnHeight,btnType;
		if(isImage){
			btnType="image",
			btnWidth=(this._width-space)/2;
			btnHeight=(this._height-space)/2;
		}else{
			btnType="txt",
			btnWidth=this._width;
			btnHeight=(this._height-3*space)/4;
		}
		return {
			type:btnType,
			width:btnWidth,
			height:btnHeight
		}
	}

	/*判断是否存在下一题*/

	private hasNext(){
		return this._currentIndex<this._titleDatas.length;
	}

	/*阻止点击*/
	private preventClick(){
		for(let i=0;i<this._currentOptions.length;i++){
			this._currentOptions[i].touchEnabled=false;
		}
	}

	/*允许点击*/
	private allowClick(){
		for(let i=0;i<this._currentOptions.length;i++){
			this._currentOptions[i].touchEnabled=true;
		}
	}
	
}