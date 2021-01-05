<template>
    <div class="scan-code-wrap">
        <camera v-if="canUseCamera"  @scancode="_scancode" :flash="flash" class="camera1" style="width: 100vw;height: 100vh;" mode="scanCode">
            </camera>
        <div class="camera-main">
            <div class="camera-main__title">扫描桩体二维码</div>
             
            <div class="camera-main__body">
                <div class="c-w">
                    <!-- <camera v-if="canUseCamera" :scan-area="[0,0,258, 258]" @scancode="_scancode" :flash="flash" class="camera" style="width: 100vh;height: 100vh;" mode="scanCode">
                    </camera> -->
                   
                    <!-- <cover-view class="cameramask"></cover-view > -->
                    <i class="c s"></i>
                    <i class="c y"></i>
                    <i class="c x"></i>
                    <i class="c z"></i>
                    <div class="line"></div>
         
                  
                    <!-- <cover-view class="line"></cover-view> -->
                </div>
            </div>
            <div class="camera-main__footer">
                <div class="c-footer">
                    <div class="c-item" @click="handleInput">
                        <h4>
                            <span class="hxc hxc-shou"></span>
                        </h4>
                        <p>手动输入桩号</p>
                    </div>
                    <div class="c-item" :class="{'flash-on': flash === 'on'}" @click="toggleFlash">
                        <h4>
                            <span class="hxc" :class="{'hxc-shoudiantong-guan': flash === 'on', 'hxc-shoudiantong-kai': flash === 'off'}"></span>
                        </h4>
                        <p>手电筒</p>
                    </div>
                </div>
            </div>
        </div>

        <van-popup closeable :show="showPopup" position="bottom" custom-style="height: 100%;" @close="popupClose">
            <div class="handle-input">
                <p class="tips"><span class="hxc hxc-tips"></span>注：在显示器上可查看桩体编码</p>
                <p class="o-tips">请输入屏幕上的电桩编号</p>
                <div class="forms">
                    <van-field :focus="canFoucs" :value="pileNo" clearable placeholder="请输入充电桩编码" :border="false" @change="setPileNo" />
                </div>
                <div class="form-action">
                    <van-button :disabled="!pileNo" block @click="_getGunList">确定</van-button>
                </div>
                <div class="c-footer">
                    <div class="c-item" @click="popupClose">
                        <h4>
                            <span class="hxc hxc-saoyisao"></span>
                        </h4>
                        <p>扫一扫</p>
                    </div>
                    <div class="c-item" :class="{'flash-on': flash === 'on'}" @click="toggleFlash">
                        <h4>
                            <span class="hxc" :class="{'hxc-shoudiantong-guan': flash === 'on', 'hxc-shoudiantong-kai': flash === 'off'}"></span>
                        </h4>
                        <p>手电筒</p>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import wx from '@/libs/wx'
import { mapMutations, mapState } from 'vuex'
import appConfig from '@/config/app-config'
import { getWxSetting, goWxSetting } from '@/libs/wechat'
import { getAppGunList } from '@/api/recharge'
import userconfig from '@/config/user-config.js'

export default {
    data() {
        return {
            flash: 'off',
            canFoucs: false,
            camInstance: null,
            canUseCamera: false,
            showPopup: false,
            pileNo: '',
            isScaned: false,
            lastScanResult: null,
        }
    },
    computed: {
        ...mapState('material', {
            selectedCar: state => state.SELECTED_CAR_INFO,
        }),
        ...mapState('user', {
            accountInfo: state => state.ACCOUNT_INFO,
        }),
    },
    async onLoad() {
        const that = this
        try {
            await getWxSetting('scope.camera')
            that._createCamera()
        } catch (error) {
            that.canUseCamera = false
            wx.showModal({
                title: '提示',
                content: '需要您的授权使用摄像头',
                success(_res_) {
                    if (_res_.confirm) {
                        goWxSetting('scope.camera').then(_ => {
                            that._createCamera()
                        })
                    } else {
                        wx.showToast({
                            title: '获取授权失败',
                            icon: 'none'
                        })
                    }
                }
            })
        }
    },
    onShow() {
        this.isScaned = false
    },
    methods: {
        ...mapMutations('material', ['SET_GUN_DETAIL']),
        _createCamera() {
            const that = this
            that.canUseCamera = true
            that.camInstance = wx.createCameraContext()
        },
        setPileNo(e) {
            this.pileNo = e.mp.detail
        },
        handleInput() {
            this.showPopup = true
            this.canFoucs = true
        },
        toggleFlash() {
            this.flash = this.flash === 'on' ? 'off' : 'on'
        },
        _getGunList() {
            if ( this.accountInfo.locked == 1 ) {
                uni.showModal({
                    title: "账号被冻结",
                    content: this.accountInfo.userName + "您好,您的账号目前已被冻结，不能使用APP充电。可以联系客服恢复充电，客服电话" + userconfig.phoneNumber,
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
                return;
            }
            const { carNo = '', id = undefined } = this.selectedCar || {}
            const that = this
            const { pileNo } = that;
            // let reg = /^[hlht://]\d{17}\.\d{9}(\/)?/;
            let reg = /^hlht:\/\/\d{17}\.\d{9}(\/)?$/;//带枪码
            let reg1 = /^\d{16}$/;//桩码
            getAppGunList({
                devCode: pileNo,
                plateNum: id && id === 'personal' ? '' : carNo
            }).then(res => {
                console.log("==>>>", res);
                if (res && res.data) {
                    let codeType = res.data.codeType;//二维码类型：1;桩，2：枪 ;
                    that.SET_GUN_DETAIL(res.data)
                    wx.navigateTo({
                        url: '/pages/recharge/select-gun/index'
                    })
                } else {
                    return uni.showToast({
                        icon: 'none',
                        title: res.msg
                    })
                }
            }).catch(error => {
                this.isScaned = false
                uni.showToast({
                    icon: 'none',
                    title: error?.engine?.response?.message || '请重试'
                })
            })
        },
        _scancode(e) {
            const { result } = e.mp.detail
            if (!this.isScaned && result !== this.lastScanResult) {
                this.lastScanResult = result
                this.isScaned = true
                this.pileNo = result
                this._getGunList()
            }
        },
        popupClose() {
            this.showPopup = false
            this.pileNo = ''
            this.canFoucs = false
        },
        validate() { }
    }
}
</script>
<style>
page {
    width:100%;
    height:100%;
    background-color: #565656;
}
</style>
<style lang="less" scoped>
@import "./index";
</style>

