/** 
 *排行榜组件,主要包含下面两部分
 *1. 年级选项卡：1-6年级
 *2. 玩家列表：名次-头像-年级-昵称-积分-pk按钮
 *功能：
 *1.从服务器取玩家排行信息 
 *2.使用数据渲染年级选项卡
 *3.使用数据渲染玩家列表，并为列表按钮添加事件
 *
 *输入： 排行榜皮肤
        年级选项卡皮肤
        玩家列表皮肤
        一至六年级玩家排行榜数据
*/

class RankUI extends eui.Component {

    private tabBarGrade:eui.TabBar;//年级选项卡，需要渲染器渲染
   
    private listPlayers:eui.List;//玩家列表，需要渲染器渲染

    private loadingImg:eui.Image;//加载动画

    private currentGrade:number=1;

    private gradeDataArr:Array<any>=[];
    

    private grade1:Array<any>=[];
    private grade2:Array<any>=[];
    private grade3:Array<any>=[];
    private grade4:Array<any>=[];
    private grade5:Array<any>=[];
    private grade6:Array<any>=[];
   

	public constructor() {
		super();
        this.percentWidth=100;
        this.percentHeight=100;
		this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/rankUISkin.exml";
        let exml="resource/custom_skins/gradeTabBarSkin1.exml";
	}
    
    public updataGrade(index:number=1){
        this.changeToGrade(index);    //跳转指定年级目录页
        // this.tabBarGrade.dataProvider=index;
        this.renderPlayerList();
    }

	private uiCompHandler():void{
        this.createGradeTabBar();
        this.loadingImg.visible=false;
        this.changeToGrade(1);    //跳转指定年级目录页
        this.renderPlayerList();
	}

	protected createChildren():void {
        super.createChildren();
    }

    /*
    *渲染年级选项卡
    */
    private createGradeTabBar():void{
        var listBar=["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"];
        this.tabBarGrade.itemRenderer=GradeListRNKIR;
        this.tabBarGrade.dataProvider = new eui.ArrayCollection(listBar); 
        this.tabBarGrade.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
    }

    /*
    *切换选项卡
    */
    private onBarItemTap(e: eui.ItemTapEvent):void{
        this.currentGrade=e.itemIndex+1;
        this.changeToGrade(this.currentGrade);
    }
    /*切换至index年级*/
    public changeToGrade(index:number){
        //如果当前年级数据存在，直接渲染，否则加载后渲染
        WebServerData.webServer.getRanking(DataBus._token,index,this.getrankHandler,this);
        LoadSeadScreen.loadScreen.saveLoad();
    }

    private getrankHandler(data:any){
        console.log('排行榜',data)
        LoadSeadScreen.loadScreen.killLoad();
        var _public:PublicClass=new PublicClass();
        this.gradeDataArr = _public.formattingUserRankData(data.data.randinglist);
        console.log('排行榜内容:',this.gradeDataArr);
        if(this.gradeDataArr){
             this.renderPlayerList();
        }else{
             this.listPlayers.dataProvider=new eui.ArrayCollection(null);
             this.loadData(this.currentGrade)
             .then(this.onComplete)
             .catch(()=>{
                 console.log("error");//数据加载出错
            });
        }
    }
 
    /*
    *加载年级为id的排行榜信息，加载完成后渲染数据;
    */
    private loadData(id){
        return new Promise((resolve,reject)=>{
            let url="http://xesmpcs.speiyou.com/5test/data/grade"+id+".json";
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url,egret.HttpMethod.GET);
            request.send();
            request.addEventListener(egret.Event.COMPLETE,resolve,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,reject,this);
        })
    }

    private onComplete(event:egret.Event):void{
        let json=JSON.parse(event.currentTarget.response);
        console.log(json)
        this["grade"+this.currentGrade]=this.gradeDataArr;
        this.renderPlayerList()
    }

    /*
    *渲染器渲染玩家列表
    */
    private renderPlayerList():void{
		this.listPlayers.itemRenderer=PlayerListRNKIR;
        //初始数据为一年级
        this["grade"+this.currentGrade]=this.gradeDataArr;
        let datas=this["grade"+this.currentGrade].map((item,index)=>{
            return {order:index+1,...item};
        });
        this.listPlayers.dataProvider=new eui.ArrayCollection(datas);
    }
}

/*玩家列表渲染器*/
class PlayerListRNKIR extends eui.ItemRenderer {
    private pkBtn:eui.Button;
    constructor() {
        super();
        this.skinName = "resource/custom_skins/playerListSkin.exml";
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler,this);
    }

    private uiCompHandler():void{
        this.dataChanged();
	}

    protected createChildren():void {
        super.createChildren();
    }

    protected dataChanged():void {
       if(this.pkBtn instanceof eui.Button){
            if(this.pkBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) return;
            this.pkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                    console.log("open");
                    //打开提示面板，并传递数据；
                    PageManager.open(PageManager.PKSENDERTip,this.data);
            },this) 
        }
    }
}

/*年级列表渲染器*/
class GradeListRNKIR extends eui.ItemRenderer{
     constructor() {
        super();
        this.skinName = `<e:Skin states="up,down"  xmlns:e="http://ns.egret.com/eui">
                            <e:Image source="resource/assets/rank/btn_Bg.png" source.down="resource/assets/rank/btn_Bg_down.png" percentWidth="100" percentHeight="100" anchorOffsetY="0" anchorOffsetX="0" left="0" right="0" fillMode="scale" bottom="0" top="0" scale9Grid="3,5,38,34"/>
                            <e:Label fontFamily="微软雅黑" text="{data}" size="30" textColor.down="0x666666" textAlign="center" verticalAlign="middle" textColor="0xFFFFFF"  anchorOffsetX="0" anchorOffsetY="0" left="0" right="0" top="0" bottom="0"/>
                        </e:Skin>`
    }

    protected createChildren():void {
        super.createChildren();
    }

    protected dataChanged():void {
       
    }
}