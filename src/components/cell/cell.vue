<template>
  <div :class="[
    b({
      center,
      required,
      clickable: isLink || clickable
    }),
    {'lui-hairline': border}
  ]" @click="onClick">
    <slot name="icon">
      <icon v-if="icon" :class="b('left-icon')" :name="icon"></icon>
    </slot>
    <!--$slots.title代表的slot的name为title的组件-->
    <div v-if="title || $slots.title" :class="b('title')">
      <slot name="title">
        <span v-text="title"></span>
        <div v-if="label" v-text="label" :class="b('label')"></div>
      </slot>
    </div>

    <div v-if="value || $slots.default" :class="b('value', {alone: !$slots.title && !title})">
      <slot>
        <span v-text="value"></span>
      </slot>
    </div>

    <slot name="right-icon">
      <lui-icon v-if="isLink" :class="b('right-icon')" name="arrow"></lui-icon>
    </slot>

    <slot name="extra"></slot>
  </div>
</template>


<script>
  import LuiIcon from '../icon/icon.vue'
  import RouterLink from  '@/utils/router-link.js'
  import {bMixin} from '../../utils/bem'
  export default {
    name:'lui-cell',
    mixins: [RouterLink,bMixin],
    props: {
      icon: String,
      title: String,
      label: String,
      center: Boolean,
      isLink: Boolean,
      required: Boolean,
      clickable: Boolean,
      value: [String, Number],
      border: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClick() {
        this.$emit('click')
        //
        this.routerLink()
      }
    },
    components: {
      LuiIcon
    }
  }
</script>

<style lang="stylus" scoped>
@import "~@/assets/css/cell.styl"
@import "~@/assets/css/common/hairline.styl"
</style>
