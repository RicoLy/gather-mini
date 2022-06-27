'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
const {gdKey} = require('const-info');

// router 路由
const router = {
	listByGeo: async (event, context) => {
		const dbRes = await db.collection('placeMaps').field({owner:false}).where({
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
	searchPlace: async (event, context) => {
		console.log("searchPlace|event", event);
		const {params} = event;
		const {keywords, city} = params;
		const url = `https://restapi.amap.com/v3/place/text?keywords=${keywords}&city=${city}&offset=20&page=1&key=${gdKey}&extensions=all`;
		
		return url;
	}
}




exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event);
	console.log('event.action : ', event.action);
	
	return router[event.action](event, context);
};
