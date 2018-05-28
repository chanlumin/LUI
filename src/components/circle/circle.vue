<template>
  <div :class="b()" :style="style">
    <svg viewBox="0 0 1060 1060">
      <!--底部圆圈-->
      <path :class="b('hover')" :style="hoverStyle" :d="path"></path>
      <!--顶部圆圈 -->
      <path :class="b('layer')" :style="layerStyle" :d="path"></path>
    </svg>
    <slot>
      <div :class="b('text')">{{text}}</div>
    </slot>
  </div>
</template>

<script>
  import {bMixin} from "../../utils/bem"
  import {raf, cancel} from "../../utils/raf"
  export default {
    name : 'lui-circle',
    props: {
      text: String,
      value: Number,
      speed: Number,
      size: {
        type: String,
        default: '100px' // 圆环直径
      },
      fill: {
        type: String,
        default: 'none' // 填充颜色
      },
      rate: {
        type: Number,
        default: 100 // 目标进度
      },
      layerColor: {
        type: String,
        default: '#fff' // 轨道颜色
      },
      color: {
        type: String,
        default: '#38f' // 进度条颜色
      },
      strokeWidth: {
        type: Number,
        default: 40 // 进度条宽度
      },
      clockwise: {
        type:Boolean,
        default: true
      }

    },
    mixins: [bMixin],
    beforeCreate() {
      this.perimeter = 3140 // 整个圆圈的半径是 3140
      this.path = 'M 530 530 m -500, 0 a 500, 500 0 1, 1 1000, 0 a 500, 500 0 1, 1 -1000, 0'
    },
    computed: {
      style() {
        return {
          width : this.size,
          height: this.size
        }
      },
      /**
       * 当前的进度的样式
       * @returns {{stroke: string, strokeDashoffset: string, strokeWidth: string}}
       */
      layerStyle() {
        console.log(this.value) // v-model=> currentRate
        let offset = this.perimeter * (100 - this.value)/100
        offset = this.clockwise ? offset : this.perimeter * 2 - offset
        return {
          stroke: `${this.color}`,
          strokeDashoffset: `${offset}px`,
          strokeWidth: `${this.strokeWidth}`
        }
      },
      /**
       *
       */
      hoverStyle() {
        return {
          fill: `${this.fill}`,
          stroke: `${this.layerColor}`,
          strokeWidth: `${this.strokeWidth}`
        }
      },
      methods: {
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "~@/assets/css/circle.styl"
</style>
