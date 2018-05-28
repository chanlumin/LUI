# 环形进度条
> 实现原理 就是一个底圈(hover) 和一个顶圈(layer)  layer代表进度 hover代表底圈

## 参数
1. v-model(当前进度) type(Number)
2. rate(当前进度) type(Number) 默认值100 
3. size(圆环直径) type(String) 100px
4. color(进度条颜色) type(String) #38f
5. layer-color(轨道颜色) type(String) #fff
6. fill(填充颜色) type(String) none
7. speed(动画速度单位(rate/s)) type(Number)
8. text(文字) type(String)
9. stroke-width(进度条宽度) type(Number) 40(控制进度条的向左或向右)
10. clockwise (是否顺时针增加) Boolean true

## svg path中国的理解
```html
<svg viewBox="0 0 1060 1060" xmlns="http://www.w3.org/2000/svg">
  <path d="M 530 530 m -500, 0 a 500, 500 0 1, 1 1000, 0 a 500, 500 0 1, 1 -1000, 0" style="fill: none; stroke: rgb(8, 255, 255); stroke-width: 40px;"></path>
  <!--先画上半边的圆,再画下半边的圆 -->
</svg>

// 上面path的意思是从530,530这个位置开始 m(move to相对位置) 向左移动500然后画半圆 

// a 500 500 0 1, 1 1000,0 的意思是 以x轴的半径500和y轴的半径500 (0,1,1) 第一个参数表示没有旋转，1表示画大弧度的,1表示原点到终点瞬
// 瞬时针画圆 1000， 0表示以相对位置1000,0的点自作为结束的的点


参考资料
https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths

```


## layerStyle的思路 
> 一开始stork-array 是3140的像素长度 偏移了3140(隐藏) 显示30% => 偏移70%
```javascript
    function layerStyle() {
      let offset = this.perimeter * (100 - this.value) / 100;
      offset = this.clockwise ? offset : this.perimeter * 2 - offset;
      return {
        stroke: `${this.color}`,
        strokeDashoffset: `${offset}px`,
        strokeWidth: `${this.strokeWidth + 1}px`
      }
    }
```


