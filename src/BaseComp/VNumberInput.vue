<template>
  <div class='v-number-input-container'>
    <a-input v-bind='$attrs' @blur="handleBlur" :value="value" @change="handleValueChange">
    </a-input>
  </div>
</template>

<script>
export default {
  name: 'VNumberInput',
  props: {
    range: {
      type: Array,
      validator(val){
        return val.length >= 1
      },
      default: () => [0]
    },
    value: {
      type: [String, Number]
    }
  },
  methods: {
    handleValueChange({target}){
      this.$emit('change', target.value)
    },
    handleBlur({target}){
      const value = target.value
      let transformedValue = parseFloat(value)
      if(transformedValue.toString() === value) return
      if(isNaN(transformedValue) || transformedValue < this.range[0]){
        transformedValue = this.range[0]
      }
      if(this.range[1] && transformedValue > this.range[1]){
        transformedValue = this.range[1]
      }
      return this.$emit('change', transformedValue)
    }
  }
}
</script>

<style>

</style>