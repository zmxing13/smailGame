var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//公共方法类
var PublicClass = (function (_super) {
    __extends(PublicClass, _super);
    function PublicClass() {
        return _super.call(this) || this;
    }
    /**
     * 根据name关键字创建一个Bitmap对象。
     * name属性请参考resources/resource.json配置文件的内容
     */
    PublicClass.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name + '_png');
        result.texture = texture;
        return result;
    };
    /**
     * 根据name关键字创建一个 ImageLoader 对象
     * name 参数是url地址
     */
    PublicClass.prototype.createImageLoaderByName = function (name) {
        var texture, bitmap;
        var imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";
        imgLoader.load(name);
        imgLoader.once(egret.Event.COMPLETE, function (evt) {
            if (evt.currentTarget.data) {
                egret.log("加载头像成功: ", evt.currentTarget.data);
                texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                bitmap = new egret.Bitmap(texture);
            }
        }, this);
        return bitmap;
    };
    /**
     * 通过url地址，获取数据信息，并返回Texture
     * url      : 数据地址
     * curId    : 对象id
     * curName  : 对象名字
    */
    PublicClass.prototype.aisleUrlReturnTexture = function (url, curId, curName) {
        if (curId === void 0) { curId = 0; }
        if (curName === void 0) { curName = ''; }
        return new Promise(function (resolve, reject) {
            RES.getResByUrl(url, function (data) {
                // console.log('预加载图片成功:',data);
                data.id = curId;
                data.name = curName;
                resolve(data);
            }, this);
        });
    };
    /**
     * 根据textStr关键字创建一个TextField对象
     * textStr:  文字内容
     * sizeNum:  文字大小 默认30
     * colorStr: 文字颜色 默认白色
    */
    PublicClass.prototype.createTextByName = function (textStr, sizeNum, colorStr) {
        if (sizeNum === void 0) { sizeNum = 30; }
        if (colorStr === void 0) { colorStr = 0xffffff; }
        var textContent = new egret.TextField;
        textContent.verticalAlign = egret.VerticalAlign.MIDDLE;
        textContent.textAlign = egret.HorizontalAlign.CENTER;
        textContent.fontFamily = "微软雅黑";
        textContent.textColor = colorStr;
        textContent.text = textStr;
        textContent.size = sizeNum;
        return textContent;
    };
    /**
     * 根据textStr关键字创建一个TextField对象
     * 类型 为动态输入-INPUT
     * textStr 文字内容
     * testSize 文字大小
    */
    PublicClass.prototype.createTextField = function (textStr, testSize) {
        if (testSize === void 0) { testSize = 50; }
        var text = new egret.TextField();
        text.type = egret.TextFieldType.INPUT;
        text.fontFamily = 'Heiti';
        text.width = 300;
        text.height = 80;
        text.size = testSize;
        text.textColor = 0x000000;
        text.textAlign = egret.HorizontalAlign.RIGHT; //水平右对齐，相对于 textField 控件自身的 width 与 height
        text.verticalAlign = egret.VerticalAlign.TOP; //垂直上对齐
        text.text = textStr;
        return text;
    };
    /**
     * 获取某个元素下标
     * arrays  : 传入的数组
     * obj     : 需要获取下标的元素
    */
    PublicClass.prototype.getObjArrayIndex = function (arrays, obj) {
        var i;
        i = arrays.length;
        while (i--) {
            if (arrays[i] === obj) {
                return i;
            }
        }
        return false;
    };
    /**
     * 传入元素name获取元素在数组的下标
     * arrs     :   传入数组
     * objName  :   传入元素name
     */
    PublicClass.prototype.getObjNameArrayIndex = function (arrays, objName) {
        var i;
        i = arrays.length;
        while (i--) {
            if (arrays[i].name === objName) {
                return i;
            }
        }
        return false;
    };
    /**
     * 打乱数组
     */
    PublicClass.prototype.shuffleArray = function (arr) {
        var length = arr.length, randomIndex, temp;
        while (length) {
            randomIndex = Math.floor(Math.random() * (length--));
            temp = arr[randomIndex];
            arr[randomIndex] = arr[length];
            arr[length] = temp;
        }
        return arr;
    };
    /**
     * 清空数组内容返回空数组
     */
    PublicClass.prototype.emptyArray = function (arr) {
        var i, oj;
        for (i = arr.length - 1; i >= 0; i--) {
            oj = arr[i];
            oj.parent.removeChild(oj);
            arr.splice(i, arr.length);
        }
        return arr;
    };
    //分数大小比较方法
    PublicClass.prototype.compare = function (a, b) {
        //先根据分数排名，这里是从小到大
        if (a.score < b.score) {
            return -1;
        }
        else if (a.score > b.score) {
            return 1;
        }
        else {
            //然后在分数的基础上再根据用户使用的时间排序，时间越少，排名越往前；
            if (a.usedTime < b.usedTime) {
                return -1;
            }
            else if (a.usedTime > b.usedTime) {
                return 1;
            }
            else {
                return 0;
            }
        }
    };
    /**
     * 正则-截取字符内容,返回所需要的内容
     * strContent:   所要截取的字符串内容
     * startIndex:   开始截取关键字
     * dir:          方向-
     *                  0：向左截取
     *                  1：向右截取
     * oneself      是否包含自己-
     *                  0：包含自己
     *                  1：不包含自己
     */
    PublicClass.prototype.regTruncationUrl = function (_strContent, _startindex, _dir, _oneself) {
        if (_dir === void 0) { _dir = 0; }
        if (_oneself === void 0) { _oneself = 0; }
        var strContent = _strContent, startIndex = _startindex, dir = _dir, oneself = _oneself;
        if (dir == 0) {
            //向左
            strContent = strContent.match(/(\S*) + startIndex + /)[oneself];
        }
        else if (dir == 1) {
            //向右
            strContent = strContent.match(/ + startIndex + (\S*)/)[oneself];
        }
        return strContent;
    };
    /**
     * 验证用户名是否符合标准
    */
    PublicClass.prototype.validationUserName = function (_userName) {
        if (_userName === void 0) { _userName = ''; }
        var userName = _userName;
        var returnStr;
        var re = /^[0-9a-zA-Z_]*$/g;
        var reg = re.test(userName);
        returnStr = 'pass'; //合格
        if (userName.length == 0) {
            returnStr = '用户名为空';
        }
        else if (userName.length < 5 || userName.length > 10) {
            returnStr = '用户名必须为5~10位';
        }
        else if (this.check_other_char(_userName)) {
            returnStr = '不能含有特殊字符';
        }
        return returnStr;
    };
    /**
     * 验证用户名是否含有特殊字符
     */
    PublicClass.prototype.check_other_char = function (str) {
        var arr = ["&", "\\", "/", "*", ">", "<", "@", "!", ",", "。"];
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < str.length; j++) {
                if (arr[i] == str.charAt(j)) {
                    return true;
                }
            }
        }
        return false;
    };
    //检测输入框的宽度
    PublicClass.prototype.getTextWidth = function (tfW) {
        var tempW = 0, content = tfW.text;
        if (tfW.text.length == 0) {
            console.log('== null');
            return null;
        }
        while (true) {
            tempW = tfW.textWidth;
            if (tempW >= tfW.width) {
                content = content.slice(0, content.length - 1);
                tfW.text = content;
                // console.log(content)
            }
            else {
                break;
            }
        }
        return content;
    };
    /**
     * 验证密码是否符合标准
     * _password        第一次输入密码
     * _passwordExplain 第二次输入的确认密码
     * signBoo          是否是注册
    */
    PublicClass.prototype.validationPassWord = function (_password, _passwordExplain, _signBoo) {
        if (_password === void 0) { _password = ''; }
        if (_passwordExplain === void 0) { _passwordExplain = ''; }
        if (_signBoo === void 0) { _signBoo = true; }
        var password = _password;
        var passwordExplain = _passwordExplain;
        var returnStr;
        var re = /^[0-9a-zA-Z_]*$/g;
        var reg = re.test(password);
        if (_signBoo == true) {
            if (password != passwordExplain) {
                return '两次密码不一致,请重新输入';
            }
        }
        returnStr = 'pass'; //合格
        if (password.length == 0) {
            returnStr = '密码不能为空';
        }
        else if (password.length < 6) {
            returnStr = '密码不能小于6个字符';
        }
        else if (password.length > 18) {
            returnStr = '密码不能大于18个字符';
        }
        else if (reg == false) {
            returnStr = '密码不能有特殊字符例如:-,%,*,$...';
        }
        return returnStr;
    };
    /**
     * 解析等级数据，每个年级的等级值
     */
    PublicClass.prototype.parsingLevelData = function (dataArr) {
        var returnArr = [], i, num = 1, dataObj;
        for (i = 0; i < dataArr.length; i++) {
            dataObj = dataArr[i];
            if (dataObj.classId == num) {
                returnArr.push(parseInt(dataObj.level));
            }
            else {
                returnArr.push(0);
                continue;
            }
            num++;
        }
        return returnArr;
    };
    /**
     * 解析各年级-减少体力值
     * _curPower 当前体力值
     * _curGrade 当前选中的年级
     * @param
    */
    PublicClass.prototype.reduceGradePower = function (_curPower, _curGrade) {
        var curPower = _curPower, curGrade = _curGrade, meetBoo = false, remainPower = 0, //剩余体力值
        reducePower = 0, //减去的体力值
        returnArr = [];
        //减去各年级指定的体力值
        switch (curGrade) {
            case 1:
                reducePower = 10;
                remainPower = curPower - reducePower;
                break;
            case 2:
                reducePower = 12;
                remainPower = curPower - reducePower;
                break;
            case 3:
                reducePower = 15;
                remainPower = curPower - reducePower;
                break;
            case 4:
                reducePower = 19;
                remainPower = curPower - reducePower;
                break;
            case 5:
                reducePower = 24;
                remainPower = curPower - reducePower;
                break;
            case 6:
                reducePower = 30;
                remainPower = curPower - reducePower;
                break;
        }
        if (remainPower > 0) {
            returnArr.push(remainPower, reducePower);
        }
        else {
            returnArr.push(-1, -1);
        }
        return returnArr;
    };
    /**
     * /解析文字版本数据对象
     */
    PublicClass.prototype.parsingTextData = function (_curObj) {
        var returnOj;
        var i, obj, correctStr, tempArr = [], optionsArr = [];
        tempArr.push('A', 'B', 'C', 'D');
        //选项A-D + 答案
        for (i = 0; i < _curObj["options"].length; i++) {
            obj = _curObj["answer"];
            if (obj == i) {
                correctStr = tempArr[i];
            }
        }
        for (i = 0; i < _curObj["options"].length; i++) {
            optionsArr.push({
                label: tempArr[i],
                content: _curObj["options"][i]
            });
        }
        returnOj = {
            Id: _curObj["id"],
            title: _curObj["topic"],
            correct: correctStr,
            options: optionsArr
        };
        return returnOj;
    };
    /**
     * 解析图片版本数据对象
     */
    PublicClass.prototype.parsingBitmapData = function (_curObj) {
        var returnOj;
        var i, obj, correctStr, titleBitmapData = '', titleBitmap, tempArr = [], optionsArr = [];
        tempArr.push('A', 'B', 'C', 'D');
        //选项A-D + 答案
        for (i = 0; i < _curObj["options"].length; i++) {
            obj = _curObj["answer"];
            if (obj == i) {
                correctStr = tempArr[i];
            }
        }
        for (i = 0; i < _curObj["options"].length; i++) {
            optionsArr.push({
                label: tempArr[i],
                content: _curObj["options"][i]
            });
        }
        titleBitmapData = _curObj['topic'];
        var tempStr = titleBitmapData;
        tempStr = tempStr.split('?')[0];
        returnOj = {
            Id: _curObj["id"],
            title: tempStr,
            correct: correctStr,
            options: optionsArr
        };
        return returnOj;
    };
    /**
     * 统计积分
     * _grade   年级
     * _finsh   正确
     * _contin  连对
     * _time    时间
    */
    PublicClass.prototype.statisticalIntegral = function (_grade, _finsh, _contin, _time) {
        if (_grade === void 0) { _grade = 1; }
        if (_finsh === void 0) { _finsh = 1; }
        if (_contin === void 0) { _contin = 1; }
        if (_time === void 0) { _time = 1; }
        var grade = _grade, finsh = _finsh, contin = _contin, time = _time, returnCount = 0;
        // console.log('开始统计积分\n年级:'+grade+'\n正确：'+finsh+'\n连对：'+contin+'\n时间：'+time)
        if (contin != 0) {
            returnCount = Math.ceil(grade * finsh) + Math.ceil(grade * finsh * contin);
        }
        else {
            returnCount = grade * finsh;
        }
        return returnCount;
    };
    /**
     * 格式化竞技面板中的，用户列表
     */
    PublicClass.prototype.formattingUserListData = function (_userlistArr) {
        var i, obj, curName = '', curObj;
        var userListArr = [];
        for (i = 0; i < _userlistArr.length; i++) {
            obj = _userlistArr[i];
            if (obj.nickname == '') {
                curName = obj.username;
            }
            else {
                curName = obj.nickname;
            }
            obj.picture = obj.picture.split('?')[0];
            curObj = {
                userid: obj.id,
                img: obj.picture,
                nickName: curName,
                score: obj.score,
                selectable: obj.selectable
            };
            userListArr.push(curObj);
        }
        return userListArr;
    };
    /**
     * 格式化竞技面板中-发起挑战
     */
    PublicClass.prototype.formattingFirstPkData = function (_userlistArr) {
        if (_userlistArr.length == 0)
            return [];
        // console.log('发起挑战',_userlistArr);
        var i, obj, curName = '', curStatus = '', curObj;
        var userListArr = [];
        for (i = 0; i < _userlistArr.length; i++) {
            obj = _userlistArr[i].userIcon[1];
            if (obj.userNickname == '') {
                curName = obj.userUsername;
            }
            else {
                curName = obj.userNickname;
            }
            if (_userlistArr[i].status.code == '101') {
                curStatus = 'no';
            }
            else if (_userlistArr[i].status.code == '102') {
                if (_userlistArr[i].content == true) {
                    curStatus = 'win';
                }
                else {
                    curStatus = 'lost';
                }
            }
            else if (_userlistArr[i].status.code == '103') {
                curStatus = 'reject';
            }
            curObj = {
                nickName: curName,
                response: curStatus,
                id: _userlistArr[i].id
            };
            userListArr.push(curObj);
        }
        return userListArr;
    };
    /**
     * 格式化竞技面板中-收到挑战
     */
    PublicClass.prototype.formattingTrucePkData = function (_userlistArr) {
        if (_userlistArr.length == 0)
            return [];
        // console.log('收到挑战',_userlistArr);
        var i, obj, curName = '', curStatus = '', curObj;
        var userListArr = [];
        for (i = 0; i < _userlistArr.length; i++) {
            obj = _userlistArr[i].userIcon[0];
            if (obj.userNickname == '') {
                curName = obj.userUsername;
            }
            else {
                curName = obj.userNickname;
            }
            if (_userlistArr[i].status.code == '101') {
                curStatus = 'no';
            }
            else if (_userlistArr[i].status.code == '102') {
                if (_userlistArr[i].content == false) {
                    curStatus = 'win';
                }
                else {
                    curStatus = 'lost';
                }
            }
            else if (_userlistArr[i].status.code == '103') {
                curStatus = 'reject';
            }
            obj.userIcon = obj.userIcon.split('?')[0];
            curObj = {
                img: obj.userIcon,
                nickName: curName,
                response: curStatus,
                id: _userlistArr[i].id
            };
            userListArr.push(curObj);
        }
        return userListArr;
    };
    /**
     *  格式化用户排行榜数据，返回一个obj对象
    */
    PublicClass.prototype.formattingUserRankData = function (_ranArr) {
        var i, obj, curName = '', curObj;
        var rankArr = [];
        for (i = 0; i < _ranArr.length; i++) {
            obj = _ranArr[i];
            if (obj.nickname == '') {
                curName = obj.username;
            }
            else {
                curName = obj.nickname;
            }
            if (curName.length >= 6) {
                // curName.split(0,1);
            }
            curObj = {
                icon: obj.icon,
                nickName: curName,
                score: obj.score
            };
            rankArr.push(curObj);
            curObj = null;
            curName = '';
        }
        return rankArr;
    };
    /**
     * 格式化用户足迹数据，返回含obj对象数据
     * _trackArr    足迹数据数组
     */
    PublicClass.prototype.formattingUserTrackData = function (_trackArr) {
        var i, obj, curName = '', curStatus = '', time = '', curObj;
        var trackArr = [];
        for (i = 0; i < _trackArr.length; i++) {
            obj = _trackArr[i];
            if (obj.status == '1') {
                curStatus = 'level';
            }
            else if (obj.status == '2') {
                curStatus = 'practice';
            }
            else if (obj.status == '3') {
                curStatus = 'pk';
            }
            time = this.getTimeHandler(obj.timestamp);
            time = time.split(' ')[0].replace(/\//g, '-');
            obj = {
                type: curStatus,
                info: obj.track_first + "   得分：" + obj.answerSheet.record[0].score + "   用时：" + obj.answerSheet.record[0].usedTime + "   题目数：" + obj.topicSum + "道   答错：" + obj.fault + '道！',
                date: time,
                id: obj.id
            };
            trackArr.push(obj);
        }
        return trackArr;
    };
    /**
    * 格式化足迹数据,通过足迹id获取答题卡内容
    * _answerArr    答题卡数据数组
    */
    PublicClass.prototype.formattingUserTrackIdData = function (_answerArr) {
        var i, obj, curName = '', answer = '', userAnswer = '', curObj;
        var answerArr = [];
        for (i = 0; i < _answerArr.length; i++) {
            obj = _answerArr[i];
            if (obj.answer == 0) {
                answer = "A";
            }
            else if (obj.answer == 1) {
                answer = "B";
            }
            else if (obj.answer == 2) {
                answer = "C";
            }
            else if (obj.answer == 3) {
                answer = "D";
            }
            if (obj.userAnswer == 0) {
                userAnswer = "A";
            }
            else if (obj.userAnswer == 1) {
                userAnswer = "B";
            }
            else if (obj.userAnswer == 2) {
                userAnswer = "C";
            }
            else if (obj.userAnswer == 3) {
                userAnswer = "D";
            }
            obj = {
                info: "题目：" + obj.topic + "   正确选项:" + answer + "   你的选项" + userAnswer + "   题目年级：" + obj.classGroup
            };
            answerArr.push(obj);
        }
        return answerArr;
    };
    //时间戳变常规时间格式
    PublicClass.prototype.getTimeHandler = function (time) {
        return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    };
    return PublicClass;
}(egret.DisplayObjectContainer));
__reflect(PublicClass.prototype, "PublicClass");
//# sourceMappingURL=PublicClass.js.map