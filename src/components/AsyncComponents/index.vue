<template>
  <keep-alive v-if="keepAlive">
    <component :is="AsyncComponent" v-bind="$attrs" v-on="$listeners" />
  </keep-alive>
  <component v-else :is="AsyncComponent" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import { asyncLoader } from "./async-loader";
export default {
  name: "AsyncComponents",
  inheritAttrs: false,
  props: {
    // 是否保持缓存
    keepAlive: {
      type: Boolean,
      require: false,
      default: false
    },
    // 需要动态加载的组件,格式为 component: ()=>import("@/xxx/xxx.vue")
    component: {
      type: Function,
      require: true,
      default: null
    },
    // 延迟加载时间
    delay: {
      type: Number,
      default: 0
    },
    // 超时警告时间
    timeout: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return {
      AsyncComponent: null
    };
  },
  watch: {
    component: function(val) {
      this.componentLoader(val);
    }
  },
  created() {
    // 构建异步组件 - 懒加载实现
    this.componentLoader(this.component);
  },
  methods: {
    forceUpdate() {
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    componentLoader(component) {
      this.AsyncComponent = asyncLoader(component);
      this.forceUpdate();
    }
  }
};
</script>

<style scoped></style>
