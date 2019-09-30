class pkUserList extends egret.Sprite {

	private _data:any;
	private _width:number;
	private _items:Array<UserItemUI>;
	private _space:number;

	public constructor(w:number) {
		super();
		this._width=w;
		this._space=10;
		this._data=null;
		this._items=[];
		this.addItems();
		this.setData();
	}

	public setData(data:any=[]){
		this._data=data;
		let total=Math.min(this._data.length,9);
		for(let i=0;i<9;i++){
			if(i>=total){
				this._items[i].visible=false;
				continue;
			}
			this._items[i].setData(this._data[i]);
			this._items[i].visible=true;
		}
	}

	private addItems(){
		for(let i=0;i<9;i++){
			let width=(this._width-this._space*2)/3
			let item=new UserItemUI(width);
			item.touchEnabled=true;
			this._items.push(item);
			item.x=(item.width+this._space)*(i%3);
			item.y=(item.height+this._space)*Math.floor(i/3);
			this.addChild(item);
		}
	}
}