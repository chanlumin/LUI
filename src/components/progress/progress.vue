<template>
  <div :class="b()">
    <span :class="b('portion',{'width-pivot': showPivot})"
          :style="portionStyle"
    >
      <span
        v-if="showPivot"
        ref="pivot"
        :style="pivotStyle"
        :class="b('pivot')"
      >
        {{pivotText}}
      </span>
    </span>
  </div>
</template>

<script>
  import {bMixin} from '../../utils/bem'
  export default {
    name : 'lui-progress',
    mixins: [bMixin],
    props: {
      inactive: Boolean, // 是否置为灰=> 一般置背景
      pivotColor: String, // 文字背景颜色
      percentage: { // 进度百分比
        type: Number,
        required: true ,
        validator: value=> value >= 0 && value <= 100
      },
      showPivot: { // 是否显示进度文字
        type: Boolean,
        default: true
      },
      pivotText: { // 文字显示
        type: String,
        default() {
          return this.percentage + '%'
        }
      },
      color : { // 进度条颜色
        type: String,
        default: '#38f'
      },
      textColor: { // 进度条文字颜色
        type: String,
        default: '#fff'
      }
    },
    mounted() {
      this.getWidth()
      console.log(this.progressWidth)
    },
    watch: {
      // 显示进度文字 因为pivot宽度和高度可能会变 所以要重新获取高度和宽度
      showPivot() {
        this.getWidth()
      },
      // 进度文字改变也需要重新获取高度和宽度
      pivotText() {
        this.getWidth()
      }
    },
    data() {
      return {
        pivotWidth: 0,
        progressWidth: 0
      }
    },
    computed: {
      currentColor() {
        return this.inactive ? '$cacaca' : this.color
      },
      /**
       * 进度条文字和背景颜色
       */
      pivotStyle(){
        return {
          color : this.textColor,
          background: this.pivotColor || this.currentColor // 文字背景颜色
        }
      },
      /**
       * 进度样式
       * @returns {{width: string, background: computed.currentColor}}
       */
      portionStyle(){
        return {
          // 进度条总宽度 减去 小圈圈 再去算百分比
          width: (this.progressWidth - this.pivotWidth) * this.percentage / 100 + 'px',
          background: this.currentColor
        }
      }
    },
    methods: {
      // HTMLElement.offsetWidth 是一个只读属性，返回一个元素的布局宽度。
      // 一个典型的（各浏览器的offsetWidth可能有所不同）
      // offsetWidth是测量包含元素的边框(border)、
      // 水平线上的内边距(padding)、
      // 竖直方向滚动条(scrollbar)（如果存在的话）、
      // 以及CSS设置的宽度(width)的值。
      getWidth() {
        this.progressWidth = this.$el.offsetWidth
        this.pivotWidth = this.$refs.pivot ? this.$refs.pivot.offsetWidth : 0
      }
    }
  }
</script>


<style lang="stylus">
  @import "~@/assets/css/progress.styl"

</style>
