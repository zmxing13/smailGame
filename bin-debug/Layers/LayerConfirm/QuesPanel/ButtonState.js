var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ButtonState = (function () {
    function ButtonState() {
    }
    ButtonState.DOWN = "down";
    ButtonState.UP = "up";
    ButtonState.WRONG = "wrong";
    ButtonState.RIGHT = "right";
    return ButtonState;
}());
__reflect(ButtonState.prototype, "ButtonState");
//# sourceMappingURL=ButtonState.js.map