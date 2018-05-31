<template>
  <div :class="[b({expanded}),
  {'lui-hairline--top': index}
  ]" >
    <lui-cell :class="b('title')" is-link @click="onClick">
      <slot name="title">{{title}}</slot>
    </lui-cell>
    <div v-show="expanded" :class="b('content')">
      <slot></slot>
    </div>
  </div>
</template>


<script>
  import {bMixin} from '../../utils/bem'
  import findParent from '../../utils/find-parent'
  import {isDef} from '../../utils/utils'
  import LuiCell from '../cell/cell.vue'
  export default {
    name : 'lui-collapse-item',
    mixins: [bMixin,findParent],
    props: {
      name : [String, Number],
      title: String
    },
    computed: {
      items() {
        return this.parent.items
      },
      index() {
        return this.items.indexOf(this)
      },
      /**
       * 当前的collapse-item组件的名字 如果有名字返回名字
       * 否则返回他在父亲的items的index
       * @returns {computed.index}
       */
      currentName() {
        return isDef(this.name) ? this.name : this.index
      },
      expanded() {
        // 结构父亲组件已经展开的collapse-item的value数组
        const { value } = this.parent
        // 如果是accordion的话只需要对比value否则就要从数组中找到
        return this.parent.accordion
          ? value === this.curretName
          : value.some(name => name === this.currentName)
      }
    },
    created(){
      this.findParent('lui-collapse')
//      console.log(this.parent)
      this.items.push(this)
    },
    destroyed() {
      this.items.splice(this.index, 1)
    },
    methods: {
      onClick() {
        const {parent} = this // 从当前的组件结构出父亲元素
        // 其实就是切换 切换需要做的事情就是获取namer 然后调用父亲的的switch组件
        // accordion如果还是点击的原来的那个元素那就不不需要传入name 非accordion的话全全都要传入this.currentName
        const name = parent.accordion && this.currentName === parent.value ? '' : this.currentName
        this.parent.switch(name, !this.expanded)
      }
    },
    components: {
      LuiCell
    }
  }

</script>

<style lang="stylus">
  // 此处不要写scoped了不然样式应用不到组件里面嵌套的组件
  @import "~@/assets/css/collapse.styl"
  @import "~@/assets/css/common/hairline.styl"
</style>
