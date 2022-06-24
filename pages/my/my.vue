<template>
	<view @click="updateUserProfile" class="content">
		<image @click="test" style="border-radius:50%" class="logo" 
		:src="userInfo.avatarUrl"></image>
		<view>
			<text class="title">{{userInfo.nickName}}</text>
		</view>
	</view>
</template>

<script>
	import loginUser from "../../common/currentUser.js"
	import cloudApi from "../../common/cloudApi.js"
	export default {
		data() {
			return {
				// avatarUrl: '',
				// nickName: '',
				userInfo:null,
			}
		},
		async onLoad() {
			this.userInfo = await loginUser.login();
			// this.avatarUrl = this.userInfo.avatarUrl || '/static/icon_dog.jpg';
			// this.nickName = this.userInfo.nickName || 'Hello';
			if(!this.userInfo.avatarUrl) {
				this.userInfo.avatarUrl = '/static/icon_dog.jpg';
				this.userInfo.nickName = 'Hello';
			}
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
			updateUserProfile(){
				if (this.userInfo.nickName == "") {
					return;
				}
				uni.getUserProfile({
					desc: '用于完善会员资料',
					success: (res) => {
						this.userInfo = Object.assign(this.userInfo,res.userInfo);
						loginUser.updateUserInfo(this.userInfo);
					}
				})
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
