<template>
	<view style="height: 44rpx;line-height:44rpx;width:100%;transition:background .4s,color .4s;" :style="{background:backgroundColor,color:titleColor}">
		<view style="display: flex;width:100%;vertical-align: middle;">
			<view style="width:94rpx;height: 44rpx;line-height:44rpx;padding-left: 15rpx;font-size: 18rpx;">
				<slot name="leftItems">
					<text @click="btnBack" v-if="showBackButton" class="iconfont icon-back leftitem"></text>
					<text @click="btnHome" v-if="showHomeButton&&hasHomeButton" class="iconfont icon-homefill leftitem"></text>
				</slot>
			</view>
			<view class="navTitle">
				<slot name="title"></slot>
			</view>
			<view style="width:94rpx;height: 44rpx;">
				
			</view>
		</view>
		<view style="height: 1rpx;width: 100%;" :style="{background:bottomlineColor,display:hasBottomLine?'':'none'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showBackButton:false,
				showHomeButton:false
			};
		},
		props:{
			hasHomeButton:{
				type:Boolean,
				default:true
			},
			backgroundColor:{
				type:String,
				default:"#fff"
			},
			titleColor:{
				type:String,
				default:"#000"
			},
			hasBottomLine:{
				type:Boolean,
				default:true
			},
			bottomlineColor:{
				type:String,
				default:"#F2F2F2"
			}
		},
		methods:{
			btnBack:function(){
				uni.navigateBack({})
			},
			btnHome:function(){
				uni.navigateBack({
					delta:999
				})
			}
		},
		mounted() {
			var curPages=getCurrentPages();
			var sysInfo=uni.getSystemInfoSync();
			if(curPages.length>1)this.showBackButton=true;
			if(curPages.length>2)this.showHomeButton=true;
		}
	}
</script>

<style>
	.leftitem
	{
		margin-right: 20rpx;
	}
	.navTitle
	{
		flex:1;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 44rpx;
		line-height:44rpx;
	}
</style>
