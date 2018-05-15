<template>
  <div :class="b()" class="lui-hairline--top-bottom">
    <slot/>
  </div>
</template>


<script>
  import {bMixin} from '../../utils/bem'
  export default {
    name:'lui-badge-group',
    mixins: [bMixin],
    props: {
      activeKey : {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        badges: []
      }
    }

  }
</script>
<style lang="stylus" scoped>
  @import "~@/assets/css/common/hairline.styl"
</style>
