<template>
  <view class="content_title" :class="dynamicCls">
    <view class="icon-back" @click="back">
      <slot name="icon">
        <view class="icon-img"></view>
      </slot>
    </view>
    <view class="titlee" :style="{color: white ? '#fff' : ''}">{{title}}</view>
  </view>
</template>

<script>
const baseline = 20;
export default {
  name: 'DiyTitle',
  props: {
    title: String,
    white: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      safeTop: baseline,
      baseline: baseline,
    }
  },
  computed: {
    dynamicCls() {
      if (this.safeTop > baseline) {
        return 'bigTop';
      }
      return ''
    }
  },
  methods: {
    back() {
      this.$emit('back')
    }
  },
  onShow() {
    console.log('onShow标题挂上')
  },
  mounted() {
    console.log('标题挂上')
    const { top } = uni.getStorageSync('safeArea');
		this.safeTop = top;
  }
}
</script>

<style lang="less">
.content_title {
  position: relative;
  &.bigTop {
    padding-top: 98upx;
  }
  display: flex;
  padding: 50upx 36upx 50upx 0upx;
  font-size: 38upx;
  font-weight: 300;
  .icon-back{
    width: 48upx;
    height: 48upx;
    flex: 0 0 48upx;
    padding: 0 10upx 0 20upx;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-img{
      width: 100%;
      height: 100%;;
      background: url(https://zh-applet.oss-cn-hangzhou.aliyuncs.com/wx-nybao/larrow.png);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .titlee{
    flex: 1;
    padding-right: 32upx;
    text-align: center;
  }
}
</style>