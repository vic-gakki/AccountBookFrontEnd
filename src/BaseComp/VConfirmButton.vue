<script>
    import {filterProps, urlPackingGet} from "@/utils";
    import {message} from "ant-design-vue";
    export default {
        name: "VConfirmButton",
        props: {
            data: Object, //默认取data.id，
            table_id:{
                type:String,
                default:'VTable'
            },
            type: {
                type: String,
                default: '删除'
            },
            name: [String, Number],
            label: String,
            url:{//删除url地址
                type:[String,Function],
                default:''
            },
            styleType:{//按钮显示样式  button样式  text 样式
                type:[String],
                default:'text'
            },
        },
        computed:{
            title(){
                return `确认${this.type}${this.label}：${this.name}？`
            }
        },
        methods: {
            onClick() {
                this.$confirm({
                    title: '提示',
                    content: `${this.title}`,
                    cancelText: "取消",
                    okText: "确定",
                    onOk:()=>{
                        return new Promise((resolve, reject) => {
                            let urlPacking = urlPackingGet(this.url)
                            urlPacking({...this.data,noloading:true}).then((res)=>{
                                message.success(this.type + '成功');
                                this.$emit("submitSuccess", res)
                                this.$bus.$emit(this.table_id+'reload',{type:'update'});
                                resolve();
                            }).catch(()=>{
                                resolve();
                            })
                        }).catch((e) => console.log('Oops errors!',e));
                    },
                    onCancel() {},
                });
            }

        },
        render(h) {
            let btn_props = Object.assign({
                type:'danger',
            },filterProps.call(this,'btn-'));

            switch (this.styleType) {
                case 'text':
                    return (<span class="btn">
                        <a props={btn_props} on={{click: this.onClick}}>
            {this.$slots.default}
        </a></span>

        )
        default:
            return (
                <span class="btn" props={btn_props} on={{click: this.onClick}} >
            {this.$slots.default}
        </span>

        )
        }
        }
    }
</script>

<style scoped>
    .bottom{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #e9e9e9;
        padding: 10px 16px;
        background: #fff;
        text-align: right;

    }
	.btn {
		cursor: pointer;
	}
</style>
