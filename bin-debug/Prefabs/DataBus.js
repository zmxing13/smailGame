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
//数据池
var DataBus = (function (_super) {
    __extends(DataBus, _super);
    function DataBus() {
        return _super.call(this) || this;
    }
    /**
     * 用户名
     */
    DataBus._userName = '';
    /**
     * 密码
     */
    DataBus._password = '';
    /**
     * code
     */
    DataBus._userCode = '';
    /**
     * token
     */
    DataBus._token = '';
    /**
     * 头像url
     */
    DataBus._userAvatarUrl = '';
    /**
     * 昵称
     */
    DataBus._nickName = '';
    /**
     * 等级
     * arr[0] = 1年级等级
     *       ...
     * arr[5] = 6年级等级
     */
    DataBus._level = [0, 0, 0, 0, 0, 0];
    /**
     * 经验值/总积分
     */
    DataBus._empiricalValue = 0;
    /**
     * 积分
     */
    DataBus._score = 0;
    /**
     * 体力值
     */
    DataBus._power = 0;
    /**
     * 徽章种类
     */
    DataBus._honorType = [];
    /**
     * 徽章数量
     */
    DataBus._honorNum = [];
    /**
     * 用户信息是否存在
     */
    DataBus.userInfoThereAre = false;
    /**
     * 用户信息是否过期,
     */
    DataBus.userInfoShelfLife = false;
    /**
     * 当前选中的年级
    */
    DataBus.curGradeNum = 0;
    /**
     * 被pk对象id
     */
    DataBus.hitTargetid = -1;
    /**
     * 接受pk答题卡id
     */
    DataBus.getAnswerSheetId = -1;
    /**
     * 当前竞技消息id
     */
    DataBus.curTargetCompettiveId = -1;
    /**
     * 竞技状态是否答题中
     */
    DataBus.isCompettiveBoo = false;
    return DataBus;
}(egret.DisplayObjectContainer));
__reflect(DataBus.prototype, "DataBus");
//# sourceMappingURL=DataBus.js.map