<template>
  <div class="search-form-btn-containr">
    <a-button type="primary" style="padding: 0px 16px" @click="handleSearch"
      >搜索</a-button
    >
    <a-button style="padding: 0px 16px;margin-left:8px" @click="handleReset"
      >重置</a-button
    >
    <span class="toggle-fold" v-if="shouldShow" @click="toggleFold"
      >{{ isFold ? "展开" : "收起" }}<a-icon :type="isFold ? 'down' : 'up'"
    /></span>
  </div>
</template>

<script>
export default {
  name: "SearchFormBtnGroup",
  props: {
    shouldShow: Boolean
  },
  data() {
    return {
      isFold: true
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search");
    },
    handleReset() {
      this.$emit("reset");
    },
    toggleFold() {
      this.isFold = !this.isFold;
      this.$emit("toggleFold", this.isFold);
    }
  }
};
</script>

<style scoped>
.toggle-fold {
  color: #36b9c1;
  cursor: pointer;
  margin-left: 8px;
}
</style>
