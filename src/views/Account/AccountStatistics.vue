<template>
  <div class="account-statistics-container">
    <div class="search-container">
      <a-card>
        统计时间：<a-range-picker @change="handleChange" :ranges="timePreset()" :default-value="defaultTime"></a-range-picker>
      </a-card>
    </div>
    <div id="barContainer" style="width: 100%; height:500px;"></div>
    <div class="recommend-container">
      <p class="currency-title">模板方案</p>
      <div class="currency-content">
        <div v-for="item of plan" :key="item.id">
          <a-card :title="`${item.name} 应收 ${item.amount}元`">
            <p v-for="give of item.take" :key="give.id">
              <a-tag>{{give.name}}</a-tag>给 <a-tag>{{item.name}}</a-tag>￥：{{give.given}}元
              <!-- {{`${give.name}给${item.name}￥：${give.given}元`}} -->
            </p>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts');
import moment from 'moment'
window.moment = moment
import {Enum, isArray, isPlainObject} from '@/utils'
const descMap = [['expense', '共计支出'], ['average', '期望支出']]
const FareEnum = new Enum(descMap)
export default {
  name: 'AccountStatistics',
  data(){
    return {
      vchart: null,
      defaultTime: this._calcTimeSpan(moment(), moment()),
      plan: []
    }
  },
  created(){
    
  },
  async mounted(){
    let params = this._generateTimeParams(this.defaultTime)
    this.vchart = echarts.init(document.getElementById('barContainer'))
    await this.fetchDataAndRender(params)
  },
  methods: {
    async handleChange(dates, datesString){
      let params = this._generateTimeParams(datesString)
      await this.fetchDataAndRender(params)
    },
    timePreset(){
      let preset = [{month: 0, desc:'本月'},{month: 3, desc:'近三月'},{month: 6, desc:'近半年'}]
      let res = {}, now = moment(), temp
      preset.forEach(item => {
        temp = moment()
        temp.month(temp.month() - item.month)
        res[item.desc] = this._calcTimeSpan(temp, now)
      })
      return res
    },
    _generateTimeParams(params, format = 'YYYY-MM-DD'){
      let res = {}
      if(isArray(params)){
        res = {startTime: params[0], endTime: params[1]}
      }
      if(isPlainObject(params)){
        res = {startTime: params.startTime, endTime: params.endTime}
      }
      if(res.startTime && res.endTime){
        let {startTime, endTime} = res
        res.startTime = typeof startTime == 'object' ? startTime.format(format) : startTime
        res.endTime = typeof endTime == 'object' ? endTime.format(format) : endTime
      }
      return res
    },
    _calcTimeSpan(start, end){
      return [start.startOf('month'), end.endOf('month')]
    },
    async fetchDataAndRender(params){
      let {statistics: res, plan} = await this.$api.accountStatistics(params)
      this.plan = plan
      res = Object.values(res)
      let categoryArr = [], legend = descMap.map(item => item[1]), series = legend.map(item => ({name: item, type: 'bar', data: []}))
      res.forEach(item => {
        categoryArr.push(item.name)
        series.forEach(seriesItem => {
          seriesItem.data.push(item[FareEnum[seriesItem.name]])
        })
      })
      this.vchart.setOption({
          title: {
              text: '账单概览',
              left: 'center',
              top: 10
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
          },
          legend: {
            data: legend,
            left: 20,
            width: 100,
            top: 10
          },
          xAxis: {
            type: 'category',
            data: categoryArr
          },
          yAxis: {
            type: 'value'
          },
          series
      });
    },
    handleSubmitTotable(values){
      [values.startTime, values.endTime] = (values.time || [])
      values.time = undefined
    }
  }
}
</script>

<style>
  .account-statistics-container {
    padding-bottom: 60px;
  }
  .search-container {
    background-color: #fff;
    margin-bottom: 16px;
  }
  #barContainer {
    margin-top: 16px;
    background-color: #fff;
  }
  .currency-title {
    background: #fff;
    margin: 16px 0;
    padding: 16px 0 16px 16px;
    font-size: 18px;
    font-weight: 600;
  }
  .currency-content {
    display: flex;
    flex-wrap: wrap;
  }
  .currency-content .ant-card {
    height: 100%;
  }
</style>