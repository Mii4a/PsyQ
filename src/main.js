import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import {
  securedAxiosInstance,
  plainAxiosInstance
} from './axios'

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  securedAxiosInstance,
  plainAxiosInstance,
  render: h => h(App)
}).$mount('#app')
