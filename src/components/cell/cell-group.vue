<template>
  <div :class="[b(), {'lui-hairline--top-bottom': border}]">
    <slot></slot>
  </div>
</template>

<script>
  import {bMixin} from '../../utils/bem'
  export default {
    name : 'lui-cell-group',
    mixins: [bMixin],
    props: {
      border : {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/css/common/hairline.styl"
</style>
