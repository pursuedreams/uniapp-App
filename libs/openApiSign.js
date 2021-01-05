/*
 * @Description:
 * @Autor: Waker
 * @Date: 2020-07-17 14:46:56
 * @LastEditors: Waker
 * @LastEditTime: 2020-09-08 14:45:54
 */
// import { enc, HmacSHA256 } from 'crypto-js'; // https://github.com/rollup/rollup-plugin-commonjs/issues/266
// const { Base64 } = enc;

/* eslint-disable */

import HmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import appConfig from '../config/app-config'

const jsonStringify = (val) => (val instanceof Object ? JSON.stringify(val) : val)

const signatureConfig = {
  signatureMethod: 'HMAC-SHA256',
  signatureVersion: '1.0',
}

const encAndRep = (key) => {
  if (key === '' || key === undefined || key === null) {
    return ''
  }
  return encodeURIComponent(key)
      .replace(/\+/g, '%20')
      .replace(/\*/g, '%2A')
      // .replace("%7E", "~")
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/!/g, '%21')
      .replace(/\)/g, '%29')
}

/**
 * 签名算法
 */
const signatureIt = (jsonObject, method) => {
  let meth = method
  let str
  let arr = []

  for (let key in jsonObject) {
    if (key === 'access_token' || key === 'data') { continue }
    if ({}.hasOwnProperty.call(jsonObject, key)) {
      arr.push(encAndRep(key) + '=' + encAndRep(jsonStringify(jsonObject[key])))
    }
  }
  let str2 = arr.sort().join('&')
  str = meth + '&' + '%2F' + '&' + encAndRep(str2).replace(/\~/g, '%7E')
  str = Base64.stringify(HmacSHA256(str, appConfig.config.secretKey + '&'))
  return str
}

function generate (opt, httpMethod) {
  const param = {
    ...signatureConfig,
    accessKeyId: appConfig.config.accessKeyId,
    timestamp: +new Date(),
  }
  for (let key in opt) {
    if (Object.prototype.hasOwnProperty.call(opt, key)) {
      if (opt[key] !== undefined && opt[key] !== null) {
        param[key] = opt[key]
      }
    }
  }
  param.signKey = JSON.stringify(opt.data)
  param.signature = signatureIt(param, httpMethod)
  return param
}

function stringify (param) {
  return Object.keys(param)
      .map((key) => {
        return `${key}=${encodeURIComponent(jsonStringify(param[key]))}`
      }).join('&')
}

export default {
  signatureIt,
  generate,
  stringify,
}
