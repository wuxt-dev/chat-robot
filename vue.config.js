const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { resolve } = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.plugins.push(
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    )
    config.resolve.alias = {
      '@': resolve(__dirname, 'src')
    }
  },
  devServer: {
    https: false,
    hot: true,
    proxy: {
      '/api': {
        // target: 'http://192.168.2.102:9000',
        target: 'http://127.0.0.1:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
