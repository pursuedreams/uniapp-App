<template>
	<view>
		<main-layout :active="2">
			<div class="mine-page">
				<div class="my-header box-wrapper">
					<div class="user-info">
						<div class="face">
							<i class="o-img"></i>
						</div>
						<div class="user-name">
							<!-- <p class="us">{{ accountInfo.phone }}</p> -->
							<div class="new-button">
								<div class="app-button">立即登录</div>
							</div>
						</div>
					</div>
					<div class="fav-floor">
						<div class="floor-box">
							<div class="floor-box__detail">
								<h4 class="t">我的能量</h4>
								<div class="line-box">
									<div class="line-item">
										<h5> 0.00 </h5>
										<p>账户余额(能量币)</p>
									</div>
									<div class="line-item opc">
										<h5> 0.00 </h5>
										<p>冻结金额</p>
									</div>
								</div>
							</div>
							<div class="floor-box__action">
								<div class="app-button" @click="goPageCheckLogin('nopage')">账户充值</div>
								<div class="app-button" @click="goPageCheckLogin('/pages/finance/use-detail/index')">使用明细</div>

							</div>
						</div>
					</div>
				</div>

				<div class="tools-wrapper">
					<div class="box-cell van-cell--clickable" hover-class="van-cell--hover hover-class">
					<div class="t ic">
						<span>我的订单</span>
						<van-icon name="question-o" size="16" style="padding: 0 8px; color: #d0d0d0" @click="goPageCheckLogin('/pages/trades/order/order-status-introduction/index')" />
					</div>
					<div hover-class="none" class="v" @click="goPageCheckLogin('/pages/trades/order/order-list/index?status=-1')">全部订单<van-icon class="arrow-right" name="arrow" /></div>
					</div>
					<div class="box-body tools-con">
					<div hover-class="none" class="tools-con__item" @click="goPageCheckLogin('/pages/trades/order/order-list/index?status=0')">
						<div class="tools-con__icons">
							<image mode='widthFix' src="../../static/img/w-recharging.png" />
						</div>
						<span class="tools-con__keys">待充电</span>
					</div>
					<div hover-class="none" class="tools-con__item"  @click="goPageCheckLogin('/pages/trades/order/order-list/index?status=1')">
						<div class="tools-con__icons">
						<image mode='widthFix' src="../../static/img/recharging.png" />
						</div>
						<span class="tools-con__keys">充电中</span>
					</div>
					<div hover-class="none" class="tools-con__item"  @click="goPageCheckLogin('/pages/trades/order/order-list/index?status=4')">
						<div class="tools-con__icons">
						<image mode='widthFix' src="../../static/img/settled.png" />
						</div>
						<span class="tools-con__keys">待结算</span>
					</div>
					<div hover-class="none" class="tools-con__item"  @click="goPageCheckLogin('/pages/trades/order/order-list/index?status=2')">
						<div class="tools-con__icons">
						<image mode='widthFix' src="../../static/img/ent-finish.png" />
						</div>
						<span class="tools-con__keys">已充完</span>
					</div>
					<div hover-class="none" class="tools-con__item" @click="goPageCheckLogin('/pages/trades/order/order-list/index?status=3')">
						<div class="tools-con__icons">
						<image mode='widthFix' src="../../static/img/my-canceled.png" />
						</div>
						<span class="tools-con__keys">已取消</span>
					</div>
					</div>
				</div>

				<div class="tools-wrapper">
					<div class="box-cell">
					<div class="t">常用</div>
					</div>
					<div class="box-body tools-con">
					<div hover-class="none" class="tools-con__item" @click="goPageCheckLogin('/pages/account/over-view/index')">
						<div class="tools-con__icons">
						<image mode='widthFix' src="../../static/img/safety.png" />
						</div>
						<span class="tools-con__keys">账号安全</span>
					</div>
					<div hover-class="none" class="tools-con__item" @click="downloadPdf()">
						<div class="tools-con__icons">
						<image mode='widthFix' src="../../static/img/user-deal.png" />
						</div>
						<span class="tools-con__keys">用户协议</span>
					</div>
					<navigator url="/pages/about-us/index" hover-class="none" class="tools-con__item">
						<div class="tools-con__icons">
						<image mode='widthFix' src="../../static/img/about-us.png" />
						</div>
						<span class="tools-con__keys">关于我们</span>
					</navigator>
					</div>
				</div>

				<div class="login-out-action">
					<div class="button">退出登录</div>
				</div>
			</div>
			<!-- <van-dialog id="van-dialog" />
			<login-dialog id="loginDialog" ref="login" :show="loginDialogStatus" /> -->
		</main-layout>
	</view>
</template>

<script>
// import wx from '@/libs/wx'
// import { mapActions, mapState, mapMutations } from 'vuex'
import MainLayout from '@/components/main-layout/index'
// import LoginDialog from '@/components/login'
// import { checkLogins } from '@/utils/tools'
// import { getPdfAndView } from '@/utils/tools'
// import Dialog from '@/wxcomponents/vant/dialog/dialog'
import userconfig from '@/config/user-config.js'

export default {
  data() {
    return {
		accountInfo: {
			userName: '小仙女'
		}
    }
  },
  computed: {
    // ...mapState(['loginDialogStatus']),
    // ...mapState('user', {
    //   hasLogin: state => state.HAS_LOGIN,
    //   accountInfo: state => state.ACCOUNT_INFO
    // }),
  },
  methods: {
	downloadPdf(url) {
		console.log('cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
		uni.downloadFile({
			url: 'https://app.evhzzh.com/%E4%B8%80%E5%93%A5%E5%85%85%E7%94%B5%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E5%8D%8F%E8%AE%AE.pdf', //仅为示例，并非真实的资源
			success: (res) => {
				console.log('下载！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！')
				if (res.statusCode === 200) {
					console.log('下载成功');
				}
			}
		});
    },
    // ...mapActions('user', ['doLoginOut', 'doGetAccountInfo']),
    // ...mapMutations('material', ['RESET_SELECTED_CAR']),
    async goPageCheckLogin (url) {
      if(url === 'nopage'){
        return uni.showModal({
          title: "提示",
          content: this.accountInfo.userName + "您好,暂不支持小程序充值。可以联系客服充值，客服电话" + userconfig.phoneNumber,
          confirmText: "联系客服",
          cancelText: "知道了",
          success: (res) => {
            if (res.confirm) {
              uni.makePhoneCall({
                phoneNumber: userconfig.phoneNumber
              })
            } else {
              console.log("//知道了");
            }
          }
        });
      } else {
		  return uni.showModal({
          title: "提示",
          content: this.accountInfo.userName + "您好,功能正在开发中...",
          confirmText: "知道了",
          success: (res) => {
            if (res.confirm) {
               console.log("//知道了");
            }
          }
        });
	  }
    //   try {
    //     await checkLogins()
    //     if(url === 'nopage'){
    //       return uni.showModal({
    //           title: "提示",
    //           content: this.accountInfo.userName + "您好,暂不支持小程序充值。可以联系客服充值，客服电话" + userconfig.phoneNumber,
    //           confirmText: "联系客服",
    //           cancelText: "知道了",
    //           success: (res) => {
    //             if (res.confirm) {
    //               uni.makePhoneCall({
    //                 phoneNumber: userconfig.phoneNumber
    //               })
    //             } else {
    //               console.log("//知道了");
    //             }
    //           }
    //         });
    //     }
    //     uni.navigateTo({ url })
    //   } catch (e) {}
    },
    // doLogin () {
    //   this.$store.commit('handleLoginDialog', true)
    // },
    // loginOut () {   
    //   uni.showModal({
    //     title: "",
    //     content: "确定退出登录?",
    //     confirmText: "确定",
    //     cancelText: "取消",
    //     success: (res) => {
    //         if (res.confirm) {
    //           this.doLoginOut()
    //           this.RESET_SELECTED_CAR()
    //         } else {
    //             console.log('取消')
    //         }
    //     }
    //   });
    //   return;
    // }
  },
  onShow () {
    // if (!this.hasLogin) { return }
    // this.doGetAccountInfo()

    // console.log(this.accountInfo, "==========111111111")
  },
  components: { MainLayout }
}
</script>


<style lang="less" scoped>
page {
  min-height: 100vh;
  background-color: #f3f3f3;
}
//   @import "../../style/common";
  @import "./index";
</style>

