<template>
	<view class="content">
		<map :markers="markers" 
			 @markertap="btnMarkerTap" 
			 :latitude="latitude" 
			 :longitude="longitude" 
			 :show-location="true" 
			 @regionchange="onRegionChanged" 
			 style="width: 100%;height: 100%;"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			uni.getLocation({
				success: (res) => {
					this.latitude=res.latitude;
					this.longitude=res.longitude;
				}
			})
		},
		methods: {
			btnMarkerTap(e){
				console.log(e);
			},
			onRegionChanged(e){
				console.log(e);
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
