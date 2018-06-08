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
        class="lui-hairline"
        :class="[b('item', {active: page.active}),b('page')]"
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
      pageCount: Number,
      forceEllipses:Boolean,
      mode: {
        type: String,
        default: 'multi'
      },
      showPageSize: { // 显示的分页按钮数
        type: Number,// 默认显示5页的页码 上一页 1 2 3 4 5 下一页
        default: 5
      },
      itemsPerPage: {
        type:Number,
        default:10
      },
      totalItems: {
        type: Number,
        default: 0
      }
    },
    computed: {
      isMultiMode() {
        return this.mode === 'multi'
      },
      // 简单模式的页码显示方式
      pageDesc(){
        return this.value + '/' + this.computedPageCount
      },
      pages(){
        const pages = []
        const pageCount = this.computedPageCount

        let startPage = 1
        let endPage = pageCount
        // showPageSize => 显示的页码数目
        const isMaxSized = (this.showPageSize !== void 0) && this.showPageSize < pageCount
        //
        console.log(isMaxSized, this.showPageSize)
        if(isMaxSized) {
          startPage = Math.max(this.value - Math.floor(this.showPageSize/2), 1)
          endPage = startPage + this.showPageSize - 1
          // 根据v-model计算得到的endPage 如果 endpage > pageCount => 修正endPage
          if(endPage > pageCount) {
            endPage = pageCount
            startPage = endPage - this.showPageSize + 1
          }

        }

        // 制作pages数组 也即是从startPage到 endPage这一段的数组
        for(let number = startPage; number <= endPage; number++) {
          const page = this.makePage(number, number, number === this.value)
          pages.push(page)
        }

        // 添加...
        if(isMaxSized && this.showPageSize > 0 && this.forceEllipses) {
          if(startPage > 1) {
            const PreviousPageSet = this.makePage(startPage-1, '...', false)
            // unshift是从数组的前面添加对象的
            pages.unshift(PreviousPageSet)
          }
          if(endPage < pageCount) {
            const nextPageSet = this.makePage(endPage+1, '...', false)
            pages.push(nextPageSet)
          }
        }
        return pages

      },
      /**
       * 总共需要几页
       * 总记录数/每页几个记录数
       */
      computedPageCount(){
        const count = this.pageCount || Math.ceil(this.totalItems/this.itemsPerPage)
        // 如果count < 1的那么默认给1
        return Math.max(1, count)
      },
    },
    watch: {
      // 一开始初始化的时候就开始watch=>currentPage => 执行selectPage
      value: {
        handler(page) {
          this.selectPage(page || this.value)
        },
        immediate: true
      }
    },
    methods: {
      /**
       * 点击哪一页的时候
       * @param page
       */
      selectPage(page) {
        // 1. 验证数据  最小1 最大 this.computedPageCount
        page = Math.max(1, page)
        page = Math.min(this.computedPageCount, page)
        if(this.value !== page) {
          // this.value是v-model 对应的currentPage
          this.$emit('input', page)
          // 页码改变的时候触发
          this.$emit('change', page)
        }
      },
      makePage(number, text, active) {
        return {number, text, active}
      }
    }

  }
</script>

<style lang="stylus">
  @import "~@/assets/css/pagination.styl"
  @import "~@/assets/css/common/hairline.styl"
</style>
