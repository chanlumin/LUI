<template>
  <div class="Home">
    <!--rate-->
    <div class="mb20">
      <lui-rate
        v-model="rate1"
        :size="25"
        :count="6"
        color="#2ba"
        void-color="#ceefe8"
      >

      </lui-rate>
    </div>
    <!--progress-->
    <div class="mb20">
      <lui-progress :percentage="50" class=""mb20></lui-progress>
      <lui-progress
        class="mb20"
        :percentage="75"
        pivot-text="紫色"
        pivot-color="#7232dd"
        color="linear-gradient(to right, #be99ff, #7232dd)"
      >

      </lui-progress>
      <lui-progress
        :percentage="50"
        pivot-text="红色"
        color="#f3594b"
        class="mb20"
      ></lui-progress>
    </div>
    <!--panel-->
    <div class="mb20">
      <lui-panel title="这就是哈哈哈"
                 desc="描述内容"
                 status="状态"
      >
        <div>随便填写一些slot上面的内功</div>
        <div slot="footer">随便填写一些slot上面的内功</div>
      </lui-panel>
    </div>

    <!--pagination-->
    <div class="mb20">
      <lui-pagination v-model="currentPage1"
                      :total-items="100"
                      :items-per-page="5"
                      prev-text="上一页"
                      next-text="下一页"

      >

      </lui-pagination>
      <lui-pagination v-model="currentPage1"
                      :total-items="100"
                      :items-per-page="5"
                      prev-text="上一页"
                      next-text="下一页"
                      force-ellipses

      >

      </lui-pagination>
      <lui-pagination v-model="currentPage1"
                      :total-items="100"
                      :items-per-page="5"
                      prev-text="上一页"
                      next-text="下一页"
                      mode="simple"

      >

      </lui-pagination>
    </div>
    <!--notice-bar-->
    <div class="mb20">
      <lui-notice-bar
        text="你好,我们是这样子的哈哈哈哈哈哈哈就是这样子哈哈就是这样子哈哈就是这样子哈哈就是这样子就是这样子的"
        left-icon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
      >

      </lui-notice-bar>
    </div>
    <!--nav bar-->
    <div class="mb20">
      <lui-nav-bar title="导航栏"
                   left-text="back"
                   right-text="button"
                   left-arrow
                   @click-left="onClickLeft"
                   @click-right="onClickRight"
      >
      </lui-nav-bar>
    </div>

    <div class="mb20">
      <lui-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <p>刷新次数: {{ pCount }}</p>
      </lui-pull-refresh>
    </div>
    <div id="test">
      测试测试测试测试测试测试测试测试测试测试
    </div>
    <lui-row class="h" :gutter="gutter">
      <lui-col class="h c" :span="12"></lui-col>
      <lui-col class="h c" :span="12"></lui-col>
    </lui-row>
    <lui-row class="h" :gutter="gutter">
      <lui-col class="h c" :span="12" :offset="12"></lui-col>
    </lui-row>
    <div class="app">
      <lui-row class="h" gutter="20">
        <lui-col class="h c" span="8">span: 8</lui-col>
        <lui-col class="h c" span="8">span: 8</lui-col>
        <lui-col class="h c" span="8">span: 8</lui-col>
      </lui-row>
    </div>

    <!--badge-->
    <div id="badgeWrap">
      <lui-badge-group :activeKey="activeKey">
        <lui-badge @click="badgeClick" title="badge1" info="99"></lui-badge>
        <lui-badge @click="badgeClick" title="badge2"></lui-badge>
        <lui-badge @click="badgeClick" title="badge3" info="233"></lui-badge>
        <lui-badge @click="badgeClick" title="badge4" info="1"></lui-badge>
      </lui-badge-group>

    </div>

    <!--loading-->
    <div id="wrap">
      <lui-loading color="black"></lui-loading>
      <lui-loading color="white"></lui-loading>
      <lui-loading type="spinner" color="black"></lui-loading>
      <lui-loading type="spinner" color="white"></lui-loading>
    </div>

    <div class="wrap">
      <lui-button size="large">large</lui-button>
      <lui-button size="normal">normal</lui-button>
      <lui-button size="small">small</lui-button>
      <lui-button size="mini">mini</lui-button>
      <lui-button disabled>disabled</lui-button>
      <lui-button loading/>
      <lui-button type="default">default</lui-button>
      <lui-button loading type="primary">disabled</lui-button>
      <lui-button tag="a" href="https://www.baidu.com" target="_blank">disabled</lui-button>
      <lui-button type="primary" bottomAction>bottomAction</lui-button>
    </div>

    <!--icon-->
    <div class="wrap">
      <lui-icon name="coupon"></lui-icon>
      <span>coupon</span>
    </div>


    <!--cell-->
    <lui-cell-group >
      <lui-cell title="hello" value="world"></lui-cell>
      <lui-cell title="hello" label="描述信息"></lui-cell>
      <!--只设置value左侧的内容会左对齐-->
      <lui-cell value="内容"></lui-cell>
      <!--通过icon属性在标题左侧展示图标-->
      <lui-cell value="内容"></lui-cell>
      <!--通过传入isLink在右侧显示箭头-->
      <lui-cell value="内容"></lui-cell>
      <lui-cell value="内容">
        <lui-icon slot="right-icon" name="search" class="lui-cell__right-icon"></lui-icon>
      </lui-cell>
    </lui-cell-group>

    <lui-circle v-model="currentRate1"
                :rate="rate"
                :speed="100"
                :text="text"
                class="cl"

    ></lui-circle>
    <lui-circle v-model="currentRate1"
                :rate="rate"
                :speed="100"
                :text="text"
                class="cl" :clockwise="false"

    ></lui-circle>
    <div>
      <lui-button type="primary" size="small" @click="add">增加</lui-button>
      <lui-button type="danger" size="small" @click="reduce">减少</lui-button>
    </div>

    <div class="mb20">
      <!-- collapse -->
      <lui-collapse v-model="cActive">
        <lui-collapse-item :title="title1">{{content1}}</lui-collapse-item>
        <lui-collapse-item :title="title2">{{content2}}</lui-collapse-item>
      </lui-collapse>
    </div>

    <div class="mb20">
      <lui-swipe>
        <lui-swipe-item>1</lui-swipe-item>
        <lui-swipe-item>2</lui-swipe-item>
        <lui-swipe-item>3</lui-swipe-item>
      </lui-swipe>
    </div>
    <div class="mb20">
      <lui-list v-model="loading" :finished="finished" @load="onLoad">
        <lui-cell v-for="item in list" :key="item" :title="item + ''"></lui-cell>
      </lui-list>
    </div>





  </div>
</template>

<script>
  import LuiRow from "./row/lui-row.vue";
  import LuiCol from "./col/lui-col.vue"
  import LuiBadgeGroup from './badge/badge-group.vue'
  import LuiBadge from './badge/badge.vue'
  import LuiLoading from './loading/lui-loading.vue'
  import LuiButton from './button/lui-button.vue'
  import LuiIcon from './icon/icon.vue'
  import LuiCellGroup from './cell/cell-group.vue'
  import LuiCell from './cell/cell.vue'
  import LuiCircle from './circle/circle.vue'
  import LuiCollapse from './collapse/collapse.vue'
  import LuiCollapseItem from './collapse/collaspe-item.vue'
  import LuiSwipe from './swipe/swipe.vue'
  import LuiSwipeItem from './swipe/swipe-item.vue'
  import LuiList from './list/list.vue'
  import LuiPullRefresh from './pullrefresh/pullrefresh.vue'
  import LuiNavBar from './nav-bar/nav-bar.vue'
  import LuiNoticeBar from './notice-bar/notice-bar.vue'
  import LuiPagination from './pagination/pagination.vue'
  import LuiPanel from './panel/panel.vue'
  import LuiProgress from './progress/progress.vue'
  import LuiRate from './rate/rate.vue'

  const format = rate => Math.min(Math.max(rate,0),100)
  export default {
    name: 'Home',
    data(){
      return {
        rate: 30,
        gutter: 24,
        activeKey:0,
        currentRate1 : 0,
        title1: 'hello vue.js',
        title2: 'hello wolrd',
        content1: 'hello i i i i i i ',
        content2: 'hi 前端框架 百家争鸣的时代',
        cActive: [0], // 只有accordion才能传入一个值 0,
        list: [],
        loading: false,
        finished: false,
        pCount: 0,
        isLoading: false,
        currentPage1: 1,
        rate1: 3

      }
    },
    methods: {
      badgeClick(key){
        this.activeKey = key
      },
      add() {
        this.rate = format(this.rate + 20)
        console.log(this.rate)
      },
      reduce() {
        this.rate = format(this.rate - 20)
      },
      onLoad() {
        setTimeout(()=> {

          for(let i = 0; i < 10; i++) {
            const text = this.list.length + 1
            this.list.push(text < 10? '0' + text : text)
          }
          console.log(this.list.length)
          this.loading= false
          if(this.list.length >= 40) {
            this.finished = true
          }
        }, 500)
      },
      onRefresh() {
        setTimeout(()=> {
          this.isLoading = false
          this.pCount++
        }, 500)
      },
      onClickLeft() {
        console.log('click left')
      },
      onClickRight() {
        console.log('click right')
      }
    },
    computed: {
      text() {
        return this.currentRate1.toFixed(0) + '%'
      }
    },
    components: {
      LuiRow,
      LuiCol,
      LuiBadgeGroup,
      LuiBadge,
      LuiLoading,
      LuiButton,
      LuiIcon,
      LuiCellGroup,
      LuiCell,
      LuiCircle,
      LuiCollapse,
      LuiCollapseItem,
      LuiSwipe,
      LuiSwipeItem,
      LuiList,
      LuiPullRefresh,
      LuiNavBar,
      LuiNoticeBar,
      LuiPagination,
      LuiPanel,
      LuiProgress,
      LuiRate
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  @import "~@/assets/css/common/ellipse.styl"
  @import "~@/assets/css/common/var.styl"
  #test
    width:20px
    ellipse()
  .h
    height 20px
  .c
    background-color $blue
    background-clip content-box
  .app
    padding 0 15px
  #badgeWrap
    .lui-badge-group
      width auto
      margin 0 15px
      padding 20px 0
      background: #fff
      &::after
        display: none
  .lui-badge
    width 85px
    margin 0 auto
  .lui-loading
    display inline-block
    margin 5px 0 5x 20px
  .lui-loading--white
    background-color rgba(0, 0, 0, .5)
  .wrap
    margin 20px
  .lui-icon
    display block
    font-size 32px
    /*margin 15px 0*/
    color: rgba(69,90,100,.8)
  .lui-cell-group
    margin-bottom 20px
  .cl
    background #fef
  .mb20
    margin 20px 0
  .lui-swipe
    &-item
      color darkred
      font-size 20px
      text-align center
      line-height 150px
    img
      width 100%
      height 240px
      display block
      padding 30px 60px
      box-sizing border-box
      background-color #fff
      pointer-events none
  .lui-pull-refresh
    &,&__track
      height 500px
      background rgba(0,141,255,.56)
      p
        -webkit-margin-before 0
        -webkit-margin-after 0
  .lui-panel__content
    padding: 20px

</style>
