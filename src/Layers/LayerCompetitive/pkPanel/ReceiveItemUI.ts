class ReceiveItemUI extends egret.Sprite{
	private _width:number;
	private _height:number;
	private _img:egret.Bitmap;
	private _rejectBtn:Button;
	private _acceptBtn:Button;
	private _deleteBtn:Button;
	private _minSpace:number;

	private _info:egret.TextField;
	private _bg:egret.Shape;

	private _data:any={
		img:"http://10.12.5.32/static/media/ImgTitles/title_img_6_1567756360.png",
		nickName:"小王",
		response:"no"//"reject","win","lost"
	};

	
	public constructor(w:number,h:number,data:any) {
		super();
		this._width=w;
		this._height=h;
		this._data=data;
		this._minSpace=w/10;
		this._img=new egret.Bitmap();

		this.drawBackGround();
		this.drawContent();
	}

	private update(){
		let color;
		if(this._data.response=="reject"){
			this._rejectBtn.visible=false;
			this._acceptBtn.visible=false;
			this._deleteBtn.visible=true;
			this._info.text="你拒绝";
			color=0xcbcfd2;
			
		}else if(this._data.response=="win"){
			this._rejectBtn.visible=false;
			this._acceptBtn.visible=false;
			this._deleteBtn.visible=true;
			this._info.text="你赢了";
			color=0xcbe6a1;
		}else if(this._data.response=="lost"){
			this._rejectBtn.visible=false;
			this._acceptBtn.visible=false;
			this._deleteBtn.visible=true;
			this._info.text="你输了";
			color=0xe3afaf;
		}else{
			this._rejectBtn.visible=true;
			this._acceptBtn.visible=true;
			this._deleteBtn.visible=false;
			this._info.text="";
			color=0x0096ff;
		}
		let g=this._bg.graphics;
		g.clear();
		g.beginFill(color);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
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
		this.drawOrder();
		this.drawImg();
		this.drawNickName();
		this.addButtons();
		this.addReedBackInfo();
		this.update();
	}

	private drawOrder(){
		let order=new egret.TextField();
		this.addChild(order);
		order.width=40;
		order.height=this._height;

		order.text=this._data.order;
		order.textColor=0xffffff;
		order.fontFamily="微软雅黑";
		order.textAlign=egret.HorizontalAlign.CENTER;
		order.verticalAlign=egret.VerticalAlign.MIDDLE;
		order.size=this._height/3;
		order.anchorOffsetX=order.width/2;
		order.anchorOffsetY=order.height/2;
		order.x=this._minSpace;
		order.y=this._height/2;
	}

	private drawImg(){
		this.addChild(this._img);
		this._img.width=this._height*0.8;
		this._img.height=this._height*0.8;
		this._img.y=this._height*0.1;
		this._img.x=this._minSpace*2;

		RES.getResByUrl(this._data.img,(data)=>{
			//console.log(data);
			this._img.texture=data;
		},this);
	}

	private drawNickName(){
		let name=new egret.TextField();
		this.addChild(name);
		name.width=this._minSpace*3;
		name.height=this._height;

		name.text=this._data.nickName;
		name.textColor=0xffffff;
		name.fontFamily="微软雅黑";
		name.textAlign=egret.HorizontalAlign.CENTER;
		name.verticalAlign=egret.VerticalAlign.MIDDLE;
		name.size=this._height/3;
		name.anchorOffsetX=name.width/2;
		name.anchorOffsetY=name.height/2;
		name.x=this._minSpace*4;
		name.y=this._height/2;
	}

	private addReedBackInfo(){
		this._info=new egret.TextField();
		this.addChild(this._info);
		this._info.width=this._minSpace*5;
		this._info.height=this._height;

		if(this._data.response=="reject"){
			this._info.text="你拒绝";
		}else if(this._data.response=="win"){
			this._info.text="你赢了";
		}else if(this._data.response=="lost"){
			this._info.text="你输了";
		}

		this._info.textColor=0xffffff;
		this._info.fontFamily="微软雅黑";
		this._info.verticalAlign=egret.VerticalAlign.MIDDLE;
		this._info.size=this._height/3;
		this._info.anchorOffsetY=this._info.height/2;
		this._info.x=this._minSpace*5;
		this._info.y=this._height/2;
	}

	private addButtons(){
		
			this._rejectBtn=new Button(100,50,"拒绝");
			this._rejectBtn.touchEnabled=true;
			this._rejectBtn.x=this._minSpace*6
			this._rejectBtn.y=(this._height-50)/2;
			this.addChild(this._rejectBtn);
			this._rejectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
				this.dispatchEvent(new egret.Event("reject",false,false,{userData:this._data}));
				this._data.response="reject";
				this.update();
			},this);

			this._acceptBtn=new Button(100,50,"接受");
			this._acceptBtn.touchEnabled=true;
			this._acceptBtn.x=this._minSpace*8
			this._acceptBtn.y=(this._height-50)/2;
			this.addChild(this._acceptBtn);
			this._acceptBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
				this.dispatchEvent(new egret.Event("accept",false,false,{userData:this._data}));
			},this);
		
			this._deleteBtn=new Button(100,50,"删除");
			this._deleteBtn.touchEnabled=true;
			this._deleteBtn.x=this._minSpace*8
			this._deleteBtn.y=(this._height-50)/2;
			this.addChild(this._deleteBtn);
			this._deleteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
				this.dispatchEvent(new egret.Event("delete",false,false,{userData:this._data}));
			},this);
	}

}