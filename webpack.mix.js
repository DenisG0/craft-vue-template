const path = require('path')
const webpack = require('webpack')
const mix = require('laravel-mix')
const axios = require('axios')

mix.config.vue.esModule = true

mix.setPublicPath('html')
mix
  .js('src/js/app.js', 'html/js')
  .js('src/_vue/main.js', 'html/js/vue.js')
  .sass('src/scss/style.scss', 'html/css')

  .sourceMaps()
  .disableNotifications()

if (mix.inProduction()) {
  mix.version()
}

mix.webpackConfig({
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '~': path.join(__dirname, './src/js')
    }
  },
  output: {
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: mix.config.hmr ? '//localhost:8080' : '/'
  }
})