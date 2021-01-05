import wx from './wx'

export function waitPosition () {
  return new Promise(function (resolve, reject) {
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        resolve(res)
      },
      fail (error) {
        reject(error)
      }
    })
  })
}

export function getWxSetting (type) {
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success (res) {
        if (!res.authSetting[ `${type}` ]) {
          wx.authorize({
            scope: `${type}`,
            success (res) {
              resolve(res)
            },
            fail (error) {
              reject(error)
            }
          })
        } else {
          resolve(true)
        }
      }
    })
  })
}

export const goWxSetting = (type) => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success (res) {
        if (res.authSetting[ `${type}` ]) {
          resolve(true)
        } else {
          reject(new Error('reject'))
        }
      }
    })
  })
}
