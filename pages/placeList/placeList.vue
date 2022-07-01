<template>
	<view style="width:100%;height:100%;position: relative;">
		<uni-card :is-shadow="true" is-full>
			<!-- 搜索框 -->
			<view class="flex border-bottom">
				<view style="width: 70rpx;height: 70rpx;"
				class="flex flex-1 align-center justify-center bg-light text-light-muted rounded-circle mr-0" hover-class="bg-hover-light">
					<picker class="justify-center" mode="region" @change="bindPickerChange" :value="areArray" :range="cityArray">
						<text class="px-1">{{areArray[1]}}</text>
						<text class="px-1">{{areArray[2]}}</text>
					</picker>
				</view>
				<view class="position-relative flex-1">
					<view style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;" class="flex align-center justify-center text-light-muted">
						<text class="iconfont icon-sousuo"></text>
					</view>
					<input style="height: 70rpx;padding-left: 70rpx;" type="text" class="bg-light font-md rounded-circle" placeholder="搜索" @blur="search"/>
				</view>
				<view style="width: 70rpx;height: 70rpx;"
				class="flex align-center justify-center bg-light rounded-circle mr-0" @click="addPlace" hover-class="bg-hover-light">
					<text class="iconfont icon-zengjia"></text>
				</view>
			</view> 
		</uni-card>
		
		<!-- 列表 -->
		<uni-list v-for="(placeItem, placeIndex) in placeDates">
			<uni-list-item link>
				<template v-slot:header>
					<view class="slot-box">
						<image class="slot-image" :src="placeItem.type===1?'/static/icon/restaurant.png':'/static/icon/mosques.png'" mode="widthFix"></image>
					</view>
				</template>
				<template v-slot:body>
					<view class="w-100 slot-box flex-column">
						<view class="slot-box flex3 flex-column w-100">
							<view class="flex w-100">
								<text class="font-lg text-success">{{placeItem.name}}</text>
							</view>
							<view class="flex w-100">
								<text class="font-sm text-light-black flex-1 text-right">联系方式: </text>
								<text class="font-sm text-success flex-3 text-left">{{placeItem.phone}}</text>
							</view>
							
						</view>
						<view class="slot-box flex1 flex justify-end w-100">
							<text class="font-small text-light-black text-right">{{placeItem.formattedAddress}}</text> 
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				areArray: ["广东省", "深圳市", "罗湖区"],
				placeDates: [{
					"_id": {
						"$oid": "62b435d8f6d1400001332aea"
					},
					"city": "深圳市",
					"district": "罗湖区",
					"name": "中发源(春风路店)",
					"location": "南极路与春风路交汇处向西大厦北侧前行50米",
					"phone": "0755-82229318",
					"traffic": "2号线：湖北路A出口步行220m",
					"coordinate": "114.126938,22.542662",
					"geopoint": {
						"type": "Point",
						"coordinates": [114.126938, 22.542662]
					},
					"formattedAddress": "广东省深圳市罗湖区向西大厦",
					"type": 1
				},{
					"_id": {
						"$oid": "62b435d806b1e200014dbecc"
					},
					"city": "深圳市",
					"district": "罗湖区",
					"name": "夏雪花1",
					"location": "深圳市人民南路2011号联华大厦1楼南面",
					"phone": "0755-82233586",
					"traffic": "9号线：人民南站C出口步行270m",
					"coordinate": "114.118318,22.536721",
					"geopoint": {
						"type": "Point",
						"coordinates": [114.118318, 22.536721]
					},
					"formattedAddress": "广东省深圳市罗湖区联华大厦",
					"type": 2
				},{
					"_id": {
						"$oid": "62b435d97a1d270001e5a9bd"
					},
					"city": "深圳市",
					"district": "罗湖区",
					"name": "夏雪花2",
					"location": "深圳市嘉宾路1017号向西村粤鹏大厦1楼",
					"phone": "0755-82171233",
					"traffic": "9号线：向西村站D1出口步行300m",
					"coordinate": "114.124224,22.541076",
					"geopoint": {
						"type": "Point",
						"coordinates": [114.124224, 22.541076]
					},
					"formattedAddress": "广东省深圳市罗湖区粤鹏大厦",
					"type": 1
				}]
	        }
	    },
	    computed: {
	        
	    },
	    methods: {
	        bindPickerChange: function(e) {
	            console.log('picker发送选择改变，携带值为', e.detail.value)
	            this.areArray = e.detail.value
	        },
	        search(e){
				const keywords = e.detail.value
				console.log(keywords);
				if (keywords === "") {
					return;
				} else {
					
				}
			},
			addPlace(){
				
			}
	    }
	}
</script>

<style>

</style>
