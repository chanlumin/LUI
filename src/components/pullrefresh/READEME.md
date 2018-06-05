[TOC]
# pullRefresh(下拉加载)
> prop参数

1. v-model=> 是否在加载中 type=> Boolean 
2. pulling-text 下拉加载中的顶部文案 String 下拉即可刷新
3. loosing-text 释放过程的顶部文案 String 释放即可刷新
4. loading-text 加载过程中顶部文案 String 加载中 
5. animation-duration 动画时常 Number => 默认300 ms
6. head-height 顶部内容高度 type Number => default 50 

## 事件
refresh => 下拉时候触发

## slot
1. normal 非下拉时候的顶部的内容
2. pulling 下拉过程中的顶部内容 
3. loosing 释放过程中的顶部内容
4. loading 加载过程中的顶部内容


