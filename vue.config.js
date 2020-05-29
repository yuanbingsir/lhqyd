
module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    configureWebpack: {
      externals: {
       'AMap': 'AMap' // 高德地图配置
      }
     },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
      open: true,
      proxy: {// 配置跨域
        '/api': {
          target: 'http://pub.sxhcd.xyz', // 这里后台的地址模拟的;应该填写你们真实的后台接口
          ws: true,
          changOrigin: true, // 允许跨域
          pathRewrite: {
            '^/api': '/'// 请求的时候使用这个api就可以
          }
        }
      }
    }
  
  }
  