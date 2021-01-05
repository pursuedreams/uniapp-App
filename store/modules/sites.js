const proccessFilter = (arr, type) => {
  let total = 0
  let active = 0
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    arr.map(item => {
      total += (item.gunVoList ? item.gunVoList.length : 0)
      item.gunVoList.map(g => {
        g.status === 1 && active++
      })
    })
  }
  return {type, active, total}
}

const state = {
  SITE_LIST: []
}

const mutations = {
  SET_SITE_LIST (state, payload = []) {
    let list = []
    if (payload && payload.length > 0) {
      list = payload.map(item => {
        let siteItems = []
        // item.distance = item.distance ? (parseFloat(item.distance) / 1000).toFixed(2) : 0
        siteItems.push(proccessFilter(item.dCChargePileVO, 'fast'))
        siteItems.push(proccessFilter(item.aCGChargePileVO, 'slow'))
        item.siteItems = siteItems
        return item
      })
    }
    state.SITE_LIST = list || []
  }
}

const actions = {
}

export default {
  state: state,
  mutations: mutations,
  actions: actions
}
