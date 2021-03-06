'use strict';
const { log } = require('console');
const {appId, appSecret, gdKey} = require('const-info');
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
		
		let userData;
		if(dbRes.affectedDocs<=0){
			userData = {
				nickName:"",
				avatarUrl:"",
				gender:0,
				country:"",
				province:"",
				city:""
			}
			//不要泄露用户的openid
			const {id} = await db.collection("users").add({openid:openid,...userData});
			console.log('login|id', id);
			userData._id = id
		}else{
			userData = dbRes.data[0];
			
			//不要泄露用户的openid
			delete userData["openid"];
		}
		const tokenInfo = {
			id: userData._id,
			openid,
			nickName: userData.nickName
		}
		
		if (userData._id) {
			const roleRes = await db.collection("roles").where({
				userId:userData._id
			}).limit(1).get();
			if (roleRes.affectedDocs>0){
				tokenInfo.roles = JSON.parse(roleRes.data[0].roles);
			}
		}
		
		console.log('login|tokenInfo', tokenInfo);
		
		const token = getToken(tokenInfo);
		
		userData["token"]=token;
		
		return userData;
	},
	updateUserProfile: async (event, context) => {
		const { userInfo, token } = event;
		
		const db = uniCloud.database();
		
		const payload = verifyToken(token);
		
		const dbRes = await db.collection("users").where({
			_id: payload.tokenInfo.id
		}).update({
			nickName: userInfo.nickName,
			avatarUrl: userInfo.avatarUrl,
			gender: userInfo.gender,
			country: userInfo.country,
			province: userInfo.location.province,
			city: userInfo.location.city,
			district: userInfo.location.district
		});
		
		return dbRes.data;
	},
	getLocation: async (event, context) => {
		console.log("searchPlace|event", event);
		const {params,token } = event;
		const payload = verifyToken(token);
	    console.log(payload);
		const {location} = params;
		const url = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${location}&key=${gdKey}&radius=1000&extensions=base`;
		const res = await uniCloud.httpclient.request(
			url,
			{
				dataType:"json"
			}
		);
		return res.data.regeocode.addressComponent;
	}
}

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event);
	console.log('event.action : ', event.action);
	
	return router[event.action](event, context);
};
