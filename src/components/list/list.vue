<template>
  <div :class="b()">
    <slot></slot>
    <div v-show="loading" :class="b('loading')">
      <slot name="loading">
        <lui-loading>
        </lui-loading>
        <span :class="b('loading-text')">{{loadingText}}</span>
      </slot>
    </div>

  </div>
</template>


<script>

  import {bMixin} from '../../utils/bem'
  import {on, off} from '../../utils/event'
  import sUtil from '../../utils/scroll'
  import LuiLoading from '../loading/lui-loading.vue'


  export default {
    name : 'lui-list',
    // v-model="true" => 绑定的是loading
    model: {
      // 把默认的v-model的props为value 修改为loading
      // 次数应该是prop而不是props
      prop: 'loading'
    },
    mixins: [bMixin],
    props: {
      loading: Boolean,
      finished: Boolean,
      immediateCheck: {
        type: Boolean,
        default: true
      },
      offset:  {
        type: Number,
        default : 300
      },
      loadingText: String

    },
    mounted() {
      this.scroller = sUtil.getScrollEventTarget(this.$el)
      this.handler(true)
      if(this.immediateCheck) {
        this.$nextTick(this.onScroll)
      }

    },
    destroyed() {
      // 移除相应的事件
      this.handler(false);
    },
    // keep-alive组件激活的时候
    activated() {
      this.handler(true)
    },
    // keep-alive组件不激活的时候
    deactivated() {
      this.handler(false)
    },
    watch: {
      loading() {
        this.$nextTick(this.onScroll)
      },
      finished(){
        this.$nextTick(this.onScroll)
      }
    },
    methods: {
      onScroll() {
        console.log(this.loading)
        console.log(this.finished)
        // 正在loading 或者刚刚借宿
        if(this.loading || this.finished) {
          console.log('hi true')
          return
        }
        console.log('hi guys true')

        const el = this.$el
        const {scroller} = this
        const scrollerHeight = sUtil.getVisibleHeight(scroller)

        if(!scrollerHeight || sUtil.getComputedStyle(el).display === 'none') {
          return
        }

        const scrollTop = sUtil.getScrollTop(scroller)
        const targetBottom = scrollTop + scrollerHeight

        let reachBootm = false
        if(el === scroller) {
          reachBootm = scroller.scrollHeight - targetBottom < this.offset
        } else {
          // 这里的scroller指的是window el就是需要滚动的元素 此时需要加一个el到window顶端的的边距
          const elBottom = sUtil.getElementTop(el) +
              sUtil.getVisibleHeight(el) -
              sUtil.getElementTop(scroller)
          //  scrollHeight 其实是 真个window的高度
          reachBootm = elBottom - scrollerHeight < this.offset
        }
        if(reachBootm) {
          // input -> v-model默认把value当作prop 把input当作event
          this.$emit('input', true)
          // 通知需要加载了
          this.$emit('load')
        }
      },
      handler(bind) {
        if(this.binded !== bind) {
          this.binded = bind;
          (bind ? on : off)(this.scroller, 'scroll', this.onScroll)
        }
      }
    },
    components: {
      LuiLoading
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/css/list.styl"
</style>
