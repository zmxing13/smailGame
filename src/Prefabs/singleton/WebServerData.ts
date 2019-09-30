//服务器数据
class WebServerData extends egret.DisplayObject {
	public static webServer:WebServerData;
	
	private Request_Register:string='userRegister';					//注册
	private Request_Login:string='userLogin';						//登陆
	private Request_QuickLogin:string='quickLogin';					//快速登陆
	private Request_UserCheck:string='userCheck';					//验证token

	private Request_SetUserInfo:string='setUserInfo';				//设置用户信息
	private Request_SetPassword:string='setPassword';				//设置登陆密码
	
	private Request_GetUserData:string='getUserData';				//获取用户数据
	private Request_GetUserInfo:string='getUserInfo';				//获取用户信息
	private Request_GetUserPower:string='getUserPower';				//获取用户体力
	private Request_GetPortraitList:string='getPortraitList';		//获取头像列表
	private Request_GetMenuTree:string='getMenuTree';				//获取目录结构-年级，类型，题，等级
	private Request_GetQuestion:string='getQuestion';				//获取题干内容
	private Request_GetRanking:string='getRanking';					//获取排行榜
	private Request_GetUser:string='getUser';						//获取用户列表
	private Request_GetMessage:string='getMessage';					//获取竞技消息
	private Request_GetContestQuestion:string='getContestQuestion';	//获取竞技答题卡
	private Request_GetUserTrack:string='getUserTrack';				//获取所有足迹信息
	private Request_GetAnswerSheet:string='getAnswerSheet';			//获取足迹详细信息
	private Request_GetEmblen:string='getEmblen';					//获取徽章数据

	private Request_SubmitAnswer:string='submitAnswer';				//上传答题卡
	private Request_UsePower:string='usePower';						//上传/更新体力
	private Request_SubmitContest:string='submitContest';			//上传发起人/应答答题卡-竞技

	private Request_RefuseContest:string='refuseContest';			//拒绝竞技邀请
	private Request_DelMessage:string='delMessage';					//删除竞技邀请

	
	private Request_list:Object={};									//响应列表-区分回调作用域
	

	//url地址
	private urlAddress:string=''
	private func:Function;
	private currThis:egret.DisplayObjectContainer;
	public constructor(wd:SingletonEnforcer) {
		super();
		this.urlAddress = 'https://www.relyon.xyz/MathPlay/ability/';	//网络地址
		// this.urlAddress = 'http://10.12.5.22/MathPlay/ability/';	//本地地址
	}
	public static getInstance():WebServerData{
		if (WebServerData.webServer == null){
			WebServerData.webServer=new WebServerData(new SingletonEnforcer());
		}
		return WebServerData.webServer;
	}
	/**
	 * 用户注册
	 */
	public userRegister(_username:string,_password:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "username="+ _username + "&password="+_password;
		this.currThis=newThis;
		this.Request_list[this.Request_Register]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_Register,params,_func)
	}
	/**
	 * 用户登陆
	 */
	public userLogin(_username:string,_password:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "username="+ _username + "&password="+_password;
		this.currThis=newThis;
		this.Request_list[this.Request_Login]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_Login,params,_func)
	}
	/**
	 * 快速登陆
	 */
	public userQuickLogin(_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = ''		
		this.currThis=newThis;
		this.Request_list[this.Request_QuickLogin]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_QuickLogin,null,_func)
	}
	/**
	 * 验证token是否过期
	 */
	public userCheckToken(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;	
		this.currThis=newThis;
		this.Request_list[this.Request_UserCheck]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_UserCheck,params,_func);
	}


	/**
	 * 设置用户信息 自定义头像，自定义昵称
	 * _nickName 	自定义昵称
	 * _pictureId 	自定义头像id-服务器传递时
	 */
	public setUserInfo(_token:string,_nickName:string,_pictureId:number,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token +"&nickname="+ _nickName +"&pictureId="+ _pictureId;		
		this.currThis=newThis;
		this.Request_list[this.Request_SetUserInfo]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_SetUserInfo,params,_func)
	}
	/**
	 * 设置登陆密码
	 * _token 		token值
	 * password 	旧密码
	 * newpassword	新密码
	 */
	public setPassword(_token:string,_password:string,_newpassword:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token + "&password="+ _password + "&newpassword="+_newpassword;
		this.currThis=newThis;
		this.Request_list[this.Request_SetPassword]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_SetPassword,params,_func)
	}


	
	/**
	 * 获取用户数据
	 * 用户数据包含： 等级，积分，体力
	 */
	public getUserData(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;
		this.currThis=newThis;
		this.Request_list[this.Request_GetUserData]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_GetUserData,params,_func)
	}
	/**
	 * 获取用户信息
	 * 用户信息包含： 昵称，头像
	 */
	public getUserInfo(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;		
		this.currThis=newThis;
		this.Request_list[this.Request_GetUserInfo]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_GetUserInfo,params,_func)
	}
	/**
	 * 获取用户体力
	 * _token	token值
	 */
	public getUserPower(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;		
		this.currThis=newThis;
		this.Request_list[this.Request_GetUserPower]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_GetUserPower,params,_func)
	}
	/**
	 * 获取头像列表
	 */
	public getPortraitList(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;		
		this.currThis=newThis;
		this.Request_list[this.Request_GetPortraitList]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_GetPortraitList,params,_func)
	}
	/**
	 * 获取目录结构-年级，类型，题，等级
	 */
	public GetMenuTree(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;
		this.currThis=newThis;
		this.Request_list[this.Request_GetMenuTree]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_GetMenuTree,params,_func)
	}
	/**
	 * 获取答题卡内容
	 * 
	 * _token		token值
	 * classId,	 	年级
	 * categoryId,	类型-1：计算题-2：阅读题-3：看图题
	 * levelId		等级
	 * status 		模式-1：闯关/混合 -2：专项
	 * _fun			回调方法
	 * newThis		作用域
	 */
	public getQuestion(_token:string,_classId:number,_categoryId:number,_levelId:number,_status:number=0,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token +"&classId="+_classId+"&categoryId="+_categoryId+"&levelId="+_levelId+"&status="+_status;
		this.currThis=newThis;
		this.Request_list[this.Request_GetQuestion]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_GetQuestion,params,_func)
	}
	/**
	 * 获取排行榜
	 * _gradeId		年级id
	 */
	public getRanking(_token:string,_gradeId:number,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token +"&gradeId="+_gradeId;
		this.currThis=newThis;
		this.Request_list[this.Request_GetRanking]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_GetRanking,params,_func)
	}
	/**
	 * 获取用户列表
	 */
	public getUser(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;
		this.currThis=newThis;
		this.Request_list[this.Request_GetUser]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_GetUser,params,_func)
	}
	/**
	 * 获取竞技消息
	 */
	public getMessage(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;
		this.currThis=newThis;
		this.Request_list[this.Request_GetMessage]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_GetMessage,params,_func)
	}

	/**
	 * 获取竞技答题数据
	 * _asId	答题卡id
	 */
	public getContestQuestion(_token:string,_asId:number,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token+"&asId="+_asId;
		this.currThis=newThis;
		this.Request_list[this.Request_GetContestQuestion]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_GetContestQuestion,params,_func)
	}

	/**
	 * 获取所有足迹信息
	 * _page	页数
	 * _orphans	第页条数
	 */
	public getUserTrack(_token:string,_page:number,_orphans:number,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token+"&page="+_page+"&orphans="+_orphans;
		this.currThis=newThis;
		this.Request_list[this.Request_GetUserTrack]={'fun':_func,'targetThis':newThis,'params':params};
		this.sendRequest(this.Request_GetUserTrack,params,_func);
	}

	/**
	 * 获取足迹详细信息
	 * _index	要查看的足迹id
	 */
	public getAnswerSheet(_token:string,_index:number,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token+"&index="+_index;
		this.currThis=newThis;
		this.Request_list[this.Request_GetAnswerSheet]={'fun':_func,'targetThis':newThis,'params':params};
		this.sendRequest(this.Request_GetAnswerSheet,params,_func);
	}

	/**
	 * 获取徽章数据
	 */
	public getEmblen(_token:string,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token;
		this.currThis=newThis;
		this.Request_list[this.Request_GetEmblen]={'fun':_func,'targetThis':newThis,'params':params};
		this.sendRequest(this.Request_GetEmblen,params,_func);
	}


	// Request_getEmblen
	/**
	 * 向服务器发送答题卡数据
	 * _token		token值
	 * _status,	 	游戏模式-1.闯关-2.练习-3.竞技
	 * _tsum,	 	答题总数
	 * _fault,	 	失误次数
	 * _score,	 	分数
	 * _time,		用时-单位秒
	 * _answers,	答案数组-列表类型
	 */
	public submitAnswer(_token:string,_status:number,_tsum:number,_fault:number,_score:number=0,_time:number=0,_answers:Array<any>=[],_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token +"&status="+_status+"&tsum="+_tsum+"&fault="+_fault+"&score="+_score+"&time="+_time+"&answers="+JSON.stringify(_answers);
		this.currThis=newThis;
		this.Request_list[this.Request_SubmitAnswer]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_SubmitAnswer,params,_func)
	}
	/**
	 * 上传/更新体力值
	 * _token		token值
	 * _consume		消耗的体力值
	 */
	public usePower(_token:string,_consume:number=0,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token +"&consume="+_consume;
		this.currThis=newThis;
		this.Request_list[this.Request_UsePower]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_UsePower,params,_func)
	}
	
	/**
	 * 向服务器发送答题卡数据
	 * _token		token值
	 * _status,	 	游戏模式-1.闯关-2.练习-3.竞技
	 * _tsum,	 	答题总数
	 * _fault,	 	失误次数
	 * _score,	 	分数
	 * _time,		用时-单位秒
	 * _answers,	答案数组-列表类型
	 * _targetId	被pk对象的id
	 * _asId		答题卡id
	 */
	public submitCotest(_token:string,_status:number,_tsum:number,_fault:number,_score:number=0,_time:number=0,_answers:Array<any>=[],_targetId:number=-1,_asId:number=-1,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token +"&status="+_status+"&tsum="+_tsum+"&fault="+_fault+"&score="+
				_score+"&time="+_time+"&answers="+JSON.stringify(_answers)+"&targetId="+_targetId+"&asId="+_asId;
		this.currThis=newThis;
		this.Request_list[this.Request_SubmitContest]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_SubmitContest,params,_func)
	}

	/**
	 * 拒绝竞技邀请
	 * _messageId	要拒绝的竞技消息的ID
	 */
	public refuseContest(_token:string,_messageId:number,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token +"&messageId="+_messageId;
		this.currThis=newThis;
		this.Request_list[this.Request_RefuseContest]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_RefuseContest,params,_func)
	}

	/**
	 * 删除竞技消息
	 * _messageId	要删除的竞技消息的ID
	 */
	public delMessage(_token:string,_messageId:number,_func:Function=null,newThis:egret.DisplayObjectContainer=null){
		let params = "token="+ _token +"&messageId="+_messageId;
		this.currThis=newThis;
		this.Request_list[this.Request_DelMessage]={'fun':_func,'targetThis':newThis,'params':params}
		this.sendRequest(this.Request_DelMessage,params,_func)
	}

	//---------------------------------------------
	//-----------------华丽的分割线-----------------
	//---------------------------------------------


	private tempUrl:string='';
	private tempData:Array<any>=[];
	private tempFun:Function=null;
	private requestType:string='';
	/**
	 * 发送请求
	 * url:  	接口
	 * data:	参数
	 * func:	回调方法 
	 */
	public sendRequest(_url:string,_data:any=null,_func:Function=null){
		// this.func = _func;
		var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
			request.open(this.urlAddress + _url +"/",egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
			request.send(_data);
            request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
            request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
			this.tempData=_data;
	}
	//成功
	private onPostComplete(event:egret.Event):void {
		// console.log(event)
        var request = <egret.HttpRequest>event.currentTarget;
		var responseUrl= this.getRequestType(event.currentTarget._url)
		var tempObj:any = this.Request_list[responseUrl]
		if(tempObj){
			var response = JSON.parse(request.response)
			if(response.code==10001 || response.code==20000 ){
				tempObj.fun.apply(tempObj.targetThis,[response]);
			}else{
				LayerDialogBoxScene.getInstance().newDialogBoxEvent(request.response.explain,DialogBox.TypeModel.Type_Warn,this.resetSend,this,'取  消','重  试');
			}
		}
    }
	//失败
    private onPostIOError(event:egret.IOErrorEvent):void {
		console.log("post error : " , event);
		this.requestType = this.getRequestType(event.currentTarget._url)
		LayerDialogBoxScene.getInstance().newDialogBoxEvent('通讯失败,请重试...',DialogBox.TypeModel.Type_Warn,this.resetSend,this,'取  消','重  试');
    }
	//进程
    private onPostProgress(event:egret.ProgressEvent):void {
        // console.log("post progress : " , Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }
	//
	private resetSend(e){
		if(e){
			// this.sendRequest(this.requestType,this.tempData,this.func);
			var tempObj:any = this.Request_list[this.requestType]
			if(tempObj){
				this.sendRequest(this.requestType,tempObj.params,tempObj.fun);
			}
			console.log('重试ing')
		}else{
			console.log('放弃ing')
		}
		ChallengeClass.challenge.killLoad()
	}
	private getRequestType(url:string):string{
		let requestTargetStr:Array<string> = String(url).split("/")
		let requestTarget:string = requestTargetStr.pop();
		if(!requestTarget){
			requestTarget = requestTargetStr.pop();
		}
		return requestTarget;
  	}
}
class SingletonEnforcer{}