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
