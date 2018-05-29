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
      }

    },
    watch: {
      // rate是目标进度
      rate: {
        handler() {
          this.startTime = Date.now()
          // this.value
          this.startRate = this.value
          this.endRate = this.format(this.rate)

          console.log('rate')
          this.increase = this.endRate > this.startRate
          // this.speed 动画速度 rate/s
          // duration 就是需要多少时间
          this.duration = Math.abs((this.startRate - this.endRate) * 1000 / this.speed)
          // speed动画速度
          if(this.speed) {
            // 每次执行动画之前 先取消上一次的动画再执行
            cancel(this.rafId)
            this.rafId = raf(this.animate)
          } else {
            // 默认情况下 组件上的v-model会把 input但做event 此处触发input就会改变currentRate
            // 如果没有动画速度的话 直接改变v-model的值到 this.endRate
            this.$emit('input', this.endRate)
          }

        },
        immediate: true
      }
    },
    methods: {
      animate() {
        const now = Date.now()
        // this.duration 就是增加的数值(目标值)
        // 一个动画帧占整个需要完成的动画时间的百分比
        const progress = Math.min((now - this.startTime)/ this.duration, 1)
        // progress * (this.endRate-this.startRate) => 一秒钟走了多少的动画帧
        const rate = progress * (this.endRate - this.startRate) + this.startRate
        // 通知v-model当前的rate是多少
        this.$emit('input', this.format(parseFloat(rate.toFixed(1))))
        if(this.increase ? rate < this.endRate : rate > this.endRate) {
          // 不断执行动画 知道 rate >= this.endRate 或者 rate < this.endRate结束执行
          this.rafId = raf(this.animate)
        }

      },
      format(rate) {
        // 修正rate rate负数的画取0 然后rate只能在0到100之间
        return Math.min(Math.max(rate, 0), 100)
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "~@/assets/css/circle.styl"
</style>
