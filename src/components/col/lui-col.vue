<template>
  <div class="lui-col" :class="{[`lui-col-${span}`]: span,[`lui-col-offset-${offset}`]: offset}" :style="style">
    <slot/>
  </div>
</template>


<script>
  export default {
    name: 'lui-col',
    props: {
      span : {
        type:[Number, String]
      },
      offset: {
        type:[Number, String]
      }
    },
    computed: {
      gutter() {
        return this.$parent ? Number(this.$parent.gutter) : 0
      },
      style() {
        const padding = `${this.gutter/2}px`
        // 有gutter的时候才需要设置padding 实际上gutter是利用padding去完成的
        return this.gutter ? {
          paddingLeft: padding,
          paddingRight: padding
        } : {}

      }
    }
  }

</script>


<style lang="stylus" scoped>
  @import "~@/assets/css/col.styl"
</style>

