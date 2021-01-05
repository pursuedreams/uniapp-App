<template>
  <view class="dynamicHeight">
    <view class="dynamicHeight__title">
      <view class="fillgap" v-if="safeTop > baseline"></view>
      {{title}}
    </view>
  </view>
</template>

<script>
const baseline = 20;
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    // sub
  },
  data() {
    return {
      safeTop: baseline,
			baseline: baseline,
    }
  },
  created() {
    const { top } = uni.getStorageSync('safeArea');
    this.safeTop = top;
  }
}
</script>

<style lang="less" scoped>
.dynamicHeight{
  &__title{
    text-align: center;
    position: relative;
    padding: 50upx 40upx;
    font-size: 38upx;
    font-weight: 300;
    color: #fff;
    .fillgap{
      height: 26px;
    }
  }
}
</style>
