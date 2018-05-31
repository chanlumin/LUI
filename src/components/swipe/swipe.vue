<template>
  <div :class="b()">
    <div :class="b('track')">
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
    computed: {
      count() {
        return this.swipes.length
      },
      /**
       * 当前的Indicator的位置
       */
      activeIndicator() {
        //  当前Indicator的active的下标位置 + this.coutn除以this.count
        //  是为了处理负数的情况
        return (this.active + this.count) % this.count
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../assets/css/swipe.styl"
</style>
