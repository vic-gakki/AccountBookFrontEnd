<script>
const defaultProps = {
  title: 'Basic Modal',
  centered: true,
  maskClosable: false,
  okText: '确定',
  cancelText: '取消'
}
export default {
  name: 'CustomDialog',
  props: ['content', 'dialogProps', "contentData"],
  data(){
    return {
      visible: true,
      confirmLoading: false,
      transformProps: Object.assign({}, defaultProps, this.dialogProps)
    }
  },
  methods: {
    handleCancel(){
      this.$destroy()
    },
    async handleOK(){
      this.confirmLoading = true
      try {
        let submit = this.$refs.content.submit
        if(submit instanceof Function){
          const res = await submit()
          this.handleCancel()
        }
      }catch(e){
        console.log(e)
      }finally {
        this.confirmLoading = false
      }
    }
  },
  render(h){
    return (
      <a-modal v-model={this.visible} props={this.transformProps} confirmLoading={this.confirmLoading} onCancel={this.handleCancel} onOk={this.handleOK}>
        {h(this.content, {ref: 'content', ...this.contentData})}
      </a-modal>
    )
  }
}
</script>

<style>

</style>