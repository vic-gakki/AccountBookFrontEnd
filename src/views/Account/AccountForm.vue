<template>
  <div class="account-form-container">
    <v-form class="account-form" :data="data" :url="$api.postFareUrl" :items="items" :block_labelCol="4" :block_wrapperCol="16" :form-colon='false' form-labelAlign="right" form_id="accountForm"></v-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "AccountForm",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return {
      items: [
        [
          'a-date-picker',
          {
            props: {
              'field-name': 'payTime',
              'item-label': '支出时间',
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
              'rule-required': true,
              "not-computed-disabledDate": current => {
                let now = moment()
                return current > now
              },
              block: true,
            }
          }
        ],
        [
          'v-select',
          {
            props: {
              'field-name': 'fareCategoryId',
              'item-label': '费用类别',
              'rule-required': true,
              'url': this.$api.fareListUrl,
              block: true,
            }
          }
        ],
        [
          'v-select',
          {
            props: {
              'field-name': 'memberInvolve',
              'item-label': '相关人员',
              'url': this.$api.userListUrl,
              'rule-required': true,
              mode: 'multiple',
              block: true,
            }
          }
        ],
        [
          'v-number-input',
          {
            props: {
              'field-name': 'fareAmount',
              'item-label': '支出费用',
              'prefix': '￥',
              'suffix': 'RMB',
              'rule-required': true,
              block: true,
            },
          }
        ],
        [
          'a-textarea',
          {
            props: {
              'field-name': 'fareNote',
              'item-label': '备注',
              'rows': 5,
              block: true,
            }
          }
        ],
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .account-form-container {
    padding-top: 24px;
    .ant-calendar-picker {
      width: 100%;
    }
  }
</style>