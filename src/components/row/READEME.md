[TOC]

# es6简写
> es6的简写需要每个key值是变量如果为{'a','b'}这样就是错的
```javascript
let f = ()=>{console.log('hello')}
Object.keys({a,b,f}).forEach(key=> {
  console.log(key)
})

// Babel转义成为
'use strict';

var f = function f() {
  console.log('hello');
};
Object.keys({ a: a, b: b, f: f }).forEach(function (key) {
  console.log(key);
});
```

# vue中的class绑定
```vue
// 其中lui-col-$(span)这个class的存在取决于span的诊值是否是真

<template>
  <div>
    <div :class="{lui-col-${span}:span}"></div>
  </div>
</template>
```

# 数组的结构赋值忘记加了 const {name} = this.$options  中括号

> 出现 Vue  Maximum call stack size exceeded


# background-clip: content-box 可以显示出gutter的空白
