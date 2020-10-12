<template>
  <div class="setting-container">
    <a-tabs >
      <a-tab-pane key="fareCategory" tab="费用类别">
        <fare-setting></fare-setting>
      </a-tab-pane>
      <a-tab-pane key="other" tab="其他">
        Content of Tab Pane 2
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import FareSetting from './FareSetting'
export default {
  name: 'Setting',
  components: {
    FareSetting,
  }
}
</script>

<style>

</style>