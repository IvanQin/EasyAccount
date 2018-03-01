// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Cookies from 'js-cookie'

Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:3000';
Vue.prototype.$cookies = Cookies;

// Object.prototype.isEmpty = function(){
//     for (let prop in this){
//         if (this.hasOwnProperty(prop)) return false;
//     }
//     return true;
// };

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
