import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import App from './App.vue'
import { plainAxiosInstance, securedAxiosInstance } from './axios'
import './registerServiceWorker'
import router from './router'
import store from './store'
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  securedAxiosInstance,
  plainAxiosInstance,
  render: h => h(App)
}).$mount('#app')
