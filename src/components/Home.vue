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
  </div>
</template>

<script>
  import LuiRow from "./row/lui-row.vue";
  import LuiCol from "./col/lui-col.vue"
  import LuiBadgeGroup from './badge/badge-group.vue'
  import LuiBadge from './badge/badge.vue'
  import LuiLoading from './loading/lui-loading.vue'

  import LuiButton from './button/lui-button.vue'

  export default {
    name: 'Home',
    data(){
      return {
        gutter: 24,
        activeKey:0
      }
    },
    methods: {
      badgeClick(key){
        this.activeKey = key
      }
    },
    components: {
      LuiRow,
      LuiCol,
      LuiBadgeGroup,
      LuiBadge,
      LuiLoading,
      LuiButton
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
</style>
