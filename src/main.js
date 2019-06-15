// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import DragDialog from './directive/el-drag-dialog/index'
import Waves from './directive/waves/index'

if (process.env.NODE_ENV === 'development') {
  const ElementUI = require('element-ui')
  require('./assets/custom-theme/style.css')
  Vue.use(ElementUI)
}

Vue.directive('draggable', DragDialog)
Vue.directive('waves', Waves)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
