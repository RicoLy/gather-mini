<template>
	<view>
		<!-- 导航 -->
		<!-- <nav-bar>
			<text slot='left' class="font-md ml-3">首页</text>
			<template slot='right' class='flex'>
				<view style="width: 60rpx;height: 60rpx;"
				class="flex align-center justify-center bg-light rounded-circle mr-3" hover-class="bg-hover-light">
					<text class="iconfont icon-zengjia"></text>
				</view>
				<view style="width: 60rpx;height: 60rpx;"
				class="flex align-center justify-center bg-light rounded-circle mr-3" hover-class="bg-hover-light">
					<text class="iconfont icon-gengduo"></text>
				</view>
			</template>
		</nav-bar> -->
		
		<!-- 搜索框 -->
		<!-- 搜索框 -->
		<view class="px-3 py-2">
			<view class="position-relative">
				<view style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;" class="flex align-center justify-center text-light-muted">
					<text class="iconfont icon-sousuo"></text>
				</view>
				<input style="height: 70rpx;padding-left: 70rpx;" type="text" class="bg-light font-md rounded-circle" placeholder="搜索" />
			</view>
		</view>
	</view>
</template>

<script>
	// import navBar from '@/components/common/nav-bar.vue';
	export default {
		components: {
			// navBar
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
