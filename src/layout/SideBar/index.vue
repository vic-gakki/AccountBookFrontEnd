<template>
  <a-menu
    theme="dark"
    mode="inline"
    :default-selected-keys="activeMenu"
    class="menu-container"
  >
    <a-menu-item key="1">
      <a-icon type="user" />
      <span class="nav-text">nav 1</span>
    </a-menu-item>
    <sidebar-item
      v-for="route in permission_routes.children"
      :key="route.path"
      :route="route"
      base-path="/"
    />
  </a-menu>
</template>

<script>
import SidebarItem from "./SidebarItem";
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  components: {
    SidebarItem,
  },
  computed: {
    ...mapGetters(["permission_routes"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
};
</script>

<style></style>
