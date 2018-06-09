<template>
  <div
    :class="b({disabled})"
    @click.stop="onClick"

  >
    <div :class="b('bar')" :style="barStyle">
      <span
        :class="b('button')"
        @touchstart="onTouchStart"
        @touchmove.prevent.stop="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
      </span>
    </div>
  </div>
</template>

<script>
  import {bMixin} from  '../../utils/bem'
  import Touch from '../../utils/touch'

  export default {
    name : 'lui-slider',
    mixins: [Touch, bMixin],
    props: {
      disabled: Boolean,
      max: {
        type: Number,
        default : 100,
      },
      min: {
        type: Number,
        default: 0,
      },
      step: {
        type: Number,
        default: 1
      },
      value: {
        type: Number,
        default: 0
      },
      barHeight: {
        type: String,
        default: '2px'
      }
    },
    computed: {
      barStyle() {
        return {
          width: this.format(this.value) + '%',
          height :this.barHeight
        }
      }
    },
    methods: {
      onClick(event) {
        if(this.disabled) return
        const rect = this.$el.getBoundingClientRect()
        // 利用相对于屏幕左边的位置的diff 来计算偏移量
        const value = (event.clientX - rect.left)/rect.width * 100
        this.updateValue(value, true)
      },
      // touchStart一定是从button那个位置开始拖动的
      // 所以可以记录当前的startValue
      onTouchStart(event){
        console.log(event,'start')
        if(this.disabled) {
          return
        }
        this.touchStart(event)
        this.startValue = this.format(this.value)
        console.log(this.startValue,'startValue')
      },
      onTouchMove(event) {
        if(this.disabled) {
          return
        }
        this.touchMove(event)
        // 此时的rect是最外层的容器的rect
        const rect = this.$el.getBoundingClientRect()
        // 百分比* 100
        const diff = this.deltaX / rect.width * 100
        console.log(this.startValue+ diff, 'diffvalue')
        this.updateValue(this.startValue + diff)
      },
      onTouchEnd(event) {
        if(this.disabled) return
        // 结束的时候只需要重新调用胰腺癌this.updateValue即可
        this.updateValue(this.value, true)
      },
      updateValue(value, end) {
        if(this.disabled) return
        console.log(value,'updateValule')

        value = this.format(value)
        this.$emit('input',value)

        if(end) {
          this.$emit('change', value)
        }
      },
      /**
       * 由于在拖动的时候会有很多位小数点的情况发生
       * format作用就是将这些小数点 变为正数
       * Math.max(this.min, Math.min(this.value, this.max))
       * 上面这一段代码其实就是把this.value取出来 但是这样做的意义?
       * @param value
       */
      format(value) {
        return (Math.round(Math.max(this.min, Math.min(value, this.max))/this.step) * this.step )
      }
    },
    mounted() {
      console.log(this.value)
    }
  }
</script>

<style lang="stylus">
  @import "~@/assets/css/slider.styl"
</style>
