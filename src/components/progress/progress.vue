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
    computed: {
      pivotStyle(){

      },
      portionStyle(){

      }
    }
  }
</script>


<style lang="stylus">
  @import "~@/assets/css/progress.styl"

</style>
