class SearchForPkPanel extends egret.Sprite{
	private _width:number;
	private _height:number;
	private _minSpace:number;
	private _data:number;
	private _list:pkUserList;
	private _updateBtn:Button;
	private _closeBtn:Button;

	public constructor(w:number) {
		super();
		this._minSpace=w/10;
		this._width=w;
		this._height=this._minSpace*15;
		this.drawBackGround();
		this.addComponent();
		this.addEvents();
	}

	public setData(data:any){
		this._data=data;
		this._list.setData(data);
	}

	private addComponent(){
		this._updateBtn=new Button(this._minSpace*2,this._minSpace*1,"刷新");
		this._updateBtn.x=this._minSpace*5;
		this._updateBtn.y=this._minSpace*0.5;
		this.addChild(this._updateBtn);

		this._closeBtn=new Button(this._minSpace*2,this._minSpace*1,"关闭");
		this._closeBtn.x=this._minSpace*7.5;
		this._closeBtn.y=this._minSpace*0.5;
		this.addChild(this._closeBtn);

		this._list=new pkUserList(this._width-this._minSpace*2);
		this._list.x=this._minSpace;
		this._list.y=2*this._minSpace;
		this.addChild(this._list);
	}

	private addEvents(){
		this._updateBtn.touchEnabled=true;
		this._updateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.dispatchEvent(new egret.Event("update"));
		},this)

		this._closeBtn.touchEnabled=true;
		this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			this.dispatchEvent(new egret.Event("close"));
		},this)

		this._list.touchEnabled=true;
		this._list.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			let btn=e.target;
			if(btn instanceof UserItemUI){
				this.dispatchEvent(new egret.Event("startPk",false,false,{userData:btn.userData}));
			}
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