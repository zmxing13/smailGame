class ListUI extends egret.Sprite{

	private _width:number;
	private _height:number;
	private _list:Array<egret.Sprite>;
	private _lineSpace:number;
	private _listContainer:egret.Sprite;
	private _itemHeight;
	
	public constructor(w:number,h:number,lineSpace:number=10,itemHeight:number=80) {
		super();
		this._width=w;
		this._height=h;
		this._itemHeight=itemHeight;
		this._lineSpace=lineSpace;
		this._list=[];
		this._listContainer=new egret.Sprite();
		this.addChild(this._listContainer);
	}

	public setList(list:Array<egret.Sprite>){
		this._list=[];
		this._listContainer.removeChildren();
		if(list.length>0){
			this._itemHeight=list[0].height;
			for(let i=0;i<list.length;i++){
				this.addItem(list[i]);
			}
		}
	}

	public addItem(item:egret.Sprite){
		this._list.push(item);
		this._listContainer.addChild(item);
		let index=this._list.indexOf(item);
		item.width=this._width;
		item.height=this._itemHeight;
		if(index==0){
			item.y=this._lineSpace;
		}else{
			item.y=this._list[index-1].y+this._itemHeight+this._lineSpace;
		}
		item.x=0;
	}

	public removeItem(item:egret.Sprite){
		let id=this._list.indexOf(item);
		if(id!=-1){
			this.removeItemBy(id);
		}
	}

	public removeItemBy(id:number){
		this.preventClick();
		let item=this._list[id];
		egret.Tween.get(item).to({x:-600},200).call(()=>{
			this._listContainer.removeChild(item);
			this._list.splice(id,1);
			let promises=this.layout(id);
			Promise.all(promises).then(()=>{
				this.allowClick();
			})	
		});
	}

	public getListLength(){
		return this._list.length;
	}

	/*阻止点击*/
	private preventClick(){
		for(let i=0;i<this._list.length;i++){
			this._list[i].touchEnabled=false;
		}
	}

	/*允许点击*/
	private allowClick(){
		for(let i=0;i<this._list.length;i++){
			this._list[i].touchEnabled=true;
		}
	}

	private layout(id){
		let promises=[];
		for(let i=id;i<this._list.length;i++){
			let targetY=this._lineSpace+i*(this._itemHeight+this._lineSpace);
			let p=new Promise((resolve,reject)=>{
				egret.setTimeout(()=>{
					egret.Tween.get(this._list[i]).to({y:targetY},100).call(()=>{
						resolve();
					});
				},this,(i-id)*10);
			})
			promises.push(p);
		}
		return promises;
	}
}