<template>
  <div :class="b()">
    <!--pull-refresh其实就是一个容器-->
    <div :class="b('track')"
         :style="style"
         @touchstart="onTouchStart"
         @touchmove="onTouchMove"
         @touchcancel="onTouchEnd"
    >
      <div :class="b('head')">
        <slot v-if="status==='normal'" name="normal"></slot>
        <slot v-if="status==='pulling'" name="pulling">
          <span :class="b('text')">{{pullingText}}</span>
        </slot>
        <slot v-if="status==='loosing'" name="loosing">
          <span :class="b('text')">{{loosingText}}</span>
        </slot>
        <slot v-if="status==='loading'" name="loading">
          <div :class="loading">
            <lui-loading></lui-loading>
            <span>{{pullingText}}</span>
          </div>
        </slot>
      </div>

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
      pullingText: String,
      loosingText: String,
      loadingText: String,
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
        status: 'normal',
        height: 0,
        duration: 0
      }
    },
    computed: {
      style() {
        return {
          transition: `${this.duration}ms`,
          transform: `translate3d(0,${this.height}px,0)`
        }
      }
    },
    methods: {
      onTouchStart() {

      },
      onTouchMove() {

      },
      onTouchEnd() {
        this.$emit('refresh')
      }
    },

    components: {
      LuiLoading
    }
  }
</script>
