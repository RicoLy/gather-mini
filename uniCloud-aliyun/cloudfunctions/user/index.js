'use strict';
const {appId, appSecret} = require('const-info');
const {getToken, verifyToken} = require('wx-common');
const db = uniCloud.database();

const router = {
	login: async (event, context) => {
		//event为客户端上传的参数
		console.log('event : ', event);
		const {code} = event;
		//GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
		const res = await uniCloud.httpclient.request(
			"https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+appSecret+"&js_code="+code+"&grant_type=authorization_code",
			{
				dataType:"json"
			}
		);
		
		const openid = res.data.openid;
		
		let dbRes = await db.collection("users").where({
				openid:openid
			}).limit(1).get();
			
		let token = getToken(openid);
		
		let userData;
		if(dbRes.affectedDocs<=0){
			userData = {
				nickName:"Hello",
				avatarUrl:"/static/icon_dog.jpg",
				gender:0,
				country:"",
				province:"",
				city:""
			}
			//不要泄露用户的openid
			await db.collection("users").add({openid:openid,...userData});
		}else{
			userData = dbRes.data[0];
			
			//不要泄露用户的openid
			delete userData["openid"];
		}
		userData["token"]=token;
		
		return userData;
	},
	updateUserProfile: async (event, context) => {
		const { userInfo,token } = event;
		
		const db = uniCloud.database();
		
		const payload = verifyToken(token);
		
		const dbRes = await db.collection("users").where({
			openid:payload.openid
		}).update({
			nickName:userInfo.nickName,
			avatarUrl:userInfo.avatarUrl,
			gender:userInfo.gender,
			country:userInfo.country,
			province:userInfo.province,
			city:userInfo.city
		});
		
		return dbRes.data;
	}
}

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event);
	console.log('event.action : ', event.action);
	
	return router[event.action](event, context);
};
