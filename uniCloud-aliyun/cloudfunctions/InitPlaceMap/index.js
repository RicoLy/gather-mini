'use strict';
const {placeInfos} = require('constInfo')
exports.main = async (event, context) => {
	// const db = uniCloud.database();
	// const dbCmd = db.command;
	// //event为客户端上传的参数
	// console.log('event : ', placeInfos)
	// for (let item of placeInfos) {
	// 	const [longitude, latitude] = item.coordinate.split(',')
	// 	console.log(item);
	// 	await db.collection("placeMap").add({
	// 		city: item.city,
	// 	    district: item.district,
	// 	    name: item.name,
	// 	    location: item.location,
	// 	    phone: item.phone,
	// 	    intro: item.intro,
	// 	    privateRoom: item.privateRoom,
	// 	    businessHours: item.businessHours,
	// 	    traffic: item.traffic,
	// 	    coordinate: item.coordinate,
	// 		geopoint: new db.Geo.Point(+longitude, +latitude),
	// 	    formattedAddress: item.formattedAddress,
	// 	    type: item.type
	// 	});
	// }
	
	//返回数据给客户端
	return "ok"
};
