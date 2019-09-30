class DialogBox extends BaseContainer{
	public static TypeModel={
		/**
		 * 正确风格
		 */
		Type_Right:"ic_ok_n_png",
		/**
		 * 错误风格
		 */
		Type_Error:"ic_cancel_n_png",
		/**
		 * 警告风格
		 */
		Type_Warn:"ic_warn_n_png",
		/**
		 * 默认风格
		 */
		Type_Inquiry:"ic_inquiry_n_png"
	}

	private _bgMask:egret.Sprite;
	private _bg:egret.Bitmap;
	private _bottomColour:egret.Bitmap;
	private _btn_ok:ButtonObject;
	private _btn_cancel:ButtonObject;
	private _btn_enter:ButtonObject;
	private _icon_status:egret.Bitmap;
	private _icon_line:egret.Bitmap;
	private _txt_title:egret.TextField;
	private _txt_content:egret.TextField;
	private _fun_select:Function;
	private _targetThis:Object;
	public constructor(describeStr:string, statusStr:string=DialogBox.TypeModel.Type_Inquiry,targetFunc:Function=null,targetThis:Object=null, cancelBtnLable:string="取  消",enterBtnLable:string="确  定") {
		super();
		this._bgMask=new egret.Sprite();
		this._bgMask.graphics.beginFill(0x000000,0.6);
		this._bgMask.graphics.drawRect(0,0,Main.W,Main.H);
		this._bgMask.graphics.endFill();
		this._bgMask.touchEnabled=true;
		this.addChild(this._bgMask);

		this._bg=new egret.Bitmap();
		this._bg.texture=RES.getRes("img_rect_color0005_png");
		this.addChild(this._bg);

		this._bottomColour=new egret.Bitmap();
		this._bottomColour.texture=RES.getRes("img_rect_color0006_png");
		this.addChild(this._bottomColour);

		this._icon_status=new egret.Bitmap();
		this._icon_status.texture=RES.getRes(statusStr);
		this.addChild(this._icon_status);
		
		this._icon_line=new egret.Bitmap();
		this._icon_line.texture=RES.getRes("img_line_01_png");
		this.addChild(this._icon_line);

		this._txt_title=new egret.TextField();
		this._txt_title.text="新消息";
		this._txt_title.size=40;
		this._txt_title.textColor=0x000000;
		this._txt_title.bold=true;
		this._txt_title.textAlign=egret.HorizontalAlign.LEFT;
		this._txt_title.verticalAlign=egret.VerticalAlign.MIDDLE;
		//this._txt_title.border=true;
		this._txt_title.borderColor=0xff0000;
		this.addChild(this._txt_title);

		this._txt_content=new egret.TextField();
		this._txt_content.text=describeStr;
		this._txt_content.size=38;
		this._txt_content.textColor=0x000000;
		this._txt_content.bold=true;
		this._txt_content.textAlign=egret.HorizontalAlign.CENTER;
		this._txt_content.verticalAlign=egret.VerticalAlign.MIDDLE;
		//this._txt_content.border=true;
		this._txt_content.borderColor=0xff0000;
		this.addChild(this._txt_content);

		this._btn_ok=new ButtonObject("知道了",Main.W/3,90,"img_rect_color0003_png")
		this.addChild(this._btn_ok);

		this._btn_cancel=new ButtonObject(cancelBtnLable, Main.W/3,90,"img_rect_color0004_png")
		this.addChild(this._btn_cancel);

		this._btn_enter=new ButtonObject(enterBtnLable, Main.W/3,90,"img_rect_color0002_png")
		this.addChild(this._btn_enter);

		this._btn_ok.touchEnabled=true;
		this._btn_ok.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.exitDialog,this);

		this._btn_enter.touchEnabled=true;
		this._btn_enter.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.selectEvent,this);
		this._btn_cancel.touchEnabled=true;
		this._btn_cancel.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.selectEvent,this);

		if(!targetFunc){
			this._btn_ok.visible=true;
			this._btn_cancel.visible=false;
			this._btn_enter.visible=false;
		}else{
			this._fun_select=targetFunc;
			this._targetThis=targetThis;
			this._btn_ok.visible=false;
			this._btn_cancel.visible=true;
			this._btn_enter.visible=true;
		}
		this.UpWindowData()
	}
	private selectEvent(e:egret.TouchEvent){
		this.exitDialog(e);
		if(e.currentTarget==this._btn_enter){
			this._fun_select.apply(this._targetThis,[true])
		}else{
			this._fun_select.apply(this._targetThis,[false])
		}
	}
	private exitDialog(e:egret.TouchEvent){
		for(let i=0;i<this.numChildren;i++){
			if(this.getChildAt(i)==this._bgMask){
				continue;
			}else{
				this.getChildAt(i).visible=false;
			}
		}
		this.hide()
	}
	private hide(){
		egret.Tween.get(this._bgMask,{
            onChangeObj: this
        })
        .to({ alpha:0 },100)
        .call(this.exitDialogBoxEvent,this,[]);
	}
	private exitDialogBoxEvent(e:egret.TouchEvent){
		if(this.parent){
			this.parent.removeChild(this);
		}
		
	}
	public UpWindowData(){
		this._bgMask.graphics.clear();
		this._bgMask.graphics.beginFill(0x000000,0.6);
		this._bgMask.graphics.drawRect(0,0,Main.W,Main.H);
		this._bgMask.graphics.endFill();

		this._bg.width=this._bgMask.width/6*5;
		this._bg.height=615;
		this._bg.x=(this._bgMask.width-this._bg.width)/2;
		this._bg.y=(this._bgMask.height-this._bg.height)/2;

		this._bottomColour.width=this._bg.width-30;
		this._bottomColour.height=480;
		this._bottomColour.x=this._bg.x+(this._bg.width-this._bottomColour.width)/2;
		this._bottomColour.y=this._bg.y+15;

		this._icon_status.width=this._icon_status.height=72;
		this._icon_status.x=this._bottomColour.x+20;
		this._icon_status.y=this._bottomColour.y+20;

		this._icon_line.width=this._bottomColour.width-40;
		this._icon_line.x=this._bottomColour.x+(this._bottomColour.width-this._icon_line.width)/2;
		this._icon_line.y=this._icon_status.y+this._icon_status.height+10;

		this._txt_title.width=this._icon_line.width-this._icon_status.width-10;
		this._txt_title.height=this._icon_status.height;
		this._txt_title.x=this._icon_status.x+this._icon_status.width+10;
		this._txt_title.y=this._icon_status.y;

		this._txt_content.width=this._icon_line.width;
		this._txt_content.height=this._bottomColour.height-this._icon_status.height*2;
		this._txt_content.x=this._icon_line.x;
		this._txt_content.y=this._icon_line.y+15;

		this._btn_ok.x=Main.W/2;
		this._btn_ok.y=this._bottomColour.y+this._bottomColour.height+(this._bg.height-this._bottomColour.height)/2-10;

		this._btn_cancel.width=this._bottomColour.width/2.5;
		this._btn_cancel.x=this._btn_ok.x-this._bottomColour.width/4;
		this._btn_cancel.y=this._btn_ok.y;

		this._btn_enter.width=this._bottomColour.width/2.5;
		this._btn_enter.x=this._btn_ok.x+this._bottomColour.width/4;
		this._btn_enter.y=this._btn_ok.y;
	}
}