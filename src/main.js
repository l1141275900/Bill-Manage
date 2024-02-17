import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import VueRouter from 'vue-router'
import router from './router/index.js'
// import 'echarts'
import ECharts from 'vue-echarts'
import store from './store'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.component('v-chart', ECharts)
Vue.prototype.$axios = axios
Vue.config.devtools = true
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store:store,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  }
}).$mount('#app')