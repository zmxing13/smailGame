class ScrollerUI extends egret.Sprite{
	private _width:number;
	private _height:number;
	private _list:egret.Sprite;
	private _currentY:number;
	private _scrollBar:egret.Shape;

	private _listV:number;
	private _listF:number;

	private _listHeight:number;
	private _showScrollBar:Boolean;

	public constructor(w:number,h:number,list:egret.Sprite) {
		super();
		this._width=w;
		this._height=h;
		this._list=list;
		this._currentY=0;

		this._listV=0;
		this._listF=0;

		this.drawBackground();
		this.addChild(this._list);
		this._list.mask=this.drawMask();

		this._scrollBar=this.drawScrollBar();
		this._scrollBar.visible=false;

		this.updateListHeight();
		this.addChild(this._scrollBar);
		this.addScrollListener();
	
		this.update();
	}

	public updateListHeight(){
		this._listHeight=this._list.height+20;
		this._showScrollBar=this._listHeight>this._height;
	}

	private drawBackground(){
		let sp:egret.Shape=new egret.Shape();
		let g=sp.graphics;
		g.beginFill(0xffffff);
		g.drawRect(0,0,this._width,this._height);
		this.addChild(sp);
	}

	private drawMask(){
		let sp:egret.Shape=new egret.Shape();
		let g=sp.graphics;
		g.beginFill(0x666666);
		g.drawRect(0,0,this._width,this._height);
		this.addChild(sp);
		return sp;
	}

	private drawScrollBar(){
		let sp:egret.Shape=new egret.Shape();
		let g=sp.graphics;
		g.beginFill(0x002f84);
		g.drawRoundRect(this._width-5,0,5,100,5,5);
		this.addChild(sp);
		sp.alpha=0.5;
		return sp; 
	}

	private addScrollListener(){
		let initY=0;
		let lastY=0;
		let endY=0;
		let force=0;

		this.touchEnabled=true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e)=>{
			if(!this._showScrollBar){
				return;
			}
			lastY=e.stageY;
			initY=e.stageY;
			this._scrollBar.visible=true;
			this._listV=0;
		},this);

		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,(e)=>{
			if(!this._showScrollBar){
				return;
			}
			force=e.stageY-lastY;
			this.moveList(force);
			lastY=e.stageY;
		},this);

		this.addEventListener(egret.TouchEvent.TOUCH_END,(e)=>{
			if(!this._showScrollBar){
				return;
			}
			this.applyForce(force);
		},this);
	}

	private moveList(dy:number){
		this._list.y+=dy;
		this.limit();
		this.setScrollBarY();
	}

	private applyForce(force){
		this._listF+=force
		let a=this._listF;
		this._listV+=a;
		this._listF=0;
	}

	private setScrollBarY(){
		let ratio=-this._list.y/(this._listHeight-this._height)
		ratio=ratio<0?0:(ratio>1?1:ratio);
		this._scrollBar.y=(this._height-this._scrollBar.height)*ratio;
	}
	
	private limit(){
		if(this._list.y>0){
			this._listV= Math.abs(this._listV)>1?this._listV/Math.abs(this._listV)*1:this._listV;
			if(this._list.y>100){
				this._list.y=100;
			}
			let force=Math.min(-this._list.y*0.01,0.001);
			this.applyForce(force);
		}else if(this._list.y<-(this._listHeight-this._height)){
			this._listV= Math.abs(this._listV)>1?this._listV/Math.abs(this._listV)*1:this._listV;
			if(this._list.y<-(this._listHeight-this._height)-100){
				this._list.y=-(this._listHeight-this._height)-100;
			}
			let force=(-(this._listHeight-this._height)-this._list.y)*0.01;
			this.applyForce(force);
		}
	}

	private update(){
		if(this._listHeight>this._height){
			this._list.y+=this._listV;
			let fractionForce=this._listV!=0?-this._listV/Math.abs(this._listV)*0.1:0;
			this.applyForce(fractionForce);
			this.setScrollBarY();
			this.limit();
			this._scrollBar.visible=true;
		}else{
			egret.Tween.get(this._list).to({y:0},300);
			this._scrollBar.visible=false;
		}
		requestAnimationFrame(this.update.bind(this));
	}
}