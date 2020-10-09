<template>
  <div class='loading-container' v-show="visible">
    <div class='loading-wrapper'>
      <a-icon type="loading-3-quarters" :style="{fontSize: '18px'}" spin/>
      <span>努力加载中...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data(){
    return {
      visible: false
    }
  },
  methods: {
    open(){
      this.visible = true
    },
    close(){
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading-wrapper {
      display: flex;
      flex-direction: column;
      height: 50px;
      justify-content: space-around;
      color: #159f15;
    }
  }
</style>