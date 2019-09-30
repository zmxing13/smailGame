//修改背景框底部背景框弹板
class ChangeBgFeedback extends BaseContainer {

	public bgColor:egret.Sprite;
	//更改弹板背景框
    public changeBackBg:egret.Sprite;
    //关闭按钮容器
	public shutDownSp:egret.Sprite;
	//关闭按钮✖
	private shutDownBtn:egret.TextField;

	public constructor() {
		super();
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}

	/**
     * 创建图形界面
     */
	private initSprite(){
		this.bgColor = new egret.Sprite();
		this.bgColor.graphics.beginFill(0x000000,.3);
		this.bgColor.graphics.drawRect(0,0,Main.W,Main.H);
		this.bgColor.graphics.endFill();
		this.addChild(this.bgColor);

        this.changeBackBg =  new egret.Sprite();
		this.changeBackBg.graphics.beginFill(0xffffff,.95);
		this.changeBackBg.graphics.drawRoundRect(0,0,Main.W/10*8,Main.H/10*8,50,50);
		this.changeBackBg.graphics.endFill();
		this.addChild(this.changeBackBg);

        this.shutDownSp = new egret.Sprite();
		this.shutDownSp.graphics.beginFill(0xD83838);
        this.shutDownSp.graphics.drawCircle(0,0,this.changeBackBg.width/30*2);
        this.shutDownSp.graphics.endFill();
        this.addChild(this.shutDownSp);

		this.shutDownBtn=new egret.TextField();
		this.shutDownBtn.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.shutDownBtn.textAlign=egret.HorizontalAlign.CENTER;
		this.shutDownBtn.fontFamily = "微软雅黑";
        this.shutDownBtn.textColor= 0xffffff;
        this.shutDownBtn.text='✖';
        this.shutDownBtn.size=this.shutDownSp.width/2;
		this.shutDownSp.addChild(this.shutDownBtn);

	}

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        this.bgColor.graphics.clear();
        this.bgColor.graphics.beginFill(0x000000,.3);
		this.bgColor.graphics.drawRect(0,0,Main.W,Main.H);
		this.bgColor.graphics.endFill();

        this.changeBackBg.graphics.clear();
        this.changeBackBg.graphics.beginFill(0xffffff,.95);
		this.changeBackBg.graphics.drawRoundRect(0,0,Main.W/10*8,Main.H/10*8,50,50);
		this.changeBackBg.graphics.endFill();
        this.changeBackBg.x=(Main.W-this.changeBackBg.width)/2;
		this.changeBackBg.y=(Main.H-this.changeBackBg.height)/2;

        this.shutDownSp.x=this.changeBackBg.x+this.changeBackBg.width;
		this.shutDownSp.y=this.changeBackBg.y;
		
        this.shutDownBtn.x =-this.shutDownBtn.width/2;
		this.shutDownBtn.y =-this.shutDownBtn.height/2;
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
        this.bgColor.touchEnabled=true;
        this.changeBackBg.touchEnabled=true;
	}

	/**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    public hiddenOut(exitTime = 0.1, waitTime = 0.1, stateAlpha = 1){
        egret.Tween.get(this,{
            onChangeObj: this
        })
        .wait(waitTime*1000)
        .to({ alpha:stateAlpha },exitTime*1000)
    }

	/**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    public DestroyOut(exitTime = 0.1, waitTime = 0.1){
        egret.Tween.get(this,{
            onChangeObj: this
        })
        .wait(waitTime*1000)
        .to({ alpha:0 },exitTime*1000)
        .call(this.Destroy,this,[]);
    }
    /**
     * 删除自己
     */
    private Destroy(){
        if(this.parent){
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    }
}