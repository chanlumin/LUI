<template>
  <lui-cell-group :class="b()">
    <slot name="header">
      <lui-cell :class="b('header')" :title="title" :laber="desc" :value="status"></lui-cell>
    </slot>
    <div :class="b('content')">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" :class="b('footer')">
      <slot name="footer"></slot>
    </div>
  </lui-cell-group>
</template>

<script>
  import {bMixin} from '../../utils/bem'
  import LuiCellGroup from '../cell/cell-group.vue'
  import LuiCell from  '../cell/cell.vue'

  export default {
    name : 'lui-panel',
    mixins: [bMixin],
    props: {
      desc: String,
      title: String,
      status: String
    },
    components: {
      LuiCellGroup,
      LuiCell
    }
  }
</script>


<style lang="stylus">
  @import "~@/assets/css/panel.styl"
</style>



