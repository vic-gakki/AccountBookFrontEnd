import Vue from "vue";
import dialogModal from "./index.vue";
/*
 * props: 传给弹窗内打开的vue组件的props
 * option: 配置弹窗的props
 * */
const dialog = function({ content, dialogProps = {}, contentData = {} }) {
  let div = document.createElement("div");
  document.body.appendChild(div);
  let dialogConstructor = Vue.extend(dialogModal)
  const dialogInstance = new dialogConstructor({
    propsData: {
      content,
      dialogProps,
      contentData
    }
  })
  dialogInstance.$mount(div)
  // let $elem = dialog.$children[0];
  // if (this && Array.isArray(this.$children)) {
  //   this.$children.push($elem);
  //   $elem.$parent = this;
  // }
  // return $elem;
};
export const customDialog = {
  install(Vue) {
    Vue.prototype.$dialog = dialog;
  }
};
