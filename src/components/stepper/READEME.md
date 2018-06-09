[TOC]

## props
1. min(最小值) type(String||Number) default 1
2. max(最大值) type(String||Number) default - 
3. default-value type(String||Number) default 1
4. step(步数) type(String||Number) default 1
5. integer(是否只允许输出正数) type(Boolean) defualt false 
6. disabled(是否禁用) type(Boolean) default false 
7. disable-input(是否禁用input框) type(Boolean) default false 

## 事件 
1. change 当绑定的只改变的时候触发
2. overlimit  当点击不可用的按钮的时候触发
3. minus 当绑定的值减少的时候触发 
4. plus 当绑定的值增加的时候触发


> css技巧 利用伪类实现加号和减号 
```stylus
.lui-stepper
  font-size 0
  &__minus,&__plus
    width 40px
    height 30px
    box-sizing border-box
    background-color $white
    border 1px solid $border-color
    position relative
    padding 5px
    vertical-align middle
    &::before
      width 9px
      height 1px
    &::after
      width 1px
      height 9px
    &::before,&::after
      content: ''
      position absolute
      margin auto
      top 0
      left 0
      right 0
      bottom 0
      background-color #6c6c6c
    &:active
      background-color $active-color
    &--disabled
      background-color $background-color
      &::before,&::after
        background-color $gray
    &__minus
      border-radius 2px 0 0 2px
      &::after
        display none
    &__plus
      border-radius 0 2px 2px 0
```
