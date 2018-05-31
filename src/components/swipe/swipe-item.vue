<template>
  <div :class="b()" :style="style">
    <slot></slot>
  </div>
</template>

<script>
  import {bMixin} from '../../utils/bem'
  export default {
    name : 'lui-swipe-item',
    mixins: [bMixin],
    data() {
      return {
        // 每一个swipe-item都有一定的偏移
        offset: 0
      }
    },
    computed: {
      style() {
        // 从父组件去结构vertical和width和height
        const {vertical, width, height} = this.$parent
        // 垂直的时候他是height+'px' 不是垂直的话 默认是100%
        return {
          width : width + 'px',
          height : vertical ?  height + 'px' : '100%',
          transform: `translate${vertical?'Y': 'x'}(${this.offset}px)`
        }
      }
    },
    beforeCreate() {
      // 在完成创建之前就把自己push到父亲组件当中
      this.$parent.swipes.push(this);
    },
    destroyed() {
      this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1)
    }
  }
</script>

<style lang="stylus">
  /*@import "~@/assets/css/swipe.styl"*/
</style>
