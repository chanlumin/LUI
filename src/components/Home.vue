<template>
  <div class="Home">
    Home
    <div id="test">
      测试测试测试测试测试测试测试测试测试测试
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import "~@/assets/css/common/ellipse.styl"
  #test
    width:20px
    ellipse()

</style>
