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
			
			<view class=" flex px-2 py-2" style="opacity:0.6;">
				<view class="position-relative flex-2">
					<view style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;" class="flex align-center justify-center text-light-muted">
						<text class="iconfont icon-sousuo"></text>
					</view>
					<input style="height: 70rpx;padding-left: 70rpx;" type="text" class="bg-light font-md rounded-circle" placeholder="搜索" @blur="search"/>
				</view>
				<view style="width: 70rpx;height: 70rpx;"
				class="flex align-center justify-center bg-light rounded-circle mr-0" hover-class="bg-hover-light">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
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
								width:30,
								height:30,
								iconPath: '/static/icon/location.png',
								latitude:item.geopoint.coordinates[1],
								longitude:item.geopoint.coordinates[0],
								label: {
									content: item.name.length < 8 ? item.name : `${item.name.slice(0,7)}...`,
									textAlign: 'center',
									color: '#000000',
								}
							});
						}
						
						this.markers = markers;
					}
				})
			},
			searchPlace(params){
				cloudApi.call({
					name:"placeMap",
					data:{
						action:"searchPlace",
						params: params,
					},
					success:(res)=>{
						console.log(res);
					}
				})
			},
			search(e){
				const keywords = e.detail.value
				console.log(keywords);
				if (keywords === "") {
					return;
				} else {
					this.searchPlace({
						keywords,
					})
				}
			}
		}
	}
</script>

<style>
	page{
	 height:100%;
	}
</style>
