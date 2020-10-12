<template>
  <a-config-provider :locale="zh_CN">
    <router-view></router-view>
  </a-config-provider>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
document.title = 'Account Book'
export default {
  data() {
    return {
      zh_CN,
    };
  },
};
</script>

<style></style>
