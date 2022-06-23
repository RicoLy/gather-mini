<template>
	<view style="width:100%;height:100%;position: relative;">
		<map :markers="markers" 
			:scale="13" 
			@markertap="btnMarkerTap"
			@labeltap="btnLabelTap"
			:latitude="latitude" 
			:longitude="longitude" 
			:show-location="true" 
			@regionchange="onRegionChanged" 
			style="width: 100%;height: 100%;">
		</map>
	</view>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
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
				console.log(e);
			},
			btnLabelTap(e){
				console.log(e);
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
						action:"listbygeo",
						longitude:longitude,
						latitude:latitude,
						maxDistance: 3000
					},
					success:(res)=>{
						console.log(res);
						
						const places = res.result;
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
									color: '#FB4747',
								},
								callout: {
									content: `${item.name}\n${item.location}`,
									textAlign: 'center',
									color: '#FB4747',
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
