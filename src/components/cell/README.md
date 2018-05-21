# cell-group

> 思路 cell-group其实就是cell的一个container(也就是最外层的div) 需要传递的其实就只有一个参数
也就是class参数=> lui-hairline-top-bottom 就是上下边框作为一个props参数传递进去就行
## 参数
1. border => 是否显示外边框 type:Boolean, default:true

## DOM结构
```vue
<template>
  <div :class="[b(), {'lui-hairline-top-bottom': border}]">
    <slot></slot>
  </div>
</template>
```


# cell 
> 思路 cell

## 参数
1. icon type String 
2. title(左侧标题) type String
3. value(右侧内容) type String
4. label(标题下方的描述信息) type String
5. border(是否显示内边框) Boolean True
6. center 是否使内容剧中 type Boolean false
7. url 跳转链接 type String
8. to 路由跳转对象(同vue-router的to) type String||Object
9. replace 跳转时候 是否替换当前的history type String => false
10. clickable(是否开启点击反馈) type Boolean false
11. is-linke(是否显示右侧箭头 并开启点击反馈) type Boolean false
12. required(是否显示表单必填选项) Boolean false


## Event 
click => 点击cell时候触发

## cell Slot 
1. icon 自定义icon
2. title 自定义title
3. right-icon 自定义右侧按钮 默认是arrow



## 模板
```vue
<template>
  <div :class="[
    b({
      center,
      required,
      clickable: isLink || clickable
    }),
    {'lui-hairline': border}
  ]" @click="onClick">
    <slot name="icon">
      <icon v-if="icon" :class="b('left-icon')" :name="icon"></icon>
    </slot>
    <!--$slots.title代表的slot的name为title的组件-->
    <div v-if="title || $slots.title" :class="b('title')">
      <!--slot放在这里的意识是slot 可以 用模板替换掉-->
      <!--比如-->
      <!--
      <template slot="title">
        <span class="van-cell-text">单元格</span>
        <van-tag type="danger">标签</van-tag>
      </template>
      -->
      <slot name="title">
        <span v-text="title"></span>
        <div v-if="label" v-text="label" :class="b('label')"></div>
      </slot>
    </div>

    <div v-if="value || $slots.default" :class="b('value', {alone: !$slots.title && !title})">
      <slot>
        <span v-text="value"></span>
      </slot>
    </div>

    <slot name="right-icon">
      <lui-icon v-if="isLink" :class="b('right-icon')" name="arrow"></lui-icon>
    </slot>

    <slot name="extra"></slot>
  </div>
</template>
```

