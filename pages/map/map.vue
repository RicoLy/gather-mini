<template>
	<view style="width:100%;height:100%;position: relative;">
		<map :markers="markers" 
			:scale="13" 
			@markertap="btnMarkerTap"
			:latitude="latitude" 
			:longitude="longitude" 
			:show-location="true" 
			@labeltap="btnLabelTap"
			@regionchange="onRegionChanged" 
			style="width: 100%;height: 100%;">
		</map>
	</view>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	
	let places;
	export default {
		data() {
			return {
				longitude:"",
				latitude:"",
				markers:[]
			}
		},
		onLoad() {
			uni.getLocation({
				success: (res) => {
					console.log('res', res);
					this.latitude=res.latitude;
					this.longitude=res.longitude;
					this.getPlaces(res.longitude, res.latitude);
				}
			})
		},
		methods: {
			btnMarkerTap(e){
				const markerId = e.markerId;
				const place = places[markerId];
				uni.openLocation({
					latitude: place.geopoint.coordinates[1],
					longitude: place.geopoint.coordinates[0],
					name: place.name,
					address: place.formattedAddress,
					success: function () {
						console.log('success');
					}
				});
			},
			btnLabelTap(e){
				console.log(e.markerId);
				const markerId = e.markerId;
				const place = places[markerId];
				console.log(place);
			},
			onRegionChanged(e){
				if(e.type=="end"){
					const latitude = e.detail.centerLocation.latitude;
					const longitude = e.detail.centerLocation.longitude;
					this.getPlaces(longitude, latitude);
				}
			},
			getPlaces(longitude, latitude) {
				cloudApi.call({
					name:"placeMap",
					data:{
						action:"listByGeo",
						longitude:longitude,
						latitude:latitude,
						maxDistance: 3000
					},
					success:(res)=>{
						console.log(res);
						
						places = res.result;
						var markers = [];
						for(var i =0;i<places.length;i++){
							var item = places[i];
							markers.push({
								id:i,
								width:40,
								height:45,
								latitude:item.geopoint.coordinates[1],
								longitude:item.geopoint.coordinates[0],
								label: {
									content: item.name.length < 8 ? item.name : `${item.name.slice(0,7)}...`,
									textAlign: 'center',
									color: '#000000',
								},
								callout: {
									content: `${item.name}\n${item.formattedAddress}`,
									textAlign: 'center',
									color: '#000000',
								}
							});
						}
						
						this.markers = markers;
					}
				})
			}
		}
	}
</script>

<style>
	page{
	 height:100%;
	}
</style>
