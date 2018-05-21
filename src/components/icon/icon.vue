<template>
  <i :class="[b(),`lui-icon-${name}`]" v-on="$listeners">
    <slot></slot>
    <div v-if="isDef(info)" :class="b('info')">{{info}}</div>
  </i>
</template>


<script>
  import {isDef} from '../../utils/utils'
  import {bMixin} from '../../utils/bem'
  export default {
    name : 'lui-icon',
    mixins: [bMixin],
    props: {
      name : String,
      info : [String, Number]
    },
    methods: {
      isDef
    }
  }
</script>

<style lang="stylus">
  @import "~@/assets/css/icon.styl"
</style>
