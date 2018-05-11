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
  </div>
</template>

<script>
  import LuiRow from "./row/lui-row.vue";
  import LuiCol from "./col/lui-col.vue"

  export default {
    name: 'Home',
    data(){
      return {
        gutter: 24
      }
    },

    components: {
      LuiRow,
      LuiCol
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

</style>
