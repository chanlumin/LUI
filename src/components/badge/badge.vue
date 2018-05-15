<template>
  <!-- van-hairline -->
  <a :href="href" :class="[b({select}),'lui-hairline']" @click="onClick">
    <!--传入info之后才需要显示-->
    <div v-if="isDef(info)" :class="b('info')" >{{info}}</div>
    {{title}}
  </a>
</template>


<script>
  import {isDef} from '../../utils/utils'
  import {bMixin} from '../../utils/bem'
  export default {
    name : 'lui-badge',
    mixins: [bMixin],
    props: {
      href: {
        type: String,
      },
      info: {
        type: [String, Number]
      },
      title: {
        type: String
      }

    },
    beforeCreate(){
      // 在创建之前把自己push进去父亲的组件当中
      this.$parent.badges.push(this)
    },
    computed: {
      select() {
        // 当前的key是否等于父亲的parentKey
        return this.$parent.badges.indexOf(this) === this.$parent.activeKey
      }
    },
    methods: {
      isDef,
      onClick() {
        // 当点击click把key传出去 在调用的时候 设置父组件的activeKey
        this.$emit('click', this.$parent.badges.indexOf(this))
      }
    }


  }
</script>


<style lang="stylus" scoped>
  @import "~@/assets/css/badge.styl"
  @import "~@/assets/css/common/hairline.styl";
</style>
