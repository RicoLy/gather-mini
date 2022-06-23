'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database();
	const dbCmd = db.command;
	
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
};
