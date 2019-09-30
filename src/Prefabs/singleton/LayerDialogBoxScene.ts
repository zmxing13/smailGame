class LayerDialogBoxScene extends egret.DisplayObjectContainer {
	private static _MessageCenter:LayerDialogBoxScene;
	/**
	 * 对话框对象(单例)
	 */
	public constructor() {
		super();
	}
	/**
	 * 对话框对象(单例)
	 */
	public static getInstance():LayerDialogBoxScene{
		if (LayerDialogBoxScene._MessageCenter == null){
            LayerDialogBoxScene._MessageCenter=new LayerDialogBoxScene()
        }
		return LayerDialogBoxScene._MessageCenter
	}
	/**
	 * 弹出对话框
	 * @param describeStr<string> 	对话框中的文字内容
	 * @param statusStr<string> 	对话框的类型，请使用 DialogBox.TypeModel (正确，错误，警告，疑问)
	 * @param targetFunc<Function>	是否存在回调通知(true,false)，此参数设置为非空时，出现 “确定、取消” 两个按钮
	 * @param cancelBtnLable<string>取消按钮的 名字 *【没有回调通知，不用设置】
	 * @param enterBtnLable<string>	确定按钮的 名字 *【没有回调通知，不用设置】
	 */
	public newDialogBoxEvent(describeStr:string, statusStr:string="",targetFunc:Function=null,targetThis:Object=null,cancelBtnLable:string="取  消",enterBtnLable:string="确  定"){
		let dialogBox:DialogBox=new DialogBox(describeStr,statusStr,targetFunc,targetThis,cancelBtnLable,enterBtnLable);
		this.addChild(dialogBox)
	}
}