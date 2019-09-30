class HistoryTitlePanel extends egret.Sprite{
	private _width:number;
	private _height:number;
	private _data:number;
	private _list:HisTitleListUI;
	private _updateBtn:Button;
	private _closeBtn:Button;

	public constructor(w:number,h:number) {
		super();
		this._width=w;
		this._height=h;
		this.drawBackGround();
		this.addComponent();
		this.addEvents();
	}

	public setData(data:any){
		this._data=data;
		this._list.setDatas(data);
	}

	private addComponent(){

		this._closeBtn=new Button(100,50,"关闭")
		this._closeBtn.anchorOffsetX=this._closeBtn.width/2;
		this._closeBtn.x=this._width/2;
		this._closeBtn.y=this._height-70;
		this.addChild(this._closeBtn);

		this._list=new HisTitleListUI(this._width-40,this._height-90);
		this._list.x=20;
		this._list.y=20;
		this.addChild(this._list);
	}

	private addEvents(){
		this._closeBtn.touchEnabled=true;
		this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.dispatchEvent(new egret.Event("close"));
		},this)
	}

	private drawBackGround(){
		let sp:egret.Shape=new egret.Shape();
		let g=sp.graphics;
		g.beginFill(0xffffff);
		g.drawRect(0,0,this._width,this._height);
		this.addChild(sp);
	}

}