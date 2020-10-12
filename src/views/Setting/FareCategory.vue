<template>
  <div class="fare-category-form-container">
    <a-form-item label="类别" :labelCol="{span: 3}" :wrapperCol="{span: 16}">
      <a-input placeholder="请输入费用类别" v-model="categoryName"></a-input>
    </a-form-item>
  </div>
</template>

<script>
export default {
  name: "FareCategoryForm",
  props: {
    id: {
      type: [String, Number]
    },
    name: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      categoryName: this.name
    }
  },
  created(){
    let callBack = this.submit.bind(this)
    this.$bus.$on('VFormsubmit', callBack)
    this.$once('hook:beforeDestroy', () => {
      this.$bus.$off("VFormsubmit", callBack)
    })
  },
  methods: {
    async submit(){
      await this.$api.fareCategoryPost({id: this.id, name: this.categoryName})
      this.$message.success({
        content: '操作成功',
        duration: 1
      })
    }
  }
}
</script>

<style>

</style>