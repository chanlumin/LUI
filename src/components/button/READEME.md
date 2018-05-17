# 按钮

## 按钮可以传递的参数
1. type(按钮的颜色) 
  1. default
  2. primmary
  3. danger

2. size(按钮的大小)
  1. large(大号)
  2. normal(普通)
  3. small(小型按钮)
  4. mini(mini型按钮)
  
3. disabled(按钮是否可以点击)
4. loading(是否显示加载状态)
5. tag(用来自定义标签)
6. bottom-action(是否为底部元素)
7. block-type(是否为块级元素)
8. native-type(按钮类型)


## DOM结构
```vue

<html>
  <button>
    <span>普通按钮</span>
  </button>
</html>
<template>
  <component :is="tag" :type="nativeType" :disabled="disabled" :class="b([type, size,{
    block,
    loading,
    disabled,
    unclickable: disabled || loading,
    'bootom-action' : bottomAction
  }])"
    @click="onClick"
  >
    <loading v-if="loading" size="20px" :color="type==='default' ? 'black' : 'white'"></loading>
    <span :class="b('text')">
      <slot>{{text}}</slot>
    </span>
  </component>
</template>
```



# 按钮的行为
1. 按钮可点击,点击的时候把触发一个click事件
2. 触发click事件的条件是按钮不是处于loading状态并且按钮不是disabled状态

# 按钮的css县官
1.   -webkit-appearance none // 去掉按钮默认的样式



