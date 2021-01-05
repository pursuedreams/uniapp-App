import http from '@/libs/request'

export function queryOrdersList (data) {
  return http.request(
      // '/saasOperation/queryAppPowerOrderList',
      '/charge-app-server/app/powerorder/orderList',
      data,
      {
        method: 'get',
        // action: 'queryAppPowerOrderList'
      }
  )
}

// 订单详情
export function queryOrdersListDetails (data) {
  console.log(data, "queryOrdersListDetails==========11111111111111111=================")
  return http.request(
      'charge-app-server/app/powerorder/orderDetails/' + data.guid,
      {},
      {
        method: 'GET',
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
  )
}

// 订单详情结算明细
export function queryPayDetail (data) {
  return http.request(
      '/charge-app-server/app/powerorder/orderFeeDetail/' + data.flowNo,
      {},
      {
        method: 'GET',
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
  )
}

// 后付费订单支付
export function toPay (data) {
  return http.request(
      '/charge-app-server/app/charge/settleToFinishedOrder',
      data,
      {
        Content_Type :  'form-urlencoded'
      }
  )
}
