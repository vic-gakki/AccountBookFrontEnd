
<script>
    import { message } from "ant-design-vue";
    import {filterProps, getComponentAttrs, isComponent, urlPackingGet} from "@/utils";
    export default {
        name: "VForm",
        props:{
            data:{  //表单数据，编辑的时候使用
                default:()=>{
                    return {}
                }
            },
            url:{
                type:[String,Function]
            },//表单提交的时候的url
            detail_url:{type:[String,Function]},
            processDetail:{
                type: Function,
                default: params => params
            },
            get_data:{
                type:Boolean,
                default:false
            },//是否获取表单数据，会使用url地址，data.id get请求，回显数据， 返回json {data:{id:1,name:'22'}}
            form_id:{
                type:String,
                default:'VForm'
            },
            items:{//每一项配置
                default:()=>{return []}//二维数组，同createElement函数参数， [ ['组件名','组件选项','组件子节点']  ]
            },
            col_num:{//表单显示几列，默认2列
                type:[String,Number],
                default:2
            },
            col_search:{//搜索表单专用
                type:Boolean,
                default:false,
            },
            block_labelCol:{
                type:[String,Number],  //当其单独一行的时候，这个值可以根据页面视情况而改变
                default:2
            },
            block_wrapperCol:{
                type:[String,Number],
                default:22
            },
            searchBtnField: {
                type: String,
                default: 'none'
            },
            height: String
        },
        data() {
            return {
                form: this.$form.createForm(this,
                        {
                            name: this.form_id ,
                            onFieldsChange:(_, changedFields)=>{
                                this.$emit('change', changedFields, this.form);
                            },
                            mapPropsToFields:()=>{
                                let fields = {};
                                let pwd_filed_name = '';
                                let multikey_map ={}
                                this.items.forEach((block)=>{
                                    let item = Object.assign({},block)
                                    let component = item[0];
                                    let options = item[1];
                                    let name = options.props['field-name'];
                                    if(isComponent(component,'CcPassword')) {
                                        pwd_filed_name = name;
                                    }

                                    if(!fields.hasOwnProperty(name) && name){
                                        let nameArray = name.split(",")
                                        if(nameArray.length>1){
                                            multikey_map[name]=[...nameArray]
                                        }
                                        fields[name] = this.$form.createFormField({value:''});
                                    }
                                });
                                for(let key in this.data){
                                    if(key == pwd_filed_name){
                                        continue;
                                    }
                                    let value = this.data[key]
                                    for(let mmKey in multikey_map){
                                        let index = multikey_map[mmKey].indexOf(key)
                                        if(index > -1){
                                            value = multikey_map[mmKey]
                                            value[index] = {[value[index]]:this.data[key]}
                                            key = mmKey
                                        }
                                    }
                                    fields[key] = this.$form.createFormField({value:value});
                                }
                                return fields;
                            }
                        }
                ),
                loading:false,
            };
        },
        created() {
            this.$bus.$on(this.form_id+'submit',()=>{
                return this.handleSubmit();
            });
            this.$bus.$on(this.form_id+'reset',()=>{
                return this.resetForm();
            });
            this.initFormData();
            this.options_callback = {};
        },
        beforeDestroy(){
            this.options_callback = {};
            this.$bus.$off(this.form_id+'submit');
            this.$bus.$off(this.form_id+'reset');

        },
        methods:{
            initFormData(){
                if(!this.get_data || !this.data.id){
                    return;
                }
                this.loading = true;
                let urlPacking = urlPackingGet(this.detail_url);
                urlPacking({id:this.data.id,noloading:true,}).then((data)=>{
                    this.loading = false;
                    let fileds = {};
                    if(data.data){
                       data = data.data;
                    }
                    data = this.processDetail(data)
                    let otherFileds={};
                    this.items.forEach((block)=>{
                        let item = Object.assign({},block)
                        let options =  item[1];
                        let name = options.props['field-name'];
                        if (options.props['is_multi_fields']){
                            for(let key in options.props){
                                if (data[options.props[key]]){
                                    otherFileds[options.props[key]]=data[options.props[key]]
                                }
                            }
                            fileds[name]={...otherFileds};
                            console.log(fileds);
                        }else {
                            if(name){
                                let nameArray = name.split(",")
                                if(nameArray.length>1){
                                    nameArray.forEach(it=>{
                                        value.push({[it]:data[it]})
                                    })
                                    fileds[name] =value;
                                }else{
                                    fileds[name] = data[name];
                                }
                            }
                        }



                    });
                    this.form.setFieldsValue(fileds);
                });

            },
            resetForm(){
              let fileds = {};
                  this.items.forEach((block)=>{
                      let item = Object.assign({},block)
                    let options =  item[1];
                    let name = options.props['field-name'];
                    fileds[name] = '';
                  });
              this.form.setFieldsValue(fileds);
            },
            handleSubmit(e) {
                if(e){
                    e.preventDefault();
                }
                return new Promise((resolve, reject)=>{
                    this.form.validateFields({force:true},(err, values) => {
                        if (!err) {
                            for(let key in values){
                                let value = values[key];

                                if(typeof value == 'object' && value !== null){
                                    if(typeof value._handler == 'function'){
                                        value._handler(values,value);
                                        delete values[key];
                                        continue;
                                    }
                                }
                                values[key] = value
                            }
                            // 去除search form中的按钮组件字段
                            if(this.searchBtnField !== 'none'){
                                delete values[this.searchBtnField]
                            }
                            if(this.$listeners.submit){
                                this.$listeners.submit(values);
                                if (values.InterruptRequest){
                                    reject();
                                    return;
                                }

                            }
                            if(this.url){
                                let urlPacking = urlPackingGet(this.url)
                                let finalParams = Object.assign({}, this.data, values, {id:this.data.id?this.data.id:'', noloading: true})
                                // 扁平化多选项
                                this.items.forEach(item => {

                                    let props = item[1].props, flattenArr = props.seperate, needFlatArr = finalParams[props['field-name']]
                                    if(flattenArr && Array.isArray(flattenArr)){
                                        if(!Array.isArray(needFlatArr)){
                                            try{
                                                needFlatArr = JSON.parse(needFlatArr)
                                            }catch(e){
                                                needFlatArr = needFlatArr.split(',')
                                            }
                                        }
                                        flattenArr.forEach(flatField => {
                                            finalParams[flatField] = needFlatArr.includes(flatField) ? 1 : 0
                                        })
                                        delete finalParams[props['field-name']]
                                    }
                                })
                                urlPacking(finalParams).then((res)=>{
                                    for(let key in values){
                                        this.data[key] = values[key]
                                    }
                                    this.form.resetFields();
                                    message.success("操作成功！");
                                    this.$emit("submitSuccess", res)
                                    values.response = res
                                    resolve(values);
                                }).catch((res)=>{
                                    reject(res);
                                })

                            }else{
                                resolve(values)
                            }
                        }else{
                            reject();
                        }
                    });
                });
            },
            _handleDefaultDecorator(options,label){
                let has = false;
                if(!options.directives){
                    options.directives = [];
                }
                options.directives.forEach((directive)=>{
                    if(directive.name == 'decorator'){
                        has = true;
                    }
                });
                if(!has){
                    options.directives.push({name:'decorator',value:[options.props['field-name'],{}]});
                }
                let decorator = null;
                options.directives.forEach((directive)=>{
                    if(directive.name == 'decorator'){
                        decorator = directive;
                    }
                });
                if(!decorator.value[1].rules){
                    decorator.value[1].rules = [];
                }
                return decorator;
            },
            addRule(options,rules,rule_name,message){
                if(options.props.hasOwnProperty('rule-'+rule_name)){
                    if(!rules.find((rule) =>{ return rule.hasOwnProperty(rule_name)})){
                        let rule = {};
                        let val = options.props['rule-'+rule_name];
                        rule[rule_name] = val;
                        rule['message'] = message.replace('{val}',val);
                        rules.push(rule);
                    }
                }

            },
        },
        render(h){
            let inputs = [];
            let form_props = filterProps.call(this,'form-',this.$attrs);
            form_props = Object.assign({
                form:this.form,
                labelCol:{span:4},
                wrapperCol:{span:18},
                labelAlign: "left",
                layout:this.col_search?'inline':'horizontal',
                type:'flex'
            },form_props);

            this.items.forEach((item,index) =>{
                let col_span = 24/this.col_num;
                let component = item[0];
                let options =  Object.assign({},item[1]);
                if(options.props["field-name"]&&options.props["field-name"].split(",").length>1){
                    options.props["is_multi_name"]=true
                }
                let child = item[2];
                if(this.col_num == 1){
                    options.style = Object.assign({
                        minWidth:'200px'
                    },Object.style);
                }
                if(!this.options_callback.hasOwnProperty(index)){
                    this.options_callback[index] = null;

                    for(let key in options.props){
                        if(typeof options.props[key] == 'function'){
                            if(!this.options_callback[index]){
                                this.options_callback[index] = {};
                            }
                            this.options_callback[index][key] = options.props[key];
                        }
                    }
                }

                if(this.options_callback[index]) {
                    for (let key in options.props) {
                        if (typeof this.options_callback[index][key] == 'function') {
                            options.props[key] = this.options_callback[index][key]();
                        }
                    }
                }


                if(options.props.hasOwnProperty('v-if')){
                    if(!options.props['v-if']){
                        return;
                    }
                }
                let items_props = filterProps.call(this,'item-',options.props);
                let col_props = filterProps.call(this,'col-', options.props)
                let col_style = col_props.style || {}
                let rules = this._handleDefaultDecorator(options,items_props.label).value[1].rules;
                if(isComponent(component,'CcPassword')){
                    if(!this.data.id){
                        options.props['rule-required'] = true;
                    }
                }

                this.addRule(options,rules,'required',items_props.label+'是必需的');
                this.addRule(options,rules,'min',items_props.label+'必须至少有{val}个字符');
                this.addRule(options,rules,'max',items_props.label+'最多只能有{val}个字符');
                this.addRule(options,rules,'len',items_props.label+'必须输入{val}个字符');

                // 支持的自定义校验类型
                // enum	      枚举类型	string	-
                // pattern	  正则表达式校验	RegExp	-
                // transform  校验前转换字段值	function(value) => transformedValue:any	-
                // type	      内建校验类型，可选项	string	'string'
                // validator  自定义校验（注意，callback 必须被调用）	function(rule, value, callback)	-
                // whitespace 必选时，空格是否会被视为错误	boolean	false

                if(options.props.rules&&Array.isArray(options.props.rules)){
                    options.props.rules.map(item=>{
                        let canAdd = false
                        let rule = {}
                        for(let key in item){
                            if(key==='enum' || key==='pattern' ||key==='transform' ||key==='type' ||key==='validator' ||key==='whitespace'){
                                if((!rules.find((r) =>{ return r.hasOwnProperty(key)}))&&item.message){
                                    canAdd = true
                                    rule[key] = item[key]
                                    rule['message'] = item['message']
                                    break;  //如不跳出，碰到多个key的item的时候。后面的会覆盖前面的
                                }
                            }
                        }
                        rules.push(rule)
                    })
                }
                // inputs.push(h('a-form-item',{
                //     props:items_props,
                // }),[
                //         item
                // ])
                if(options.props.block){
                    col_span = 24;
                    !items_props.labelCol && !items_props['label-col'] && (items_props.labelCol = {span:this.block_labelCol})
                    !items_props.wrapperCol && !items_props['wrapper-col'] && (items_props.wrapperCol = {span:this.block_wrapperCol})
                }
                (col_props.span == undefined || col_props.span == 'inherit') && (col_props.span = col_span)
                options.attrs = getComponentAttrs(component,options.props);
                let item_node = h(component,options,child);
                if(this.col_search){
                    inputs.push(<a-form-item props={items_props}  >{item_node}</a-form-item>);
                }else{
                    inputs.push(<a-col {...{props: col_props}} style={col_style}><a-form-item props={items_props}  >{item_node}</a-form-item></a-col>);
                }
            });
            let formStyle = {height: this.height}
            this.height !== 'auto' && (formStyle.overflowY = 'auto')
            return (
                        <a-form style={formStyle} class={[this.col_search?'col_search':'col_search_nomal',this.col_num==1?'col_num_1':'']}  props={form_props} onSubmit={this.handleSubmit}>
                            <a-spin spinning={this.loading} >
                                <a-row style={{}}>
                                    {inputs}
                                </a-row>
                            </a-spin>
                        </a-form>
            );
        }
    }
</script>
