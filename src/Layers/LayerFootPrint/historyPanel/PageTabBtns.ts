class PageTabBtns extends egret.Sprite{
	
	private _height:number;

	private _totalPageNum:number;
	private _showPageNum:number;
	private _tabIndex:number;//第几页的按钮

	private _space:number;
	private _btns:Array<PageButton>;
	private _preBtn:PageButton;
	private _nextBtn:PageButton;
	private _selectedBtn:PageButton;

	public constructor(h:number,pageNum:number,showNum:number) {
		super();
		this._height=h;
		this._totalPageNum=pageNum;
		this._showPageNum=showNum;
		this._tabIndex=1;
		this._space=10;
		this._btns=[];
		this.createBtns();
		this.addEvent();
		this.updateBtns();
		this._selectedBtn=this._btns[0];
		this._selectedBtn.state=ButtonState.RIGHT;
	}

	private createBtns(){
		for(let i=1;i<=this._showPageNum;i++){
			let btn=new PageButton(this._height,this._height,String(i));
			btn.state=ButtonState.UP;
			btn.touchEnabled=true;
			btn.x=(this._height+this._space)*i;
			btn.y=0;
			this._btns.push(btn);
			this.addChild(btn);
		}
		this._preBtn=new PageButton(this._height,this._height,"<");
		this._preBtn.touchEnabled=true;
		this.addChild(this._preBtn);
		this._nextBtn=new PageButton(this._height,this._height,">");
		this._nextBtn.touchEnabled=true;
		this.addChild(this._nextBtn);
		this._nextBtn.x=(this._height+this._space)*(this._showPageNum+1);
	}

	private addEvent(){
		this.touchEnabled=true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			let btn=e.target as PageButton;
			if(btn.label=="<"){
				if(this._tabIndex>1){
					this._tabIndex--;
					this.updateBtns();
					this._nextBtn.state=ButtonState.UP;
				}else{
					btn.state=ButtonState.DOWN;
					
				}
			}else if(btn.label==">"){
				let hasLastPage=this._tabIndex<Math.ceil(this._totalPageNum/this._showPageNum);
				if(hasLastPage){
					this._tabIndex++;
					this.updateBtns();
					this._preBtn.state=ButtonState.UP;
				}else{
					btn.state=ButtonState.DOWN;
				}
			}else{
				if(btn.state==ButtonState.UP){
					this._selectedBtn.state=ButtonState.UP;
					this._selectedBtn=btn;
					this._selectedBtn.state=ButtonState.RIGHT;
					this.dispatchEvent(new egret.Event("switchPage",false,false,{index:btn.label}));
				}
			}
		},this)
	}

	private updateBtns(){
		let first=(this._tabIndex-1)*this._showPageNum+1;
		for(let i=0;i<this._btns.length;i++){
			let btn=this._btns[i];
			btn.label=String(i+first);
			if(i+first<=this._totalPageNum){
				btn.state=ButtonState.UP;
			}else{
				btn.state=ButtonState.DOWN;
			}
		}
		if(this._tabIndex==1){
			this._preBtn.state=ButtonState.DOWN;
		}else{
			this._preBtn.state=ButtonState.UP;
		}

		if(this._tabIndex>=Math.ceil(this._totalPageNum/this._showPageNum)){
			this._nextBtn.state=ButtonState.DOWN;
		}else{
			this._nextBtn.state=ButtonState.UP;
		}
	}

}