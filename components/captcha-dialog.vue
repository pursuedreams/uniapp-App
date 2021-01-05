<template>
  <van-dialog
    useSlot
    ref="dialog"
    :show="visible"
    :title="dialogText.title"
    width="662rpx"
    customStyle="border-radius: 26rpx; padding-top: 0"
    class="mc-dialog-wrap"
    asyncClose
    showCancelButton
    showConfirmButton
    :cancelButtonText="dialogText.cancel"
    :confirmButtonText="dialogText.confirm"
    cancelButtonColor="#3377FF"
    confirmButtonColor="#3377FF"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <div class="dialog-content-wrap">
      <div class="mc-pwdInput-wrap">
        <input
          v-for="item in 6"
          :key="item"
          class="mc-pwdInput-item"
          password
          disabled
          :value="getInputVal(item)"
        >
        <input v-if="step === 1" class="input-hidden" type="number" maxlength="6" focus v-model="pwd">
        <input v-else class="input-hidden" type="number" maxlength="6" focus v-model="pwd2">
      </div>
    </div>
  </van-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { appStartCharge } from '@/api/recharge'
import { setPwd } from '@/api/recharge'
export default {
  data() {
    return {
      visible: false,
      length: 6,
      pwd: '',
      pwd2: '',
      step: 1,
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.USER_INFO
    }),
    dialogText: function() {
      const { step } = this
      if (step === 1) {
        return {
          title: '请设置您的支付密码',
          cancel: '取消',
          confirm: '下一步'
        }
      }
      return {
        title: '请确认您的支付密码',
        cancel: '上一步',
        confirm: '确认'
      }
    },
    getInputVal() {
      return function(idx) {
        const { step, pwd, pwd2 } = this
        if(step === 1) return pwd.length >= idx + 1 ? pwd[idx] : ''
        return pwd2.length >= idx + 1 ? pwd2[idx] : ''
      }
    }
  },
  methods: {
    ...mapActions('user', ['doGetAccountInfo']),
    onShowDialog() {
      this.visible = true
    },
    closeDialog(){
      this.step = 1
      this.pwd = ''
      this.pwd2 = ''
      this.visible= false
    },
    onCancel() {
      const { step } = this
      if(step === 1) return this.closeDialog()
      this.$refs.dialog.stopLoading()
      this.pwd2 = ''
      this.step = 1
    },
    onConfirm(){
      // const { step, pwd, pwd2, userInfo: { id: userId, company: { id: companyId } } } = this
      const { step, pwd, pwd2} = this
      console.log(step, pwd, pwd2)

      this.$refs.dialog.stopLoading()
      if(step === 1) {
         if(!pwd || pwd.length < 6) {
           return uni.showToast({
             icon: 'none',
             title: '请输入6位数字密码'
           })
         } else {
           return this.step = 2
         }
      } else {
        if(pwd !== pwd2) {
          return uni.showToast({
            icon: 'none',
            title: '两次输入的密码不一致，请重新输入'
          })
        } else {
          setPwd({
            oldpwd:'',
            pwd: this.$Aes.Encrypt(pwd2),
          }).then(res => {
            if(res.code) return uni.showToast({
              icon: 'none',
              title: res.message || '设置支付密码失败'
            })
            this.doGetAccountInfo()
            this.closeDialog()
            this.$emit('success', true)
          }).catch(err => {
            uni.showToast({
              icon: 'none',
              title: err.message || '设置支付密码失败'
            })
          })
       
        // this.$openApi({
        //   serve: 'userCenter',
        //   action: 'setPayPassword',
        //   data: {
        //     userId,
        //     companyId,
        //     pay: pwd,
        //   }
        // }).then(res => {
        //   if(res.code) return uni.showToast({
        //     icon: 'none',
        //     title: '设置支付密码失败'
        //   })
        //   this.doGetAccountInfo()
        //   this.closeDialog()
        //   this.$emit('success', true)
        // })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

.dialog-content-wrap {
  padding: 32rpx 43rpx 48rpx;
  .mc-pwdInput-wrap {
    position: relative;
    display: flex;
    .mc-pwdInput-item {
      flex: 1;
      height: 120rpx;
      border: 2rpx solid #d0d0d1;
      border-right: none;
      text-align: center;
      &:nth-last-child(2) {
        border-right: 2rpx solid #d0d0d1;
        border-radius: 0 6rpx 6rpx 0;
      }
      &:first-child {
        border-radius: 6rpx 0 0 6rpx;
      }
    }
  }
  .input-hidden {
    position: absolute;
    width: 200%;
    height: 100%;
    top: 0;
    left: -100%;
  }
}
</style>
