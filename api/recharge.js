import http from '@/libs/request'
import Aes from '@/utils/secret.js'

export function getAppGunList (data) {
  return http.request(
      '/charge-app-server/app/charge/portList',
      data,
      {
        method: 'get',
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
  )
}

export function appStartCharge (data) {
  return http.request(
      '/charge-app-server/app/charge/startCharge',
      data,
      {
        Content_Type :  'form-urlencoded'
      }
  )
}

export function appStopCharge (data) {
  return http.request(
      'charge-app-server/app/charge/stopCharge',
      data,
      {
        Content_Type :  'form-urlencoded'
      }
  )
}

export function setPwd (data) {
  return http.request(
      '/charge-app-server/app/payPwd/pwd',
      data,
      {
        method: 'put',
        Content_Type :  'form-urlencoded',
      }
  )
}

export function updatePwd (data) {
  return http.request(
      '/charge-app-server/app/payPwd/code/pwd',
      data,
      {
        Content_Type :  'form-urlencoded'
      }
  )
}

export function getRealTimeInformation (data) {
  return http.request(
      '/charge-app-server/app/charge/getRealTimeMessage',
      data,
      {
        method: 'get',
        Content_Type :  'form-urlencoded'
      }
  )
}
