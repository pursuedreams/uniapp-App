<template>
  <div class='hxc-main-wrap'>
    <div class='hxc-main-body'>
      <slot />
    </div>
    <div class='hxc-main-footer'>
      <div class="hxc-tab-bar hxc-tab-bar--fixed">
        <div :class="['hxc-tab-bar__item', active === 0 ? 'hxc-tab-bar__item--active': '']" @click="handleClick(0)">
          <div class="hxc-tab-bar__badge">
            <div class="hxc-tab-bar__icon">
              <image mode='widthFix' class="hxc-tab-bar__inner-img" :src="active !== 0 ? '../../static/img/home_select.png' : '../../static/img/home_selected.png'">
            </div>
          </div>
          <div>
            <div class="hxc-tab-bar__badge">
              <div class="hxc-tab-bar__title">首页</div>
            </div>
          </div>
        </div>
        <div :class="['hxc-tab-bar__item', active === 1 ? 'hxc-tab-bar__item--active': '']" @click="handleClick(1, true)">
          <div class="hxc-tab-bar__badge">
            <div class="hxc-tab-bar__icon">
              <image mode='widthFix' class="hxc-tab-bar__inner-img extra-image" src="../../static/img/saoyisao.png">
            </div>
          </div>
        </div>
        <div :class="['hxc-tab-bar__item', active === 2 ? 'hxc-tab-bar__item--active': '']" @click="handleClick(2)">
          <div class="hxc-tab-bar__badge">
            <div class="hxc-tab-bar__icon">
              <image mode='widthFix' class="hxc-tab-bar__inner-img" :src="active !== 2 ? '../../static/img/mine.png' : '../../static/img/mine_selected.png'">
            </div>
          </div>
          <div>
            <div class="hxc-tab-bar__badge">
              <div class="hxc-tab-bar__title">我的</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wx from '@/libs/wx'
import { mapState, mapMutations } from 'vuex'
const mapRouter = {
  0: '/pages/home/index',
  1: '/pages/scan-code/index',
  2: '/pages/mine/index',
}
export default {
  props: {
    active: {
      type: Number,
      default: 0,
      loading: false
    }
  },
  computed: {
      ...mapState('user', {
          hasLogin: state => state.HAS_LOGIN,
      }),
    },
  methods: {
    handleClick (value, scan) {
      const url = mapRouter[value]
      uni.navigateTo({url, complete: () => {
        this.loading = false
      }})
    }
  },
  name: "MainLayout"
}
</script>

<style lang="less" scoped>
.hxc-main-wrap {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  .hxc-main-body {
    flex: 1;
    position: relative;
  }
  .hxc-main-footer {
    height: 50px;
    position: relative;
    z-index: 99;
  }
}

.hxc-tab-bar {
  display: flex;
  padding: 6px 0 3px;
  width: 100%;
  min-height: 50px;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    transform-origin: center;
    box-sizing: border-box;
    pointer-events: none;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    border: 0 solid rgba(0, 0, 0, 0.1);
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    border-top-width: 1px;
  }
  &__badge {
    position: relative;
    display: inline-block;
    font-size: 0;
    vertical-align: middle;
  }
  /* elements */
  &__item {
    position: relative;
    padding: 0;
    flex: 1;
    color: #868686;
    font-size: 0;
    transition: all 0.2s;
    &--active {
      color: #868686;
    }
  }

  &__icon {
    font-size: 24px;
    line-height: 1;
  }

  &__inner-img {
    width: 25px;
    height: 25px;

    &--inactive {
      display: none;
    }
  }

  &__title {
    display: block;
    padding: 3px 0;
    max-width: 100px;
    font-size: 12px;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* modifiers */
  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    z-index: 800;
  }
  .extra-image {
    width: 60px!important;
    height: 60px!important;
    position: absolute;
    left: 50%;
    margin-left: -30px;
    margin-top: -14px;
    z-index: 100
  }
}
</style>
