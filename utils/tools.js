import wx from '@/libs/wx'
import store from '@/store'
import { requestNormal } from '@/utils/request/request'

function getContext() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

export function checkLogins() {
  return new Promise((resolve, reject) => {
    const context = getContext()
    const dialog = context.selectComponent('#loginDialog');
    if (store.state.user.HAS_LOGIN) {
      resolve('imitate')
      return
    }
    if (dialog) {
      dialog.setData({
        onSuccess: resolve,
        onCancel: reject,
      })
      dialog.$vm.onSuccess = resolve
      dialog.$vm.onCancel = reject
      wx.nextTick(() => {
        store.commit('handleLoginDialog', true)
      });
    } else {
      console.warn(
          '未找到节点，请确认是否正确引用登录组件'
      );
    }
  })
}

export function getPdfAndView(url) {
  wx.downloadFile({
    url,
    success: function (res) {
      if (res.statusCode === 200) {
        let Path = res.tempFilePath
        wx.openDocument({
          filePath: Path,
          success: function (res) {
            console.log('打开PDF成功');
          }
        })
      }
    },
    fail: function (res) {
      console.log(res);
    }
  })
}

export function _debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  let later = function() {
    let last = new Date().getTime() - timestamp;
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    let callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  }
}

export function openLocation (opts) {
  // console.log({latitude, longitude, name, address})
  let latitude = opts.lat
  let longitude = opts.lon
  let name = opts.name
  let address = opts.address
  wx.openLocation({
    latitude: Number(latitude),
    longitude: Number(longitude),
    name,
    address
  })
}

export function getOpenId () {
  return new Promise((resolve, reject) => {
    uni.login({
      success: (res) => {
        if (res.code) {
          requestNormal(
            {
              path: 'saasOperation',
              url: 'getOpenId',
              version: '1.0',
              method: 'POST',
              data: {
                appId: 'wxa42c3982f3c5b049',
                code: res.code,
                secret: '1fd0249383967237513517f05f90c1d3',
              }
            }
          ).then((res) => {
            if (res.success) {
              if (typeof res.data === 'string') {
                const openInfo = JSON.parse(res.data)
                resolve(openInfo)
              }
            } else (
              reject(res)
            )
            // console.log('后端给openid', res)
          })
        }
      }
    })
  })
}
