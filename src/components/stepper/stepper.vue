<template>
  <div :class="b()">
    <button
      :class="b('minus', {disabled: minusDisabled})"
      @click="onChange('minus')"
    >
    </button>
    <input
      type="number"
      :class="b('input')"
      :value="currentValue"
      :disabled="disabled || disableInput"
      @input="onInput"
      @keypress="onKeypress"
    >
    <button
      :class="b('plus',{disabled:plusDisabled})"
      @click="onChange('plus')"
    >
    </button>
  </div>
</template>

<script>
  import {bMixin} from '../../utils/bem'
  export default {
    name: 'lui-stepper',
    mixins: [bMixin],
    props: {
      value : {},
      integer: Boolean, // 是否只允许输入integer值
      disableInput: Boolean,// 是否禁用Input
      disabled: Boolean,
      min: {
        type: [String, Number],
        default: 1
      },
      max: {
        type: [String, Number],
        default: Infinity
      },
      step: { // 步数
        type: [String, Number],
        default: 1
      },
      defaultValue: { // 默认值
        type:[String, Number],
        default: 1
      }
    },
    data(){
      return {
        currentValue: 1
      }
    },
    computed: {
      minusDisabled() {},
      plusDisabled(){}

    },
    methods: {
      onChange(type){

      },
      onInput(){

      },
      onKeypress(){

      }
    },
    mounted() {
      console.log('stepper',this.value)
    }
  }
</script>
<style lang="stylus">
  @import "~@/assets/css/stepper.styl"
</style>
