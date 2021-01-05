<template>
  <view class="login" id="loginDialog">
		<van-popup :show="show"
      custom-class="heLogin"
			closeable
			:close-on-click-overlay="false"
      close-icon="close"
		  @close="onClose">
      <view class="popContent">
         <van-field
          :value="phone"
          input-class="inputcls"
          clearable
          placeholder="请输入手机号"
          :border="false"
          :error-message="errorMsg"
          @blur="validate()"
          @change="(e) => { this.phone = e.detail }"
        />
        <van-field
          :value="code"
          placeholder="请输入验证码"
          input-class="inputcls rv"
          :border="false"
          @change="(e) => { this.code = e.detail }"
        >
          <!-- error-message="验证码错误" -->
          <view :class="{codebtn: true, 'active': codebtnAv}" slot="right-icon" @click="getCode">{{btnText || '获取验证码'}}</view>
        </van-field>
        <van-checkbox
          custom-class="checkbox"
          :value="checked"
          checked-color="#3276ff"
          shape="square"
          @change="(e) => { this.checked = e.detail }"
          label-class="checklabel"
        >
          我已阅读并同意<label class="blue" @click.stop="getPDF(1)">《用户协议》</label>和<label class="blue" @click.stop="getPDF(2)">《隐私政策》</label>
        </van-checkbox>
        <view class="btnwrap">
          <view :class="{submitbtn: true, active: cansubmit }" @click="login">登录</view>
        </view>
			<!-- close-icon-position="top-right" -->
      </view>
		</van-popup>
  </view>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import { getPdfAndView } from '@/utils/tools'
import { getCaptchaSms, doCodeLogin } from '@/api/account'
// const phoneReg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
const phoneReg = /^[1][\d]{10}$/

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btnText: '',
      nosent: true,
      phone: '',
      errorMsg: ' ',
      code: '',
      checked: true,
      onSuccess: null,
      onCancel: null
    }
  },
  computed: {
    codebtnAv() {
      const flag = this.nosent && (phoneReg.test(this.phone))
      return flag
    },
    cansubmit() {
      return this.code && (phoneReg.test(this.phone)) && this.checked
    },
    ...mapState('user', {
      hasLogin: state => state.HAS_LOGIN
    })
  },
  methods: {
    ...mapMutations('user', { 
      setToken: 'SET_TOKEN'
    }),
    ...mapMutations('user', { 
      setUserInfo: 'SET_USER_INFO'
    }),
    ...mapActions('user', ['doGetUserInfo', 'doGetAccountInfo']),
    checkLogin () {
      const that = this
      return new Promise((resolve, reject) => {
        if (that.hasLogin) {
          resolve()
          return
        }
        this.onSuccess = resolve
        this.onCancel = reject
        this.$store.commit('handleLoginDialog', true)
      })
    },
    getPDF (idx) {
      const urlObj = {
        1: 'https://app.evhzzh.com/%E4%B8%80%E5%93%A5%E5%85%85%E7%94%B5%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E5%8D%8F%E8%AE%AE.pdf',
        2: 'https://app.evhzzh.com/%E4%B8%80%E5%93%A5%E5%85%85%E7%94%B5%E9%9A%90%E7%A7%81%E6%94%BF%E7%AD%96.pdf',
      }
      getPdfAndView(urlObj[idx])
    },
    onClose () {
      this.reset()
      this.$store.commit('handleLoginDialog', false)
      this.onCancel && this.onCancel()
    },
    reset () {
      if (this.timer) clearTimeout(this.timer)
      this.btnText= ''
      this.nosent= true
      this.phone= ''
      this.errorMsg= ' '
      this.code= ''
      this.checked= false
      this.onSuccess= null
      this.onCancel= null
    },
    validate () {
      let phone = this.phone.trim()
      if(!phone){
        return this.errorMsg = "请输入手机号" 
      }else if(phoneReg.test(phone)){
        return this.errorMsg = ""
      }else {
        return this.errorMsg = "手机号格式错误"
      }
    },
    clockTask (sec) {
      if (sec === 0) {
        this.btnText = ''
        this.nosent = true
        clearTimeout(this.timer)
        return
      }
      this.btnText = `${sec}s`
      this.timer = setTimeout(() => {
        this.clockTask(sec - 1)
      }, 1000)
    },
    getCode () {
      if (!this.codebtnAv) { return }
      if (this.timer) clearTimeout(this.timer)
      getCaptchaSms(this.phone).then((res) => {
        this.nosent = false
        this.clockTask(60)
      })
    },
    async login () {
      const that = this
      if (!this.cansubmit) return
      try {
        const res = await doCodeLogin({
          // phone: this.phone,
          // smsCode: this.code,
          // clientType:'app',
          phoneNumber: this.$Aes.Encrypt(this.phone.trim()),//手机
          code: this.code,//手机验证码
          managementId: 1,//运营商id
          chanel: '3'
        })
        if(res.status !== 200) {
          uni.showToast({
              title: res.msg,
              icon: 'none'
          })
        }
        let decryptres = JSON.parse(this.$Aes.Decrypt(res.data))
        console.log(decryptres, "==============decryptresdecryptresdecryptres")
        that.setToken(decryptres.token)
        that.setUserInfo(decryptres)
        await that.doGetUserInfo()
        await that.doGetAccountInfo()
        that.onSuccess && that.onSuccess()
        that.$emit('success')
        that.onClose()
      } catch ( e ) {
        that.onCancel && that.onCancel()
      }
    }
  }
}
</script>

<style lang="less">
.blue{
  color: #3377FF;
}
.heLogin{
  border-radius: 5px;
  .popContent{
    position: relative;
    padding-top: 40px;
    box-sizing: border-box;
    width: 320px;
    height: 320px;
    background-color: #fff;
    .inputcls{
      padding-left: 15px;
      height:44px;
      background: #f3f6fb;
      border-radius: 10px;
      &.rv{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .codebtn{
      width: 110px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      margin-left: -8px;
      background-color: #e3e8f1;
      border-radius: 0px 5px 5px 0px;
      &.active{
        background-color: #3276ff;
        color: #fff;
      }
    }
    .checkbox{
      padding-left: 21px;
    }
    .checklabel{
      font-size: 12px;
      font-family: 'PingFangSC', 'PingFangSC-Regular';
      font-weight: 400;
      text-align: left;
      color: #666666;
      line-height: 16px;
    }
    .btnwrap{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
    .submitbtn{
      padding:10px 0;
      font-size: 18px;
      font-family: 'PingFangSC', 'PingFangSC-Regular';
      font-weight: 400;
      text-align: center;
      color: #666666;
      line-height: 25px;
      margin: 30px 20px 25px;
      background: #e3e8f1;
      border-radius: 5px;
      &.active{
        background-color: #3276ff;
        color: #fff;
      }
    }
  }
}
</style>
