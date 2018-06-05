import {isServer} from './utils'


export default  {
  /**
   * 获取最近的父亲滚动元素
   * @param element
   * @param rootParent
   */
  getScrollEventTarget(element, rootParent = window) {
    let currentNode = element
    // nodeType === 1 就是element元素
    while (currentNode && currentNode.tagName !== "HTML" && currentNode.tagName != 'BODY' && currentNode.nodeType === 1 && currentNode !== rootParent) {
      const overflowY = this.getComputedStyle(currentNode).overflowY
      if(overflowY === 'scroll' || overflowY === 'auto') {
        return currentNode
      }
      currentNode = currentNode.parentNode
    }
    return rootParent
  },
  getScrollTop(element) {
    return 'scrollTop' in element ? element.scrollTop : element.pageYOffset
  },
  /**
   * 设置scrollTop的兼容性质写法
   * @param element
   * @param value
   */
  setScrollTop(element, value) {
    'scrollTop' in element ? element.scrollTop = value : element.scrollTo(element.scrollX, value)
  },
  /**
   * 获取元素到页面顶端到距离
   * 包括当前元素到window顶端的到距离和window滑动的距离
   * @param element
   * @returns {*}
   */
  getElementTop(element) {
    return (element === window ? 0 : element.getBoundingClientRect().top) + this.getScrollTop(window)
  },
  /**
   * 获取元素的高度
   * @param element
   * @returns {Number}
   */
  getVisibleHeight(element) {
    return element === window ? element.innerHeight : element.getBoundingClientRect().height
  },
  getComputedStyle: !isServer && document.defaultView.getComputedStyle.bind(document.defaultView)
}
