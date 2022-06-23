<template>
	<view class="content">
		<image style="border-radius:50%" class="logo" src="/static/icon_dog.jpg"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			// cloudApi.call({
			// 	name:"InitPlaceMap",
			// 	success:(res)=>{
			// 		console.log(res.result);
			// 	}
			// })
		},
		methods: {

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
