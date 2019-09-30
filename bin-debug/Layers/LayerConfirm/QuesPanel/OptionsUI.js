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
var OptionsUI = (function (_super) {
    __extends(OptionsUI, _super);
    function OptionsUI(w, h) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this._space = 20;
        _this._currentIndex = 1;
        _this._currentOptions = [];
        _this._titleDatas = [];
        _this._currentTitleData = null;
        return _this;
    }
    OptionsUI.prototype.setOptionDatas = function (datas) {
        this._currentIndex = 1;
        this._titleDatas = datas;
        if (this._titleDatas.length > 0) {
            this._currentTitleData = this._titleDatas[this._currentIndex - 1];
            if (this._currentOptions.length == 0) {
                this._currentOptions = this.createOptions(this._currentTitleData.options);
            }
            else {
                this.updateCurrentOptions(this._currentTitleData.options);
            }
            this.layout();
            this.allowClick();
        }
    };
    OptionsUI.prototype.switchToTitle = function (titleId) {
        this._currentIndex = titleId - 1;
        this.switchNextOptions();
    };
    /*选项布局*/
    OptionsUI.prototype.layout = function () {
        if (this._currentOptions) {
            var btnType = this._currentOptions[0];
            if (btnType == "image") {
                for (var i = 1; i < this._currentOptions.length; i++) {
                    var btn = this._currentOptions[i];
                    this.addChild(btn);
                    btn.x = i % 2 == 0 ? btn.width + this._space : 0;
                    btn.y = i <= 2 ? 0 : btn.height + this._space;
                }
            }
            else {
                for (var i = 1; i < this._currentOptions.length; i++) {
                    var btn = this._currentOptions[i];
                    this.addChild(btn);
                    btn.x = 0;
                    btn.y = (i - 1) * (btn.height + this._space);
                }
            }
        }
    };
    /*根据当前数据创建选项列表*/
    OptionsUI.prototype.createOptions = function (data) {
        var _this = this;
        var num = data.length;
        if (num < 1) {
            return;
        }
        var btnsize = this.calculateBtnSize(data, this._space);
        var arr = [];
        arr.push(btnsize.type);
        for (var i = 0; i < num; i++) {
            var option = new OptionBtn(btnsize.width, btnsize.height, data[i]);
            option.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { _this.optionTouchBeginHandler(e); }, this);
            option.addEventListener(egret.TouchEvent.TOUCH_END, function (e) { _this.optionTouchEndHandler(e); }, this);
            arr.push(option);
        }
        return arr;
    };
    /*根据当前数据更新选项列表*/
    OptionsUI.prototype.updateCurrentOptions = function (data) {
        var _this = this;
        var num = data.length;
        if (num < 1) {
            return;
        }
        var btnsize = this.calculateBtnSize(data, this._space);
        this._currentOptions[0] = btnsize.type;
        for (var i = 1; i <= num; i++) {
            if (i < this._currentOptions.length) {
                var option = this._currentOptions[i];
                option.visible = true;
                option.setWidth(btnsize.width);
                option.setHeight(btnsize.height);
                option.data = data[i - 1];
                option.state = ButtonState.UP;
            }
            else {
                var option = new OptionBtn(btnsize.width, btnsize.height, data[i - 1]);
                option.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { _this.optionTouchBeginHandler(e); }, this);
                option.addEventListener(egret.TouchEvent.TOUCH_END, function (e) { _this.optionTouchEndHandler(e); }, this);
                this._currentOptions.push(option);
            }
        }
        for (var i = num + 1; i < this._currentOptions.length; i++) {
            var option = this._currentOptions[i];
            option.visible = false;
        }
    };
    /*选择选项*/
    OptionsUI.prototype.optionTouchBeginHandler = function (e) {
        var btn = e.currentTarget;
        var selectType = btn.label;
        var reLabelIndex;
        switch (selectType) {
            case "A":
                reLabelIndex = 0;
                break;
            case "B":
                reLabelIndex = 1;
                break;
            case "C":
                reLabelIndex = 2;
                break;
            case "D":
                reLabelIndex = 3;
                break;
        }
        if (this.isRight(selectType)) {
            btn.state = ButtonState.RIGHT;
            this.dispatchEvent(new egret.Event(GameEvent.RIGHT, false, false, { currentIndex: this._currentIndex, label: reLabelIndex }));
        }
        else {
            btn.state = ButtonState.WRONG;
            this.dispatchEvent(new egret.Event(GameEvent.WRONG, false, false, { currentIndex: this._currentIndex, label: reLabelIndex }));
        }
        this.preventClick();
        egret.setTimeout(this.switchNextOptions, this, 300);
    };
    OptionsUI.prototype.isRight = function (selectType) {
        return selectType == this._currentTitleData.correct;
    };
    /*按钮抬起*/
    OptionsUI.prototype.optionTouchEndHandler = function (e) {
        var btn = e.currentTarget;
        //btn.state=ButtonState.UP;
    };
    /*切换下一题的选项*/
    OptionsUI.prototype.switchNextOptions = function () {
        var _this = this;
        if (this.hasNext()) {
            this._currentIndex++;
            this._currentTitleData = this._titleDatas[this._currentIndex - 1];
            this.quitCurrentOptions();
            egret.setTimeout(function () {
                _this.enterNextOptions(_this._currentTitleData.options);
            }, this, 800);
            this.dispatchEvent(new egret.Event(GameEvent.SWITCH_TO_NEXT_TITLE, false, false, { currentIndex: this._currentIndex }));
        }
        else {
            this.dispatchEvent(new egret.Event(GameEvent.TITLE_FINISH));
        }
    };
    OptionsUI.prototype.quitCurrentOptions = function () {
        var _this = this;
        var _loop_1 = function (i) {
            egret.setTimeout(function () {
                egret.Tween.get(_this._currentOptions[i]).to({ x: -Main.W }, 500);
            }, this_1, i * 50);
        };
        var this_1 = this;
        for (var i = 1; i < this._currentOptions.length; i++) {
            _loop_1(i);
        }
    };
    OptionsUI.prototype.enterNextOptions = function (data) {
        var _this = this;
        this.updateCurrentOptions(data);
        this.layout();
        var _loop_2 = function (i) {
            this_2._currentOptions[i].alpha = 0;
            egret.setTimeout(function () {
                egret.Tween.get(_this._currentOptions[i]).to({ alpha: 1 }, 200);
            }, this_2, i * 50);
        };
        var this_2 = this;
        for (var i = 1; i < this._currentOptions.length; i++) {
            _loop_2(i);
        }
        this.allowClick();
    };
    /*根据当前选项数据计算选项按钮的大小*/
    OptionsUI.prototype.calculateBtnSize = function (data, space) {
        var isImage = data[0].content instanceof egret.Bitmap;
        var btnWidth, btnHeight, btnType;
        if (isImage) {
            btnType = "image",
                btnWidth = (this._width - space) / 2;
            btnHeight = (this._height - space) / 2;
        }
        else {
            btnType = "txt",
                btnWidth = this._width;
            btnHeight = (this._height - 3 * space) / 4;
        }
        return {
            type: btnType,
            width: btnWidth,
            height: btnHeight
        };
    };
    /*判断是否存在下一题*/
    OptionsUI.prototype.hasNext = function () {
        return this._currentIndex < this._titleDatas.length;
    };
    /*阻止点击*/
    OptionsUI.prototype.preventClick = function () {
        for (var i = 0; i < this._currentOptions.length; i++) {
            this._currentOptions[i].touchEnabled = false;
        }
    };
    /*允许点击*/
    OptionsUI.prototype.allowClick = function () {
        for (var i = 0; i < this._currentOptions.length; i++) {
            this._currentOptions[i].touchEnabled = true;
        }
    };
    return OptionsUI;
}(egret.Sprite));
__reflect(OptionsUI.prototype, "OptionsUI");
//# sourceMappingURL=OptionsUI.js.map