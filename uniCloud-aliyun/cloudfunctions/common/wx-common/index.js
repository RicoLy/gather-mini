let jwt = require('jsonwebtoken');
const {appId, appSecret, jwtSecret} = require('const-info');

const db = uniCloud.database();
const requestNewAccessToken = async () => {
	const res = await uniCloud.httpclient.request("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appId+"&secret="+appSecret,{dataType:"json"});
	console.log("重新请求accesstoken");

	const dbRes = await db.collection("system").limit(1).get();
	if(dbRes.data[0]){
		await db.collection("system").doc(dbRes.data[0]._id).update({
			accesstoken:{
				value:res.data.access_token,
				expiredtime:new Date().getTime()+7000000
			}
		});
	}else{
		await db.collection("system").add({
			accesstoken:{
				value:res.data.access_token,
				expiredtime:new Date().getTime()+7000000
			}
		});
	}

	return res.data.access_token;
}

const getAccessToken = async (forceUpdate = false) => {
	const dbRes = await db.collection("system").limit(1).get();
	const systemInfo = dbRes.data[0];

	const now = new Date().getTime();
	if(systemInfo&&!forceUpdate){
		if(now>systemInfo.accesstoken.expiredtime){
			const accesstoken=await requestNewAccessToken();

			return accesstoken;
		}else{
			console.log("使用缓存的accesstoken");
			return systemInfo.accesstoken.value;
		}
	}else{
		const accesstoken=await requestNewAccessToken();

		return accesstoken;
	}
}

const getToken = (tokenInfo)=>{
	return jwt.sign({tokenInfo:tokenInfo},jwtSecret,{expiresIn:60*60*24});
}

const verifyToken = (token) => {
	return jwt.verify(token,jwtSecret);
}

const msgSecCheck = async (openid,content) => {
	const access_token = await getAccessToken();
	console.log("正在检测 "+content+" 的内容是否安全");
	const res = await uniCloud.httpclient.request("https://api.weixin.qq.com/wxa/msg_sec_check?access_token="+access_token,{
		method:"POST",
		dataType:"json",
		headers:{
			"Content-Type":"application/json"
		},
		data:{
			version:"2",
			openid:openid,
			scene:2,
			content:content
		}
	});
	console.log("检查结果",res);
	return res.data;
}

//https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=
const getWXACodeUnlimited = async (scene, page) => {
	const access_token = await getAccessToken();
	const res = await uniCloud.httpclient.request("https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token="+access_token,{
		method:"POST",
		headers:{
			"Content-Type":"application/json"
		},
		data:{
			scene:scene,
			page:page
		}
	});

	return res.data;
}

module.exports = {
	verifyToken,
	getWXACodeUnlimited,
	msgSecCheck,
	getAccessToken,
	getToken,
	db
}
