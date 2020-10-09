import Vue from "vue";
import App from "./App.vue";
import antd from "ant-design-vue";
import router from "./router";
import "ant-design-vue/dist/antd.css";
import store from './store'
// import './permission'
import loading from './components/Loading'
import {httpInit} from './utils/http'

Vue.use(antd);
Vue.use(loading)
httpInit(Vue)

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
