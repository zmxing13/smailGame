class PageButton extends egret.Sprite{
	
	private _width:number;
	private _height:number;
	private _label:string;

	private _state:string;

	private _option:egret.TextField;//选项

	public constructor(w:number,h:number,label:string="按钮") {
		super();
		this._width=w;
		this._height=h;
		this._label=label;
		this.init();
	}

	public set state(value:string){
		this._state=value;
		this.createBackground();
	}

	public get state():string{
		return this._state;
	}

	public set label(label:string){
		this._label=label;
		this._option.text=this._label;
	}

	public get label():string{
		return this._label;
	}

	private init(){
		this.createFrame();
	}

	private createFrame(){
		this.createBackground();
		this.createOption();
	}

	/*创建/更新背景*/

	private createBackground(){
		let color=0xdcb05a;
		switch(this._state){
			case ButtonState.DOWN:
				color=0x888888;
				break;
			case ButtonState.UP:
				color=0x0096ff;
				break;
			case ButtonState.RIGHT:
				color=0xdcb05a;
				break;
			case ButtonState.WRONG:
				color=0xa20909;
				break;
		}
		
		let g=this.graphics;
		g.clear();
		g.beginFill(color);
		g.drawRoundRect(0,0,this._width,this._height,5,5);
	}

	/*创建/更新按钮内容*/

	private createOption(){
		this._option=new egret.TextField();
		this.addChild(this._option);
		this._option.width=this._width;
		this._option.height=this._height;

		this._option.text=this._label;
		this._option.textColor=0xffffff;
		this._option.textAlign=egret.HorizontalAlign.CENTER;
		this._option.verticalAlign=egret.VerticalAlign.MIDDLE;
		this._option.size=this._height*0.6;
		this._option.fontFamily="微软雅黑";
		this._option.anchorOffsetX=this._option.width/2;
		this._option.anchorOffsetY=this._option.height/2;
		this._option.x=this._width/2;
		this._option.y=this._height/2;	
	}

}