const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Bill账单管理系统'
        return args
      })
  },
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',

  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://img.xjh.me',
  //       secure: true,
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
})