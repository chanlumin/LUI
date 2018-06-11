<template>
  <div :class="b([direction])">
    <!--item上面的描述-->
    <div v-if="title || description" :class="b('status')">
      <div v-if="icon || $slots.icon" :class="b('icon')">
        <slot name="icon">
          <lui-icon :name="icon" :class="iconClass"></lui-icon>
        </slot>
      </div>

      <div :class="b('message')">
        <div :class="b('title')" v-text="title"></div>
        <div :class="b('desc')" class="lui-ellipsis" v-text="description"></div>
      </div>

      <slot name="message-extra"></slot>
    </div>

    <!--items-->
    <div :class="b('items',  {alone: !title && !description})">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {bMixin} from '../../utils/bem'
  import LuiIcon from '../icon/icon.vue'

  export default {
    name : 'lui-steps',
    mixins: [bMixin],
    props: {
      icon: String,
      active: Number,
      title: String,
      description: String,
      iconClass: String,
      direction: {
        type:String,
        default: 'horizontal'
      },
      activeColor: {
        type: String,
        default: '#06bf04'
      }
    },
    data() {
      return {
        steps: []
      }
    },
    components: {
      LuiIcon
    }
  }
</script>

<style lang="stylus">
  @import "~@/assets/css/steps.styl"
</style>
