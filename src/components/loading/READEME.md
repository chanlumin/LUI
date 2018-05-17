[TOC]

# Loading组件实现思路

## loading 需要传入的props
1. color(组件的颜色) 类型为String 可选为black和white默认为black
2. type(组件的类型) 类型为String 可选为circular和spinner默认为circular
3. size(组件的大小) 类型为String 默认值为30px

## type 和 color直接传入 size通过computed:中的style来计算
```javascript
style() {
  return this.size ? {
    width: this.size,
    height: this.size
  } : {}
}
```


## DOM结构
```vue

<template>
  <div class="lui-loading-circular lui-loading-black" :style="style">
  <!-包围内部icon的span-->
  <span class="lui-loading_spinner lui-loading_spinner--circular">
    <i v-for="item in (type === 'spinner' ? 12 : 0)"></i>
    <svg v-if="type==='circular'" class="lui-loading__circular">
      <circle cx="50" cy="50" r="20" fill="none"></circle>
    </svg>
  </span>
</div>
</template>
```


## svg的用法
### viewBox属性
> viewBox属性可以指定四个属性(min-x,min-y,width,height)

### <circle cx="50" cy="50" r="20" fill="none"/>
>  circle用来创建一个圆 基于圆心坐标(50,50) 和半径20


## es6的写法

如果直mod=>prefix(name,mod) ==>他自动会帮你return

如果写成 =>{}的话就需要自己在里面进行return了
```javascript
  // modes是数组的话 递归
  if(Array.isArray(mods)) {
    return mods.map(mod=> {
      // console.log(mod)
      return prefix(name,mod)
    })
  }
```


## animation-timing-function

timing function作用于一个关键帧周期而非整个动画周期，即从关键帧开始开始，到关键帧结束结束

stroke-linecap: round 定义开放路径的终结(也就是他这条线他的开始和结束点是平滑的) 

stroke-dasharray: 1,200 => 意思是1个黑线200空白
stroke-dasharray: 90,150 => 意思是90个黑色150个白色

stroke-dashoffset 30 整体向左移30px  如果是负数的话就是整体向移动

