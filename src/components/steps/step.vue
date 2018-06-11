<template>
  <div class="lui-hairline" :class="b([$parent.direction, {[status]: status}])">
    <div :class="b('title')" :style="titleStyle">
      <slot></slot>
    </div>
    <div :class="b('circle-container')">
      <i :class="b('circle')" v-if="status!== 'process'"></i>
      <lui-icon v-else name="checked" :style="{color: $parent.activeColor}"></lui-icon>
    </div>
    <div :class="b('line')"></div>
  </div>
</template>

<script>
  import {bMixin} from '../../utils/bem'
  import LuiIcon from '../icon/icon.vue'
  export default {
    name : 'lui-step',
    mixins: [bMixin],
    beforeCreate() {
     this.$parent.steps.push(this)
    },
    computed: {
      status(){
        const index = this.$parent.steps.indexOf(this)
        const active = this.$parent.active

        console.log(index)
        if(index < active) {
          return 'finish'
        } else if(index === active){
          return 'process'
        }
      },
      titleStyle() {
        return this.status === 'process' ? {
          color: this.$parent.activeColor
        } : {}
      }
    },
    components: {
      LuiIcon
    }
  }
</script>
<style lang="stylus">
  @import "~@/assets/css/common/hairline.styl"
  @import "~@/assets/css/steps.styl"

</style>
