<script>
    const drawerSize = {
        small: "500px",
        medium: "700px",
        large: "900px",
        huge: "1050px"
    };
    const dialogSize = {
        super_small:"560px",
        small: "680px",
        medium: "880px",
        large: "1080px",
        huge: "1280px",
        'x-alert': '362px',
        'x-normal': '560px',
        'x-col2': '880px',
    };
    const height = {
        super_small:'222px',
        small: "382px",
        medium: "494px",
        large: "608px",
        huge: "720px",
        'x-alert': '120px',
        'x-normal-max': '490px',
        'x-col2-max': '600px',
    };
    import {filterProps, urlPackingGet} from "@/utils";
    export default {
        name: "VEditButton",
        components: {},
        props: {
            table_id:{ //对应的CcTable组件id，对于一个页面有2个的时候，需要配置
                type:String,
                default:'VTable'
            },
            form_id:{//对应的CcForm组件id，对于一个页面有2个的时候，需要配置
                type:String,
                default:'VForm'
            },
            is_right:{//弹窗是否靠右
                type:Boolean,
                default:false
            },
            buttonAlign: {
                type: String,
                default: 'right'
            },
            disabled:{
                type:Boolean,
                default:false
            },
            mask:{
                type:Boolean,
                default:true
            },
            icon:{    //是否button  新增和编辑的样式不一样
                type:String,
                default:''
            },
            buttonLike: {
                type: Boolean,
                default: false,
            },
            width:{    //是否button  新增和编辑的样式不一样
                type:Number,
                default:720
            },
            size:{
                type:String,
                default:''
            },
            bodyStyle:{
                type:Object
            },
            url:{
                type:[String,Function]
            },
            params: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                ModalText: 'Content of the modal',
                visible: false,
                confirmLoading: false,
                detail: null
            }
        },
        methods: {
            async onClick() {
                if(this.url){
                    let urlPacking = urlPackingGet(this.url);
                    this.detail = await urlPacking({...this.params ,noloading:true,})
                }
                if(this.$listeners.onClick){
                    this.$listeners.onClick((visible)=>{
                        this.visible = visible;
                    });
                }else{
                    this.visible = true
                }
            },
            onClose() {
                if(this.$listeners.close){
                    this.$listeners.close((visible)=>{
                        this.visible = visible;
                    });
                }else{
                    this.visible = false
                }

            },
            onSubmit(){
                this.confirmLoading = true;
                this.$bus.$emit(this.form_id+'submit').then(()=>{
                    this.confirmLoading = false;
                    this.onClose();
                    this.$bus.$emit(this.table_id+'reload',{type:'edit'});
                }).catch(()=>{
                    this.confirmLoading = false;
                })

            }

        },
        render(h) {
            let btn_props = Object.assign({
                type:'primary',
            },filterProps.call(this,'btn-'));

            let pop = <div/>;
            let popContentVnode = this.$slots.popContent
            if(this.$scopedSlots.popContent && this.$scopedSlots.popContent instanceof Function){
                popContentVnode = this.$scopedSlots.popContent({data:this.detail})
            }
            let popTitleVnode = this.$slots.popTitle
            if(this.$scopedSlots.popTitle && this.$scopedSlots.popTitle instanceof Function){
                popTitleVnode = this.$scopedSlots.popTitle({data:this.detail})
            }
            if(this.is_right){
                let pop_props = Object.assign({
                    visible:this.visible,
                    width:drawerSize[this.size]||this.width,
                    keyboard:false,
                    maskClosable:false,
                    confirmLoading:this.confirmLoading,
                    destroyOnClose:true,
                    mask:this.mask,
                    bodyStyle: {paddingBottom: '75px'},
                },filterProps.call(this,'pop-'));
                let bottom = <div  class="bottom" style={ {textAlign: this.buttonAlign} } >
                    <a-button
                        style={{marginRight: '8px'}}
                        onclick={this.onClose} >
                        取消
                    </a-button>
                    <a-button onclick={this.onSubmit} type="primary" loading={this.confirmLoading}>提交</a-button>
                </div>;
                if (!popTitleVnode) {
                    pop_props = {
                        ...pop_props,
                        title: this.$slots.default[0].text
                    }
                }
                pop = <a-drawer props={pop_props} onClose={this.onClose}>
                    <div slot='title'>  {popTitleVnode}</div>
                    <div className="content">{popContentVnode}</div>
                    {bottom}
                </a-drawer>;
            }else{
                let pop_props_items={
                    visible:this.visible,
                    destroyOnClose:true,
                    width:dialogSize[this.size]||this.width,
                    bodyStyle:{height:height[this.size]||'auto',
                        'overflow-y': 'auto',
                        'max-height':height[this.size + '-max']||'unset',
                        ...this.bodyStyle,
                    },
                    keyboard:false,
                    maskClosable:false,
                    confirmLoading:this.confirmLoading};
                if (!popTitleVnode){
                    pop_props_items={
                        ...pop_props_items,
                        title:this.$slots.default[0].text,
                    }
                }
                let pop_props = Object.assign({
                    ...pop_props_items
                },filterProps.call(this,'pop-'));
                pop = <a-modal props={pop_props} on={{ok:this.onSubmit,cancel:this.onClose}}>
                    <div slot='title'>  {popTitleVnode}</div>
                    {this.$slots.footer ? <div slot='footer'>  {this.$slots.footer}</div> : ''}
                    {popContentVnode}
                </a-modal>;
            }
            return (this.buttonLike ?
                    <span class="btn">
                    <a-button icon={this.icon} props={btn_props} on={{click: this.onClick}} disabled={this.disabled}>
                    {this.$slots.default}
                    </a-button>
                        {pop}
            </span>
                    :<span class="btn">
                    <a props={btn_props} on={{click: this.onClick}}>
                {this.$slots.default}
            </a>
                        {pop}
            </span>
            )
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
        z-index: 2;
    }
</style>
