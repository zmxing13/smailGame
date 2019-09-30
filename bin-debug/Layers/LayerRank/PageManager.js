var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PageManager = (function () {
    function PageManager() {
    }
    PageManager.open = function (pageId, info) {
        if (info === void 0) { info = null; }
        if (!PageManager.Container) {
            throw new Error("请设置舞台");
        }
        switch (pageId) {
            case PageManager.PKSENDERTip:
                PageManager.Container.addChild(new TipPanelRank(info));
                break;
        }
    };
    PageManager.close = function (pageId, info) {
        if (info === void 0) { info = null; }
    };
    PageManager.PKSENDERTip = "pkSenderTip";
    return PageManager;
}());
__reflect(PageManager.prototype, "PageManager");
//# sourceMappingURL=PageManager.js.map