class SendItemUI extends egret.Sprite{
	private _width:number;
	private _height:number;
	private _img:egret.Bitmap;
	private _okBtn:Button;
	private _minSpace;

	private _data:any={order:1, nickName: "小花", response: "no" };

	
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

	private drawBackGround(){
		let color=0xcccccc;
		switch(this._data.response){
			case "no":
				color=0x88c9f7;
				break;
			case "reject":
				color=0xcbcfd2;
				break;
			case "win":
				color=0xcbe6a1;
				break;
			case "lost":
				color=0xe3afaf;
				break;
		}

		let bg:egret.Shape=new egret.Shape();
		let g=bg.graphics;
		g.clear();
		g.beginFill(color);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
		this.addChild(bg);
	}

	private drawContent(){
		//this.drawOrder();
		//this.drawImg();
		this.addButtons();
		this.drawInfo();
		
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

	private drawInfo(){

		let txt="";
		switch(this._data.response){
			case "no":
				txt="你向"+this._data.nickName+"发起挑战，\n对方还未回应";
				this._okBtn.visible=false;
				break;
			case "reject":
				txt="你向"+this._data.nickName+"发起挑战，\n对方拒绝";
				break;
			case "win":
				txt="你向"+this._data.nickName+"发起挑战，\n恭喜你获得胜利！";
				break;
			case "lost":
				txt="你向"+this._data.nickName+"发起挑战，\n很遗憾，你输了！";
				break;
		}

		let name=new egret.TextField();
		this.addChild(name);
		name.width=this._minSpace*7;
		name.height=this._height;

		name.text=txt;

		name.textColor=0x000000;
		name.fontFamily="微软雅黑";
		name.textAlign=egret.HorizontalAlign.LEFT;
		name.verticalAlign=egret.VerticalAlign.MIDDLE;
		name.size=this._height/4;
		name.anchorOffsetX=0;
		name.anchorOffsetY=name.height/2;
		name.lineSpacing=15;
		name.x=this._minSpace;
		name.y=this._height/2;
	}

	private addButtons(){
		this._okBtn=new Button(100,50,"删除");
		this._okBtn.touchEnabled=true;
		this._okBtn.x=this._minSpace*7
		this._okBtn.y=(this._height-50)/2;
		this.addChild(this._okBtn);
		this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			this.dispatchEvent(new egret.Event("ok",false,false,{userData:this._data}));
		},this);
	}


}