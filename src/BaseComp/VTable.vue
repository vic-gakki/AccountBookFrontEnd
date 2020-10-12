
<script>
    import {slotcontent, urlPackingGet} from "@/utils";
    import Axios from 'axios'
    export default {
        name: "VTable",
        props:{
            table_id:{ //对应的CcTable组件id，对于一个页面有2个的时候，需要配置
                type:String,
                default:'VTable',
            },
            dataList:{//如果没有传url，就使用datalist作为数据列表
                default:()=>{
                    return []
                },
            },
            defaultParams:{},
            url:null,//配置url，返回列表
            page_request:{
              type: Boolean,
              default:true
            },// 点击分页按钮，是否重新请求

        },
        watch:{
            dataList:{
                handler(e){
                    if(!this.url){
                        this.data=e
                    }
                },
                immediate:true,
                deep:true
            }
        },
        data(){
            return {
                data:this.dataList,
                cpagination:this.$attrs.pagination=== false?false:Object.assign({
                    showTotal: total => `共 ${total} 条 `,
                    showSizeChanger:true,
                    showQuickJumper: true,
                    current:1,
                    total:0,
                },this.$attrs.pagination),
                loading:false,
                params: {},
                ajaxsource: null
            }
        },
        created(){
            this.loadData({type:'created'});
            this.$bus.$on(this.table_id+'reload',(rs)=>{
                this.loadData(rs)
            });
        },
        beforeDestroy(){
            this.$bus.$off(this.table_id+'reload');
        },
        mounted(){

        },
        methods:{
            loadData(reloadevent = {}){
                if(!this.url){
                    return;
                }
                if(!this.page_request && reloadevent.type == 'page'){
                    return;
                }
                this.loading = true;
                if(reloadevent.type == 'page'){
                    this.cpagination.current = reloadevent.data.current;
                    this.params.pageSize=reloadevent.data.pageSize;
                }
                if(reloadevent.type == 'search'){
                    this.cpagination.current = 1;
                    let {pageSize} = this.params;
                    this.params = {...reloadevent.data, pageSize};
                }
                this.params.page = this.cpagination.current - 1
                if(reloadevent.type == 'reset'){
                    this.params = {};
                }
                this.params = {...this.defaultParams, ...this.params};
                this.fetchData(this.params, reloadevent)
            },
            async fetchData(params, reloadevent){
                 if(this.ajaxsource){
                    this.ajaxsource.cancel('Operation canceled by the user.');
                }
                const CancelToken = Axios.CancelToken;
                const ajaxsource = CancelToken.source();
                this.ajaxsource = ajaxsource;
                const urlPacking = urlPackingGet(this.url)
                const res = await urlPacking({
                    ...params,
                    noloading: true
                }, {
                    cancelToken: this.ajaxsource.token
                })
                this.loading = false;
                this.ajaxsource = null;
                if(!res.list.length && params.page > 0){
                    this.cpagination.current--
                    await this.fetchData({...params, page: params.page - 1}, reloadevent)
                    return 
                }
                this.data = res.list;
                if(reloadevent.type == 'created'){
                    this.$emit('fetchSuccess',res);
                }
                if(this.page_request){
                    const {cpagination} = this;
                    if(cpagination !== false){
                        if(res.page){
                            cpagination.total =  parseInt(res.page.count);
                        }
                    }
                }
            },
            pagechange(pagination, filters, sorter, { currentDataSource }){
                this.loadData({type:'page',data:pagination});
                if (!this.page_request){
                    this.cpagination={
                        ...this.cpagination,
                        ...pagination
                    }
                }
            },
            format(format,text,record,index){
                return DataFormat.getData(text,format);
            }
        },
        render (h) {
            this.$attrs.dataSource = this.data;
            this.$attrs.rowKey = 'id';
            // Object.assign(this.cpagination,this.$attrs.pagination);
            // for(let key in this.$attrs.pagination){
            //     this.cpagination[key] = this.$attrs.pagination[key];
            // }
            this.$attrs.columns.forEach((item)=>{
                if(item.format){
                    item.customRender = (text,record,index)=>{
                        return this.format(item.format,text,record,index);
                    };
                }
            });
            this.$attrs.pagination = this.cpagination;
            this.$attrs.loading = this.loading;
            let attrs = Object.assign({
                tableLayout:"fixed",
            //    scroll:{x:true},
            },this.$attrs);
            return (
                    <a-table class="table" on={{...this.$listeners,...{change:this.pagechange}}} slot={this.$slots}  scopedSlots={this.$scopedSlots} props={attrs}>
                        {slotcontent.call(this)}
                    </a-table>
            );
        }

    }
</script>

<style scoped>
    .ant-table td { white-space: nowrap; }
    .table{background: #fff;}
</style>
