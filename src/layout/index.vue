<template>
  <a-layout class="page-container">
    <a-layout-header :style="headerLayout">
      <nav-bar></nav-bar>
    </a-layout-header>
    <a-layout :style="contentLayout">
      <a-layout-sider v-model="collapsed" collapsible breakpoint="sm">
        <side-bar></side-bar>
      </a-layout-sider>
      <a-layout-content>
        <div id="contentContainer" :style="contentStyle">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SideBar from "./SideBar";
import NavBar from './NavBar'
export default {
  name: "Layout",
  components: {
    SideBar,
    NavBar,
  },
  computed: {
    contentLayout() {
      return {
        height: "calc(100vh - 64px)",
      };
    },
    headerLayout() {
      return {
        background: "#001529",
        padding: 0,
      };
    },
    contentStyle() {
      return {
        padding: "24px",
        background: "#f0f2f5",
        height: "100%",
        overflow: "auto",
      };
    },
  },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style>
.page-container .menu-container .ant-menu-item {
  margin: 0;
}
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
