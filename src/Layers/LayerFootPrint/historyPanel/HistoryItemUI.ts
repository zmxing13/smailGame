class HistoryItemUI extends egret.Sprite{
	private _width:number;
	private _height:number;
	private _img:egret.Bitmap;
	private _rejectBtn:Button;
	private _acceptBtn:Button;
	private _bg:egret.Shape;
	private _detailBtn:Button;

	private _data:any={
		type:"level",
		info:"闯关：1到5级",
		date:"2019-05-03"
	};

	
	public constructor(w:number,h:number,data:any) {
		super();
		this._width=w;
		this._height=h;
		this._data=data;
		this._img=new egret.Bitmap();
		this.addBackGround();
		this.drawContent();
		this.drawBackGround();
	}

	private addBackGround(){
		this._bg=new egret.Shape();
		this.addChild(this._bg);
	}

	private drawBackGround(){
		let color;
		switch(this._data.type){
			case "level":
				color=0xcbe6a1;
				break;
			case "pk":
				color=0xa1f5ff;
				break;
			case "practice":
				color=0xf1d6ff;
				break;
		}
		let g=this._bg.graphics;
		g.clear();
		g.lineStyle(1,0xbbbbbb);
		g.beginFill(color);
		g.drawRoundRect(0,0,this._width,this._height,0,0);
	}

	private drawContent(){
		this.drawInfo();
		this.drawDate();
		this.addButtons();
	}

	private drawInfo(){
		let info=new egret.TextField();
		this.addChild(info);
		info.width=this._width-140;
		info.height=this._height-40;

		info.text=this._data.info;
		info.textColor=0x000000;
		info.fontFamily="微软雅黑";
		info.textAlign=egret.HorizontalAlign.LEFT;
		info.verticalAlign=egret.VerticalAlign.MIDDLE;
		info.size=20;
		info.x=20;
		info.y=20;
	}

	private drawDate(){
		let name=new egret.TextField();
		this.addChild(name);
		name.width=this._width-140;
		name.height=40;

		name.text=this._data.date;
		name.textColor=0x888888;
		name.fontFamily="微软雅黑";
		name.textAlign=egret.HorizontalAlign.RIGHT;
		name.verticalAlign=egret.VerticalAlign.MIDDLE;
		name.size=name.height/2;
		name.anchorOffsetY=name.height/2;
		name.x=20;
		name.y=this._height-25;
	}


	private addButtons(){	
		this._detailBtn=new Button(80,40,"详情");
		this._detailBtn.touchEnabled=true;
		this._detailBtn.x=this._width-100;
		this._detailBtn.anchorOffsetY=this._detailBtn.height/2;
		this._detailBtn.y=this._height/2;
		this.addChild(this._detailBtn);
		this._detailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			this.dispatchEvent(new egret.Event("detail",false,false,{userData:this._data}));
		},this);
	}


}