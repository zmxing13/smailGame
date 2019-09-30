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
/**
 * 闯关成功数据显示状态
 */
var finshStatusClass = (function (_super) {
    __extends(finshStatusClass, _super);
    function finshStatusClass() {
        var _this = _super.call(this) || this;
        _this._public = new PublicClass();
        _this.promotTextArr = [];
        _this.initSprite();
        _this.UpWindowData();
        _this.initMessage();
        return _this;
    }
    finshStatusClass.prototype.setText = function (checkNum, finshNum, wrongNum) {
        this.checkPoint.setAdditionalNumber('第', checkNum.toString(), '关');
        this.finshStatus.setAdditionalNumber('正确答题：', finshNum.toString(), '道');
        this.wrongStatus.setAdditionalNumber('错误答题：', wrongNum.toString(), '道');
        if (finshNum == 0) {
            this.promptStates.text = '答对0道题';
        }
        else if (finshNum > 0 && finshNum < 3) {
            this.promptStates.text = '答对' + finshNum + '道,还有提升空间~';
        }
        else if (finshNum > 3 && finshNum < 5) {
            this.promptStates.text = '答对' + finshNum + '道,继续努力~';
        }
        else if (finshNum > 5 && finshNum < 7) {
            this.promptStates.text = '答对' + finshNum + '道,优秀~';
        }
        else if (finshNum > 7 && finshNum < 10) {
            this.promptStates.text = '答对' + finshNum + '道,太棒了~';
        }
        else if (finshNum == 10) {
            this.promptStates.text = '恭喜你,全部正确!';
        }
        this.promptStates.width = this.bgColor.width;
        this.UpWindowData();
    };
    finshStatusClass.prototype.clearText = function () {
        this.checkPoint.contentText.text = '';
        this.finshStatus.contentText.text = '';
        this.wrongStatus.contentText.text = '';
    };
    /**
     * 创建图形界面
     */
    finshStatusClass.prototype.initSprite = function () {
        this.bgColor = new egret.Sprite();
        this.bgColor.graphics.beginFill(0x000000, 0);
        this.bgColor.graphics.drawRect(0, 0, Main.W / 10 * 8, Main.H / 10 * 9);
        this.bgColor.graphics.endFill();
        this.addChild(this.bgColor);
        this.checkPoint = new finshText();
        this.addChild(this.checkPoint);
        this.finshStatus = new finshText();
        this.addChild(this.finshStatus);
        this.wrongStatus = new finshText();
        this.addChild(this.wrongStatus);
        this.promptStates = this._public.createTextByName('成绩优秀，继续保持~');
        this.promptStates.size = Main.W / 15;
        this.promptStates.multiline = false;
        // this.promptStates.textAlign = egret.HorizontalAlign.CENTER;
        // this.promptStates.verticalAlign = egret.VerticalAlign.TOP;
        this.addChild(this.promptStates);
        this.againBtn = this._public.createBitmapByName('img_config_aginBtn');
        this.addChild(this.againBtn);
        this.nextBtn = this._public.createBitmapByName('img_config_nextBtn');
        this.addChild(this.nextBtn);
    };
    /**
     * 界面布局 (尺寸发生变化时会执行)
     * 【初始化时需要 图形创建后执行一次】
     */
    finshStatusClass.prototype.UpWindowData = function () {
        this.checkPoint.x = (this.bgColor.width - this.checkPoint.width) / 2;
        this.checkPoint.y = this.bgColor.height / 10;
        this.finshStatus.x = (this.bgColor.width - this.finshStatus.width) / 2;
        this.finshStatus.y = this.checkPoint.y + this.checkPoint.height * 1.5;
        this.wrongStatus.x = (this.bgColor.width - this.wrongStatus.width) / 2;
        this.wrongStatus.y = this.finshStatus.y + this.finshStatus.height * 1.5;
        this.promptStates.x = (this.bgColor.width - this.promptStates.width) / 2;
        this.promptStates.y = this.wrongStatus.y + this.wrongStatus.height * 1.5;
        this.againBtn.x = (this.bgColor.width - this.againBtn.width) / 2;
        this.againBtn.y = this.promptStates.y + this.againBtn.height;
        this.nextBtn.x = (this.bgColor.width - this.nextBtn.width) / 2;
        this.nextBtn.y = this.againBtn.y + this.againBtn.height * 1.5;
    };
    /**
     * 初始化事件消息
    */
    finshStatusClass.prototype.initMessage = function () {
        this.againBtn.touchEnabled = true;
        this.nextBtn.touchEnabled = true;
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.againBtnTouch, this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.nextBtnTouch, this);
    };
    //再来一局
    finshStatusClass.prototype.againBtnTouch = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'againCheckpoint'));
    };
    //下一局
    finshStatusClass.prototype.nextBtnTouch = function (e) {
        this.dispatchEvent(new EventManage(EventEnumerate.SELECT_COMPLETE, 'nextCheckpoint'));
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    finshStatusClass.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
        if (exitTime === void 0) { exitTime = 0.1; }
        if (waitTime === void 0) { waitTime = 0.1; }
        if (stateAlpha === void 0) { stateAlpha = 1; }
        egret.Tween.get(this, {
            onChangeObj: this
        })
            .wait(waitTime * 1000)
            .to({ alpha: stateAlpha }, exitTime * 1000, function () {
            if (stateAlpha == 1) {
                this.visible = true;
            }
            else if (stateAlpha == 0) {
                this.visible = false;
            }
        });
    };
    /**
     * 销毁(淡出)
     * @param exitTime 退出时间
     * @param waitTime 等待时间
     */
    finshStatusClass.prototype.DestroyOut = function (exitTime, waitTime) {
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
    finshStatusClass.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return finshStatusClass;
}(BaseContainer));
__reflect(finshStatusClass.prototype, "finshStatusClass");
//# sourceMappingURL=finshStatusClass.js.map