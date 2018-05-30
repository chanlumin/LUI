/**
 * 通过name找到对应的父亲组件
 */
export default {
  data() {
    return {
      parent: null
    }
  },
  methods: {
    findParent(name) {
      let parent = this.$parent
      while (parent) {
        if(parent.$options.name === name) {
          // 找到后对当前的父亲组件进行赋值
          this.parent = parent
          break
        }
        // 继续往上找
        parent = parent.$parent
      }

    }
  }
}
