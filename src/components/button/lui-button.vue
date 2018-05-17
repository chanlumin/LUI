<template>
  <!-- :is="tag"意思是这个组件是一个组件标签-->
  <component :is="tag"
             :type="nativeType"
             :disabled="disabled"
             :class="b([type,size,{
               block,
               loading,
               disabled,
               unclickable: disabled || loading,
               'bottom-action': bottomAction

             }])"
             @click="onClick"
  >
    <lui-loading v-if="loading" size="20px" :color="type==='default' ? 'black' : 'white'"></lui-loading>
    <span :class="b('text')">
      <slot>{{text}}</slot>
    </span>
  </component>
</template>

<script>
  import LuiLoading from '../loading/lui-loading.vue'
  import {bMixin} from '../../utils/bem'

  export default {
    name: 'lui-button',
    mixins:[bMixin],
    props: {
      text: String, // slot 穿进去
      block: Boolean, // 是否为块级元素
      loading: Boolean, // 是否有加载状态,
      disabled: Boolean, // 是否能够点击,
      nativeType: String, // 按钮类型是否是原生按钮
      bottomAction: Boolean,// 是否为底部行动按钮
      tag: {
        type: String,
        default: 'button' // 默认的tag是button
      },
      type: {
        type: String,
        default: 'normal' // 默认的按钮原色
      },
      size: {
        type:String,
        default:  'normal' // 默认的按钮大小
      }
    },
    methods: {
      onClick(event) {
        //  当不是loading状态并且不是非禁用的状态的时候派发一个click事件()
        if(!this.loading && !this.disabled) {
          console.log(event.target)
          this.$emit('click', event)
        }
      }
    },
    components: {
      LuiLoading
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~@/assets/css/button.styl";
</style>
