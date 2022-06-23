<template>
	<view class="ezshare">
		<view>
			<view @click="clicked_selected(0)" class="divider">
				<button class="clear_button" open-type="share">选择好友发送邀请</button>
			</view>
			<view @click="clicked_selected(1)" class="divider">生成朋友圈分享海报</view>
			<view @click="clicked_cancel" :style="{height:(safeArea.top+30)+'rpx'}">取消</view>
		</view>
	</view>
</template>

<script>
	var sysinfo=uni.getSystemInfoSync();
	export default {
		data() {
			return {
				safeArea:null
			};
		},
		props:{
			
		},
		methods:{
			clicked_selected:function(index){
				this.$emit("selected",index);
				this.$emit("dismiss");
			},
			clicked_cancel:function(){
				this.$emit("dismiss");
			}
		},
		mounted() {
			this.safeArea=sysinfo.safeArea;
		}
	}
</script>

<style>
	.clear_button:after
	{
		border: none;
	}
	.clear_button
	{
		border: none;
		background: none;
		padding:0rpx !important;
		margin:0rpx !important;
		border-radius: 0rpx;
		line-height: inherit;
	}
	.ezshare
	{
		width:100%;
		height: 100%;
		background: rgba(0,0,0,.3);
		position: absolute;
		z-index:999999;
	}
	.ezshare>view
	{
		width:100%;
		bottom:0rpx;
		background: #fff;
		position: fixed;
	}
	.ezshare>view>view
	{
		text-align: center;
		font-size: 16rpx;
		height:50rpx;
		line-height: 50rpx;
		color:#000;
	}
	.ezshare>view>view.divider
	{
		border-bottom: 1rpx solid #f2f2f2;
	}
	.ezshare>view>view:nth-child(3)
	{
		color: #ff0000;
	}
</style>
