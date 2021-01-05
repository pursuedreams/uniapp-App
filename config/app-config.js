export default {
  appCode: 'wxa42c3982f3c5b049', //  wx5b008801bcce54da
  get apiURL () {
    const env = process.env.NODE_ENV
    if (env === 'development') {
      // return 'https://entry01.evhzzh.com/api'
      return 'https://charge-sf-test.evhzzh.com'
    } else if (env === 'test') {
      return 'https://charge-sf-test.evhzzh.com'
    }
    return 'https://charge-sf-test.evhzzh.com'
  },
  timeout: 60000,
  config: {
    accessKeyId: '6c946c4d6f19e940', // 根据项目固定
    secretKey: 'ohxxzR8x3ssekBJUPmCmFAZPsIYhVXsuAFSDYN7xSEw=', // 根据项目固定
    paySecret: '1fd0249383967237513517f05f90c1d3'
  },
  imgHost: 'https://zh-applet.oss-cn-hangzhou.aliyuncs.com/wx-nybao/',
  companyId: 1
}
