<template>
	<view style="width:100%;height:100%;position: relative;">

		<map :markers="markers" :scale="13" @markertap="btnMarkerTap" :latitude="latitude" :longitude="longitude"
			:show-location="true" @labeltap="btnLabelTap" @regionchange="onRegionChanged"
			style="width: 100%;height: 100%;">

			<view class=" flex px-2 py-2" style="opacity:0.6;">
				<view class="position-relative flex-2">
					<view style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;"
						class="flex align-center justify-center text-light-muted">
						<text class="iconfont icon-sousuo"></text>
					</view>
					<input style="height: 70rpx;padding-left: 70rpx;" type="text"
						class="bg-light font-md rounded-circle" placeholder="搜索" @blur="search" />
				</view>
				<view style="width: 70rpx;height: 70rpx;"
					class="flex align-center justify-center bg-light rounded-circle mr-0" @click="openMoreDialog"
					hover-class="bg-hover-light">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>

			<!-- 更多 -->
			<uni-popup ref="more" type="bottom">
				<view class="bg-white">
					<view v-for="(item,index) in moreOptions" :key="index"
						class="flex align-center justify-center py-3 font border-bottom border-light-secondary"
						hover-class="bg-light" @click="changeMore(index)">
						{{item.name}}
					</view>
				</view>
			</uni-popup>

			<!-- 搜索结果 -->
			<uni-popup ref="searchResult" type="bottom">
				<view class="bg-white">
					
					<scroll-view style='height: 400px;' :scroll-top="scrollTop" scroll-y="true">
										
						<uni-list :border="true" v-for="(item,index) in searchResuls" :key="index"
									class="flex align-center justify-center py-3 font "
									hover-class="bg-light">
							<uni-list-item direction="row" link @click="changeSearchResult(item)">
								
								<template v-slot:header>
									<view class="slot-box">
										<image class="slot-image"
											:src="item.photos[0].url"
											mode="widthFix"></image>
									</view>
								</template>
								<template v-slot:body>
									<view class="w-100 slot-box flex-column">
										<view class="slot-box flex3 flex-column w-100">
											<view class="flex w-100">
												<text class="font-lg text-success">{{item.name}}</text>
											</view>
											<view class="slot-box flex1 flex justify-end w-100" v-if="item.distance">
												<text class="font-sm text-light-black text-right">距离: {{item.distance / 1000}} 千米</text>
											</view>
											<view class="slot-box flex1 flex justify-end w-100">
												<text class="font-small flex-5 text-light-black text-right">{{item.address}}</text>
											</view>
										</view>
									</view>
								</template>
							</uni-list-item>
						</uni-list>
					
					</scroll-view>
					
				</view>
			</uni-popup>
		</map>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import cloudApi from "../../common/cloudApi.js"
	import loginUser from "../../common/currentUser.js"
	let places;
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				longitude: "",
				latitude: "",
				markers: [],
				userInfo: null,
				moreOptions: [{
					name: "更多",
					key: "more"
				}, {
					name: "添加",
					key: "add"
				}],
				searchResuls: []
			}
		},
		async onLoad() {
			// 获取位置
			uni.getLocation({
				success: (res) => {
					console.log('res', res);
					this.longitude = res.longitude;
					this.latitude = res.latitude;
				}
			})
			// 微信登录
			this.userInfo = await loginUser.login();
			const location = await loginUser.getLocation(`${this.longitude},${this.latitude}`);
			this.userInfo.location = {
				province: location.province,
				city: location.city,
				district: location.district
			}
			console.log(this.userInfo);
			this.getPlaces(this.longitude, this.latitude);
		},
		methods: {
			btnMarkerTap(e) {
				const markerId = e.markerId;
				const place = places[markerId];
				uni.openLocation({
					latitude: place.geopoint.coordinates[1],
					longitude: place.geopoint.coordinates[0],
					name: place.name,
					address: place.formattedAddress,
					success: function() {
						console.log('success');
					}
				});
			},
			btnLabelTap(e) {
				console.log(e.markerId);
				const markerId = e.markerId;
				const place = places[markerId];
				console.log(place);
				uni.navigateTo({
					url: `/pages/addPlace/addPlace?id=${place._id}`
				})
			},
			onRegionChanged(e) {
				if (e.type == "end") {
					const latitude = e.detail.centerLocation.latitude;
					const longitude = e.detail.centerLocation.longitude;
					this.getPlaces(longitude, latitude);
				}
			},
			getPlaces(longitude, latitude) {
				cloudApi.call({
					name: "placeMap",
					data: {
						action: "listByGeo",
						longitude: longitude,
						latitude: latitude,
						maxDistance: 3000
					},
					success: (res) => {
						console.log(res);

						places = res.result;
						var markers = [];
						for (var i = 0; i < places.length; i++) {
							var item = places[i];
							markers.push({
								id: i,
								width: 30,
								height: 30,
								iconPath: item.type === 1 ? '/static/icon/restaurant.png' :
									'/static/icon/mosques.png',
								latitude: item.geopoint.coordinates[1],
								longitude: item.geopoint.coordinates[0],
								label: {
									content: item.name.length < 8 ? item.name :
										`${item.name.slice(0,7)}...`,
									textAlign: 'center',
									color: '#000000',
								}
							});
						}

						this.markers = markers;
					}
				})
			},
			searchPlace(params) {
				cloudApi.call({
					name: "placeMap",
					data: {
						action: "search",
						params: params,
					},
					success: (res) => {
						const result = res.result;
						// console.log(result);
						// const [place] = result;
						// if (!place) {
						// 	return
						// }
						// const [longitude, latitude] = place.location.split(',');
						this.searchResuls = result;
						this.$refs.searchResult.open()
						// uni.openLocation({
						// 	latitude: +latitude,
						// 	longitude: +longitude,
						// 	name: place.name,
						// 	address: place.address,
						// 	success: function () {
						// 		console.log('success');
						// 	}
						// });
					}
				})
			},
			search(e) {
				const keywords = e.detail.value
				console.log(keywords);
				if (keywords === "") {
					return;
				} else {
					this.searchPlace({
						keywords,
						location: `${this.longitude},${this.latitude}`
					})
				}
			},
			openMoreDialog() {
				this.$refs.more.open()
			},
			changeMore(key) {
				if (key === 0) {
					return uni.navigateTo({
						url: '/pages/placeList/placeList',
					});
				} else {
					return uni.navigateTo({
						url: '/pages/addPlace/addPlace',
					});
				}
			},
			changeSearchResult(item) {
				console.log('changeSearchResult|location', item.location);
				const [longitude, latitude] = item.location.split(',');
				uni.openLocation({
					latitude: +latitude,
					longitude: +longitude,
					name: item.name,
					address: item.address,
					success: function () {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	
	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		margin-right: 10px;
		width: 60px;
		height: 80px;
	}
	
	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
</style>
