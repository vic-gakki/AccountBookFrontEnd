<template>
  <a-layout class="page-container">
    <a-layout-header :style="headerLayout" />
    <a-layout :style="contentLayout">
      <a-layout-sider v-model="collapsed" collapsible breakpoint="sm">
        <a-menu
          theme="dark"
          mode="inline"
          :default-selected-keys="['4']"
          class="menu-container"
        >
          <a-menu-item key="1">
            <a-icon type="user" />
            <span class="nav-text">nav 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="video-camera" />
            <span class="nav-text">nav 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upload" />
            <span class="nav-text">nav 3</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="user" />
            <span class="nav-text">nav 4</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content>
        <div :style="contentStyle">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
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
        background: "#fff",
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
