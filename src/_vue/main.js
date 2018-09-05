import Vue from 'vue'
import store from '~/../_tracker/store'
import router from '~/../_tracker/router'
import App from '~/../_tracker/components/App'

import '~/../_tracker/plugins'
import '~/../_tracker/components'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  ...App
})