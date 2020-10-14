import Vue from 'vue'
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
export function filterProps(prefix, attrs) {
  attrs = attrs ? attrs : this.$attrs;
  return Object.keys(attrs)
    .filter(key => {
      return key.indexOf(prefix) >= 0;
    })
    .reduce((acc, cur) => {
      acc[cur.substring(prefix.length)] = attrs[cur];
      return acc;
    }, {});
}
export function urlPackingGet(url) {
  if (typeof url == "function") {
    return url;
  }
  return (params, conf) => axios.post(url, params, conf);
}
export function isComponent(component, name) {
  let component_name = getComponent(component).name;
  return component_name.indexOf(name) >= 0;
}
function getComponent(component) {
  if (typeof component == "string") {
    let component_name = component;
    if (component_name.indexOf("-") >= 0) {
      component_name = component_name
        .split("-")
        .map(value => {
          return value.substring(0, 1).toUpperCase() + value.substring(1);
        })
        .join("");
    }
    let vueVueConstructor = Vue.component(component_name);
    component = vueVueConstructor.options;
  }
  return component;
}
export function getComponentAttrs(component, props) {
  let s = getComponent(component);
  let keys = Reflect.ownKeys(props)
  let propKeys = Reflect.ownKeys(s.props)
  let attrs = {};
  for (let key of keys) {
    if (!propKeys.includes(key)) {
      attrs[key] = props[key];
    }
  }
  return attrs;
}
export function slotcontent() {
  const slots = Object.keys(this.$slots)
    .reduce((arr, key) => arr.concat(this.$slots[key]), [])
    .map(vnode => {
      vnode.context = this._self;
      return vnode;
    });
  return slots;
}
export function toString(arg){
  return Object.prototype.toString.call(arg).slice(8, -1)
}