<template>
	<view style="height: 100vh;">
		<view class="flex flex-row align-center justify-center">
			<uni-data-select steyle="height: 60rpx; width: 100rpx;" class="flex-1" v-model="value" :localdata="range" @change="change"></uni-data-select>
			<uni-data-select steyle="height: 60rpx; width: 100rpx;" class="flex-1" v-model="value" :localdata="range" @change="change"></uni-data-select>
		</view>
			
	</view>
</template>

<script>
	import uniDataSelect from '@/components/uni-ui/uni-data-select/uni-data-select.vue'
	export default {
		components: {
			uniDataSelect
		},
		data() {
			return {
				value: 0,
				range: [{"value": 0,"text": "篮球", "disable": true},
						{"value": 1,"text": "足球"},
						{"value": 2,"text": "游泳"}]
			}
		},
		methods: {
			change(e){
				console.log('e:',e);
			}
		}
	}
</script>

<style>

</style>
