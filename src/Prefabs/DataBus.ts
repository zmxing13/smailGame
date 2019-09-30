//数据池
class DataBus extends egret.DisplayObjectContainer{
    /**
     * 用户名
     */
    public static _userName:string=''
    /**
     * 密码
     */
    public static _password:string=''
    /**
     * code
     */
    public static _userCode:string='';
    /**
     * token
     */
    public static _token:string='';
    /**
     * 头像
     */
    public static _userAvatar:egret.Bitmap;
    /**
     * 头像url
     */
    public static _userAvatarUrl:string='';
    /**
     * 头像纹理
     */
    public static _userAvatarTexture:egret.Texture;
    /**
     * 头像纹理数组
     */
    public static _userAvatarTextureArr:Array<egret.Texture>;
    /**
     * 头像Id数组
     */
    public static _userAvatarIdArr:Array<number>;
    /**
     * 头像图片数组
     */
    public static _userAvatarBitmapArr:Array<egret.Bitmap>;
    /**
     * 昵称
     */
    public static _nickName:string='';
    /**
     * 等级
     * arr[0] = 1年级等级
     *       ...
     * arr[5] = 6年级等级 
     */
    public static _level:Array<number>=[0,0,0,0,0,0];
    /**
     * 经验值/总积分
     */
    public static  _empiricalValue:number=0;
    /**
     * 积分
     */
    public static _score:number=0;
    /**
     * 体力值
     */
    public static _power:number=0;
    /**
     * 徽章种类
     */
    public static _honorType:Array<any>=[];
    /**
     * 徽章数量
     */
    public static _honorNum:Array<any>=[];
    /**
     * 用户信息是否存在
     */
    public static userInfoThereAre:boolean=false;
    /**
     * 用户信息是否过期,
     */
    public static userInfoShelfLife:boolean=false;
    /**
     * 当前选中的年级
    */    
    public static curGradeNum:number=0;
    /**
     * 被pk对象id
     */
    public static hitTargetid:number=-1;
    /**
     * 接受pk答题卡id
     */
    public static getAnswerSheetId:number=-1;
    /**
     * 当前竞技消息id
     */
    public static curTargetCompettiveId:number=-1;
    /**
     * 竞技状态是否答题中
     */
    public static isCompettiveBoo:boolean=false;
    

	public constructor() {
		super();
	}
}


