import Vue from 'vue'
import App from './app.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
})
