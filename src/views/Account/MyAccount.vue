<template>
  <div class="account-contaienr">
    <a-card>
      <v-search-form col_num="3" :items="items" :before-submit="handleSubmitTotable"></v-search-form>
    </a-card>
    <div class="add-btn">
      <v-edit-button is_right icon="plus" button-like size="small" form_id="accountForm">
        新增
        <template slot="popTitle">新增账单</template>
        <template slot="popContent">
          <account-form></account-form>
        </template>
      </v-edit-button>
    </div>
    <div class="table-section">
      <v-table :columns="columns" :url="$api.accountList">
        <template v-slot:involve="scope">
          <a-tag v-for="item of scope" :key="item.id" color="#87d068">{{item.nickname}}</a-tag>
        </template>
        <template v-slot:operation="scope">
          <v-edit-button is_right icon="plus" size="small" form_id="accountForm">
            编辑
            <template slot="popTitle">编辑账单</template>
            <template slot="popContent">
              <account-form :data="getFormDetail(scope)"></account-form>
            </template>
          </v-edit-button>
          <a-divider type="vertical" />
          <v-confirm-button :label="`创建于${scope.payTime}的账单记录`" :url="$api.accountDelete" :data="{id: scope.id}">
            删除
          </v-confirm-button>
        </template>
      </v-table>
    </div>
  </div>
</template>

<script>
import AccountForm from './AccountForm'
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
    title: "操作",
    scopedSlots: {customRender: 'operation'}
  }
]
export default {
  name: 'MyAccount',
  components: {
    AccountForm,
  },
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
    getFormDetail(allData){
      let data = {}
      data.payTime = allData.payTime
      data.fareCategoryId = allData.FareCategory.id
      data.memberInvolve = allData.participate.map(item => item.id)
      data.fareAmount = allData.fareAmount
      data.fareNote = allData.fareNote
      data.id = allData.id
      return data
    },
    handleSubmitTotable(values){
      [values.startTime, values.endTime] = (values.time || [])
      values.time = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  margin: 8px 0;
}
</style>
