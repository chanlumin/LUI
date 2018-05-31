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
      initialize() {
        this.initialize()
      },
      initialSwipe(){

      }
    },
    computed: {
      count() {
        return this.swipes.length
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
      },
      onTouchMove(){

      },
      onTouchEnd(){

      },
      move(move = 0, offset = 0) {
//
      }
    }
  }
</script>

<style lang="stylus">
  @import "~@/assets/css/swipe.styl"
</style>
