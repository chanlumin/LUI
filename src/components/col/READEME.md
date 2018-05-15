[TOC]

# col的参数

1. 参数:span=> 可以传入的栅格数(0到24)
2. 参数:offset=> 偏移也是0到24

# 实现原理
> 每列都是float:left, box-sizing:border-box; width:(栅格数对应的百分比)

> offset是通过-> margin-left:(对应的栅格的百分比数)

备注: stylus是如果要.lui-col-{co} 此处要加{}然后在属性里面就不用加了
```stylus
 //IE默认的盒模型 外部元素无法被撑开
.lui-col
  float left
  box-sizing border-box

//24个栅格 每个栅格宽度是1/24份如果是offset的话 margin-left也是1/24
for co in (1..24)
  .lui-col-{co}
    width (co/24*100%)
  .lui-col-offset-{co}
    margin-left (co/24*100%)
```

# 设置gutter
1. 如果父亲元素传入gutter的时候 才需要设置col的padding-left和padding-right
2. gutter的显示是通过background-clip:content-box去实现的

