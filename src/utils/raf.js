/**
 * raf = requestFrameAnimation =>
 */

import {isServer} from "./utils";

let prev = Date.now()


function fallback(fn) {
  const cur = Date.now()
  // 为了保证上一帧和下一帧的动画的时间间隔小于16或者说向16靠 => 1000/60帧 => 16ms
  const ms = Math.max(0,16 - (cur - prev))
  const id = setTimeout(fn, ms)
  // 更新prev 每次setTimeout执行玩动画之后要更新prev
  prev = cur + ms
  return id
}

// 获取目标执行环境
const root = isServer ? global : window

// 向下兼容 requestAnimationFrame fallback是用setTimeout实现的 原生的requestAnimation也会返回一个requestAnimationFrame
const iRaf = root.requestAnimationFrame || root.webkitRequestAnimationFrame || fallback

// isCancel向下兼容0

const isCancel = root.cancelAnimationFrame || root.webkitCancelAnimationFrame || root.clearTimeout

export function raf(fn) {
  return iRaf.call(root, fn)
}

export function cancel(id) {
  isCancel.call(root, id)
}



