<template>
  <div class="fare-setting-container">
    <v-edit-button :width="400" button-like icon="plus">
      新增
      <template slot="popTitle">新增费用类别</template>
      <template slot="popContent">
        <fare-category></fare-category>
      </template>
    </v-edit-button>
    <v-table :columns="columns" :url="$api.fareListUrl">
      <template v-slot:operation="scope">
        <v-edit-button :width="400">
          编辑
          <template slot="popTitle">编辑费用类别</template>
          <template slot="popContent">
            <fare-category :id="scope.id" :name="scope.name"></fare-category>
          </template>
        </v-edit-button>
        <v-delete-button :url="$api.fareCategoryDelete" :data="{id: scope.id}" :title="'确认删除费用类别:' + scope.name + '?'">删除</v-delete-button>
      </template>
    </v-table>
  </div>
</template>

<script>
import FareCategory from './FareCategory'
export default {
  name: 'FareSetting',
  components: {
    FareCategory
  },
  data(){
    return {
      columns: [
        {
          title: '序号',
          dataIndex: 'id'
        },
        {
          title: '名称',
          dataIndex: "name"
        },
        {
          title: '操作',
          scopedSlots: {customRender: "operation"}
        }
      ]
    }
  }
}
</script>

<style>

</style>