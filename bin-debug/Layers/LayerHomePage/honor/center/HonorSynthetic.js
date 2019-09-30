var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// 徽章拖动，提升等级区域 中部
var HonorSynthetic = (function (_super) {
    __extends(HonorSynthetic, _super);
    function HonorSynthetic(w, h) {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this._touchStatus = false; //当前触摸状态，按下时，值为true
        _this._distance = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
        _this.width = w;
        _this.height = h;
        _this.syntheicBtnTypeArr = [];
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    /**
     * 创建图形界面
     */
    HonorSynthetic.prototype.initSprite = function () {
        var i, l, obj, objNum = 0;
        this.syntheicBgArr = [];
        this.syntheicBtnArr = [];
        this.bgColor = new egret.Shape();
        this.bgColor.graphics.beginFill(0x721818, 0);
        this.bgColor.graphics.drawRect(0, 0, this.width, this.height);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);
        this.syntheicBtnSp = new egret.Sprite();
        this.addChild(this.syntheicBtnSp);
        //徽章 背景框
        for (i = 0; i < 2; i++) {
            for (l = 0; l < 4; l++) {
                this.syntheicBg = new SyntheticBtnClass();
                this.syntheicBg.x = this.syntheicBg.width * 1.2 * l;
                this.syntheicBg.y = this.syntheicBg.height * 1.1 * i;
                this.syntheicBg.placeholderIndex = objNum;
                this.syntheicBtnSp.addChild(this.syntheicBg);
                this.syntheicBgArr.push(this.syntheicBg);
                objNum++;
            }
        }
    };
    HonorSynthetic.prototype.NewSyntheic = function (num) {
        if (this.syntheicBtnArr.length >= 0) {
            this.syntheicBtnArr = this._public.emptyArray(this.syntheicBtnArr);
        }
        var i, l, obj, objNum = 0;
        this.syntheicBtnArr = [];
        this.syntheicBtnTypeArr = [];
        for (i = 0; i < num; i++) {
            this.syntheicBtnTypeArr.push('img_custom_' + (i + 1));
        }
        for (i = 0; i < this.syntheicBgArr.length; i++) {
            this.syntheicBgArr[i].placeholderBoo = false;
        }
        //徽章 拖拽对象
        for (i = 0; i < 2; i++) {
            for (l = 0; l < 4; l++) {
                if (objNum >= this.syntheicBtnTypeArr.length) {
                    return;
                }
                this.syntheicBgArr[objNum].placeholderBoo = true;
                this.syntheicBtn = new SyntheticBtnClass(this.syntheicBtnTypeArr[objNum]);
                this.syntheicBtn.textureName = this.syntheicBtnTypeArr[objNum];
                this.syntheicBtn.x = this.syntheicBtn.width * 1.2 * l;
                this.syntheicBtn.y = this.syntheicBtn.height * 1.1 * i;
                this.syntheicBtn.placeholderIndex = objNum;
                this.syntheicBtnSp.addChild(this.syntheicBtn);
                this.syntheicBtnArr.push(this.syntheicBtn);
                this.syntheicBtn.touchEnabled = true;
                this.syntheicBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.objDownTouch, this);
                this.syntheicBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.objUpTouch, this);
                objNum++;
            }
        }
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    HonorSynthetic.prototype.UpWindowData = function () {
        var i, l, obj;
        this.syntheicBtnSp.x = (this.bgColor.width - this.syntheicBtnSp.width) / 2;
        this.syntheicBtnSp.y = (this.bgColor.height - this.syntheicBtnSp.height) / 2;
    };
    /**
     * 初始化事件消息
     */
    HonorSynthetic.prototype.initMessage = function () {
        var i, l, obj;
        for (i = 0; i < this.syntheicBtnArr.length; i++) {
            obj = this.syntheicBtnArr[i];
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.objDownTouch, this);
            obj.addEventListener(egret.TouchEvent.TOUCH_END, this.objUpTouch, this);
        }
    };
    HonorSynthetic.prototype.objDownTouch = function (e) {
        this._touchStatus = true;
        this.currMoveObj = e.currentTarget;
        this.syntheicBtnSp.setChildIndex(this.currMoveObj, this.syntheicBtnSp.numChildren - 1);
        this._distance.x = e.stageX - this.currMoveObj.x;
        this._distance.y = e.stageY - this.currMoveObj.y;
        this.currMoveObj.oldX = this.currMoveObj.x;
        this.currMoveObj.oldY = this.currMoveObj.y;
        //当前背景框开启碰撞占位
        this.syntheicBgArr[this.currMoveObj.placeholderIndex].placeholderBoo = false;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    HonorSynthetic.prototype.mouseMove = function (e) {
        if (this._touchStatus) {
            /**
             * 添加拖拽对象的活动范围
             */
            this.currMoveObj.x = e.stageX - this._distance.x;
            this.currMoveObj.y = e.stageY - this._distance.y;
            var hitState = this.hitCheckHandler(this.currMoveObj, this.syntheicBgArr);
            if (hitState == false) {
                this.updateSyntheicBgnArrState();
            }
            else {
                hitState.bgTexture.visible = true;
            }
        }
    };
    HonorSynthetic.prototype.objUpTouch = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        var hitState = this.hitCheckHandler(this.currMoveObj, this.syntheicBgArr);
        if (hitState == false) {
            this.hitDoneMoveHandler(false);
        }
        else {
            this.hitDoneMoveHandler(true, hitState);
        }
    };
    /**
     * 检查当前对象是否碰撞到对象
     * 有：返回被碰撞对象
     * 无：返回false
     */
    HonorSynthetic.prototype.hitCheckHandler = function (_curObj, _checkArr) {
        var curObj = _curObj, checkArr = _checkArr;
        var dx = 0, dy = 0, dxy = 0;
        var i, tempObj, hitBoo = false;
        for (i = 0; i < checkArr.length; i++) {
            tempObj = checkArr[i];
            dx = tempObj.x - curObj.x;
            dy = tempObj.y - curObj.y;
            dxy = Math.sqrt(dx * dx + dy * dy);
            if ((dxy >> 0) <= 80) {
                hitBoo = true;
                return tempObj;
            }
        }
        if (hitBoo == false) {
            return false;
        }
    };
    //碰撞检测完成后，移动当前对象
    HonorSynthetic.prototype.hitDoneMoveHandler = function (_hitStage, _hitObj) {
        if (_hitObj === void 0) { _hitObj = null; }
        var hitState = _hitStage, hitObj = _hitObj;
        if (hitState == false) {
            //未碰撞到，返回移动前的位置
            egret.Tween.get(this.currMoveObj)
                .to({ x: this.currMoveObj.oldX, y: this.currMoveObj.oldY }, 300);
            this.syntheicBgArr[this.currMoveObj.placeholderIndex].placeholderBoo = true;
            // console.log('return');
        }
        else if (hitState == true) {
            //碰撞到，移动到新位置
            this.updateSyntheicBgnArrState();
            //碰撞对象已被占用，返回移动前的位置
            if (hitObj.placeholderBoo == true) {
                egret.Tween.get(this.currMoveObj)
                    .to({ x: this.currMoveObj.oldX, y: this.currMoveObj.oldY }, 300);
                // console.log('return oldX,oldY');            
                return;
            }
            // console.log('return newX,newY');                        
            egret.Tween.get(this.currMoveObj)
                .to({ x: hitObj.x, y: hitObj.y }, 100);
            hitObj.placeholderBoo = true;
            this.currMoveObj.placeholderIndex = hitObj.placeholderIndex;
        }
        this._touchStatus = false;
        this.currMoveObj = null;
    };
    //更新背景框状态
    HonorSynthetic.prototype.updateSyntheicBgnArrState = function () {
        var i, obj;
        for (i = 0; i < this.syntheicBgArr.length; i++) {
            obj = this.syntheicBgArr[i];
            obj.bgTexture.visible = false;
        }
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    HonorSynthetic.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
        if (exitTime === void 0) { exitTime = 0.1; }
        if (waitTime === void 0) { waitTime = 0.1; }
        if (stateAlpha === void 0) { stateAlpha = 1; }
        egret.Tween.get(this, {
            onChangeObj: this
        })
            .wait(waitTime * 1000)
            .to({ alpha: stateAlpha }, exitTime * 1000);
    };
    /**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    HonorSynthetic.prototype.DestroyOut = function (exitTime, waitTime) {
        if (exitTime === void 0) { exitTime = 0.1; }
        if (waitTime === void 0) { waitTime = 0.1; }
        egret.Tween.get(this, {
            onChangeObj: this
        })
            .wait(waitTime * 1000)
            .to({ alpha: 0 }, exitTime * 1000)
            .call(this.Destroy, this, []);
    };
    /**
     * 删除自己
     */
    HonorSynthetic.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return HonorSynthetic;
}(BaseContainer));
__reflect(HonorSynthetic.prototype, "HonorSynthetic");
//# sourceMappingURL=HonorSynthetic.js.map