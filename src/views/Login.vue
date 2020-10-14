<template>
  <div class="login-container">
    <div class='login-form'>
      <a-form :colon='false' v-bind="layout">
        <a-form-item :hasFeedback="hasUsernameFeedback" :validateStatus="username ? 'success' : 'error'">
          <template v-slot:label>
            <a-icon type="user" />
          </template>
          <a-input placeholder="请输入账号" v-model="username"></a-input>
        </a-form-item>
        <a-form-item :hasFeedback="hasPasswordFeedback" :validateStatus="password ? 'success' : 'error'">
          <template v-slot:label>
            <a-icon type="safety" />
          </template>
          <a-input-password placeholder="请输入密码" v-model="password"></a-input-password>
        </a-form-item>
      </a-form>
      <a-button :disabled="submitDisabled" :loading="loading" block type="primary" size='large' style="margin-top: 24px;" @click="handleLogin">登录</a-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router'
export default {
  name: 'Login',
  data(){
    return {
      layout: {
        labelCol: {span: 2},
        wrapperCol: {span: 20},
      },
      loading: false,
      username: '',
      password: '',
      hasUsernameFeedback: false,
      hasPasswordFeedback: false
    }
  },
  watch: {
    username(){
      if(!this.hasUsernameFeedback){
        this.hasUsernameFeedback = true
      }
    },
    password(){
      if(!this.hasPasswordFeedback){
        this.hasPasswordFeedback = true
      }
    }
  },
  computed: {
    submitDisabled(){
      return (!this.username.trim() || !this.password.trim())
    }
  },
  methods: {
    async handleLogin(){
      try {
        this.loading = true
        await this.login({username: this.username, password: this.password})
        this.$router.push('/home')
      }catch(e){
        console.log(e)
      }finally{
        this.loading = false
      }
    },
    ...mapActions('user', ['login', 'getInfo']),
    ...mapActions('permission', ['generateRoutes']),
  
  }
};
</script>

<style lang="scss">
.login-container {
  height: 100vh;
  background: url('../assets/img/login.png') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 50vw;
  .login-form {
    width: 400px;
    padding: 64px 24px;
    background-color: #fff;
    border-radius: 5px;
    .ant-form-item {
      padding-bottom: 16px;
      border-bottom: 1px solid #ecebeb;
      .ant-input {
        border: none;
        &:focus{
          outline: none;
          box-shadow: none;
        }
      }
    }
    .anticon {
      font-size: 18px;
      vertical-align: -2px;
    }
  }
}
</style>
