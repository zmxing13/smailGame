class TipPanelRank extends eui.UILayer{
	public constructor(info:Object) {
		super();
		let tipUI=new TipUIRank(info);
		this.addChild(tipUI);
	}

}