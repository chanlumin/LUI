[TOC]
# swipe
> 思路

swipe是通过css3写动画的 所以绑定:style="trackStyle"(条件是当前的元素的孩子元素的个数小于)
## 参数props
1. autoplay(自动轮播间隔，单位为ms) type=> Number
2. duration(动画时常,单位ms) type=>Number 默认值(500)
3. loop(是否开启循环播放) type(Boolean) default(true)
4. vertical(是否为纵向滚动) type(Boolean) default(false)
5. touchable(是否可以通过手势滑动) type(Boolean) default(true)
6. show-indicators(是否显示指示器) type(Boolean) default(true)
7. initial-swipe(初始位置,从0开始算) type(Number) default(0)


## 事件
1. change(每一轮轮播结束后触发) 参数index当前的的页的索引
