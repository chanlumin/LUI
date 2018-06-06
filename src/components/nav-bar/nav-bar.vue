<template>
  <div class="lui-hairline-bottom"
       :class="b({fixed})"
       :style="style"
  >
  <div :class="b('left')" @click="$emit('click-left')">
      <slot name="left">
        <lui-icon v-if="leftArrow" :class="b('arrow')" name="arrow"></lui-icon>
        <span v-if="leftText" v-text="leftText"></span>
      </slot>
    </div>
    <div :class="b('title')" class="van-ellipsis">
      <slot name="title">{{title}}</slot>
    </div>
    <div :class="b('right')" @click="$emit('click-right')">
      <slot name="right">
        <span v-if="rightText" v-text="rightText"></span>
      </slot>
    </div>

  </div>
</template>

<script>
  import {bMixin} from '../../utils/bem'
  import LuiIcon from '../icon/icon.vue'

  export default {
    name : 'lui-nav-bar',
    mixins:[bMixin],
    props: {
      title: String,
      leftText: String,
      rightText: String,
      leftArrow: Boolean,
      fixed: Boolean,
      zIndex: {
        type: Number,
        default: 1
      }
    },
    computed: {
      style() {
        return {
          zIndex: this.zIndex
        }
      }
    },
    components: {
      LuiIcon
    }
  }
</script>


<style lang="stylus">
  @import "~@/assets/css/nav-bar.styl"
  @import "~@/assets/css/common/hairline.styl"
</style>
