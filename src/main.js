import Vue from "vue";
import App from "./App.vue";
import antd from "ant-design-vue";
import router from "./router";
import "ant-design-vue/dist/antd.css";
import './assets/css/index.css'
import store from './store'
import './permission'
import loading from './components/Loading'
import {customDialog} from './components/CustomDialog'
import {httpInit} from './utils/http'
import EventBus from '@/utils/bus'
import {registComponent} from '@/BaseComp'
import * as api from '@/api'

Vue.use(antd);
Vue.use(loading)
Vue.use(customDialog)
Vue.use(EventBus)
httpInit(Vue)
registComponent(Vue)
Vue.prototype.$api = api


Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
