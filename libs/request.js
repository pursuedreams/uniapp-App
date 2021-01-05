import wx from '@/libs/wx'
import Fly from 'flyio/dist/npm/wx'
import appConfig from '@/config/app-config'
import sign from '@/libs/openApiSign'

const request = new Fly()
request.config = {
    timeout: appConfig.timeout,
    baseURL: appConfig.apiURL,
    method: 'post'
}

request.interceptors.request.use((config, promise) => {
    //console.log(config, "===============config")
    if (!config.no_header_common) {
        config.headers = {
            Authorization: `${wx.getStorageSync('token')}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
        // config.body.action = config.action
        // config.body.version = config.version || '1.0'
        // config.body = sign.generate(config.body, config.method)
    }
    if (config.Content_Type && config.Content_Type === 'form-urlencoded') {
        config.headers = {
            Authorization: `${wx.getStorageSync('token')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    return config
})
request.interceptors.response.use(
    function (resp) {
        wx.hideNavigationBarLoading()
        const __data__ = resp.data
        if (__data__.code) {
            if (__data__.code === '1001' || __data__.code === '1002') {
                console.log('need login')
            } else if (__data__.code !== '200' || !__data__.success) {
                let rej = {
                    error_code: 'AJAX_ERROR',
                    error_message: data.message,
                    status: __data__.code,
                    data: __data__.data || __data__
                }
                return Promise.reject(rej)
            }
        }
        return __data__
    },
    (err, promise) => {
        const res = err?.engine?.response || {}
        wx.hideNavigationBarLoading()
        switch (err.status) {
            case 0:
                wx.showToast({
                    title: '请检查网络，稍后再试',
                    icon: 'none'
                }); break;
            case 404:
                wx.showToast({
                    title: '请求接口不存在',
                    icon: 'none'
                }); break;
            default:
                wx.showToast({
                    title: `${res.code}：${res.message}`,
                    icon: 'none'
                });
        }
        return promise.reject(err)
    }
)
export default request
