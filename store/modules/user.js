import wx from '@/libs/wx'
import appConfig from '@/config/app-config'
import { getUserInfo, getAccountInfo } from '@/api/account'
import Aes from '@/utils/secret.js'

const state = {
  HAS_LOGIN: wx.getStorageSync('hasLogin') || false,
  USER_TOKEN: wx.getStorageSync('token'),
  USER_INFO: wx.getStorageSync('userInfo') || {},
  ACCOUNT_INFO: wx.getStorageSync('accountInfo') || {},
}

const mutations = {
  SET_USER_INFO (state, payload = {}) {
    state.USER_INFO = payload
    wx.setStorageSync('userInfo', payload)
  },
  SET_ACCOUNT_INFO (state, payload = {}) {
    state.ACCOUNT_INFO = payload
    wx.setStorageSync('accountInfo', payload)
  },
  SET_TOKEN (state, payload = null) {
    state.USER_TOKEN = payload
    console.log(payload, "==============payloadpayloadpayloadpayloadpayloadpayloadpayloadpayload")
    wx.setStorageSync('token', payload)
  },
  SET_LOGIN_STATUS (state, payload = false) {
    state.HAS_LOGIN = payload
    wx.setStorageSync('hasLogin', payload)
  },
  LOGIN_OUT (state) {
    state.HAS_LOGIN = false
    state.USER_TOKEN = undefined
    state.USER_INFO = {}
    state.ACCOUNT_INFO = {}
    wx.clearStorageSync()
  },
}

const actions = {
  async doGetUserInfo({ commit, dispatch }) {
    console.log(appConfig.companyId, "cxxxxxxxxxxxx=============doGetUserInfo")
    // try {
    //   const response = await getUserInfo({
    //     companyId: appConfig.companyId
    //   })
    //   if (response.data) {
    //     commit('SET_USER_INFO', response.data)
        commit('SET_LOGIN_STATUS', true)
      // }
    // } catch ( error ) {
    //   throw new Error(error)
    // }
  },
  async doGetAccountInfo({ state, commit }) {
    try {
      // const response = await getAccountInfo({
      //   requset: {
      //     companyId: appConfig.companyId,
      //     userId: state.USER_INFO ? state.USER_INFO.id : ''
      //   }
      // })
      const response = await getAccountInfo()
      if (response.data) {
        let decryptres = JSON.parse(Aes.Decrypt(response.data))
        console.log(decryptres, "=====================decryptresdecryptresdecryptres")
        commit('SET_ACCOUNT_INFO', decryptres)
      }
    } catch ( error ) {
      throw new Error(error)
    }
  },
  doLoginOut ({ state, commit }) {
    // 请求
    console.log('LOGIN_OUT')
    commit('LOGIN_OUT')
  }
}

export default {
  state: state,
  mutations: mutations,
  actions: actions
}
