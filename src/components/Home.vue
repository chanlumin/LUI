<template>
  <div class="Home">
    Home
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
        cActive: [0] // 只有accordion才能传入一个值 0
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
      LuiCollapseItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
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
</style>
