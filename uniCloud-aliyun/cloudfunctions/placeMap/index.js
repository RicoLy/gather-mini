'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
const {gdKey} = require('const-info');
const {verifyToken, msgSecCheck, responseErr, responseOk, checkHasRole} = require('wx-common');

const getLocationByGeo = async (coordinate) => {
	const url = `https://restapi.amap.com/v3/geocode/regeo?key=${gdKey}&location=${coordinate}`;
	const res = await uniCloud.httpclient.request(
		url,
		{
			dataType:"json"
		}
	);
	console.log(res.data);
	return res.data.regeocode;
}

// router 路由
const router = {
	listByGeo: async (event, context) => {
		const dbRes = await db.collection('placeMaps').where({
			geopoint:dbCmd.geoNear({
				geometry: new db.Geo.Point(event.longitude, event.latitude),
				maxDistance: event.maxDistance,
				minDistance: 0
			})
		})
		.limit(100)
		.get()
		
		
		//返回数据给客户端
		return dbRes?dbRes.data:null;
	},
	updateByGeo: async (event, context) => {
		console.log("updateByGeo|event", event);
		const longitude = event.longitude;
		const latitude = event.longitude;
		const placeId = event.placeId;
		
		return event
	},
	search: async (event, context) => {
		console.log("searchPlace|event", event);
		const {params} = event;
		const {keywords, location} = params;
		console.log('params', params);
		const url = `https://restapi.amap.com/v3/place/around?key=${gdKey}&location=${location}&keywords=${keywords}&types=&radius=3000&offset=20&page=1&extensions=all`;
		// const url = `https://restapi.amap.com/v3/place/text?keywords=${keywords}&city=${city}&offset=20&page=1&key=${gdKey}&extensions=all`;
		const res = await uniCloud.httpclient.request(
			url,
			{
				dataType:"json"
			}
		);
		console.log('search|res.data', res.data.pois[0]);
		return res.data.pois;
	},
	getPlaces: async (event, context) => {
		const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
			event,
			context 
		});
		dbJQL.setUser({ // 指定后续执行操作的用户信息
			uid: 'user-id', // 建议此处使用真实uid
			role: ['admin'], // 指定当前执行用户的角色为admin
			permission: []
		})
		console.log("searchPlace|event", event);
		const {params} = event;
		const {keywords, city, district} = params;
		console.log("searchPlace|params", params);
		let where = `city == "${city}"`;
		if (district !== '全部') {
			where = `${where} && district == "${district}"`;
		}
		if (keywords) {
			where = `${where} && /${keywords}/.test(name)`;
		}
		console.log("searchPlace|where", where);
		const dbRes = await dbJQL.collection('placeMaps').where(where)
		.limit(200)
		.get()
		
		//返回数据给客户端
		return dbRes?dbRes.data:null;
	},
	updatePlace: async (event, context) => {
		const {payload} = event;
		const {tokenInfo} = payload;
		if (!checkHasRole(['admin', 'updatePlace'], tokenInfo)) {
			return responseErr("暂无权限,请联系管理员！")
		}
		const {openid} = tokenInfo;
		const {params} = event;
		const {
			id,
			name,
			longitude,
			latitude,
			intro,
			phone,
			privateRoom,
			businessHours,
			type
		} = params;
		// 内容敏感性校验
		const res = await msgSecCheck(openid,`${name}|${intro}|${phone}|${privateRoom}|${businessHours}`);
		if(res.result.suggest!="pass"){
			return responseErr("内容不安全有敏感词汇");
		}
		const coordinate = `${longitude},${latitude}`;
		const location = await getLocationByGeo(coordinate);
		const dbRes = await db.collection("placeMaps").where({
			"_id":dbCmd.eq(id),
		}).limit(1).update({
			city: location.addressComponent.city,
			district: location.addressComponent.district,
			name: name,
			location: location.formatted_address,
			phone: phone,
			intro: intro,
			privateRoom: privateRoom,
			businessHours: businessHours,
			coordinate: coordinate,
			geopoint: new db.Geo.Point(+longitude, +latitude),
			formattedAddress: location.formatted_address,
			type: type,
			userId: tokenInfo.id
		})
		
		return responseOk(dbRes);
	},
	addPlace: async (event, context) => {
		const {payload} = event;
		const {tokenInfo} = payload;
		
		if (!checkHasRole(['admin', 'addPlace'], tokenInfo)) {
			return responseErr("暂无权限,请联系管理员！")
		}
		const {openid, id} = tokenInfo;
		const {params} = event;
		const {
			name,
			longitude,
			latitude,
			intro,
			phone,
			privateRoom,
			businessHours,
			type
		} = params;
		// 内容敏感性校验
		const rsp = await msgSecCheck(openid,`${name}|${intro}|${phone}|${privateRoom}|${businessHours}`);
		if(rsp.result.suggest!="pass"){
			return responseErr("内容不安全有敏感词汇");
		}
		const coordinate = `${longitude},${latitude}`;
		const location = await getLocationByGeo(coordinate);
		console.log(location);
		const res = await db.collection("placeMaps").add({
			city: location.addressComponent.city,
			district: location.addressComponent.district,
			name: name,
			location: location.formatted_address,
			phone: phone,
			intro: intro,
			privateRoom: privateRoom,
			businessHours: businessHours,
			coordinate: coordinate,
			geopoint: new db.Geo.Point(+longitude, +latitude),
			formattedAddress: location.formatted_address,
			type: type,
			userId: id
		});
		
		return responseOk(res)
	},
	getPlaceById: async (event, context) => {
		console.log(event);
		const {id} = event;
		console.log(id);
		const dbRes = await db.collection('placeMaps').where({
			_id:dbCmd.eq(id)
		})
		.limit(1)
		.get();
		
		return dbRes?dbRes.data:null;
	},
	deletePlaceById: async (event, context) => {
		const {payload} = event;
		const {tokenInfo} = payload;
		if (!checkHasRole(['admin', 'deletePlaceById'], tokenInfo)) {
			return responseErr("暂无权限,请联系管理员！")
		}
		console.log(event);
		const {id} = event;
		console.log(id);
		const dbRes = await db.collection("placeMaps").where({
			"_id":dbCmd.eq(id),
		}).remove();
		
		return responseOk(dbRes);
	}
}




exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event);
	console.log('event.action : ', event.action);
	const {token} = event;
	const payload = verifyToken(token);
	console.log('payload', payload.tokenInfo);
	event.payload = payload;
	return router[event.action](event, context);
};
