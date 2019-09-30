class OptionBtn extends egret.Sprite{
	
	/*
	*data-type
	*{
		label:A;
		context:image;
	}
	*/

	private _width:number;
	private _height:number;
	private _label:string;

	private _state:string;
	private _data:any;

	private _option:egret.TextField;//选项
	private _contContainer:egret.Sprite;//选项内容

	public constructor(w:number,h:number,data:any) {
		super();
		this._width=w;
		this._height=h;
		this._data=data;
		this.init();
	}

	public get label():string{
		return this._label;
	}

	public set data(value:any){
		this._data=value;
		this.update();
	}

	public set state(value:string){
		this._state=value;
		this.updateBackground();
	}

	public setWidth(value:number){
		this._width=value;
		this.width=value;
		this.update();
	}

	public setHeight(value:number){
		this._height=value;
		this.height=value;
		this.update();
	}

	private init(){
		this.createFrame();
	}

	private createFrame(){
		this.createBackground();
		this.createOption();
		this.createContent();
	}

	private update(){
		this.updateBackground();
		this.updateOption();
		this.updateContent();
	}

	/*创建/更新背景*/

	private createBackground(){
		let color=0x0096ff;
		switch(this._state){
			case ButtonState.DOWN:
				color=0x888888;
				break;
			case ButtonState.UP:
				color=0x0096ff;
				break;
			case ButtonState.RIGHT:
				color=0x17c872;
				break;
			case ButtonState.WRONG:
				color=0xa20909;
				break;
		}
		
		let g=this.graphics;
		g.clear();
		g.beginFill(color);
		g.drawRoundRect(0,0,this._width,this._height,20,20);
	}

	private updateBackground(){
		this.createBackground();
	}

	/*创建/更新选项ABC*/

	private createOption(){
		this._option=new egret.TextField();
		this.addChild(this._option);
		this._option.width=80;//选项卡宽度固定80
		this._option.height=this._height;

		this._label=this._data.label;
		this._option.text=this._data.label;
		this._option.textColor=0xffffff;
		this._option.textAlign=egret.HorizontalAlign.CENTER;
		this._option.verticalAlign=egret.VerticalAlign.MIDDLE;
		this._option.size=40;
		this._option.anchorOffsetX=this._option.width/2;
		this._option.anchorOffsetY=this._option.height/2;
		this._option.x=this._option.width/2;
		this._option.y=this._height/2;	
	}

	private updateOption(){
		this._option.text=this._data.label;
		this._option.y=this._height/2;
	}

	/*创建/更新选项内容*/

	private createContent(){
		this._contContainer=new egret.Sprite();
		this.addChild(this._contContainer);
		this._contContainer.x=80;
		this._contContainer.y=10;
		this.updateContent();
	}

	private updateContent(){
		let content=this._data.content;
		let contentWidth=this._width-100;
		let contentHeight=this._height-20;

		this._contContainer.width=contentWidth;
		this._contContainer.height=contentHeight;	
		/*let g=this._contContainer.graphics;
		g.clear();
		g.beginFill(0x222222);
		g.drawRect(0,0,contentWidth,contentHeight);*/

		this._contContainer.removeChildren();

		if(content instanceof egret.Texture){
			let bitmap=new egret.Bitmap();
			bitmap.texture=content;
			bitmap.width=contentWidth;
			bitmap.height=contentHeight;
			this._contContainer.addChild(bitmap);
		}else{
			let txt:egret.TextField=new egret.TextField();
			txt.width=contentWidth;
			txt.height=contentHeight;
			this._contContainer.addChild(txt);

			txt.wordWrap=true;
			txt.textColor=0xffffff;
			txt.fontFamily="微软雅黑";
			txt.verticalAlign=egret.VerticalAlign.MIDDLE;
			txt.size=40;
			txt.text=content;
		}
	}


}