<template>
  <component :is="type" v-bind="transformProps(to)">
    <slot></slot>
  </component>
</template>

<script>
import { isExternal } from "@/utils";
export default {
  name: "SideLink",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    isExternal() {
      return isExternal(this.to);
    },
    type() {
      return this.isExternal ? "a" : "router-link";
    },
  },
  methods: {
    transformProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener",
        };
      }
      return { to };
    },
  },
};
</script>

<style></style>
