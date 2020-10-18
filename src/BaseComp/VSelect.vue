<template>
  <div ref="container">
    <a-select
      ref="CcSelect"
      v-model="mVal"
      v-bind="$attrs"
      :get-popup-container="getPopupContainer"
      :defaultActiveFirstOption="false"
      @change="handleChange"
      :placeholder="placeholder"
      :mode="mode"
      :allowClear="allowClear"
    >
      <a-select-option v-for="item in mlist" :key="item.id" :value="item.id">
        {{ item.name }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { urlPackingGet, toString } from "@/utils";
export default {
  name: "VSelect",
  props: {
    allowClear: { type: Boolean, default: true },
    placeholder: { type: String, default: "请选择" },
    list: {
      //选择列表，需要[{id:'11',name:'xxx'}]
      type: Array,
      default: () => {
        return [];
      }
    },
    mode: {
      type: String,
      default: "default"
    },
    url: {
      //传了url，会使用这个url返回获取数据
      type: String,
      default: ""
    },
    params: {
      type: Object,
      default: () => ({})
    },
    // 是否需要绑定getpopupcontainer
    needBind: {
      type: Boolean,
      default: true
    },
    // 筛选数据的显示
    // { compare: "gt", threshold: -1, fields: "id" }
    listFilter: {
      type: [Object,Array],
    },
    value: {
      type: [String, Number, Array],
    },
    isShowAll: {
      type: Boolean,
      default: false
    }, 
  },
  watch: {
    params: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal && JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.paramsChange();
        }
      }
    },
    value: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.mVal =
          Array.isArray(newVal) ||
          !this.existIdArr.length ||
          this.existIdArr.includes(newVal)
            ? newVal
            : undefined;
      }
    },
    mlist() {
      if (Array.isArray(this.mVal)) {
        this.mVal = this.mVal.filter(item => this.existIdArr.includes(item));
      } else {
        this.mVal = this.existIdArr.includes(this.mVal) ? this.mVal : undefined;
      }
    },
  },
  data() {
    return {
      mslist: [],
      mVal: this.value
    };
  },
  computed: {
    mlist() {
      let list = this.list;
      if (this.url) {
        list = this.mslist;
      }
      if (this.isShowAll) {
        list = [
          {
            id: "",
            name: "全部"
          },
          ...list
        ];
      }
      // 根据外部传入的listFilter过滤option
      if(this.listFilter){
        let filterArr = toString(this.listFilter) === 'Object' ? [filterArr] : filterArr
        return filterArr.reduce((acc, cur) => {
          return acc.filter(item => {
            let flag;
            switch (cur.compare) {
              case "gt":
                flag = +item[cur.fields] > cur.threshold;
                break;
              case "lt":
                flag = +item[cur.fields] < cur.threshold;
                break;
              case "not":
                flag = +item[cur.fields] != cur.threshold;
                break;
              default:
                flag = true;
                break;
            }
            return flag;
          });
        }, list)
      }
      return list
    },
    existIdArr() {
      return this.mlist.map(item => item.id);
    }
  },
  methods: {
    paramsChange() {
      if (this.url) {
        let urlPacking = urlPackingGet(this.url);
        urlPacking({ ...this.params, noloading: true }).then(res => {
          // res.list.forEach(item => (item.id = item.id.toString()));
          this.mslist = res.list;
          this.$emit("fetchSuccess", res.list);
        });
      }
    },
    handleChange(value) {
      this.$emit("change", value);
    },
    getPopupContainer(node) {
      if (this.needBind) {
        let parent = node.parentNode;
        return parent;
      }
      return document.body;
      
    }
  }
};
</script>

<style scoped></style>
