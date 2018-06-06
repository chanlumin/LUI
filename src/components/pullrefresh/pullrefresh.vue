<template>
  <div :class="b()">
    <!--pull-refresh其实就是一个容器-->
    <div :class="b('track')"
         :style="style"
         @touchstart="onTouchStart"
         @touchmove="onTouchMove"
         @touchend="onTouchEnd"
         @touchcancel="onTouchEnd"
    >
      <!--此处是下拉加载时候最上面的文本内容-->
      <div :class="b('head')">
        <slot v-if="status==='normal'" name="normal"></slot>
        <slot v-if="status==='pulling'" name="pulling">
          <span :class="b('text')">{{pullingText}}</span>
        </slot>
        <slot v-if="status==='loosing'" name="loosing">
          <span :class="b('text')">{{loosingText}}</span>
        </slot>
        <slot v-if="status==='loading'" name="loading">
          <div :class="b('loading')">
            <lui-loading></lui-loading>
            <span>{{loadingText}}</span>
          </div>
        </slot>
      </div>
       <!--此处的slot用来填充内容的-->
      <slot></slot>
    </div>
  </div>
</template>


<script>
  import {bMixin} from '../../utils/bem'
  import sUtil from '../../utils/scroll'
  import Touch from '../../utils/touch'
  import LuiLoading from '../loading/lui-loading.vue'

  export default {
    name: 'lui-pull-refresh',
    mixins: [Touch, bMixin],
    props: {
      pullingText: {
        type:String,
        default:'下拉即可刷新...'
      },
      loosingText: {
        type: String,
        default: '释放即可刷新...'
      },
      loadingText: {
        type: String,
        default: '加载中...'
      },
      value: {
        type: Boolean,
        required: true
      },
      animationDuration: {
        type: Number,
        default: 300
      },
      headHeight: {
        type: Number,
        default: 50
      }
    },
    data() {
      return {
        loading: false,
        status: 'normal',
        height: 0,
        duration: 0
      }
    },
    computed: {
      style() {
        console.log(this.height)
        return {
          transition: `${this.duration}ms`,
          transform: `translate3d(0,${this.height}px,0)`
        }
      }
    },
    mounted() {
      this.scrollEl = sUtil.getScrollEventTarget(this.$el)
    },
    watch: {
      /**
       * value是v-model对应的loading
       * @param val
       */
      value(val) {
        console.log(val)
        this.duration = this.animationDuration
        // 通过isLoading的值重置this.status
        // 如果是loading的时候 此时的height就是headHeight
        this.getStatus(val ? this.headHeight : 0, val)
      }
    },
    methods: {
      onTouchStart() {
        if(this.status === 'loading') {
          return
        }
        // 进行开始触碰的时候 首先要判断是否在
        if(this.getCeiling()) {
          // 开始的时候设置duration
          this.duration = 0;
          // 记录开始的位置
          this.touchStart(event)
        }
      },
       // 记录此时的status
      onTouchMove(event) {
        // 其实touchMove是不断调用的所以每次都会调用
        // this.getStaus 来重置status的height
        if(this.status === 'loading') {
          return
        }
        this.touchMove(event)


        if(this.ceiling && this.deltaY > 0) {
          if(this.direction === 'vertical') {
            //
            this.getStatus(this.ease(this.deltaY));
            event.preventDefault()
          }
        }
      },
      onTouchEnd() {
        if(this.status === 'loading') {
          return
        }
        // 只有loosing的时候=>下一步的状态流转才是loading
        // loading的时候 才需要触发input 事件也就是v-model对应的事件和refresh事件
        if(this.ceiling && this.deltaY) {
          this.duration = this.animationDuration;
          if(this.status === 'loosing') {
            // 第二个参数填写true此时的状态就变为loading=>此时就不能再进行touch事件的触发
            // 此时让pulling下来的height重新变为50也就是this.headHeight
            this.getStatus(this.headHeight, true)
            this.$emit('input', true)
            this.$emit('refresh')
          } else {
            //  this.status=>为normal
            this.getStatus(0)
          }
        }
      },
      // 限制height的高度 不能超过2*headHeight
      ease(height) {
        const {headHeight} = this
        return height < headHeight ?
          height : height < 2 * headHeight ?
            Math.round(headHeight + (height-headHeight)/2) :
            Math.round(headHeight * 1.5 + (height - headHeight * 2)/4)
      },
      /**
       * 获取当前的status
       * @param height
       * @param isLoading
       */
      getStatus(height, isLoading) {
        this.height = height

        // isLoading是正在夹杂数据 否则都是准备进行加载这个动作
        // 每次都是判断冒号的最后边的那个条件
        // 1 如果isLoading为true 就是loading状态
        // 2. 否则不是loading的时候 height === 0 那么就是normal壮体啊
        // 3. 否则如果height < this.headHeight的话那么就是pulling准状态
        // 4. 否则就是loosing 状态
        const status = isLoading ?
          'loading' : height === 0 ?
            'normal' : height < this.headHeight ?
              'pulling' : 'loosing'
        if(status !== this.status) {
          this.status = status
        }
      },
      getCeiling() {
        // scrollEl是否回到了顶部
        this.ceiling = sUtil.getElementTop(this.scrollEl) === 0
        return this.ceiling
      }

    },

    components: {
      LuiLoading
    }
  }
</script>

<style lang="stylus">
  @import "~@/assets/css/pull-refresh.styl"
</style>
