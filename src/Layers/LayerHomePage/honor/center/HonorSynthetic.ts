// 徽章拖动，提升等级区域 中部
class HonorSynthetic extends BaseContainer{
    private _public:PublicClass = new PublicClass();

    private bgColor:egret.Shape;
    private syntheicBtn:SyntheticBtnClass;              // 徽章 按钮
    private syntheicBg:SyntheticBtnClass;               // 徽章 背景框
    private syntheicBtnSp:egret.Sprite;                 // 徽章 按钮容器
    
    private syntheicBtnArr:Array<SyntheticBtnClass>;    //存放徽章数组
    private syntheicBgArr:Array<SyntheticBtnClass>;     //存放徽章背景数组    
    public syntheicBtnTypeArr:Array<string>;           //存放徽章纹理数组

    private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
    private _distance:egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
    private currMoveObj:SyntheticBtnClass;             //当前拖拽对象

	public constructor(w:number,h:number) {
		super();
        this.width=w;
        this.height=h;
        this.syntheicBtnTypeArr=[];
		this.initSprite();
		this.UpWindowData();
		this.initMessage();
	}
	/**
     * 创建图形界面
     */
	public initSprite(){
        let i,l,obj,objNum=0;
        this.syntheicBgArr=[];
        this.syntheicBtnArr=[];
        
        this.bgColor = new egret.Shape();
        this.bgColor.graphics.beginFill(0x721818,0);
        this.bgColor.graphics.drawRect(0, 0, this.width, this.height);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);

        this.syntheicBtnSp = new egret.Sprite();
        this.addChild(this.syntheicBtnSp);

        //徽章 背景框
        for (i=0;i<2;i++){
            for (l=0;l<4;l++){
                this.syntheicBg = new SyntheticBtnClass();
                this.syntheicBg.x= this.syntheicBg.width * 1.2 * l;
                this.syntheicBg.y= this.syntheicBg.height * 1.1 * i;
                this.syntheicBg.placeholderIndex=objNum;
                this.syntheicBtnSp.addChild(this.syntheicBg);
                this.syntheicBgArr.push(this.syntheicBg);
                objNum++;
            }
        }
	}

    public NewSyntheic(num:number){
        if(this.syntheicBtnArr.length>=0){
            this.syntheicBtnArr = this._public.emptyArray(this.syntheicBtnArr)
        }
        let i,l,obj,objNum=0;
        this.syntheicBtnArr=[];
        this.syntheicBtnTypeArr=[];

        for (i=0;i<num;i++){
            this.syntheicBtnTypeArr.push('img_custom_'+(i+1));
        }

        for (i=0;i<this.syntheicBgArr.length;i++){
            this.syntheicBgArr[i].placeholderBoo=false;
        }

        //徽章 拖拽对象
        for (i=0;i<2;i++){
            for (l=0;l<4;l++){
                if(objNum>=this.syntheicBtnTypeArr.length){return}
                this.syntheicBgArr[objNum].placeholderBoo=true;
                this.syntheicBtn = new SyntheticBtnClass(this.syntheicBtnTypeArr[objNum]);
                this.syntheicBtn.textureName = this.syntheicBtnTypeArr[objNum];
                this.syntheicBtn.x= this.syntheicBtn.width * 1.2 * l;
                this.syntheicBtn.y= this.syntheicBtn.height * 1.1 * i;
                this.syntheicBtn.placeholderIndex=objNum;
                this.syntheicBtnSp.addChild(this.syntheicBtn);
                this.syntheicBtnArr.push(this.syntheicBtn);
                this.syntheicBtn.touchEnabled=true;
                this.syntheicBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.objDownTouch,this);
                this.syntheicBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.objUpTouch,this);
                objNum++;
            }
        }
    }
    
	/**
     * 界面布局 (尺寸发生变化时会执行)
	 * 【初始化时需要 图形创建后执行一次】  
     */
	public UpWindowData(){
        var i,l,obj;
        this.syntheicBtnSp.x=(this.bgColor.width-this.syntheicBtnSp.width)/2;
        this.syntheicBtnSp.y=(this.bgColor.height-this.syntheicBtnSp.height)/2;
	}

	/**
     * 初始化事件消息
     */
	public initMessage(){
        var i,l,obj;
        for (i=0;i<this.syntheicBtnArr.length;i++){
            obj = this.syntheicBtnArr[i];
            obj.touchEnabled=true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.objDownTouch,this);
            obj.addEventListener(egret.TouchEvent.TOUCH_END, this.objUpTouch,this);
        }
	}
    
    private objDownTouch(e:egret.TouchEvent){
        this._touchStatus = true;
        this.currMoveObj = e.currentTarget;
        this.syntheicBtnSp.setChildIndex(this.currMoveObj, this.syntheicBtnSp.numChildren - 1);
        this._distance.x = e.stageX - this.currMoveObj.x;
        this._distance.y = e.stageY - this.currMoveObj.y;
        this.currMoveObj.oldX=this.currMoveObj.x;
        this.currMoveObj.oldY=this.currMoveObj.y;
        //当前背景框开启碰撞占位
        this.syntheicBgArr[this.currMoveObj.placeholderIndex].placeholderBoo=false;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(e:egret.TouchEvent){
        if(this._touchStatus){
            /**
             * 添加拖拽对象的活动范围
             */
            this.currMoveObj.x = e.stageX - this._distance.x;
            this.currMoveObj.y = e.stageY - this._distance.y;
            let hitState = this.hitCheckHandler(this.currMoveObj,this.syntheicBgArr);
            if(hitState==false){
                this.updateSyntheicBgnArrState();
            }else{
                hitState.bgTexture.visible=true;
            }
         }
    }    

    private objUpTouch(e:egret.TouchEvent){
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove, this);
        let hitState = this.hitCheckHandler(this.currMoveObj,this.syntheicBgArr);
        if(hitState==false){
            this.hitDoneMoveHandler(false)
        }else{
            this.hitDoneMoveHandler(true,hitState)
        }
    }
    /**
     * 检查当前对象是否碰撞到对象
     * 有：返回被碰撞对象
     * 无：返回false
     */
    private hitCheckHandler(_curObj:SyntheticBtnClass,_checkArr:Array<SyntheticBtnClass>){
        let curObj = _curObj,
            checkArr = _checkArr;
        var dx: number = 0,
			dy: number = 0,
			dxy: number = 0;
		var i,tempObj,
            hitBoo:boolean=false;

        for (i=0;i<checkArr.length;i++){
            tempObj = checkArr[i];
            dx = tempObj.x - curObj.x;
            dy = tempObj.y - curObj.y;
            dxy = Math.sqrt(dx * dx + dy * dy);
            if ((dxy >> 0) <= 80) {
                hitBoo=true;
                return tempObj;
			}
        }
        if(hitBoo==false){
            return false;
        }
    }
    //碰撞检测完成后，移动当前对象
    private hitDoneMoveHandler(_hitStage:boolean,_hitObj:SyntheticBtnClass=null){
        let hitState = _hitStage,
            hitObj = _hitObj;
        if(hitState==false){
            //未碰撞到，返回移动前的位置
            egret.Tween.get(this.currMoveObj)
            .to( {x:this.currMoveObj.oldX,y:this.currMoveObj.oldY},300);
            this.syntheicBgArr[this.currMoveObj.placeholderIndex].placeholderBoo=true;
            // console.log('return');
        }else if(hitState==true){
            //碰撞到，移动到新位置
            this.updateSyntheicBgnArrState();
            //碰撞对象已被占用，返回移动前的位置
            if(hitObj.placeholderBoo==true){
                egret.Tween.get(this.currMoveObj)
                .to( {x:this.currMoveObj.oldX,y:this.currMoveObj.oldY},300);
                // console.log('return oldX,oldY');            
                return;
            }
            // console.log('return newX,newY');                        
            egret.Tween.get(this.currMoveObj)
            .to( {x:hitObj.x,y:hitObj.y},100);
            hitObj.placeholderBoo=true;
            this.currMoveObj.placeholderIndex=hitObj.placeholderIndex;
        }
        this._touchStatus = false;
        this.currMoveObj=null;
    }
    //更新背景框状态
    private updateSyntheicBgnArrState(){
        let i,obj;
        for (i=0;i<this.syntheicBgArr.length;i++){
            obj = this.syntheicBgArr[i];
            obj.bgTexture.visible=false;
        }
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