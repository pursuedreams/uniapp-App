import http from '@/libs/request'

export function queryCarInfoByUserId(data) {
    return http.request(
        '/saasOperation/queryCarInfoByUserId',
        { data: data },
        {
            action: 'queryCarInfoByUserId'
        }
    )
}

export async function queryCarList(data) {
    return http.request(
        '/charge-app-server/app/homepage/carList',
        data,
        {
            method: "GET"
        }
    )
}