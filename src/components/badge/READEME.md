[TOC]


# Javascript的选中方案
```javascript
<ul>
   <li class="selected item">水果</li>
   <li class="item">梨子</li>
   <li class="item">香蕉</li>
</ul>

//  监听每个item的click事件 如果有click发生的话那么

var items = document.querySelectorAll('.item')
items.forEach(key, item) {
  let self = this 
  item.addEventListener('click',()=>{
    if(this.classList.indexOf('selected') < 0) {
      this.classList.push('selected')
    } else {
      //
    }
  })
}

```
# Vue的选中方案

1. 父亲属性有个badges数组, 每个孩子beforeCreate的时候就把自己push进去
```javascript
this.$parent.badges.push(this)
```

2. 和activeKey(默认activeKey是0) 


3. 子组件 也就是lui-badge有三个属性 url和title和href和一个:class=>{select}

  1. select通过判断当前的点击元素在父亲的badges中的位置是否等于activeKey 
  2. beforeCreate之前把自己push父亲的badges
  3. click的时候传递一个click事件给外部父组件,父组件接收并设置当前的activeKey
  
```javascript
// 调用

    <!--badge-->
    <div id="badgeWrap">
      <lui-badge-group :activeKey="activeKey">
        <lui-badge @click="badgeClick" title="badge1" info="99"></lui-badge>
        <lui-badge @click="badgeClick" title="badge2"></lui-badge>
        <lui-badge @click="badgeClick" title="badge3" info="233"></lui-badge>
        <lui-badge @click="badgeClick" title="badge4" info="1"></lui-badge>
      </lui-badge-group>

    </div>
    
    
    
```

```stylus
  #badgeWrap
    .lui-badge-group
      width auto
      margin 0 15px
      padding 20px 0
      background: #fff
      &::after
        display: none
  .lui-badge
    width 85px
    margin 0 auto
```
