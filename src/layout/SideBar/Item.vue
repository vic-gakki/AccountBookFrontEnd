<template>
  <div class="side-item-container">
    <a-icon :type="icon" />
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    icon: {
      type: String,
      default: 'tag'
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
