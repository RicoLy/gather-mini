<template>
  <view>
    <uni-card :is-shadow="true" is-full>
      <text class="uni-h6">列表组件可以在其中使用图标、略缩图或放置任何你想放的元素，使用场景如：导航菜单、列表、设置中心排版等</text>

    </uni-card>
    <uni-list :border="true" v-for="(placeItem, placeIndex) in placeDates">
      <uni-list-item link>
        <!-- 自定义 header -->
        <template v-slot:header>
          <view class="slot-box">
            <image class="slot-image" :src="placeItem.type===1?'/static/restaurant.png':'/static/mosques.png'" mode="widthFix"></image>
          </view>
        </template>
        <!-- 自定义 body -->
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
  components: {},
  data() {
    return {
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
    };
  },
  methods: {
    onClick(e) {
      console.log('执行click事件', e.data)
      uni.showToast({
        title: '点击反馈'
      });
    },
    switchChange(e) {
      uni.showToast({
        title: 'change:' + e.value,
        icon: 'none'
      });
    }
  }
};
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
