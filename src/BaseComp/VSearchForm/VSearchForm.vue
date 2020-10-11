
<script>
    import {slotcontent, getComponent} from "@/utils";
    let formHeight
    import SearchFormBtnGroup from "./SearchBtn";
    import Vue from 'vue'
    export default {
        name: "VSearchForm",
        components: {},
        props:{
            table_id:{
                type:String,
                default:'VTable',
            },
            form_id:{
                type:String,
                default:'VSearchFrom',
            },
            col_num:{
                type:[String,Number],
                default:1
            },
            items:{
                default:()=>{return []}//二维数组，同createElement函数参数， [ ['组件名','组件选项','组件子节点']  ]
            },
            beforeSubmit: {
                type: Function,
                default: () => params => params
            }

        },
        data(){
            let items_data = this.items.map(item => {
                item[1].props['col-span'] = 'inherit'
                return item
            })
            return{
                formCalRes: {},
                formBtnField: 'searchFromBtnGroup',
                isFold: true,
                height: 'auto',
                row: 4,
                maxRow: 6,
                items_data
            }
        },
        computed: {
            buttonItem(){
                return [
                    SearchFormBtnGroup,
                    {
                        props: {
                            "field-name": this.formBtnField,
                            "item-wrapperCol": {span: 22},
                            shouldShow: this.formCalRes.sliceStopPlace !== undefined,
                            "col-offset": 0,
                            "col-span": 'inherit',
                            "col-style": {
                                background: '#fff',
                                position: 'static',
                                bottom: 0,
                                right: 0
                            }
                        },
                        style: {textAlign: 'right'},
                        on: {
                            search: this.onChange.bind(this),
                            reset: this.onClick.bind(this),
                            toggleFold: this.toggleFold.bind(this)
                        }
                    },
                ]
            },
        },
        created() {
            this.initFormStyle()
        },
        methods:{
            // 初始记录截断位置信息
            initFormStyle(){
              let num = 0, sliceStopPlace, rollbackNum, maxDisplayIndex
              for(let i = 0, len = this.items.length; i < len; i++){
                let cur = this.items[i], isBlock = cur[1].props.block
                  if(isBlock && num % this.col_num !== 0){
                      num = (Math.floor(num / this.col_num) + 1) * this.col_num
                  }
                  if(!sliceStopPlace){
                    rollbackNum = num
                  }
                  num += isBlock ? this.col_num : 1
                if(!sliceStopPlace && num >= this.col_num * this.row){
                    sliceStopPlace = i
                }
                if(!maxDisplayIndex && num > this.col_num * (this.maxRow - 1)){
                    maxDisplayIndex = i
                }
              }
              this.formCalRes = {
                  totalNum: num,
                  sliceStopPlace,
                  rollbackNum,
                  maxDisplayIndex
              }
              if(maxDisplayIndex){
                  this.calcHeight(maxDisplayIndex)
              }
              this.items_data.push(this.buttonItem)
              this.setShowItems(sliceStopPlace !== undefined)
            },
            // 控制表单元素展示
            setShowItems(isFold){
                for(let i = this.formCalRes.sliceStopPlace, len = this.items_data.length - 1; i < len; i++){
                    let replaceItem = [...this.items_data[i]]
                    replaceItem[1].props['col-span'] = isFold ? 0 : 'inherit'
                    this.items_data.splice(i, 1, replaceItem)
                    this.items_data[i][1].props['col-span'] = isFold ? 0 : 'inherit'
                }
                this.setBtnCompDisplay(isFold)
            },
            setBtnCompDisplay(isFold){
                let offset = this.calcOffset()
                let btnComp = this.items_data.slice(-1)[0]
                btnComp[1].props['col-offset'] = offset
                if(!isFold && this.formCalRes.maxDisplayIndex){
                    btnComp[1].props['col-style'].position = 'sticky'
                    this.height = formHeight + 'px'
                }else {
                    btnComp[1].props['col-style'].position = 'static'
                    this.height = 'auto'
                }
                this.items_data.splice(-1, 1, btnComp)
            },
            // 计算offset
            calcOffset(){
                let existPlace, base = 24 / this.col_num
                if(this.formCalRes.sliceStopPlace && this.isFold){
                    existPlace = this.formCalRes.rollbackNum % this.col_num
                }else {
                    existPlace = this.formCalRes.totalNum % this.col_num
                }
                return existPlace == 0 ?
                    (this.col_num - 1) * base
                    : (this.col_num - 1 - existPlace) * base
            },
            calcHeight(maxDisplayIndex){
                let items = this.items_data.slice(0, maxDisplayIndex + 1)
                let col_num = this.col_num
                let div = document.createElement('div')
                document.body.appendChild(div);
                let formDom = new Vue({
                    name: 'shadowForm',
                    render(h){
                        return h('v-form', {props: {items, col_num}})
                    }
                }).$mount(div)
                formHeight = formDom.$el.clientHeight
                document.body.removeChild(formDom.$el)
                formDom.$destroy()
            },
            toggleFold(isFold){
                this.isFold = isFold
                this.setShowItems(isFold)
            },
            onSubmit(values){
                console.log('search value', values)
                this.beforeSubmit(values)
                this.$bus.$emit(this.table_id+'reload',{type:'search',data:values});
            },
            onChange(){
                this.$nextTick(()=>{
                    this.$refs.form.handleSubmit();
                });
            },
            onClick(){
                this.$nextTick(() => {
                    this.$bus.$emit(this.form_id + "reset"); //重置列表
                });
            },
        },
        render(h) {
            return (
                <div class='search-form-content'>
                    <v-form class="search_form"  ref="form" items={this.items_data} props={this.$attrs} height={this.height} col_num={this.col_num} form_id={this.form_id} col_search={this.col_num == 1} searchBtnField={this.formBtnField} onSubmit={this.onSubmit} onChange={this.onChange}>
                        {slotcontent.call(this)}
                    </v-form>
                </div>

            );
        }
    }
</script>

<style scoped>
.search-form-content{
        width: 100%;
        padding: 0 16px;
}
</style>
