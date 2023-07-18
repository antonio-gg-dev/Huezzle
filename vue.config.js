const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  pwa: {
    name: 'Huezzle',
    themeColor: '#2ecc71',
    manifestOptions: {
      display: 'fullscreen'
    }
  },
  devServer: {
    https: true
  }
})
