const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': '@/components/content',
        'common': '@/components/common',
        'assets': '@/assets', 
        'views': '@/views',
        'layout':'@/layout',
        'mixin' : '@/mixin',
        'utils' : '@/utils',
        'player' : '@/player',
        'api':'@/api'
      }
    }
  }, 
})
