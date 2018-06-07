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
        wrapWidth: 0,
        duration: 0 ,
        offsetWidth: 0,
        firstRound: true
      }
    },
    watch: {
      text: {
        handler() {
          this.$nextTick(()=> {
            const {wrap, content} = this.$refs
            if(!wrap || !content) {
              return
            }
            const wrapWidth = wrap.getBoundingClientRect().width
            // 滚动条要滚动的长度
            const offsetWidth = content.getBoundingClientRect().width
            // 滚动的条件九四offsetWidth > wrapWidth才需要滚动
            if(this.scrollable && offsetWidth > wrapWidth) {
              this.wrapWidth = wrapWidth
              this.offsetWidth = offsetWidth
              this.duration = offsetWidth/this.speed
              // 条件满足 加上class
              this.animationClass = this.b('play')
            }
          })
        },
        immediate: true
      }
    },
    computed: {
      barStyle(){
        return {
          color : this.color,
          background:this.background
        }
      },
      /**
       * // 依赖firstRound和 this.duration的
       *  用于判断是否是第几轮滚动不是第一轮的话就需要加上paddingLeft
       */
      contentStyle(){
        return {
          paddingLeft: this.firstRound ? 0 : this.wrapWidth  + 'px',
          animationDelay: (this.firstRound ? this.delay : 0 )  + 's',
          animationDuration: this.duration + 's'
        }
      },
      iconName(){
        return this.mode === 'closeable' ? 'close' : this.mode === 'link' ? 'arrow' : ''
      }
    },
    methods: {
      onAnimationEnd(){
        this.firstRound = false
        this.$nextTick(()=> {
          this.duration = (this.offsetWidth + this.wrapWidth) / this.speed
          this.animationClass = this.b('play-infinite')
        })
      },
      onClickIcon(){
        // 让this.showNoticeBar等于fasle =>  此时的this.mode === 'closeable'
        this.showNoticeBar = this.mode !== 'closeable" '
      }
    }
  }
</script>
<style lang="stylus">
  @import "~@/assets/css/notice-bar.styl"
</style>

