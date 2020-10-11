<template>
  <div class="profile">
    <v-form :items="items" :url="$api.updatePass" ref="form" block_labelCol="4" block_wrapperCol="18" form-hideRequiredMark></v-form>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data(){
    return {
      items: [
        [
          'a-input-password',
          {
            props: {
              "field-name": "oldPassword",
              "item-label": "原始密码",
              placeholder: "请输入原始密码",
              "rule-required": true,
              block: true
            }
          }
        ],
        [
          'a-input-password',
          {
            props: {
              "field-name": "newPassword",
              "item-label": "修改密码",
              placeholder: "请输入修改后的密码",
              "rule-required": true,
              block: true
            }
          }
        ],
        [
          'a-input-password',
          {
            props: {
              "field-name": "confirmpassword",
              "item-label": "确认密码",
              placeholder: "请确认修改密码",
              "rule-required": true,
              block: true
            }
          }
        ]
      ]
    }
  },
  methods: {
    submit(){
      return this.$refs.form.handleSubmit()
    }
  }
}
</script>

<style>

</style>