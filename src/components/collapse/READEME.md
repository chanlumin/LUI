[TOC]

## collapse

### 参数props

1. v-model 当前展开面板的name type=> Array || String || Number
2. accordion 是否开启手风琴模式 type  => false 

 > 备注:手风琴模式=> 只有一个是展开的,其他都是关闭的

### 触发事件
1. change(切换面板时触发) activeNames => type => String || Array



## collapse-item

### 参数
1. name(面板唯一标识,默认为索引值) type=> String || Number 默认值=> index 
2. title(标题) type => String


### CollapseItem Slot
1. defaut =>  面板内容
2. 自定义标题内容
