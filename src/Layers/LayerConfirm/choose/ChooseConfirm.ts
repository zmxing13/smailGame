//闯关游戏模式，按钮选择
class ChooseConfirm extends BaseContainer {
    private _public:PublicClass = new PublicClass();
    private addChildIndexArr:Array<any>=[];
	public constructor(_arr:Array<any>) {
		super();
        this.addChildIndexArr=_arr;
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}

    /**
     * 返回世界地图后初始化内容
     */
    public updataInit(){
        
    }

	/**
     * 创建图形界面
     */
	private initSprite(){
        var i,
            arrChild:number=0,
            obj:ImgTemplate;
        for (i=0;i<this.addChildIndexArr.length;i++){
            arrChild=this.addChildIndexArr[i];
            obj = new ImgTemplate('img_confirm_chooseGrade_'+(i+1));
            obj.x = 0;
            obj.y = obj.height * i;
            obj.id=(i+1);
            this.addChild(obj);
            obj.touchEnabled=true;
            if(arrChild!=0){
                obj.statusBoo=true;
            }else{
                obj.setBitmapFlilter();
            }
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.objTouch,this);
        }
	}

    private objTouch(e:egret.TouchEvent){
        var mc = e.currentTarget;
        console.log('闯关模式-年级按钮选择中'+mc.id,'当前对象触摸状态：'+mc.statusBoo);
        if(mc.statusBoo==true){
            this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE,e.currentTarget.id));
        }
    }

	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
       
	}

	/**
     * 初始化事件消息
     */
	private initMessage(){
		
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