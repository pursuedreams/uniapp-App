import http from '@/libs/request'

export function queryAppStationList(data) {
    console.log(data, "=======================data")
    return http.request(
        '/charge-app-server/app/homepage/homepage/xin',
        data,
        {
            // no_header_common: true,
            method: 'GET',
        }
    )
}

export function queryAppStationDetail(data) {
    console.log(data, "=======================getRateInfo")
    return http.request(
        '/charge-app-server/app/homepage/stationInfo/xin',
        data,
        {
            Content_Type: 'form-urlencoded',
            method: 'GET',
        }
    )
}

export function queryAppFastOrSlow(data) {
    return http.request(
        '/charge-app-server/app/homepage/fastOrSlow',
        data,
        {
            Content_Type: 'form-urlencoded',
            method: 'GET',
        }
    )
}


export function queryRateDetail(data) {
    return http.request(
        '/saasManager/queryRateDetail',
        { data: data },
        {
            action: 'queryRateDetail',
        }
    )
}

// 枪口状态
export function checkPortStatus(data) {
    return http.request(
        '/charge-app-server/app/charge/checkPortStatus',
        data,
        {
            Content_Type: 'form-urlencoded',
            method: 'GET',
        }
    )
}