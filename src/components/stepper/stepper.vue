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
      let value = this.value ? this.value : +this.defaultValue
      const correctdValue = this.correctValue(value)
      if(value !== correctdValue) {
        value = correctdValue
        // value 改变的时候触发v-model的event
        this.$emit('input', value)
      }
      return {
        currentValue: value
      }
    },
    computed: {
      minusDisabled() {
        const min = this.min
        const step = +this.step
        const currentValue = +this.currentValue
        return min === currentValue || (currentValue - step) < min || this.disabled
      },
      plusDisabled(){
        const max = this.max
        const step = +this.step
        const currentValue = +this.currentValue
        return max === currentValue || (currentValue + step) > max || this.disabled
      }

    },
    methods: {
      onChange(type){
        // type判断 disabled判断
        if((this.minusDisabled && type === 'minus')|| (this.plusDisabled && type=== 'plus')) {
          this.$emit('overlimit',type)
          return
        }
        // 2. step的加减 + 是因为有可能会有 + 号这个东西存在
        const step = +this.step
        console.log(type,'type')
        const currentValue = +this.currentValue
        this.currentValue = type === 'minus' ? (currentValue - step) : (currentValue + step)
        this.emitInput()
        console.log('after emit')
        this.$emit(type)

      },
      onInput(event){
        const {value} = event.target
        this.currentValue = value ? this.correctValue(value) : value
        // 源码加了这一句 ？
//        event.target.value = this.currentValue;

        this.emitInput()
      },
      onKeypress(event){
        if(this.integer && event.keyCode === 46) {
          event.preventDefault()
        }
      },
      /**
       * 纠正传递过来的值
       * 限制在min和max之间
       * 没用if的写法
       * @param value
       * @returns {number}
       */
      correctValue(value) {
        return  isNaN(value) ?
          this.min :
          Math.max(this.min, Math.min(value, this.max))
      },
      emitInput() {
        this.$emit('input', this.currentValue)
        console.log('emit input', this.currentValue)
        this.$emit('change', this.currentValue)
      }
    },
    watch: {
      // 每次current改变的的时候 有可能会超过限制的范围
      // 所以在watch correctValue
      value(val) {
        if(val !=='') {
          console.log(val,'val')
          console.log(this.currentValue,'val-cur')
          val = this.correctValue(+val)

          console.log(val, 'val-after')
          // 可能val 已经是-1 之类的 此时就要correctValue
          if(val !== this.currentValue) {
            this.currentValue = val
          }
        }
      },
    },
    mounted() {
      console.log('stepper',this.value)
    }
  }
</script>
<style lang="stylus">
  @import "~@/assets/css/stepper.styl"
</style>
