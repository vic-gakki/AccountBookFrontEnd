import customAsyncComponent from "./index.vue";
export const asyncComponent = {
  install(Vue) {
    Vue.component("async-components", customAsyncComponent);
  }
};
