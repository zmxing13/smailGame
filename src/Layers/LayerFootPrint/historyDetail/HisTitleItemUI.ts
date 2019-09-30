class HisTitleItemUI extends egret.Sprite{
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
		let g=this._bg.graphics;
		g.clear();
		g.lineStyle(1,0xbbbbbb);
		g.beginFill(0xffffff);
		g.drawRoundRect(0,0,this._width,this._height,0,0);
	}

	private drawContent(){
		this.drawInfo();
	}

	private drawInfo(){
		let info=new egret.TextField();
		this.addChild(info);
		info.width=this._width-20;
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

}