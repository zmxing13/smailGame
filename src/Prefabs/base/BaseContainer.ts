abstract class BaseContainer extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		if(this.stage){this.onAddToStage();}else{
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
	}
	private onAddToStage(){
		this.stage.addEventListener(egret.Event.RESIZE,this.UpWindowData,this);
	}
	/**
	 * 更新窗口信息
	 */
	abstract UpWindowData():void;
}