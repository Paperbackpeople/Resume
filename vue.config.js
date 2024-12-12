const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    // 在这里列出需要转译的依赖包名称
  ],
  publicPath: '/'
})
