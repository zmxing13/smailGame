// 实例化图片模板
class ImgTemplate extends egret.DisplayObjectContainer{
    private _public:PublicClass = new PublicClass();
    public index:number=0;
    public id:number=0;
    public oldX:number=0;
    public oldY:number=0;
    public statusNum:number=0;          //状态值
    public statusBoo:boolean=false;     //状态布尔-是否是可触摸状态
    public result:egret.Bitmap;

    private _colorFlilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter([ 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0 ]); 
	public constructor(_texture:string) {
        super();
        this.createBitmapByName(_texture);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。
     * name属性请参考resources/resource.json配置文件的内容
    */
    private createBitmapByName(_texture:string){
        this.result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(_texture + '_png');
        this.result.texture = texture;
        this.addChild(this.result);
    }
    //设置图片为灰色
    public setBitmapFlilter(){
        this.result.filters = [this._colorFlilter];
    }

}