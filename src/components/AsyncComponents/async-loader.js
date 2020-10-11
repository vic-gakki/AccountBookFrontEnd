function getLoadingComponent(text) {
  return {
    template: `<div style="width: 100%; height: 100%; display: table;"><div style="display: table-cell; vertical-align: middle; text-align: center;">${text}</div></div>`
  };
}
/*
 * component: ()=>import("@/xxx/xxx.vue")
 * */
export const asyncLoader = (component, delay, timeout) => {
  if (typeof component !== "function") return null;
  return () => ({
    component: component(),
    loading: getLoadingComponent("加载中..."),
    error: getLoadingComponent("组件加载失败!"),
    delay: delay || 0,
    timeout: timeout || 10000
  });
};
