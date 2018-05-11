<template>
  <div :class="b()" :style="style">
    <slot/>
  </div>
</template>


<script>
import {bMixin} from '@/utils/bem'
//console.log(bMixin)
// 因为
export default {
  name:'lui-row',
  mixins: [bMixin],
  props: {
    gutter: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    style() {
      // 1. 因为每个col都有margin-left和margin-right所有gutter要取一半
      // 2. 去掉最左边的col的margin-left和最右边的col的margin-right(利用margin为负数来实现)
      const margin = `-${Number(this.gutter)/2}px`
      return this.gutter ? {
        marginLeft: margin,
        marginRight: margin
      } : {}
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/css/row.styl"
</style>
