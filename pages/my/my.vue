<template>
	<view class="content">
		<image @click="test" style="border-radius:50%" class="logo" src="/static/icon_dog.jpg"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import loginUser from "../../common/currentUser.js"
	import cloudApi from "../../common/cloudApi.js"
	export default {
		data() {
			return {
				title: 'Hello',
				userInfo:null,
			}
		},
		onLoad() {
			
		},
		methods: {
			test(){
				// cloudApi.call({
				// 	name:"placeMap",
				// 	data:{
				// 		action:"updateByGeo",
				// 		longitude:'longitude',
				// 		latitude:'latitude',
				// 		placeId: '62b435de0d082200010fa834'
				// 	},
				// 	success:(res)=>{
				// 		console.log(res.result);
				// 	}
				// })
				
				// uni.chooseLocation({
				// 	latitude: '22.540517',
				// 	longitude: '113.934497',
				// 	success: (res) => {
				// 		// this.address= res.address+res.name;
				// 		// this.longitude=res.longitude;
				// 		// this.latitude=res.latitude;
				// 		console.log(res);
				// 	}
				// })
				this.title = "呵呵";
			},
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
		margin: 200rpx auto 50rpx auto;
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
