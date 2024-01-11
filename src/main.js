import store from '@/store'
import vClickOutside from 'v-click-outside'
import Vue from 'vue'
import App from './App.vue'
import './index.css'

Vue.use(vClickOutside)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  store
}).$mount('#app')
