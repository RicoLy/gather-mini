<template>
	<view style="width:100%;height:100%;position: relative;">
		<uni-card :is-shadow="true" is-full class="fixed-top">
			<!-- 搜索框 -->
			<view class="flex">
				<view style="width: 70rpx;height: 70rpx;"
					class="flex flex-1 align-center justify-center bg-light text-light-muted rounded-circle mr-0"
					hover-class="bg-hover-light">
					<picker class="justify-center" mode="region" @change="bindPickerChange" :value="areArray"
						:range="cityArray">
						<text class="px-1">{{areArray[1]}}</text>
						<text class="px-1">{{areArray[2]}}</text>
					</picker>
				</view>
				<view class="position-relative flex-1">
					<view style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;"
						class="flex align-center justify-center text-light-muted">
						<text class="iconfont icon-sousuo"></text>
					</view>
					<input style="height: 70rpx;padding-left: 70rpx;" type="text"
						class="bg-light font-md rounded-circle" placeholder="搜索" :value="keywords" @blur="search" />
				</view>
				<view style="width: 70rpx;height: 70rpx;"
					class="flex align-center justify-center bg-light rounded-circle mr-0" @click="addPlace"
					hover-class="bg-hover-light">
					<text class="iconfont icon-zengjia"></text>
				</view>
			</view>
		</uni-card>

		<!-- 列表 -->
		<view class="position-relative" style="top: 90rpx;">
			<uni-list :border="true" v-for="(placeItem, placeIndex) in placeDates">
				<uni-list-item direction="row" link :to="'/pages/addPlace/addPlace?id=' + placeItem._id">
					<template v-slot:header>
						<view class="slot-box">
							<image class="slot-image"
								:src="placeItem.type===1?'/static/icon/restaurant.png':'/static/icon/mosques.png'"
								mode="widthFix"></image>
						</view>
					</template>
					<template v-slot:body>
						<view class="w-100 slot-box flex-column">
							<view class="slot-box flex3 flex-column w-100">
								<view class="flex w-100">
									<text class="font-lg text-success">{{placeItem.name}}</text>
								</view>
								<view class="flex w-100" v-if="placeItem.phone">
									<text class="font-sm text-light-black flex-2 text-right">联系方式: </text>
									<text class="font-sm text-success flex-3 text-left">{{placeItem.phone}}</text>
								</view>
								<view class="flex w-100" v-if="placeItem.businessHours">
									<text class="font-sm text-light-black flex-2 text-right">营业时间: </text>
									<text class="font-sm text-success flex-3 text-left">{{placeItem.businessHours}}</text>
								</view>
								<view class="flex w-100" v-if="placeItem.intro">
									<text class="font-sm text-light-black flex-2 text-right">简介: </text>
									<text class="font-sm text-success flex-3 text-left">{{placeItem.intro}}</text>
								</view>
								<view class="flex w-100" v-if="placeItem.privateRoom">
									<text class="font-sm text-light-black flex-2 text-right">包间情况: </text>
									<text class="font-sm text-success flex-3 text-left">{{placeItem.privateRoom}}</text>
								</view>
							</view>
							<view class="slot-box flex1 flex justify-end w-100">
								<button type="primary"  @click.stop="btnDeletePlace(placeIndex)" class="w-100 flex-1 font-small">删除</button>
								<text class="font-small flex-5 text-light-black text-right">{{placeItem.formattedAddress}}</text>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		
	</view>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js";
	export default {
		data() {
			return {
				areArray: ["广东省", "深圳市", "全部"],
				placeDates: [],
				keywords: this.keywords,
			}
		},
		computed: {

		},
		async onLoad() {
			this.getPlaces({
				keywords: '',
				city: this.areArray[1],
				district: this.areArray[2]
			})
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.areArray = e.detail.value
				this.getPlaces({
					keywords: this.keywords,
					city: this.areArray[1],
					district: this.areArray[2]
				})
			},
			search(e) {
				const keywords = e.detail.value
				console.log(keywords);
				this.keywords = keywords;
				if (keywords === "") {
					return;
				} else {
					this.getPlaces({
						keywords: this.keywords,
						city: this.areArray[1],
						district: this.areArray[2]
					})
				}
				console.log(this.keywords);
			},
			addPlace() {
				console.log('addPlace');
				uni.navigateTo({
					url: '/pages/addPlace/addPlace'
				})
			},
			getPlaces(params) {
				cloudApi.call({
					name: "placeMap",
					data: {
						action: "getPlaces",
						params: {
							keywords: params.keywords,
							city: params.city,
							district: params.district
						},
					},
					success: (res) => {
						const result = res.result;
						console.log(result);
						this.placeDates = result
					}
				});
			},
			async btnDeletePlace(index) {
				console.log(index);
				uni.showModal({
					content:"确定要删除吗？",
					success: async (res) => {
						console.log(res);
						if(res.confirm){
							const delItem = this.placeDates[index];
							console.log(delItem);
							const rsp = await cloudApi.call({
								name: "placeMap",
								data: {
									action: "deletePlaceById",
									id: delItem._id,
								},
								success: (res) => {
									
								}
							});
							
							const result = rsp.result;
							if(result.code !== 0) {
								uni.showToast({
									title: result.msg,
									mask:true,
									icon: 'none',
									duration: 2000
								});
							} else {
								this.placeDates.splice(index, 1)
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
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
		width: 30px;
		height: 30px;
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
</style>
