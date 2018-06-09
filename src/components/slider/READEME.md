[TOC]
# Slider组件

## 参数
1. v-model 当前进度百分比 type=> Number default => 0 
2. disabled 是否禁用滑块 => type Boolean default => false 
3. max 最大值 type=> Number  defulat = > 100 
4. min 最小值 type=> Number default => 0 
5. step 步长  type=> Number default => 1 
6. bar-height 进度条高度 type String default => 2px 


## 事件
1. change 进度条改变的时候触发 value => 当前值


> css小技巧 利用 伪元素 扩大button的选中区域

```stylus
@import "common/var.styl"

&__button
  position absolute
  top 50%
  right 0
  width 20px
  height 20px
  border-radius 50%
  background-color $white
  transform translate3d(50%,-50%, 0)
  box-shadow 0 1px 2px rgba(0,0,0,0.5)
  &::after
    content ''
    position absolute
    width 200%
    height 200%
    top -50%
    left -50% 

```
