<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <a-button @click='handleClick'>click</a-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    handleClick(){
      this.$loading.open()
      setTimeout(() => {
        this.$loading.close()
      }, 4000)
    }
  }
}
</script>
