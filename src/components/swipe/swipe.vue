<template>
  <div :class="b()">
    <!--只有大于1个swipe-item的时候才需要监听这么多事件-->
    <div v-if="count > 1"
         :class="b('track')"
         :style="trackStyle"
         @touchstart="onTouchStart"
         @touchmove="onTouchMove"
         @touchend="onTouchEnd"
         @touchcancel="onTouchEnd"
         @transitionend="$emit('change',activeIndicator)"
    >
      <!--swipe-item的slot-->
      <slot></slot>
    </div>
    <div v-else :class="b('track')">
      <!--swipe-item的slot-->
      <slot></slot>
    </div>
    <div v-if="showIndicators && count > 1" :class="b('indicators', {vertical})">
      <!--index in count 中的index的初始值是从1开始-->
      <i v-for="index in count"
         :class="b('indicator',{active: index-1 === activeIndicator})"></i>
    </div>

  </div>
</template>


<script>
  import {bMixin} from '../../utils/bem'
  import Touch from '../../utils/touch'
  export default {
    name : 'lui-swipe',
    mixins: [Touch, bMixin],
    props: {
      autoplay: Number, // 自动播放的事件间隔
      vertical: Boolean,
      loop: { // 是开开启循环播放
        type: Boolean,
        default: true
      },
      touchable: {
        type: Boolean,// 是否可以通过手势滑动
        default: true
      },
      initialSwipe: {
        type: Number,
        default: 0 // 初始位置 默认0
      },
      showIndicators: {
        type: Boolean,
        default: true
      },
      duration: {
        type: Number,
        default: 500 // 动画市场 单位为ms
      }
    },
    data() {
      return {
        width: 0,
        height: 0,
        offset: 0,
        active: 0,
        deltaX: 0,
        deltaY: 0,
        swipes: [],
        swiping: false
      }
    },
    mounted() {
      this.initialize();
    },
    watch: {
      swipes() {
        this.initialize()
      },
      initialSwipe(){
        this.initialize()
      }
    },
    computed: {
      count() {
        return this.swipes.length
      },
      delta() {
        return this.vertical ? this.deltaY : this.deltaX
      },
      // 返回当前外部swipe一个版面的长度
      size() {
        return this[this.vertical ? 'height' : 'width']
      },
      /*
      * 返回当所有子元素横排或竖排在一起的宽度或者高度
      */
      trackSize() {
        return this.count * this.size
      },
      /**
       * 当前的Indicator的位置
       */
      activeIndicator() {
        //  当前Indicator的active的下标位置 + this.coutn除以this.count
        //  是为了处理负数的情况
        return (this.active + this.count) % this.count
      },
      trackStyle() {
        // 下面的[]是是为了写表达式子
        return {
          [this.vertical ? 'height' : 'width'] : `${this.trackSize}px`,
          transitionDuration: `${this.swiping ? 0 : this.duration}ms`,
          transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`

        }
      }
    },
    methods: {
      initialize() {
        clearTimeout(this.timer)
        const rect = this.$el.getBoundingClientRect()
        this.swiping = true
        this.width = rect.width
        this.height = rect.height
//        console.log(this.initialSwipe)
        // initialSwipe是幻灯片初始话的位置 通过props传入
        this.active = this.initialSwipe
        console.log(this.active)
        this.offset = this.count > 1 ? -this.size * this.active : 0
        this.swipes.forEach(swipe => {
          swipe.offset = 0
        })
      },
      onTouchStart(event){
        // 如果不能触摸的话 直接返回
        if(!this.touchable) return
        this.swiping = true
        // 通过event获取初始化参数 包含
        // deltaX deltaY offsetX offsetY startX startY
        this.touchStart(event)
        this.correctPosition()
      },
      onTouchMove(event){
        if(!this.touchable) return
        this.touchMove(event)
        if(this.vertical && this.direction == 'vertical'
          || this.direction === 'horizontal') {
          event.preventDefault()
          event.stopPropagation()
        }
        // 调整移动的时候的offset => this.offset 用于下一步做判断
        this.move(0,Math.min(Math.max(this.delta, -this.size),this.size))
      },
      onTouchEnd(){
        if(!this.touchable) return
        if(this.delta) {
          const offset = this.vertical ? this.offsetY : this.offsetX
          // 当offset > 50的时候才需要move
          this.move(offset > 50 ? (this.delta > 0 ? -1 : 1) : 0)
          // 重置swipping状态
          this.swiping = false
        }
      },
      move(move = 0, offset = 0) {
        // 解构是为了减少代码的长度书写 => this.delta => delta
        const {delta, active, count, swipes, trackSize} = this
        // 是否在第一张
        const atFirst = active === 0
        const atLast = active === count - 1
        // 如果没有循环的话 那么在第一个位置和作为一个位置的到时候进行
        // 想左移动 或想有移动的时候 直接返回
        if(!this.loop &&
          (
            (atFirst && (offset > 0 || move < 0)) ||
            (atLast && (offset < 0 || move > 0))
          )
        ) {
          return
        }

        if(move) {
          // 下面是修正第一张和最后一张的offset
          // 如果向右移动而且active小于0等于-1 让最后的swipe-item的offset = 0
          // active === -1的时候此时刚刚做过的动作是从第一张向右拖到第最后一张
          // 这个时候刚刚translate最后一张到第一张 所以此时要将 offset置为0
          if(active === -1) {

            swipes[count - 1].offset = 0
          }
          // 一直是往左偏移的，如果还继续向左滑的时候就整体想做偏移一个trackSize 把第一张translate一个trackSize=>到最右边
          // 所以此时的第一张的offset的值为一个trackSize
          swipes[0].offset = atLast && move > 0 ? trackSize : ''

          this.active += move
        } else {
          // 在第一张的时候如果只是拖动有那个趋势 先调整第一张和最后一张的offset
          if(atFirst) {
            // delta > 0 向右拖动(也即是有要从1拖动到最后一张的趋势) 所以提前设置第四章的swipe.offset(把他从最后一张移动到第一张)
            swipes[count - 1].offset = delta > 0 ? -trackSize : 0
          } else if(atLast) {
            swipes[0].offset = delta < 0 ? trackSize : 0
          }
        }
        this.offset = offset - this.active * this.size
      },
      correctPosition() {
        // 从第一张到第四张 此时的active是-1
        if(this.active <= -1) {
          // 袖珍active到this.cout - 1
          this.move(this.count) // 修正this.active
        }
        if(this.active >= this.count) {
          // 从第四张跳到第一张 修正active到0
          this.move(-this.count)
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "~@/assets/css/swipe.styl"
</style>
