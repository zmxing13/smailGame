class TipUIRank extends eui.Component {
	private label:eui.Label;
	private _info:any;
	private okBtn:eui.Button;
	private cancelBtn:eui.Button;

	public constructor(info) {
		super();
		this._info=info;
		this.percentWidth=100;
        this.percentHeight=100;
		this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this);
		this.skinName = "resource/custom_skins/tipUIRankSkin.exml";
	}

	private uiCompHandler():void{
		this.label.text="你确定要与"+this._info.nickName+"PK吗？,若PK成功，你将赢得50积分，PK失败,你将输掉50积分";
		this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("okBtn");
			console.log(this._info);
			this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,this._info));//排行榜发起pk
		},this);

		this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("cancel");
			this.parent.parent.removeChild(this.parent);
			// this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,this._info));//排行榜发起pk
		},this);

	}

}
