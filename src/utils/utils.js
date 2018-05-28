import Vue from  'vue'

// 判断vue是否运行在服务端
const isServer = Vue.prototype.$isServer

/**
 * 是否有定义
 * @param obj
 * @returns {boolean}
 */
function isDef(obj) {
  return obj !== void 0 && obj !== null
}


export {
  isDef,
  isServer
}
