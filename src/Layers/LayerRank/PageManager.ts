class PageManager {
	public static  PKSENDERTip:string="pkSenderTip";
	public static  Container:BaseContainer;

	public constructor() {
	
	}

	public static open(pageId:string,info:Object=null){
		if(!PageManager.Container){
			throw new Error("请设置舞台");
		}
		switch(pageId){
			case PageManager.PKSENDERTip:
				PageManager.Container.addChild(new TipPanelRank(info));
				break;
		}
	}

	public static close(pageId:string,info:Object=null){

	}
}