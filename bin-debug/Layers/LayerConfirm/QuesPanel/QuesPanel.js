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
var QuesPanel = (function (_super) {
    __extends(QuesPanel, _super);
    function QuesPanel(w, h) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this._datas = [];
        _this._titleId = 1;
        _this.createTitleUI();
        _this.createOptionUI();
        return _this;
    }
    QuesPanel.prototype.setDatas = function (datas) {
        this._datas = datas;
        this._titleUI.setTitleDatas(datas);
        this._optionUI.setOptionDatas(datas);
    };
    QuesPanel.prototype.gotoAndStart = function (titleId) {
        if (this._datas.length == 0) {
            throw new egret.error("请先通过setDatas接口设置题目数据");
        }
        if (titleId > this._datas.length) {
            throw new egret.error("总共" + this._datas.length + "道题，不能跳转至第" + titleId + "题。");
        }
        this._titleId = titleId;
        this._titleUI.switchToTitle(this._titleId);
        this._optionUI.switchToTitle(this._titleId);
    };
    QuesPanel.prototype.createTitleUI = function () {
        this._titleUI = new TitleUI(this._width, this._height / 2 - 10);
        this._titleUI.x = 0;
        this._titleUI.y = 0;
        this.addChild(this._titleUI);
    };
    QuesPanel.prototype.createOptionUI = function () {
        var _this = this;
        this._optionUI = new OptionsUI(this._width, this._height / 2 - 10);
        this._optionUI.x = 0;
        this._optionUI.y = this._height / 2 + 10;
        this.addChild(this._optionUI);
        this._optionUI.addEventListener(GameEvent.RIGHT, function (e) {
            _this._titleId = e.data.currentIndex;
            _this.dispatchEvent(new egret.Event(GameEvent.RIGHT, false, false, { titleId: _this._titleId, Id: _this._datas[_this._titleId - 1].Id, btnLable: e.data.label }));
        }, this);
        this._optionUI.addEventListener(GameEvent.WRONG, function (e) {
            _this._titleId = e.data.currentIndex;
            _this.dispatchEvent(new egret.Event(GameEvent.WRONG, false, false, { titleId: _this._titleId, Id: _this._datas[_this._titleId - 1].Id, btnLable: e.data.label }));
        }, this);
        this._optionUI.addEventListener(GameEvent.TITLE_FINISH, function (e) {
            _this.dispatchEvent(new egret.Event(GameEvent.TITLE_FINISH));
        }, this);
        this._optionUI.addEventListener(GameEvent.SWITCH_TO_NEXT_TITLE, function (e) {
            _this._titleId = e.data.currentIndex;
            _this._titleUI.switchToTitle(_this._titleId);
            _this.dispatchEvent(new egret.Event(GameEvent.SWITCH_TO_NEXT_TITLE, false, false, { titleId: _this._titleId, Id: _this._datas[_this._titleId - 1].Id }));
        }, this);
    };
    /**
     * 隐藏 / 显示
     *   exitTime     淡出时间
     *   waitTime     等待时间
     *   stateAlpha   alpha状态
     */
    QuesPanel.prototype.hiddenOut = function (exitTime, waitTime, stateAlpha) {
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
    QuesPanel.prototype.DestroyOut = function (exitTime, waitTime) {
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
    QuesPanel.prototype.Destroy = function () {
        if (this.parent) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
    };
    return QuesPanel;
}(egret.Sprite));
__reflect(QuesPanel.prototype, "QuesPanel");
//# sourceMappingURL=QuesPanel.js.map