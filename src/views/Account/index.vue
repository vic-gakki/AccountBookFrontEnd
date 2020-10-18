<template>
  <a-tabs v-model="activeKey">
    <a-tab-pane key="1" tab="我的账单">
      <my-account v-if="activeKey == 1"></my-account>
    </a-tab-pane>
    <a-tab-pane key="2" tab="与我相关">
      <involve-me v-if="activeKey == 2"></involve-me>
    </a-tab-pane>
    <a-tab-pane key="3" tab="账单统计">
      <account-statistics v-if="activeKey == 3"></account-statistics>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import MyAccount from './MyAccount'
import InvolveMe from './InvolveMe'
import AccountStatistics from './AccountStatistics'
export default {
  name: 'Account',
  components: {
    MyAccount,
    InvolveMe,
    AccountStatistics
  },
  data(){
    return {
      activeKey: '1'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  margin: 8px 0;
}
</style>
