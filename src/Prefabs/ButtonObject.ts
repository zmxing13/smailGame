class ButtonObject extends egret.DisplayObjectContainer {
	private btnContent:egret.Sprite;
	private btnText:egret.TextField;
	private btnImg:egret.Bitmap;
	private btnSprite:egret.Sprite;

	private defaultColor:number=0x000000
	public constructor(label:string="新按钮", btnW:number=150, btnH:number=40, bgTextureStr:string="") {
		super();
		this.btnContent=new egret.Sprite();
		this.addChild(this.btnContent);
		if(bgTextureStr==""){
			this.btnSprite=new egret.Sprite();
			this.btnSprite.graphics.beginFill(this.defaultColor);
			this.btnSprite.graphics.drawRoundRect(0,0,btnW,btnH,5);
			this.btnSprite.graphics.endFill();
			this.btnSprite.x=-btnW/2;
			this.btnSprite.y=-btnH/2;
			this.btnContent.addChild(this.btnSprite);
		}else{
			this.btnImg=new egret.Bitmap();
			this.btnImg.texture=RES.getRes(bgTextureStr);
			this.btnImg.smoothing=true;
			this.btnImg.width=btnW;
			this.btnImg.height=btnH;
			this.btnImg.x=-btnW/2;
			this.btnImg.y=-btnH/2;
			this.btnContent.addChild(this.btnImg);
		}
		this.btnText=new egret.TextField();
		this.btnText.width=btnW-8;
		this.btnText.height=btnH-8;
		this.btnText.text=label;
		this.btnText.size=30;
		this.btnText.bold=true;
		this.btnText.anchorOffsetX=this.btnText.width/2;
		this.btnText.anchorOffsetY=this.btnText.height/2;
		this.btnText.textAlign=egret.HorizontalAlign.CENTER;
		this.btnText.verticalAlign=egret.VerticalAlign.MIDDLE;
		//this.btnText.border=true;
		this.btnText.borderColor=0xff0000;
		this.btnContent.addChild(this.btnText);

		this.btnContent.touchEnabled=true;
		this.btnContent.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.runAnim,this);
	}
	private runAnim(): void {
        egret.Tween.get(this.btnContent,{
            onChangeObj: this
        })
		.to({ scaleX: this.btnContent.scaleX - .05,scaleY: this.btnContent.scaleY - .05 },100)
		.call(this.exitAnim,this,[]);
    }
    private exitAnim(): void {
		egret.Tween.removeTweens(this.btnContent);
        this.btnContent.scaleX=this.btnContent.scaleY=1;
    }
}