import wx from '@/libs/wx'
import appConfig from '@/config/app-config'
import http from '@/libs/request'

export function getCaptchaSms (data) {
  return http.request(
      // '/sso/captcha/sms',
      // data,
      '/charge-app-server/app/user/getCode/' + data,
      {appId : 1},
      {
        no_header_common: true,
        method: 'GET'
      }
  )
}

export function getMessage () {
  return http.request(
      'charge-app-server/app/payPwd/pwd/message',
      {appId : 1},
      {
        method: 'GET'
      }
  )
}

export function doCodeLogin (data) {
  return http.request(
      // '/sso/phoneCodeLogin',
      '/charge-app-server/app/user/loginAndRegister',
      // { data: data },
      data,
      {
        no_header_common: true,
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
  )
}

export function getUserInfo (data) {
  return http.request(
      '/userCenter/getMeBySaas',
      { data: data },
      {
        action: 'getMeBySaas',
        method: 'POST'
      }
  )
}

export function verifyPaymentPassword (data) {
  return http.request(
      '/userCenter/verifyPaymentPassword',
      { data: data },
      {
        action: 'verifyPaymentPassword',
        method: 'POST'
      }
  )
}

export function getAccountInfo (data) {
  return http.request(
      // '/saasOperation/queryUserAccountInfo',
      '/charge-app-server/app/account/getAccount',
      {},
      {
        method: 'get',
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
  )
}

export function getOpenId () {
  console.log(appConfig, "99999999999999999999999999")
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log(res,appConfig, "===============resresresres")
          http.request(
              'charge-app-server/app/user/getOpenId',
              { 
                code: res.code,
                appId: appConfig.appCode,
               },
              // {
              //   data: {
              //     // appId: appConfig.appCode,
              //     code: res.code,
              //     // secret: appConfig.config.paySecret,
              //   }
              // },
              {
                method: 'get',
                headers : {
                  'Content_Type': 'application/x-www-form-urlencoded',
                }
              }
          ).then(res => {
            // if (res.success) {
              // if (typeof res.data === 'string') {
                // console.log(res.data, "999999999999999999999999999")
                let  openInfo = {}
                openInfo.openId = res.data
                resolve(openInfo)
              // }
            // } else (
            //     reject(res)
            // )
          })
        }
      }
    })
  })
}

export async function doCharge (data) {
  return http.request(
      '/charge-pay-server/pay/weixinpay',
      data,
      {
        headers : {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
  )
}

// 退款
export async function postRefund (data) {
  return http.request(
      '/charge-pay-server/pay/appRefund',
      data,
      {
        Content_Type :  'form-urlencoded' 
      }
  )
}

// 消费明细
export async function getAccountDetail (data) {
  return http.request(
      '/charge-app-server/app/account/getAccountDetail',
      data,
      {
        method: 'GET',
        Content_Type :  'form-urlencoded' 
      }
  )
}

