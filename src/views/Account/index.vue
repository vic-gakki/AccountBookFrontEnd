<template>
  <div class="account-contaienr">
    <a-card>
      <v-search-form col_num="3" :items="items"></v-search-form>
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
        <template v-slot:operation="scope">
          <v-edit-button is_right icon="plus" size="small" form_id="accountForm">
            编辑
            <template slot="popTitle">编辑账单</template>
            <template slot="popContent">
              <account-form :data="scope"></account-form>
            </template>
          </v-edit-button>
          <a-divider type="vertical" />
          <v-confirm-button label='账单记录' :name="scope.id">
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
    dataIndex: 'id'
  },
  {
    title: '创建时间',
    dataIndex: 'payTime'
  },
  {
    title: '类别',
    dataIndex: 'fareCate'
  },
  {
    title: '相关人员',
    dataIndex: 'memberInvolve'
  },
  {
    title: '费用',
    dataIndex: 'fareAmount'
  },
  {
    title: '备注',
    dataIndex: 'fareNote'
  },
  {
    title: "操作",
    scopedSlots: {customRender: 'operation'}
  }
]
export default {
  props: ['name', 'age', 'introduction'],
  components: {
    AccountForm,
  },
  data(){
    return {
      columns,
      items: [
        [
          'a-input',
          {
            props: {
              "field-name": "oldPassword",
              "item-label": "原始密码",
              placeholder: "请输入原始密码",
            }
          }
        ],
        [
          'a-input',
          {
            props: {
              "field-name": "newPassword",
              "item-label": "修改密码",
              placeholder: "请输入修改后的密码",
            }
          }
        ],
        [
          'a-input',
          {
            props: {
              "field-name": "confirmpassword",
              "item-label": "确认密码",
              placeholder: "请确认修改密码",
            }
          }
        ]
      ]
    }
  },
  methods: {
    submit(){
      return Promise.resolve(Math.random() > 0.5)
    }
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  margin: 8px 0;
}
</style>
