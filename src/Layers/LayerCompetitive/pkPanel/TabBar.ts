class TabBar extends egret.Sprite{

	private _width:number;
	private _height:number;
	private _receiveBtn:AlertButton;
	private _sendBtn:AlertButton;
	private _currentIndex:number;

	public constructor(w:number,h:number) {
		super();
		this._width=w;
		this._height=h;
		this._receiveBtn=new AlertButton(w/2-5,h,"收到的PK");
		this._receiveBtn.x=0;
		this._receiveBtn.y=0;

		this._sendBtn=new AlertButton(w/2-5,h,"发起的PK");
		this._sendBtn.x=w/2+5;
		this._sendBtn.y=0;
		this.addChild(this._receiveBtn);
		this.addChild(this._sendBtn);
		
		this._sendBtn.state=ButtonState.UP;
		this._receiveBtn.state=ButtonState.DOWN;
		this.addEvent();
	}

	public setReceiveNum(num:number){
		this._receiveBtn.alertNum=num;
	}

	public setSendNum(num:number){
		this._sendBtn.alertNum=num;
	}

	private addEvent(){
		this._receiveBtn.touchEnabled=true;
		this._sendBtn.touchEnabled=true;
		this._receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			if(this._currentIndex!=1){
				this._sendBtn.state=ButtonState.UP;
				this._receiveBtn.state=ButtonState.DOWN;
				this._currentIndex=1;
				this.dispatchEvent(new egret.Event("change",false,false,{index:this._currentIndex}));
			}
		},this);

		this._sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			if(this._currentIndex!=2){
				this._sendBtn.state=ButtonState.DOWN;
				this._receiveBtn.state=ButtonState.UP;
				this._currentIndex=2;
				this.dispatchEvent(new egret.Event("change",false,false,{index:this._currentIndex}));
			}
		},this);
	}
}