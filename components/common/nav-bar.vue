<template>
	<view class="fixed-top bg-white">
		<uni-status-bar></uni-status-bar>
		<view style="height: 44px;" class="flex border-bottom align-center">
			<view class="flex-1">
				<slot name="left"></slot>
			</view>
			<view class="flex-1 flex justify-center">
				<slot name="center"></slot>
			</view>
			<view class="flex-1 flex justify-end">
				<slot name="right"></slot>
			</view>
		</view>
		
		<!-- 占位 -->
		<view>
			<uni-status-bar></uni-status-bar>
			<view style="height: 44px;"></view>
		</view>
		
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	export default {
		components: {
			uniStatusBar
		},
		name:"nav-bar",
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>