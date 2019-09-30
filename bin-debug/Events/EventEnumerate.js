var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventEnumerate = (function () {
    function EventEnumerate() {
    }
    /**
     * 动画播放结束
     */
    EventEnumerate.ANIMATION_COMPLETE = "animation_complete";
    /**
     * 完成选择操作
     */
    EventEnumerate.SELECT_COMPLETE = "select_complete";
    /**
     * 开始游戏
     */
    EventEnumerate.GAME_START = "game_start";
    /**
     * 结束游戏
     */
    EventEnumerate.GAME_OVER = "game_over";
    /**
     * 完成游戏
     */
    EventEnumerate.GAME_COMPLETE = "game_complete";
    /**
     * 重新开始游戏
     */
    EventEnumerate.GAME_RESET = "game_reset";
    /**
     * 分享游戏
     */
    EventEnumerate.GAME_SHARE = "game_share";
    return EventEnumerate;
}());
__reflect(EventEnumerate.prototype, "EventEnumerate");
//# sourceMappingURL=EventEnumerate.js.map