<template>
  <div :class="b([type, color])" :style="style">
    <span :class="b('spinner',type)">
      <i v-for="item in (type === 'spinner' ? 12 : 0)"></i>
      <svg v-if="type === 'circular'" :class="b('circular')" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none"></circle>
      </svg>
    </span>
  </div>
</template>


<script>
  import {bMixin} from '../../utils/bem'
  export default {
    name : 'lui-loading',
    mixins: [bMixin],
    props:{
      size : String,
      type : {
        type: String,
        default: 'circular'
      },
      color: {
        type: String,
        default: 'black'
      }
    },
    computed: {
      style() {
        // loading的大小通过props传入size绑定style来控制
        return this.size ? {
            width: this.size,
            height: this.size
          } : {}
      }
    },
    mounted() {
    }

  }
</script>


<style lang="stylus" scoped>
  @import "~@/assets/css/loading.styl"
</style>
