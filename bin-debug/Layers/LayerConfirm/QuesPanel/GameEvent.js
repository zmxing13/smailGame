var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEvent = (function () {
    function GameEvent() {
    }
    GameEvent.TITLE_FINISH = "title_finish";
    GameEvent.RIGHT = "right";
    GameEvent.WRONG = "wrong";
    GameEvent.SWITCH_TO_NEXT_TITLE = "switch_to_next_title";
    return GameEvent;
}());
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map