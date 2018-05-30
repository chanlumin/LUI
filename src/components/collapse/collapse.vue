<template>
  <div :class="b()" class="lui-hairline--top-bottom">
    <slot></slot>
  </div>
</template>


<script>
  import {bMixin} from '../../utils/bem'
  export default {
    name: 'lui-collapse',
    mixins: [bMixin],
    props: {
      accordion: Boolean, // 展开方式是是否是手风琴效果
      value: [String, Number, Array] // 当前面板的的名字 => 对应v-model
    },
    data() {
      return {
        // 手机collapse item
        items: []
      }
    },
    methods: {
      /**
       * @param name 切换的collapse-item的名字
       * @param expanded 每个collapse是否展开的状态
       */
      switch(name, expanded) {
        // 如果不是手风琴效果
        if(!this.accordion) {
          // value => 当前已经展开的collapse-item
          name = expanded ?
            this.value.concat(name)
            : this.value.filter(activeName => activeName !== name)
          // filter 会返回一个不包含name的的activeName的数组

          // 通知修改v-model的value
          // change切换面板的时候触发
          this.$emit('change',name)
          this.$emit('input', name)
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~@/assets/css/common/hairline.styl"
</style>
