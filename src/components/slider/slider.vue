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
      onClick() {

      },
      onTouchStart(){

      },
      onTouchMove() {

      },
      onTouchEnd() {

      },
      /**
       * 由于在拖动的时候会有很多位小数点的情况发生
       * format作用就是将这些小数点 变为正数
       * Math.max(this.min, Math.min(this.value, this.max))
       * 上面这一段代码其实就是把this.value取出来 但是这样做的意义?
       * @param value
       */
      format(value) {
        return (Math.round(Math.max(this.min, Math.min(this.value, this.max))/this.step) * this.step )
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
