/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-09-08 10:22:51
 * @LastEditors: Waker
 * @LastEditTime: 2020-09-08 14:41:29
 */
// const SERVER_URL = 'https://sxhnwx.smarteoc.com/energymanage_sxhnmaster_wx'
// const SERVER_URL = 'https://10.1.170.162:15301/api/'
// const SERVER_URL = 'https://sxhnwx.smarteoc.com/api/' // 正式环境
// const SERVER_URL = 'http://10.1.170.161:8082/' // 测试环境
// const SERVER_URL = 'http://127.0.0.1:15301/api/'

import hostnameMap from "./hostnameMap.js"
import sign from "./openApiSign"
// const SERVER_URL = `${hostnameMap.openApi[process.env.NODE_ENV]}` // 登陆相关的地址
const hostName ={
  openApi:`${hostnameMap.openApi[process.env.NODE_ENV]}`,
  sso:`${hostnameMap.sso[process.env.NODE_ENV]}`
}

function handleError (res) {
  uni.showToast({
    title: '登录超时，请重新登录',
    icon: 'none',
    success: () => {
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/main/main',
        })
      }, 1500);
    }
  });
  uni.setStorageSync('token', '')
}

// openAPI入口
export function $openApi ({ serve='userCenter', action, data = {},proxy='api', version = '1.0', method = 'post', timeout, headers,actionurl, actiondata = {} }) {
  // let url = `${hostName.openApi}/${proxy}/${serve}/${action}`
  let url= ''
  if(actionurl){
    url = `${hostName.openApi}/${actionurl}`
  }else {
    url = `${hostName.openApi}/${proxy}/${serve}/${action}`
  }

  let obj = {
    url,
    method,
    proxy,
    actiondata: actiondata,
    data: {
      data,
      action,
      version,
    },
    header:{
      Authorization: `${uni.getStorageSync('token')}`,
    },
  }
  // 签名
  const idKey = {
    accessKeyId: '6c946c4d6f19e940', // 根据项目固定
    secretKey: 'ohxxzR8x3ssekBJUPmCmFAZPsIYhVXsuAFSDYN7xSEw=', // 根据项目固定
  }
  if(proxy==='api'){
    obj.data = sign.generate(obj.data, 'POST', idKey.accessKeyId, idKey.secretKey)
  }

  // 超时设置
  if (timeout) obj.timeout = timeout
  // headers设置
  if (headers) obj.headers = headers

  return new Promise((resolve, reject) => {
    uni.request({
      ...obj,
      success:(res)=> {
        if (res.data.code === '1001' && res.data.message === '登录超时，请重新登录') {
          handleError(res.data)
        }

        if(res.statusCode === 200 && (res.data.code === '200' || res.data.code == null)){
          resolve(res.data);
        }else{
            reject(res.data);
        }
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}

// 其他入口
export function $https (config) {
  config.url = `${hostName.sso}${config.url}`

  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      success:(res)=> {
        if (res.data.code === '1001' && res.data.message === '登录超时，请重新登录') {
          handleError(res.data)
        }

        if(res.statusCode === 200 && (res.data.code === '200' || res.data.code == null)){
          resolve(res.data);
        }else{
            reject(res.data);
        }
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}
export {
  hostName
}
