<template>
  <div class="nav-container">
    <div class="left-logo-container">
      <img class="logo" :src="logo" alt="">
      <h1 class="platform">Account Book</h1>
    </div>
    <div class="right-user-container">
      <a-avatar class="avatar" icon="user" />
      <a-dropdown>
        <span class="ant-dropdown-link name-dropdown">
           {{name}} <a-icon type="down" />
        </span>
        <a-menu slot="overlay">
          <a-menu-item>
            <span @click="handleProfile"><a-icon type="profile" /> 修改密码</span>
          </a-menu-item>
          <a-menu-item>
            <span @click="handleLogout"><a-icon type="import"/> 退出登录</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Profile from './Profile'
export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['avatar', 'name']),
  },
  data(){
    return {
      logo: require('@/assets/img/fave.png')
    }
  },
  methods: {
    ...mapActions('user', ['logout']),
    handleLogout(){
      this.logout().then(() => {
        this.$router.push('/login')
      })
    },
    handleProfile(){
      this.$dialog({
        content: Profile,
        dialogProps: {title: '修改密码'},
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-container {
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  .left-logo-container {
    display: flex;
    align-items: center;
    .platform {
      color: #fff;
      margin: 0 0 0 8px;
    }
    .logo {
      object-fit: cover;
      width: 40px;
      height: 40px;
    }
  }
  .right-user-container {
    font-size: 18px;
    .avatar {
      margin-right: 5px;
    }
    .name-dropdown {
      cursor: pointer;
    } 
  }
}
</style>
