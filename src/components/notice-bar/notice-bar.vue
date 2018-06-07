<template>
  <!--最外层的包裹-->
  <div v-show="showNoticeBar"
       :class="b({withicon:mode})"
       :style="barStyle"
       @click="$emit('click')"

  >
    <!--左边Icon-->
    <div v-if="leftIcon" :class="b('left-icon')">
      <img :src="leftIcon">
    </div>
    <!--中间滚动内容-->
    <div :class="b('wrap')" ref="wrap">
      <div
        ref="content"
       :class="[b('content'), animationClass]"
       :style="contentStyle"
       @animationend="onAnimationEnd"
       @webkitAnimationEnd="onAnimationEnd"
      >
        <slot>{{text}}</slot>
      </div>
    </div>
    <icon v-if="iconName"
          :class="b('right-icon')"
          :name="iconName"
          @click="onClickIcon"

    ></icon>
  </div>
</template>

<script>
  import {bMixin} from '../../utils/bem'
  export default {
    name : 'lui-notice-bar',
    mixins: [bMixin],
    props: {
      text: String, // 通知文本内容
      mode: String, // 通知栏模式 可选值为 closeable link
      color: String, // 文本颜色
      leftIcon: String, // 左边icon的url
      background: String,// 滚动条背景颜色
      delay:{ // 动画延迟事件 默认是1
        type: [String, Number],
        default: 1
      },
      scrollable: { // 是否在长度溢出的死后滚动播放
        type: Boolean,
        default: true
      },
      speed: { // 滚动速率
        default: 50 ,
        type: Number
      }
    },
    data() {
      return {
        showNoticeBar: true,
        animationClass: '',
      }
    },
    computed: {
      barStyle(){
        return {
          color : this.color,
          background:this.background
        }
      },
      contentStyle(){

      },
      iconName(){

      }
    },
    methods: {
      onAnimationEnd(){

      },
      onClickIcon(){

      }
    }
  }
</script>
<style lang="stylus">
  @import "~@/assets/css/notice-bar.styl"
</style>

