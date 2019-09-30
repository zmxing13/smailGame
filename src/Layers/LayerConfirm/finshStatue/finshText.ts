class finshText extends egret.DisplayObjectContainer{
	private _public:PublicClass = new PublicClass();
	public contentText:egret.TextField;
	public constructor() {
		super();
	}
	public setAdditionalNumber(_startText:string='',_contentText:string='',endText:string=''){
		this.contentText = this._public.createTextByName(_startText+_contentText+endText);
		this.contentText.size=Main.W/15;
		this.addChild(this.contentText);
	}
}