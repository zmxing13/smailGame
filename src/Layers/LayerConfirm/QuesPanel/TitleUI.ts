class TitleUI extends egret.Sprite {

	private _width:number;
	private _height:number;
	private _space:number;

	private _currentIndex:number;
	
	private _titleDatas:Array<any>;
	private _currentTitleData:any;
	private _contContainer:egret.Sprite;//选项内容

	public constructor(w:number,h:number) {
		super();
		this._width=w;
		this._height=h;
		this.drawBackground();
		this.createContent();
	}

	public setTitleDatas(datas){
		this._currentIndex=1;
		this._titleDatas=datas;
		if(this._titleDatas.length>0){
			this._currentTitleData=this._titleDatas[this._currentIndex-1];
		}
		this.enterNextTitle();
	}

	public switchToTitle(titleId:number){
		this._currentIndex=titleId;
		this._currentTitleData=this._titleDatas[this._currentIndex-1];
		this.quitCurrentTitle();
		egret.setTimeout(this.enterNextTitle,this,600);
	}

	private quitCurrentTitle(){
		egret.Tween.get(this).to({x:-Main.W},500)
	}

	private enterNextTitle(){
		this.updateContent();
		this.x=0;
		this.alpha=0;
		egret.Tween.get(this).to({alpha:1},500);
	}

	private drawBackground(){
		let bg:egret.Shape=new egret.Shape();
		let g=bg.graphics;
		g.beginFill(0xcccccc);
		g.drawRoundRect(0,0,this._width,this._height,30,30);
		this.addChild(bg);
	}


	/*创建/更新选项内容*/

	private createContent(){
		this._contContainer=new egret.Sprite();
		this.addChild(this._contContainer);
		this._contContainer.x=20;
		this._contContainer.y=20;
	}

	private updateContent(){
		let content=this._currentTitleData.title;
		let contentWidth=this._width-40;
		let contentHeight=this._height-40;

		this._contContainer.width=contentWidth;
		this._contContainer.height=contentHeight;	
		let g=this._contContainer.graphics;
		g.clear();
		g.beginFill(0xffffff);
		g.drawRect(0,0,contentWidth,contentHeight);

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
			txt.textColor=0x000000;
			txt.fontFamily="微软雅黑";
			txt.textAlign=egret.HorizontalAlign.CENTER;
			txt.verticalAlign=egret.VerticalAlign.MIDDLE;
			txt.lineSpacing=20;
			txt.size=50;
			txt.text=content;
		}
	}

}