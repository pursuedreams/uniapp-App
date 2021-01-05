import wx from '@/libs/wx'
const belongedType = { 1: '公司车辆', 2: '员工车辆' }
const payType = { 1: '公司月结', 2: '个人支付' }
const extraCar = {
    label: '其他',
    carNo: '其他车辆',
    payTypeName: '个人支付',
    belongedTypeName: '私人车辆',
    id: 'personal'
}

const state = {
    MY_CARS_LIST: [extraCar],
    GUN_DETAIL: {},
    SELECTED_CAR_INFO: wx.getStorageSync('selectedCar') || undefined,
}

const mutations = {
    SET_CARS_LIST(state, payload = []) {
        state.MY_CARS_LIST = [extraCar]
        const _playload = payload.map(item => {
            console.log(item, "===================车辆列表")
            item.label = item.carNo
            item['belongedTypeName'] = belongedType[item.belongedType]
            item['payTypeName'] = payType[item.payType]
            return item
        });
        if (_playload.length > 0) {
            state.MY_CARS_LIST.splice(0, 0, ..._playload)
        }
    },
    SET_SELECTED_CAR(state, payload) {
        state.SELECTED_CAR_INFO = payload
        wx.setStorageSync('selectedCar', payload)
    },
    SET_GUN_DETAIL(state, payload) {
        state.GUN_DETAIL = payload || {}
    },
    RESET_SELECTED_CAR(state) {
        state.MY_CARS_LIST = [extraCar]
        state.SELECTED_CAR_INFO = undefined
    }
}

const actions = {
}

export default {
    state: state,
    mutations: mutations,
    actions: actions
}
