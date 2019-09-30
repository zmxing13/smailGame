class ReceiveListUI extends egret.Sprite{
	
	private _width:number;
	private _height:number;
	private _datas:Array<any>;
	private _listUI:ListUI;
	private _scrollerUI:ScrollerUI;

	public constructor(w:number,h:number) {
		super();
		this._width=w;
		this._height=h;
		this._datas=[];
		this._listUI=new ListUI(w,h);
        this._scrollerUI=new ScrollerUI(w,h,this._listUI);
        this.addChild(this._scrollerUI);
	}

	public setDatas(datas){
		this._datas=datas;
		this.addOrder();
		let list=[];
        for(let i=0;i<this._datas.length;i++){
            let item=new ReceiveItemUI(this._width,100,this._datas[i]); 

			item.addEventListener("reject",(e)=>{
				this.dispatchEvent(new egret.Event("reject",false,false,{userData:e.data.userData}));
			},this);

			item.addEventListener("accept",(e)=>{
				this.dispatchEvent(new egret.Event("accept",false,false,{userData:e.data.userData}));
			},this);

			item.addEventListener("delete",(e)=>{
				this.dispatchEvent(new egret.Event("delete",false,false,{userData:e.data.userData}));
			},this);

            list.push(item);  
        }
		this._listUI.setList(list);
		this._scrollerUI.updateListHeight();
	}

	public getListLength(){
		return this._datas.length;
	}

	private addOrder(){
		for(let i=0;i<this._datas.length;i++){
			this._datas[i]={order:i,...this._datas[i]};
		}
	}

	private updateOrder(){
		for(let i=0;i<this._datas.length;i++){
			this._datas[i].order=i;
		}
	}

	public removeItemBy(id:number){
		this._listUI.removeItemBy(id);
		this._datas.splice(id,1);
		this.updateOrder();
		this._scrollerUI.updateListHeight();
	}
}