<template>
  <ul :class="b({simple : !isMultiMode})">
    <!--上一步按钮-->
    <li class="lui-hairline"
        :class="[b('item', {disabled: value===1}), b('prev')]"
        @click="selectPage(value-1)"
    >
      {{prevText}}
    </li>
    <!--默认模式-->
    <li v-if="isMultiMode"
        v-for="(page, index) in pages"
        :class="[b('item'), {active: page.active}]"
        @click="selectPage(page.number)"
    >
      {{page.text}}
    </li>
    <!--简单模式 -->
    <li v-if="!isMultiMode" :class="b('page-desc')">
      <slot name="pageDesc">{{pageDesc}}</slot>
    </li>
    <!--下一页按钮-->
    <li class="lui-hairline"
        :class="[b('item', {disabled: value === computedPageCount})]"
        @click="selectPage(value+1)"
    >
      {{nextText}}
    </li>


  </ul>
</template>


<script>
  import {bMixin} from "../../utils/bem"

  export default {
    name : 'lui-pagination',
    mixins: [bMixin],
    props: {
      value: Number,
      nextText:String,
      prevText:String,
      itemsPerPage: {
        type:Number,
        default:10
      },
    },
    computed: {
      isMultiMode() {
        return this.mode === 'multi'
      },
      pageDesc(){

      },
      pages(){

      },
      computedPageCount(){

      }
    },
    methods: {
      selectPage(page) {

      }
    }

  }
</script>

<style lang="stylus">
  @import "~@/assets/css/pagination.styl"
</style>
