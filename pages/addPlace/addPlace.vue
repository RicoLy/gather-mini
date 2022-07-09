<template>
	<view>
		<uni-card :is-shadow="true" is-full class="flex-column">
			<view class="flex align-center" style="height: 70rpx;">
				<text class="flex-1 font-md">名称</text>
				<input v-model="name" class="uni-input bg-light flex-3" focus="true" placeholder="输入名称" />
			</view>
		</uni-card>
		<uni-card :is-shadow="true" is-full class="flex-column">
			<view class="flex align-center" style="height: 70rpx;">
				<text class="flex-1 font-md">简介</text>
				<input v-model="intro" class="uni-input bg-light flex-3" placeholder="简介" />
			</view>
		</uni-card>
		<uni-card :is-shadow="true" is-full class="flex-column">
			<view class="flex align-center" style="height: 70rpx;">
				<text class="flex-1 font-md">联系方式</text>
				<input v-model="phone" class="uni-input bg-light flex-3" placeholder="联系方式" />
			</view>
		</uni-card>
		<uni-card :is-shadow="true" is-full class="flex-column">
			<view class="flex align-center" style="height: 70rpx;">
				<text class="flex-1 font-md">营业时间</text>
				<input v-model="businessHours" class="uni-input bg-light flex-3" placeholder="营业时间" />
			</view>
		</uni-card>
		<uni-card :is-shadow="true" is-full class="flex-column">
			<view class="flex align-center" style="height: 70rpx;">
				<text class="flex-1 font-md">包间情况</text>
				<input v-model="privateRoom" class="uni-input bg-light flex-3" placeholder="包间情况" />
			</view>
		</uni-card>
		<uni-card :is-shadow="true" is-full class="flex-column">
			<view class="flex align-center" style="height: 70rpx;">
				<text class="flex-1 font-md">类型</text>
				<picker class="flex-3 bg-light" @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
		</uni-card>
		<uni-card :is-shadow="true" is-full class="flex-column">
			<view class="flex align-center" style="height: 70rpx;">
				<button type="primary"  @click="btnChooseLocation" class="font-md w-100 flex-1">选择地址</button>
			</view>
		</uni-card>
		<uni-card :is-shadow="true" is-full class="flex-column">
			<view class="flex align-center" style="height: 70rpx;">
				{{address}}
			</view>
		</uni-card>
		<button type="primary" class="fixed-bottom" @click="btnSavePlaces">保存</button>
	</view>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js";
	export default {
		data() {
			return {
				id: '',
				name: '',
				longitude: '',
				latitude: '',
				coordinate: '',
				intro: '',
				address:"选取所在地址",
				coordinate: "",
				phone: "",
				businessHours: "",
				privateRoom: "",
				type: 1,
				array: ['餐厅', '寺院'],
				index: 0,
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id;
				cloudApi.call({
					name:"placeMap",
					data:{
						action: "getPlaceById",
						id: this.id
					},
					success:(res)=>{
						const [result] = res.result;
						console.log('result', result);
						if(result) {
							this.id = result._id;
							this.name = result.name;
							this.longitude = result.geopoint.coordinates[0];
							this.latitude = result.geopoint.coordinates[1];
							this.intro = result.intro;
							this.phone = result.phone;
							this.privateRoom = result.privateRoom;
							this.businessHours = result.businessHours;
							this.type = result.type;
							this.address = result.formattedAddress
						}
						if(this.type === 1) {
							this.index = 0;
						} else {
							this.index = 1;
						}
					}
				})
			}
		},
		methods: {
			bindPickerChange(e){
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
				if(this.index === 1) {
					this.type = 2
				} else {
					this.type = 1
				}
			},
			btnChooseLocation(){
				if (this.latitude==""||this.longitude=="") {
					uni.getLocation({
						success: (res) => {
							uni.chooseLocation({
								latitude:res.latitude,
								longitude:res.longitude,
								success: (res) => {
									console.log(res);
									this.address= res.address+res.name;
									this.longitude=res.longitude;
									this.latitude=res.latitude;
								}
							})
						}
					})
				} else {
					uni.chooseLocation({
						latitude:this.latitude,
						longitude:this.longitude,
						success: (res) => {
							console.log(res);
							this.address= res.address+res.name;
							this.longitude=res.longitude;
							this.latitude=res.latitude;
						}
					})
				}
				
			},
			async btnSavePlaces(){
				if(this.name == "")return uni.showToast({
					icon:"none",
					mask:true,
					title:"名称不能为空"
				})
				else if(this.latitude==""||this.longitude==""||this.address=="")return uni.showToast({
					icon:"none",
					mask:true,
					title:"请选择正确的地址"
				})
				
				const rsp = await cloudApi.call({
					name: "placeMap",
					data: {
						action: this.id?"updatePlace":"addPlace",
						params: {
							id: this.id,
							name: this.name,
							longitude: this.longitude,
							latitude: this.latitude,
							intro: this.intro,
							phone: this.phone,
							privateRoom: this.privateRoom,
							businessHours: this.businessHours,
							type: this.type
						},
					},
					
				})
				const result = rsp.result;
				console.log(result);
				if(result.code !== 0) {
					uni.showToast({
						title: result.msg,
						mask:true,
						icon: 'none'
					});
				} else {
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style>

</style>
