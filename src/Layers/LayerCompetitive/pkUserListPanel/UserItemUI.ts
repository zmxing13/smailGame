class UserItemUI extends egret.Sprite{
	private _width:number;
	private _height:number;
	private _img:egret.Bitmap;
	private _rejectBtn:Button;
	private _acceptBtn:Button;
	private _minSpace;
	private _name:egret.TextField;
	private _score:egret.TextField;
	private _bg:egret.Shape;

	private _data:any={
		userid:1245,
		img:"http://10.12.5.32/static/media/ImgTitles/title_img_6_1567756360.png",
		nickName:"小王",
		score:125,
		selectable:false,
	};

	
	public constructor(w:number) {
		super();
		this._width=w;
		this._minSpace=w/10;
		this._height=this._minSpace*15;
		this._img=new egret.Bitmap();
		this.drawBackGround();
		this.drawContent();
	}

	public setData(data:any){
		this._data=data;
		this._name.text=this._data.nickName;
		this._score.text=this._data.score;
		RES.getResByUrl(this._data.img,(data)=>{
			//console.log(data);
			this._img.texture=data;
		},this);

		let color=this._data.selectable?0x0096ff:0x888888;
		let g=this._bg.graphics;
		g.clear();
		g.beginFill(color);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
	}

	public get userData():any{
		return this._data;
	}

	private drawBackGround(){
		this._bg=new egret.Shape();
		let g=this._bg.graphics;
		g.clear();
		g.beginFill(0x0096ff);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
		this.addChild(this._bg);
	}

	private drawContent(){
		this.drawImg();
		this.drawNickName();
		this.drawScore();
	}


	private drawImg(){
		this.addChild(this._img);
		this._img.width=8*this._minSpace;
		this._img.height=8*this._minSpace;
		this._img.y=this._minSpace;
		this._img.x=this._minSpace;
	}

	private drawNickName(){
		this._name=new egret.TextField();
		this.addChild(this._name);
		this._name.width=this._minSpace*8;
		this._name.height=this._minSpace*2;

		this._name.textColor=0xffffff;
		this._name.fontFamily="微软雅黑";
		this._name.textAlign=egret.HorizontalAlign.CENTER;
		this._name.verticalAlign=egret.VerticalAlign.MIDDLE;
		this._name.size=this._name.height;
		this._name.anchorOffsetX=this._name.width/2;
		this._name.anchorOffsetY=this._name.height/2;
		this._name.x=this._minSpace*5;
		this._name.y=this._minSpace*10;
	}

	private drawScore(){
		this._score=new egret.TextField();
		this.addChild(this._score);
		this._score.width=this._minSpace*8;
		this._score.height=this._minSpace*2;

		this._score.textColor=0xffffff;
		this._score.fontFamily="微软雅黑";
		this._score.textAlign=egret.HorizontalAlign.CENTER;
		this._score.verticalAlign=egret.VerticalAlign.MIDDLE;
		this._score.size=this._score.height/1.2;
		this._score.anchorOffsetX=this._score.width/2;
		this._score.anchorOffsetY=this._score.height/2;
		this._score.x=this._minSpace*5;
		this._score.y=this._minSpace*13;
	}

}