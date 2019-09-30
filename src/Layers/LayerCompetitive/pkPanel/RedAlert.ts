class RedAlert extends egret.Sprite {

	private _currentNum=0;

	private _bg:egret.Shape;
	private _txt:egret.TextField;
	private _radius:number;

	private _rowIndex:number;
	private _colIndex:number;

	public constructor(radius:number=40) {
		super();
		this._radius=radius;
		this._bg=new egret.Shape;
		this.addChild(this._bg);

		this._txt=new egret.TextField();
		this._txt.text=String(this._currentNum);
		this._txt.textAlign=egret.HorizontalAlign.CENTER;
		this._txt.verticalAlign=egret.VerticalAlign.MIDDLE;
		let size=radius;
		this._txt.width=radius*2;
		this._txt.height=radius*2;
		this._txt.anchorOffsetX=radius;
		this._txt.anchorOffsetY=radius;
		this._txt.bold=true;
		this._txt.size=size;
		this.addChild(this._txt);

		
		this.draw();
	}

	public set currentNum(value:number){
		this._currentNum=value;
		this._txt.text=String(this._currentNum);
	}

	public get currentNum():number{
		return this._currentNum;
	}

	private draw(){
		let fillColor:number;
		let textColor:number;
		
		fillColor=0xff0000;
		textColor=0xffffff;
				
		let g=this._bg.graphics;
		g.clear();
		g.beginFill(fillColor);
		g.lineStyle(1,0xffffff);
		g.drawCircle(0,0,this._radius);
		g.endFill();

		this._txt.textColor=textColor;
	}
		
}