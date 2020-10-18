<template>
  <div class="involve-me-container">
    <a-card>
      <v-search-form col_num="3" :items="items" :before-submit="handleSubmitTotable"></v-search-form>
    </a-card>
    <div class="table-section">
      <v-table :columns="columns" :url="$api.involveMe">
        <template v-slot:involve="scope">
          <a-tag v-for="item of scope" :key="item.id" color="#87d068">{{item.nickname}}</a-tag>
        </template>
      </v-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '序号',
    customRender(text, scope, index){
      return index + 1
    }
  },
  {
    title: '创建时间',
    dataIndex: 'payTime'
  },
  {
    title: '费用类别',
    dataIndex: 'FareCategory.name',
  },
  {
    title: '相关人员',
    dataIndex: 'participate',
    width: 300,
    scopedSlots: {customRender: 'involve'}
  },
  {
    title: '金额',
    dataIndex: 'fareAmount'
  },
  {
    title: '备注',
    dataIndex: 'fareNote'
  },
  {
    title: '状态',
    dataIndex: 'isDone',
    customRender(text){
      return text == 1 ? '未结算' : '已结清'
    }
  },
  {
    title: "创建者",
    dataIndex: 'creator.nickname'
  }
]
export default {
  name: "InvolveMe",
  data(){
    return {
      columns,
      items: [
        [
          'a-range-picker',
          {
            props: {
              "field-name": "time",
              "item-label": "支出时间",
              valueFormat: 'YYYY-MM-DD'
            }
          }
        ],
      ]
    }
  },
  methods: {
    handleSubmitTotable(values){
      [values.startTime, values.endTime] = (values.time || [])
      values.time = undefined
    }
  }
}
</script>

<style>
.table-section {
  margin-top: 16px;
}
</style>