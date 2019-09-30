class RankPanel extends eui.UILayer {
	private rank:RankUI;
	public constructor() {
		super();
		this.rank=new RankUI();
        this.addChild(this.rank);
	}

	public updataGrade(index:number){
        this.rank.updataGrade(index);
    }
}