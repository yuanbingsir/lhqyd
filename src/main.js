import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'lib-flexible'
import 'vant/lib/index.css';
import '@/assets/css/global.css'
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$http = axios
Vue.use(Vant);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
