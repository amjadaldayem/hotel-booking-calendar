import store from '@/store'
import Vue from 'vue'
import App from './App.vue'
import './index.css'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  store
}).$mount('#app')
