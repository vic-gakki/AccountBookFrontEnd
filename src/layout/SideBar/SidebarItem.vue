<template>
  <div v-if="!route.hidden"></div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    route: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
