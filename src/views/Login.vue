<template>
  <div>Login
    <a-button @click="onError">
      Error
    </a-button>
  </div>
</template>

<script>
export default {
  methods: {
    onError(){
      this.$error({
        title: 'This is an error message',
        content: 'some messages...some messages...',
        onCancel(){
          console.log('cancel')
        },
        onOk(){
          console.log('ok')
        }
      });
    }
  }
};
</script>

<style></style>
